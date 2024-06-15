const ghHeaders = new Headers();
ghHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");
ghHeaders.append("Content-Type", "application/json");
ghHeaders.append("Accept-Language", "en-GB,en;q=0.5")
ghHeaders.append("Connection", "keep-alive")

const requestOptions: RequestInit = {
    method: "GET",
    headers: ghHeaders,
    redirect: "follow",
};

export async function checkGithubAvailibility(username: string) {
    console.log("Fetching username on Github");
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, requestOptions);
        return (await response.status) === 404;
    } catch (error) {
        console.error('Error fetching GitHub:', error);
    }
}