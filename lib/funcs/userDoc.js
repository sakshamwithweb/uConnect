// for embedding(this string is given by AI)
export const buildEmbeddingText = (doc) => {
    const { techStack, experience, basic } = doc;

    return [
        `Primary languages: ${techStack.primary.join(", ")}.`,
        `Secondary languages: ${techStack.secondary.join(", ")}.`,
        `Experience level: ${experience.seniority_level} developer.`,
        `Account age: ${basic.account_age} years.`,
        `Active repositories in last year: ${experience.activeReposLastYear}.`,
        ``,
        `Open source activity:`,
        `Total stars: ${experience.totalStars}.`,
        `Total forks: ${experience.totalForks}.`,
        ``,
        `Bio: ${basic.bio || "No bio provided."}`,
    ].join("\n");
}

// Developer summary:\n${doc.summary.short}