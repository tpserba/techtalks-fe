const BASE_TALKS_LIST_URL = 'http://localhost:8080/api/talk';




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



export async function getTalk(id: number) {
  // Can't get env vars to work...
  let response = await fetch(BASE_TALKS_LIST_URL, {
    "method": 'POST',
    "body":JSON.stringify(id),
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
  let response = await fetch(BASE_TALKS_LIST_URL + "s-titles", {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  });
  return await response.json();
};

export async function searchReq(params: string) {
  // Can't get env vars to work...
  let response = await fetch(BASE_TALKS_LIST_URL + "-search", {
      "method": 'POST',
      "body": JSON.stringify(params),
      "headers": {
          "Content-Type": 'application/json'
      }
  });
  return await response.json();
};