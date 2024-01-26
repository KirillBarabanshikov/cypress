describe('Testing sauce', () => {
    beforeEach(() => {
        cy.setCookie('session-username', 'standard_user');
        cy.visit('https://www.saucedemo.com/');
    });

    it('Visit site', () => {
        cy.visit('https://www.saucedemo.com/');
    });

    it('Authorization', () => {
        const username = 'standard_user';
        const password = 'secret_sauce';

        cy.visit('https://www.saucedemo.com/');
        cy.get('input[data-test="username"]').type(username).should('have.value', username);
        cy.get('input[data-test="password"]').type(password).should('have.value', password);
        cy.get('input[data-test="login-button"]').click();
    });

    it('Check the filtering of products', () => {
        cy.visit('https://www.saucedemo.com/inventory.html', {
            failOnStatusCode: false,
        });
        cy.get('select[data-test="product_sort_container"]').select('za');
        cy.get('select[data-test="product_sort_container"]').select('hilo');
        cy.get('select[data-test="product_sort_container"]').select('lohi');
        cy.get('select[data-test="product_sort_container"]').select('az');
    });

    it('Add an product to the shopping cart', () => {
        cy.visit('https://www.saucedemo.com/inventory.html', {
            failOnStatusCode: false,
        });
        cy.get('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });

    it('Check the product to the cart', () => {
        cy.visit('https://www.saucedemo.com/inventory.html', {
            failOnStatusCode: false,
        });
        localStorage.setItem('cart-contents', '[4]');
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').should('have.length', 1);
    });

    it('Logout', () => {
        cy.visit('https://www.saucedemo.com/inventory.html', {
            failOnStatusCode: false
        });
        cy.get('#react-burger-menu-btn').click();
        cy.contains('Logout').click();
    });
});
