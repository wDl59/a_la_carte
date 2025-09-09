class HeaderMenu {
    static async verifyHeaderElementsVisible(header) {
        const elements = ['logo', 'hotel', 'airtickets', 'entryGuides', 'about', 'enter'];
        const results = {};

        for (const element of elements) {
            results[element] = await header.element(element).isVisible();
        }
        
        return results;
    }

    static async clickAllHeaderLinks(header) {
        const links = ['hotel', 'airtickets', 'entryGuides', 'about'];
        const results = {};

        for (const link of links) {
            try {
                await header.element(link).click();
                results[link] = 'success';
                await header.page.goBack();
            } catch (error) {
                results[link] = `error: ${error.message}`;
            }
        }

        return results;
    }
}

module.exports = { HeaderMenu };