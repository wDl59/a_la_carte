class Footer {
    constructor(page) {
        this.page = page;
        this.container = '//footer[@class="footer"]';
        this.menu = `${this.container}//div[@class="header-footer__menu footer-head"]//div[@class="menu-navigacia-container"]`;
        this.contacts = `${this.container}//div[@class="footer__contacts contacts"]`;
        
        this.selectors = {
            logo: `${this.container}//div[@class="header-footer__logo"]//a`,
            hotel: `${this.menu}//a[@href="/hotel/"]`,
            airtickets: `${this.menu}//a[@href="https://alacarte.world/airtickets/"]`,
            entryGuides: `${this.menu}//a[@href="https://alacarte.world/entry_guides/"]`,
            about: `${this.menu}//a[@href="https://alacarte.world/about/"]`,
            
            city: `${this.contacts}//li[text()="Москва"]`,
            phone: `${this.contacts}//a[@href="tel:+74999952179"]`,
            mail: `${this.contacts}//a[@class="contacts__link" and text()="info@alacarte.world"]`,
            socialText: `${this.contacts}//span[@class="social__text"]`,
            telegram: `${this.contacts}//a[@href="https://t.me/alacartepremium"]`,
            youtube: `${this.contacts}//a[@href="https://www.youtube.com/channel/UCv3UT1O13G8VQNRZQ_X3oPA"]`
        };
    }

    async waitForLoad(requiredElements = Object.keys(this.selectors)) {

        await this.page.waitForSelector(this.container, { state: 'visible' });

        const elementsToWait = requiredElements.map(el => 
            this.page.locator(this.selectors[el]).waitFor({ state: 'visible' })
        );
        
        await Promise.all(elementsToWait);
    }

    element(name) {
        if (!this.selectors[name]) {
            throw new Error(`Элемент с именем "${name}" не найден в footer. Доступные элементы: ${Object.keys(this.selectors).join(', ')}`);
        }
        return this.page.locator(this.selectors[name]);
    }

    async clickOnLogo() {
        await this.element('logo').click();
    }

    async getContactInfo() {
        return {
            city: await this.element('city').textContent(),
            phone: await this.element('phone').textContent(),
            mail: await this.element('mail').textContent()
        };
    }
}

module.exports = { Footer };