import { expect } from "@playwright/test";

export class PaymentPage {
    constructor(page){
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.getByPlaceholder('Discount code');
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]');


        this.totalPrice = page.locator('[data-qa="total-value"]');
        this.totalIncludingDiscount = page.locator('[data-qa="total-with-discount-value"]');

        this.ownerCardInput = page.getByPlaceholder('Credit card owner');
        this.cardNumberInput = page.getByPlaceholder('Credit card number');
        this.validDataUntil = page.getByPlaceholder('Valid until');
        this.cvsCodeInput = page.getByPlaceholder('Credit card CVC');

        this.payButton = page.locator('[data-qa="pay-button"]');


    }   


    activateDiscount = async () => {

        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();

        await this.discountCodeInput.waitFor();
        await this.discountCodeInput.clear();
    
        // option 1  for laggy inputs: using .fill() with await expect()
        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code);



        //verify element is not exist
       // const value = await this.page.waitForSelector('[data-qa="discount-active-message"]');
        //expect(value).toBeNull();

         expect(await this.discountActivatedMessage.isVisible()).toBeFalsy()
        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();

        //option 2 for laggy inputs: slow typing 
       // await this.discountCodeInput.focus();
        //await this.discountCodeInput.type(code, {delay:1000});
        //expect(await this.discountCodeInput.inputValue()).toBe(code);

        await expect(this.page.locator('[data-qa="discount-active-message"]')).toBeVisible();
        await expect(this.discountActivatedMessage).toHaveText("Discount activated!"); 
        await this.totalIncludingDiscount.waitFor();
        await this.totalPrice.waitFor();

    
        const textPrice = await this.totalPrice.innerText();
        const textPriceWithDiscount = await this.totalIncludingDiscount.innerText();
        const priceAfterDiscount = parseInt(textPriceWithDiscount.replace("$",""));
        const priceBeforeDiscount = parseInt(textPrice.replace("$",""));

        await expect(priceAfterDiscount).toBeLessThan(priceBeforeDiscount);
        console.warn(priceBeforeDiscount);

      
 
    }

    fillPaymentDetails = async (cardInfo) =>{
        await this.ownerCardInput.waitFor();
        await this.ownerCardInput.fill(cardInfo.owner)   

    

        await this.cardNumberInput.waitFor();
        this.cardNumberInput.focus();
        await this.cardNumberInput.fill(cardInfo.cardNumber)   ;

        await this.validDataUntil.waitFor();
        this.cardNumberInput.focus();
        await this.validDataUntil.fill(cardInfo.validUntil);   

        await this.cvsCodeInput.waitFor();
        this.cardNumberInput.focus();
        await this.cvsCodeInput.fill(cardInfo.cvsCode);   
        
    
    }

    completePayment = async () =>{
        this.payButton.waitFor();
        this.payButton.click();
        
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }
}