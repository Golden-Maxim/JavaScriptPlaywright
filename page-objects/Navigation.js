import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {

    constructor(page) {
        this.page = page;
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' });

        this.burgerMenuMobile = page.locator('[data-qa="burger-button"]');
    }

    getBasketCount = async () => {
        this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text);
    }

    goToCheckout = async () => {
        //if mobile viewport, first open burger menu
        if (!isDesktopViewport(this.page)) {
            this.burgerMenuMobile.waitFor();
            this.burgerMenuMobile.click();
        }
        this.page.pause();
        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket");
    }

}