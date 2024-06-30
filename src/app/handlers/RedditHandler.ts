const redditHeaders: Headers = new Headers();
redditHeaders.append("User-Agent", "handleHunt v1.0 by u/Lost_Access_401");
redditHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzE2MDIyNjE4LjE4Mjc0MSwiaWF0IjoxNzE1OTM2MjE4LjE4Mjc0MSwianRpIjoiN3ppWlIxSTJ0cUkxNHJPME5tcGpXWGJOUE9uTi1nIiwiY2lkIjoiWWdpWS1aX25ZRzExcU5Jak8tUUwtZyIsImxpZCI6InQyXzEwajZmMjY1bngiLCJhaWQiOiJ0Ml8xMGo2ZjI2NW54IiwibGNhIjoxNzE1OTI1NTA3MjYyLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.QL_W2OtHgxhCCHR4_WSykvaPEfvhXFCOg6ng4gIpHTlBEP1n-yHJokOxzdPEMBifC6CM1GuwIY9cG8jQYKQ8BFp_knVQ23VUZlkDVvii4rv-k0SeQ-aajyw04t0RuCQlwa8MqZ7nDMU3KH5yyEtASvW5bPMn3Ynrh2AdDXQQo7pQU0czxQ4B8aMFHbs2atbo-PN7NMjnvAALZjsnSjbT4MVT_NOOx7mH7Q-5k1YuyFld_q2xxK43e33EnCt3WonD6nmm57P5ikh3OOKlX3QLNesE7MOEjcg1P5MPvzGml23tg8yfVeP5zOTecqBkwsa5MbjL_Kn7tQefd-3yS7WvHA"
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