import * as nodeFetch from "node-fetch"   

export const getLoginToken = async() => {
    const response = await nodeFetch("http://localhost:2221/api/login", {
        method:"POST",
        body:JSON.stringify({"username": "admin", "password": "Admin123"})
    })

    if(response.status !== 200){
        throw new Error("Wrong status code, can't retrieve  a login token")
    }
    const body = await response.json();
    return body.token;
}