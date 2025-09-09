class FooterMenu {
    static async verifyFooterElementsVisible(footer) {
        const elements = ['logo', 'hotel', 'airtickets', 'entryGuides', 'about'];
        const results = {};

        for (const element of elements) {
            results[element] = await footer.element(element).isVisible();
        }
        
        return results;
    }

    static async clickAllFooterLinks(footer) {
        const links = ['hotel', 'airtickets', 'entryGuides', 'about'];
        const results = {};

        for (const link of links) {
            try {
                await footer.element(link).click();
                results[link] = 'success';
                await footer.page.goBack();
            } catch (error) {
                results[link] = `error: ${error.message}`;
            }
        }

        return results;
    }
}

module.exports = { FooterMenu };