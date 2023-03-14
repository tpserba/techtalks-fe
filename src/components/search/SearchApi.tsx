const BASE_TALKS_LIST_URL = 'http://localhost:8080/api/talk';


export async function getTalk(id: number) {
    // Can't get env vars to work...
    let response = await fetch(BASE_TALKS_LIST_URL, {
        "method": 'POST',
        "body": JSON.stringify(id),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
    return await response.json();
};

