const { Header } = require('../components/header.js');
const { Footer } = require('../components/footer.js');
const { expectCount } = require ('../helpers/assertions.js');

class HomePage {
    constructor(page) {
        this.page = page;
        this.header = new Header(page);
        this.footer = new Footer(page);

        this.content = '//section[@class="main-page"]';

        this.banner = `${this.content}//div[@class="main-page__hero hero"]`;
        this.bannerElements = {
            img: `${this.banner}//img[@class="image hero__image"]`,
            title: `${this.banner}//h1[@class="desc-hero__title"]`,
            button: `${this.banner}//a[@class="desc-hero__link"]`
        };

        this.searchInput = `${this.content}//input[@id="searchInput"]`;

        this.posts = `${this.content}//div[@class="main-page__content"]`;

        this.leftBlocks = `${this.posts}//div[@class="main-page__column main-page__column-1"]//article[@class="article-secondary"]`;
        this.leftBlockElements = {
            link: `${this.leftBlocks}//a`,
            title: `${this.leftBlocks}//h2[@class="desc-article-second__title"]`,
            desc: `${this.leftBlocks}//p[@class="desc-article-second__text"]`,
            button: `${this.leftBlocks}//button`
        };

        this.rightBlocks = `${this.posts}//div[@class="main-page__column"]//article[@class="article"]`;
        this.rightBlockElements = {
            link: `${this.rightBlocks}//a`,
            title: `${this.rightBlocks}//h2[@class="desc-article__title"]`,
            desc1: `${this.rightBlocks}//div[@class="desc-article__text" and not(contains(@class,"--large"))]`,
            desc2: `${this.rightBlocks}//div[contains(@class,"desc-article__text--large")]`,
            button: `${this.rightBlocks}//button`,
            img: `${this.rightBlocks}//img[@loading="lazy"]`
        };
    }

    async navigate() {
        await this.page.goto('https://alacarte.world/');
    }

    async waitForLoad() {
        await this.header.waitForLoad();

        await this.checkBanner();

        await this.page.waitForSelector(this.searchInput, { state: 'visible' });

        await this.checkLeftBlocks();
        await this.checkRightBlocks();

        await this.footer.waitForLoad();
    }

    async checkBanner() {      
        await Promise.all([
            this.page.waitForSelector(this.bannerElements.img, { state: 'visible' }),
            this.page.waitForSelector(this.bannerElements.title, { state: 'visible' }),
            this.page.waitForSelector(this.bannerElements.button, { state: 'visible' }),
        ]);
    }

    async checkLeftBlocks() {
        await expectCount(this.page.locator(this.leftBlocks), 12, 'Количество постов в левой части');
        await Promise.all([
            expectCount(this.page.locator(this.leftBlockElements.link), 12, 'Количество ссылок в левой части'),
            expectCount(this.page.locator(this.leftBlockElements.title), 12, 'Количество заголовков в левой части'),
            expectCount(this.page.locator(this.leftBlockElements.desc), 12, 'Количество описаний в левой части'),
            expectCount(this.page.locator(this.leftBlockElements.button), 12, 'Количество кнопок в левой части'),
        ]);
    }

    async checkRightBlocks() {
        console.log(``);
        await expectCount(this.page.locator(this.rightBlocks), 9, 'Количество постов в правой части');
        await Promise.all([
            expectCount(this.page.locator(this.rightBlockElements.link), 9, 'Количество ссылок в правой части'),
            expectCount(this.page.locator(this.rightBlockElements.title), 9, 'Количество заголовков в правой части'),
            expectCount(this.page.locator(this.rightBlockElements.desc1), 4, 'Количество описаний 1 типа в правой части'),
            expectCount(this.page.locator(this.rightBlockElements.desc2), 5, 'Количество описаний 2 типа в правой части'),
            expectCount(this.page.locator(this.rightBlockElements.button), 5, 'Количество кнопок в правой части'),
            expectCount(this.page.locator(this.rightBlockElements.img), 4, 'Количество кнопок в правой части'),
        ]);
    }
}

module.exports = { HomePage };