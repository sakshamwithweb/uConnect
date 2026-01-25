import { Octokit } from "@octokit/core"

export const githubDataFetch = async (username) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

    const { status, data, headers } = await octokit.request(`GET /users/${username}`)

    if (status != 200) throw new Error("Error")

    // Now here get rest of the data and save
    // const profileData = Object.keys(data).filter((v) => !v.includes("url") && data[v])

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

    return datasWithName
}