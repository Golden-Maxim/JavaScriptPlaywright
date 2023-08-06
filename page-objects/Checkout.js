import { expect } from "@playwright/test";

export class Checkout {
    constructor(page){
        this.page = page;
        this.basketCards = page.locator('[data-qa = "basket-card"]');
        this.basketItemPrice = page.locator('[data-qa = "basket-item-price"]');
        this.basketItemRemoveButton = page.locator('[data-qa = "basket-card-remove-item"]'); 

        this.continueCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }


    removeCheapestProduct = async() => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemove = await this.basketCards.count();
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts();
        const justNumbers = allPriceTexts.map((element)=> {
            return parseInt(element.replace("$",""), 10);
        })

        const smallestPrice = Math.min(justNumbers);
        const smallestPriceIndx =  justNumbers.indexOf(smallestPrice);
        const specificRemoveBtn = this.basketItemRemoveButton.nth(smallestPriceIndx);
        await specificRemoveBtn.waitFor();
        await specificRemoveBtn.click();
        await expect(this.basketCards).toHaveCount(itemsBeforeRemove-1)
      //  await this.page.pause();
    }

    continueToCheckOut = async() =>{
        await this.continueCheckoutButton.waitFor();
        await this.continueCheckoutButton.click();
        await this.page.waitForURL(/\/login/gm, {timeout:3000});
    }
}