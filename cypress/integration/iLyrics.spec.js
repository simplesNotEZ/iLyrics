describe('iLyrics App', function() {
    it('Main-page functionality', function() {
        cy.visit("https://ilyrics-958ef.firebaseapp.com/lyrics.html")
        //'Test 1: Links to iTunes'
        cy.get('a').eq(0).should("have.attr", 'href', "index.html")
        cy.get('a').eq(1).should("have.attr", 'href', "https://www.apple.com/itunes/")
        //.click().url().should('eq', 'https://www.apple.com/itunes/')
        //'Test 2: Artist Label'
        cy.get('label').eq(0).contains("Artist")
        //'Test 3: Artist Input'
        cy.get('input').eq(0).prevAll().should("have.text", "Artist:")
        cy.get('input').eq(0).type("Sample Artist")
        //'Test 4: Get Albums button w/ click functionality--Dropdown Menu'
        cy.get('button').eq(0).should("have.text", "Get Albums").click().get('select').eq(0).children().its("length").should("be.gt", 0)
        //'Test 5: Get Songs button w/ click functionality--Dropdown Menu'
        cy.get('button').eq(1).should('have.text', 'Get Songs').click().get('select').eq(1).children().its("length").should("be.gt", 0)
        //'Test 6: Album Input'
        cy.get('input').eq(1).prevAll().eq(0).should("have.text", "Or enter an album name:")
        //'Test 7: Get Album Songs button w/ click functionality--Dropdown Menu'
            //Re-visiting the page in order to reset/reload the page so that previous click functionality is cleared
        cy.visit("https://ilyrics-958ef.firebaseapp.com/lyrics.html")
        cy.get('button').eq(2).should('have.text', 'Get Album Songs').click()
        cy.get('input').eq(0).type("Agent Orange")
        cy.get('button').eq(2).click()
        cy.get('input').eq(1).type("Living in Darkness")
        cy.get('button').eq(2).click().get('select').eq(1).children().its("length").should("be.gt", 0)
        //'Test 8: Song Input'
            //Re-visiting the page in order to reset/reload the page so that previous click functionality is cleared
        cy.visit("https://ilyrics-958ef.firebaseapp.com/lyrics.html")
        cy.get('input').eq(2).prevAll().eq(0).should("have.text", "Or enter a song name:")
        //'Test 9: Find Song button'
            //Re-visiting the page in order to reset/reload the page so that previous click functionality is cleared
        cy.visit("https://ilyrics-958ef.firebaseapp.com/lyrics.html")
        cy.get('button').eq(3).should("have.text", 'Find Song').click().get('input').eq(2).should('have.attr', 'placeholder', 'You must enter a song title or select one first!')
        cy.get('input').eq(0).type("Agent Orange")
        cy.get('input').eq(2).type("Bloodstains")
        cy.get('button').eq(3).click()
        cy.get('#gotSongParagraph').contains("iTunes has")
        //'Test 10: Get Lyrics button'
        cy.get('input').eq(0).type("Agent Orange")
        cy.get('button').eq(4).should("have.text", "Get Lyrics").click()
        cy.get('#songTitle').should("have.text", "Bloodstains")
        //'Test 11: Reset button'
        cy.get('input').eq(3).should('have.attr', 'value', 'Reset').click()
        cy.get('input').eq(0).should("be.empty")
        cy.get('#albumDropdownElement').should('not.have.attr', 'value')
        cy.get('input').eq(1).should("be.empty")
        cy.get('#songsDropdownElement').should('not.have.attr', 'value')
        cy.get('input').eq(2).should("be.empty")
        //'Test 12: Does not have song'
            //Re-visiting the page in order to reset/reload the page so that previous click functionality is cleared
        cy.visit("https://ilyrics-958ef.firebaseapp.com/lyrics.html")
        cy.get('input').eq(0).type("Agent Orange")
        cy.get('input').eq(2).type("yyy")
        cy.get('button').eq(3).click()
        cy.get('#gotSongParagraph').contains("Shoot")
        
    })
})
