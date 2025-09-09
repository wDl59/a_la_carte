class Header {
    constructor(page) {
        this.page = page;
        this.container = '//header[@class="header"]';
        this.menu = `${this.container}//div[@class="header__menu menu-header"]//div[@class="menu-navigacia-container"]//ul[@id="menu-navigacia"]`;
        
        this.selectors = {
            logo: `${this.container}//div[@class="header__logo"]//a`,
            hotel: `${this.menu}//a[@href="/hotel/"]`,
            airtickets: `${this.menu}//a[@href="https://alacarte.world/airtickets/"]`,
            entryGuides: `${this.menu}//a[@href="https://alacarte.world/entry_guides/"]`,
            about: `${this.menu}//a[@href="https://alacarte.world/about/"]`,
            enter: `${this.container}//a[@href="https://b2bpremium.2000047.com/"]`
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
            throw new Error(`Элемент с именем "${name}" не найден в header. Доступные элементы: ${Object.keys(this.selectors).join(', ')}`);
        }
        return this.page.locator(this.selectors[name]);
    }

    async clickOnLogo() {
        await this.element('logo').click();
    }
}

module.exports = { Header };