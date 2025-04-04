import { checkGithubAvailibility } from "./GithubHandler";
import { checkRedditAvailability } from "./RedditHandler";

export const checker = async (name: string, site: string) => {
    if (typeof name != "string" || name == null || name == undefined || name.trim().length == 0)
        return Promise.reject(`Username is Null/Empty or Not String`);

    if (typeof site != "string" || site == null || site == undefined || site.trim().length == 0)
        return Promise.reject(`Site is Null/Empty or Not String`);

    const siteHandler = getSiteHandler(site);
    if (!siteHandler) {
        return Promise.reject(`Site '${site}' is not supported yet.`);
    }
    return await siteHandler(name);
}

function getSiteHandler(site: string) {
    const siteHandlers: any = {
        github: checkGithubAvailibility,
        reddit: checkRedditAvailability,
    }
    // Add more site handlers here
    return siteHandlers[site];
}

// // Example usage
// checker("shaileshBhandakkar", "github")
//     .then((res) => {
//         console.log("Username availibilty:", res);
//         process.exit(0); // Exit the process successfully
//     })
//     .catch((error) => {
//         console.error(error);
//         process.exit(1); // Exit the process with an error
//     });
