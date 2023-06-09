import { ITalk } from "./interface/ITalk";
import { hasContent } from "./utils/utils";

const BASE_TALKS_LIST_URL = 'http://localhost:8081/api/talk';
const BASE_AUTHOR_URL =  'http://localhost:8081/api';

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


export async function getTalkCard(id: number) {
    // Can't get env vars to work...
    let response = await fetch(BASE_TALKS_LIST_URL + "-card", {
        "method": 'POST',
        "body": JSON.stringify(id),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
    return await response.json();
};

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

export async function updateTalk(talk: ITalk) {
  // Can't get env vars to work...
  let response = await fetch(BASE_TALKS_LIST_URL + "-update", {
      "method": 'PUT',
      "body": JSON.stringify(talk),
      "headers": {
          "Content-Type": 'application/json'
      }
  });
  return await response.json();
};



export async function getTalks() {

    // Can't get env vars to work...
    let response = await fetch(BASE_TALKS_LIST_URL + "s", {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    });
    return await response.json();
  };

  export async function getTalksPageable(page :number, size: number) {
    // Can't get env vars to work...
    let response = await fetch(BASE_TALKS_LIST_URL + "s-pageable?page=" + page + "&size=" + size, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    });
    return await response.json();
  };
  
  
  
  
  export async function getTalksTitles() {
  
    // Can't get env vars to work...
    let response = await fetch(BASE_TALKS_LIST_URL + "s-titles", {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    });
    return await response.json();
  };
  
  export async function getTalksIds() {
  
    // Can't get env vars to work...
    let response = await fetch(BASE_TALKS_LIST_URL + "s-ids", {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    });
    return await response.json();
  };
  export async function getAuthors() {
  
    // Can't get env vars to work...
    let response = await fetch(BASE_AUTHOR_URL + "/authors", {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    });
    return await response.json();
  };

  export async function getAuthorByEmail(params: string) {
    // Can't get env vars to work...
    let response = await fetch(BASE_AUTHOR_URL+ "/author-by-email/"+params, {
        "method": 'GET',        
        "headers": {
            "Content-Type": 'application/json'
        }
    });
    return await response.json();
  };
  
  export async function searchByTitle(params: string) {
    // Can't get env vars to work...
    let response = await fetch(BASE_TALKS_LIST_URL + "-search-title", {
        "method": 'POST',
        "body": JSON.stringify(params),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
    return await response.json();
  };
  
  export async function searchByAuthor(params: string) {
    // Can't get env vars to work...
    let response = await fetch(BASE_AUTHOR_URL + "/author-by-name", {
        "method": 'POST',
        "body": JSON.stringify(params),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
    return await response.json();
  };
  
  export async function searchTalksByAuthor(id: number) {  
    let response = await fetch(BASE_TALKS_LIST_URL + "s-by-author", {
        "method": 'POST',
        "body": JSON.stringify(id),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
    return await response.json();
  };


  export async function deleteTalk(id: number) {  
    let response = await fetch(BASE_TALKS_LIST_URL + "/" + id, {
        "method": 'DELETE',
        "body": JSON.stringify(id),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
    return await response.json();
  };
  
  
  
  