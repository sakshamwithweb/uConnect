export const generateEmbedding = async (text) => {
    const response = await fetch('https://ai.hackclub.com/proxy/v1/embeddings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.HACK_AI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'qwen/qwen3-embedding-8b',
            input: text,
        }),
    });

    const data = await response.json();
    const embedding = data.data[0].embedding;
    return embedding
}