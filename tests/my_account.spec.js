import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken.js";
import { adminDetails } from "../data/userDetails.js";

test.only("My account login with cookies injection", async({page}) => {

    //Make a request to get login token 
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

    //Inject login token into browser 
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.visit();
    await page.evaluate(([loginTokenInsideBrowserCode]) =>{
        document.cookie = "token=" + loginTokenInsideBrowserCode;
    },[loginToken])

    await myAccountPage.visit();
    await myAccountPage.waitForPageHeading();
})