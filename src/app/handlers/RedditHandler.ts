const redditHeaders: Headers = new Headers();
redditHeaders.append("User-Agent", "handleHunt v1.0 by u/Lost_Access_401");
redditHeaders.append(
    "Authorization",
    "Bearer YOUR_REDDIT_ACCESS_TOKEN"
);

const redditRequestOptions: RequestInit = {
    method: "GET",
    headers: redditHeaders,
    redirect: "follow",
};

export const checkRedditAvailability = async (username: string): Promise<boolean> => {
    console.log("Fetching username on Reddit");
    try {
        let url = `https://oauth.reddit.com/api/username_available?user=${username}`;
        const response = await fetch(url, redditRequestOptions);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Reddit:', error);
    }
    return false
}