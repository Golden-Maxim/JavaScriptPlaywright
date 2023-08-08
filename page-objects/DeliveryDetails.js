import { expect } from "@playwright/test";

export class DeliveryDetails {
    
    constructor(page){
        this.page = page;

        this.firstName = page.getByPlaceholder('First name');
        this.lastName = page.getByPlaceholder('Last name');
        this.street = page.getByPlaceholder('Street');
        this.postCode = page.getByPlaceholder('Post Code');
        this.city = page.getByPlaceholder('City');

        this.countryDropDown = page.locator('[data-qa="country-dropdown"]');

        this.saveAddressForNext = page.getByRole('button', { name: 'Save address for next time' });
        this.continueToPayment = page.getByRole('button', { name: 'Continue to payment' });
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]');

        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.savedStreet = page.locator('[data-qa="saved-address-street"]');
        this.savedPostCode = page.locator('[data-qa="saved-address-postcode"]');
        this.savedCity = page.locator('[data-qa="saved-address-city"]');
        this.savedCountry = page.locator('[data-qa="saved-address-country"]');
    

    }

    fillDetails = async(userAddress) => {
    
          await this.firstName.waitFor();
          await this.firstName.fill(userAddress.firstName);
        
          await this.lastName.waitFor();
          await this.lastName.fill(userAddress.lastName);
        
          await this.street.waitFor();
          await this.street.fill(userAddress.street);
        
          await this.postCode.waitFor();
          await this.postCode.fill(userAddress.postCode);
        
          await this.city.waitFor();
          await this.city.fill(userAddress.city);
        
          await this.countryDropDown.waitFor()
          await this.countryDropDown.selectOption(userAddress.country);       
    }

    saveDetails = async() =>{
        const addressCountBeforeSaving = await this.saveAddressContainer.count();
       
        await this.saveAddressForNext.waitFor();
        await this.saveAddressForNext.click();  

        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1);

        await this.savedFirstName.first().waitFor();
        expect(await this.savedFirstName.first().innerText()).toBe(await this.firstName.inputValue())

        await this.savedLastName.first().waitFor();
        expect(await this.savedLastName.first().innerText()).toBe(await this.lastName.inputValue())

        await this.savedStreet.first().waitFor();
        expect(await this.savedStreet.first().innerText()).toBe(await this.street.inputValue())

        await this.savedPostCode.first().waitFor();
        expect(await this.savedPostCode.first().innerText()).toBe(await this.postCode.inputValue())

        await this.savedCity.first().waitFor();
        expect(await this.savedCity.first().innerText()).toBe(await this.city.inputValue())

        await this.savedCountry.first().waitFor();
      //  console.warn(await this.countryDropDown.inputValue())
        expect(await this.savedCountry.first().innerText()).toBe(await this.countryDropDown.inputValue())

     
    }


    goToContinueToPayment = async() =>{
       await this.continueToPayment.waitFor();
       await this.continueToPayment.click();
       await this.page.waitForURL(/\/payment/, {timeout: 3000})
    
    }

}