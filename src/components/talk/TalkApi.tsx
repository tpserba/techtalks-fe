import { hasContent } from "../../utils/utils";

const BASE_TALKS_LIST_URL = 'http://localhost:8080/api/talk';


export async function getFullTalk(id: number  |null | undefined) {
    if (hasContent(id)) {
        // Can't get env vars to work...
        let response = await fetch(BASE_TALKS_LIST_URL+ "-full", {
            "method": 'POST',
            "body": JSON.stringify(id),
            "headers": {
                "Content-Type": 'application/json'
            }
        });
        return await response.json();
    }
};