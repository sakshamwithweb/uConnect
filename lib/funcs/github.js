import { Octokit } from "@octokit/core"

const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

export const githubDataFetch = async (username) => {

    const { status, data, headers } = await octokit.request(`GET /users/${username}`)

    if (status != 200) throw new Error("Error")

    // Now here get rest of the data and save
    const profileData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))

    const useless_urls = ["url", "avatar_url", "html_url"]
    const urls = Object.keys(data).filter((v) => !useless_urls.includes(v) && v.includes("url"))

    const names = urls.map((url) => data[url].split("{")[0].split("/").pop())

    const makeReqGitHub = async (url) => {
        const urlStr = data[url].split("{")[0]
        // Now GET req at urlStr
        const { status: newStatus, data: newData } = await octokit.request(`GET ${urlStr}`)
        if (newStatus == 200) return newData
        return await makeReqGitHub(url)
    }
    const datasInArr = await Promise.all(urls.map(makeReqGitHub))

    const datasWithName = Object.fromEntries(datasInArr.map((data, i) => [names[i], data]))
    console.log(`${headers["x-ratelimit-remaining"]} times remained`)

    return { ...datasWithName, profile: profileData }
}

export const extractFeature = async (data) => {
    const getTechstacks = async (repos) => {
        // Get last 20 or last length repos' techstack
        const reposToCheck = repos.length > 20 ? 20 : repos.length
        const allTechstacks = await Promise.all(repos.map(async (repo, idx) => {
            if (idx >= reposToCheck) return
            const { data } = await octokit.request(`GET ${repo.languages_url}`)
            return data
        }))

        // Unite all
        const unitedTechstacks = {}
        allTechstacks.filter((v) => v).forEach((techstack) => {
            const langName = Object.keys(techstack)[0]
            if (!langName) return
            const value = techstack[langName]

            if (unitedTechstacks[langName]) unitedTechstacks[langName] += value
            else unitedTechstacks[langName] = value
        })

        // distribute to primary, secondary and minor langs
        const totalBytes = Object.values(unitedTechstacks).reduce((prev, current) => prev + current, 0)

        const techstacks = {
            primary: [],
            secondary: [],
            minor: []
        }

        Object.keys(unitedTechstacks).forEach((techstack) => {
            const bytes = unitedTechstacks[techstack]
            const percent = (bytes / totalBytes) * 100

            if (percent >= 30) techstacks.primary.push(techstack)
            else if (percent < 30 && percent >= 5) techstacks.secondary.push(techstack)
            else if (percent < 5 && percent >= 1) techstacks.minor.push(techstack)
        })

        return techstacks
    }

    const lastYearRepos = (repos) => {
        const lastYear = repos.map((repo) => {
            const time = new Date(repo.updated_at).getTime()
            const oneYear = 1000 * 60 * 60 * 24 * 365
            if ((Date.now() - time) < oneYear) return repo
        })
        return lastYear.filter((v) => v).length
    }

    const totalPublicRepos = data?.profile?.public_repos
    const accountAge = new Date().getFullYear() - parseInt((data?.profile.created_at).split("-")[0])
    const totalStars = data.repos.reduce((prev, repo) => prev + repo.stargazers_count, 0)
    const totalForks = data.repos.reduce((prev, repo) => prev + repo.forks_count, 0)

    // IT ASSIGNED TORVALDS 17, NEED IMPROVEMENT, IN FUTURE KEEP 2 FIELDS IN `experience`, ONE SENIORITY AS IS AND SECOND HISTORICAL IMPACT
    const measureSeniority = (data) => {
        // stars
        // forks
        // years
        // consistent

        let score = 0;

        // Define Score
        const scores = [
            {
                name: "accountAge",
                value: accountAge,
                compare: {
                    "0-1": 1,
                    "1-2": 2,
                    "2-5": 5,
                    "5-10": 8,
                    "10+": 10
                }
            },
            {
                name: "lastYearRepos",
                value: lastYearRepos(data?.repos),
                compare: {
                    "0": 0,
                    "1-2": 2,
                    "3-5": 4,
                    "6-10": 5,
                    "10+": 6
                }
            },
            {
                name: "stars",
                value: totalStars,
                compare: {
                    "0-10": 0,
                    "10-50": 2,
                    "50-200": 4,
                    "200-1000": 5,
                    "1000+": 6
                }
            },
            {
                name: "publicRepos",
                value: totalPublicRepos,
                compare: {
                    "0-5": 0,
                    "6-15": 1,
                    "16-40": 3,
                    "40+": 4
                }
            }
        ]

        // Get score
        scores.forEach((val) => {
            const { value, compare } = val

            // max >= value > min
            if (value == 0) return

            for (let i = 0; i < Object.keys(compare).length; i++) {
                const compareVals = Object.keys(compare)[i]
                const values = compareVals.split("-").map((v) => parseInt(v))
                if (values.length == 2) { // in range
                    const [min, max] = values
                    if (value > min && value <= max) {
                        score += compare[compareVals]
                        break
                    }
                } else {// in digit+
                    const [digit] = compareVals.split("+").map((v) => parseInt(v))
                    if (value > digit) {
                        score += compare[compareVals]
                        break
                    }
                }
            }
        })

        // Assign level based on score
        let level = ""

        if (score <= 5) level = "junior"
        else if (score <= 12) level = "mid"
        else if (score <= 19) level = "senior"
        else if (score <= 26) level = "super_senior"

        return level
    }

    return {
        basic: {
            github_username: data?.profile?.login,
            bio: data?.profile?.bio,
            location: data?.profile?.location,
            account_age: accountAge
        },
        techStack: await getTechstacks(data?.repos),
        experience: {
            totalPublicRepos: totalPublicRepos,
            activeReposLastYear: lastYearRepos(data?.repos),
            totalStars: totalStars,
            totalForks: totalForks,
            avgStarsPerRepo: totalStars / data?.repos.length,
            seniority_level: measureSeniority(data)
        }
    }
}