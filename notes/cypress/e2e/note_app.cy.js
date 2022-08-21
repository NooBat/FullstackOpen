describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Daniel Nguyen',
      username: 'noobat',
      password: '123456',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Notes');
    cy.contains('Note App, Department of Computer Science, University of Helsinki 2022');
  });

  it('user can log in', () => {
    cy.contains('log in').click();

    cy.get('#username').type('noobat');
    cy.get('#password').type('123456');
    cy.get('#login-button').click();

    cy.contains('Daniel Nguyen logged in');
  });

  it('log in failed with wrong username or password', () => {
    cy.contains('log in').click();

    cy.get('#username').type('noobat');
    cy.get('#password').type('wrong password');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Daniel Nguyen logged in');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'noobat', password: '123456' });
    });

    it('a new note can be created', () => {
      cy.contains('new note').click();
      cy.get('#note').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and if a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'another note cypress',
          important: false,
        });
      });

      it('it can be made important', () => {
        cy.contains('another note cypress').parent().contains('make important').click();
      });
    });

    describe('and if several notes exist', () => {
      beforeEach(() => {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', () => {
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});
