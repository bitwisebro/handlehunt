// Generated type definitions for Cloudflare Worker environment bindings
interface __BaseEnv_Env {
	handlehunt_secrets: KVNamespace;
	REDDIT_CLIENT_ID: string;
	REDDIT_CLIENT_SECRET: string;
	REDDIT_USERNAME: string;
	REDDIT_PASSWORD: string;
	ALLOWED_ORIGIN: string;
}

declare namespace Cloudflare {
	interface GlobalProps {
		mainModule: typeof import("./index");
	}
	interface Env extends __BaseEnv_Env {}
}

interface Env extends __BaseEnv_Env {}

