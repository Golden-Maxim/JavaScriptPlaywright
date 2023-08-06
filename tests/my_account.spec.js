import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken.js";

test.only("My account login with cookies injection", async({page}) => {

    //Make a request to get login token 
    const loginToken = await getLoginToken();

    console.warn({loginToken});
    //Inject login token into browser 
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.visit();

})