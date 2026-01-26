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

    return {
        basic: {
            github_username: data?.profile?.login,
            bio: data?.profile?.bio,
            location: data?.profile?.location,
            account_age: (data?.profile.created_at).split("-")[0]
        },
        techStack: await getTechstacks(data?.repos)
    }
}