import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken.js";
import { adminDetails } from "../data/userDetails.js";

test("My account login with cookies injection, and mocking network request", async({page}) => {

    //Make a request to get login token 
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

    //mocking 
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    })

    //Inject login token into browser 
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.visit();
   
    await page.evaluate(([loginTokenInsideBrowserCode]) =>{
        document.cookie = "token=" + loginTokenInsideBrowserCode;
    },[loginToken])

    await myAccountPage.visit();
    await myAccountPage.waitForPageHeading();
   
    await myAccountPage.waitForErrorMessage()
})