import { ITalk } from "../../interface/ITalk";

const BASE_TALKS_LIST_URL = 'http://localhost:8080/api/talk';


export async function saveTalk(talk: ITalk) {
    // Can't get env vars to work...
    let response = await fetch(BASE_TALKS_LIST_URL + "-add", {
        "method": 'POST',
        "body": JSON.stringify(talk),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
    return await response.json();
};