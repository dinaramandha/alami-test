describe('Scenario for Amazon Wesite', () => {
    const amazonUrl = Cypress.config('amazonUrl')
    it('Verify content on Homepage', () => {
        cy.visit(`${amazonUrl}`) 

        cy.get("a#nav-link-accountList>span.nav-line-2").then($el => {
            expect($el.text()).eq('Account & Lists\n  ')
        })
        
    })

    it('Verify search computer keyword on searchbar', () => {
        cy.get('#twotabsearchtextbox').type('computer').wait(2000).type('{enter}');
    })

    it('Verify filter by Dell brand', () => {
        cy.get('#brandsRefinements [type=checkbox]').first().check({force: true})
    })

    it('Verify add to cart Dell Optiplex 9010', () => {
        cy.get('.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style>h2>a').each(($el, index) => {
            if ($el.text().includes('Dell Optiplex 9010 Desktop Computer')) {
                cy.log($el.text())
                cy.log($el.attr('href'))
                cy.visit(`${amazonUrl}${$el.attr('href')}`)
                cy.wait(1000)
                cy.get('select#quantity').select("2", {force: true})
                cy.wait(1000)
                cy.get('input#add-to-cart-button').trigger('click')
                cy.wait(2000)
        
            }
        })
    })
})