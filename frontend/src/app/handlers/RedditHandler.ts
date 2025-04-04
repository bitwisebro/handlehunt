async function getToken() {
    let res = await fetch('https://handlehunt-manager.tatyavinchu.workers.dev',);
    let resObject = await res.json().then(json => JSON.parse(JSON.stringify(json)));
    return resObject
}

async function prepareRequest() {
    console.log("Preparing Headers")
    let header = getToken().then(res => {
        const redditHeaders: Headers = new Headers();
        redditHeaders.append("User-Agent", "handleHunt v1.0 by u/Lost_Access_401");
        redditHeaders.append(
            "Authorization",
            `Bearer ${res.token}`
        );
        return redditHeaders;
    });

    const redditRequestOptions: RequestInit = {
        method: "GET",
        headers: await header,
        redirect: "follow",
    };
    return redditRequestOptions;
}



export const checkRedditAvailability = async (username: string): Promise<boolean> => {
    // let res = await fetch('https://handlehunt-manager.tatyavinchu.workers.dev', { mode: 'no-cors' });
    // let resObject = await res.json().then(json => JSON.parse(JSON.stringify(json)))
    // console.log(resObject.token)
    console.log("Fetching username on Reddit");
    try {
        let url = `https://oauth.reddit.com/api/username_available?user=${username}`;
        const response = await fetch(url, await prepareRequest());
        return await response.json();
    } catch (error) {
        console.error('Error fetching Reddit:', error);
    }
    return false
}