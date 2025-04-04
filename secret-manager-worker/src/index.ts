export default {
	async fetch(request: any, env: any, ctx: any) {
		try {
			const value = await env.handlehunt_secrets.get("redditToken");
			if (value === null || value === undefined) {
				return new Response("Value not found", { status: 404 });
			}
			return new Response(`{"token":"${value}" }`, {
				status: 200,
				headers: new Headers({
					"content-type": "application/json; charset=UTF-8",
					"Access-Control-Allow-Origin": "*"
				})
			});
		} catch (err: any) {
			console.error(`KV returned error: ${err}`)
			return new Response(err, { status: 500 })
		}
	},

	async scheduled(event: any, env: any, ctx: any) {

		console.log(`trigger fired at ${event.cron}`);
		let res = await getRedditToken();
		let resObject = await res.json().then(json => JSON.parse(JSON.stringify(json)));
		if (!res.ok) {
			console.log(`Failed to Update Reddit Acces token, Response ${res.status}`);
			console.log(resObject)
			return new Response("Failed to Update Reddit Acces token", { status: res.status });
		}
		ctx.waitUntil(await env.handlehunt_secrets.put("redditToken", resObject.access_token));
		console.log(`Reddit Token Updated Successfully`);
	},
};

async function getRedditToken() {
	const redditHeaders = new Headers();
	redditHeaders.append("Content-Type", "application/x-www-form-urlencoded")
	redditHeaders.append("User-Agent", "handleHunt v1.0 by u/Lost_Access_401");
	redditHeaders.append(
		"Authorization",
		`Basic ${genHeader("YOUR_REDDIT_CLIENT_ID", "YOUR_REDDIT_CLIENT_SECRET")}`
	);

	//base64 of `appid:secret`
	function genHeader(appId: string, secret: string) {
		return btoa(`${appId}:${secret}`)
	}

	const reqbody = new URLSearchParams({
		'username': 'Lost_Access_401',
		'password': 'YOUR_REDDIT_PASSWORD',
		'grant_type': 'password'
	})
	const url = 'https://www.reddit.com/api/v1/access_token'
	let res = await fetch(url, { method: 'POST', headers: redditHeaders, body: reqbody.toString() })
	return res;
}
