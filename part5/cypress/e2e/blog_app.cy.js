describe('Blog App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user1 = {
      name: 'Daniel Nguyen',
      username: 'noobat',
      password: '123456',
    };

    const user2 = {
      name: 'MK Good',
      username: 'saul',
      password: '123456',
    };

    cy.request('POST', 'http://localhost:3003/api/users', user1);
    cy.request('POST', 'http://localhost:3003/api/users', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('log in to application');
    cy.contains('Username');
    cy.contains('Password');
    cy.get('button').contains('Login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('noobat');
      cy.get('#password').type('123456');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should('have.css', 'border', '3px solid rgb(0, 128, 0)')
        .find('p')
        .should('contain', 'user Daniel Nguyen logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials with an appropriate notification', () => {
      cy.get('#username').type('noobat');
      cy.get('#password').type('wrong password');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should('have.css', 'border', '3px solid rgb(255, 0, 0)')
        .find('p')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'noobat', password: '123456' });
    });

    it('A blog can be created', () => {
      cy.contains('create new blog').click();

      cy.get('#title').type('create blog cypress...');
      cy.get('#author').type('Anonymous');
      cy.get('#url').type('https://docs.cypress.io');
      cy.get('#create-blog').click();

      cy.get('.notification')
        .should('have.css', 'border', '3px solid rgb(0, 128, 0)')
        .find('p')
        .should('contain', 'a new blog create blog cypress... by Anonymous added')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains('create blog cypress... Anonymous');
    });

    describe('and if a blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'another blog cypress...',
          author: 'Anonymous',
          url: 'https://docs.cypress.io',
        });
      });

      it('the blog can be viewed with more infomation', () => {
        cy.get('.defaultView').find('button').as('viewButton');
        cy.get('@viewButton').click();

        cy.get('.toggledView')
          .should('contain', 'https://docs.cypress.io')
          .and('contain', 'likes 0')
          .and('contain', 'Daniel Nguyen')
          .and('contain', 'remove');
      });

      it('users can like the blog', () => {
        cy.get('.defaultView').find('button').as('viewButton');
        cy.get('@viewButton').click();
        cy.get('.toggledView').contains('like').as('likeButton');
        cy.get('@likeButton').click();
        cy.contains('likes 1');

        // use a different user to like that same blog
        cy.login({ username: 'saul', password: '123456' });
        cy.get('@viewButton').click();
        cy.contains('likes 1');
        cy.get('@likeButton').click();
        cy.contains('likes 2');
      });

      it('only owner of the blog can delete it', () => {
        cy.contains('Daniel Nguyen logged in');

        cy.get('.defaultView').find('button').as('viewButton');
        cy.get('@viewButton').click();

        cy.get('#blog-owner').contains('Daniel Nguyen');
        cy.get('#delete-button').should('exist');
      });

      it("not owner of the blog can't delete it", () => {
        cy.login({ username: 'saul', password: '123456' });
        cy.contains('MK Good logged in');

        cy.get('.defaultView').find('button').as('viewButton');
        cy.get('@viewButton').click();

        cy.get('#blog-owner').contains('Daniel Nguyen');
        cy.get('#delete-button').should('not.exist');
      });
    });

    describe('and if several blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'blog with the most likes',
          author: 'Anonymous',
          url: 'https://docs.cypress.io',
          likes: 3,
        });
        cy.createBlog({
          title: 'blog with the second most likes',
          author: 'Anonymous',
          url: 'https://docs.cypress.io',
          likes: 2,
        });
        cy.createBlog({
          title: 'blog with the least likes',
          author: 'Anonymous',
          url: 'https://docs.cypress.io',
          likes: 1,
        });
      });

      it('then the blogs are arranged from the least to the most likes', () => {
        cy.get('.blog').eq(0).should('contain', 'blog with the least likes Anonymous');
        cy.get('.blog').eq(1).should('contain', 'blog with the second most likes Anonymous');
        cy.get('.blog').eq(2).should('contain', 'blog with the most likes Anonymous');
      });

      it('if the likes of a blog changes then the order is reconsidered', () => {
        cy.get('.blog').eq(0).find('.defaultView').find('button')
          .click();
        cy.get('.blog').eq(0).find('#like-button').as('leastLikeButton');

        cy.get('@leastLikeButton').click();
        cy.get('.blog').eq(0).find('.toggledView').find('.blogLikes')
          .should('contain', 'likes 2');
        cy.get('@leastLikeButton').click();
        cy.get('.blog').eq(0).find('.toggledView').find('.blogLikes')
          .should('contain', 'likes 3');

        cy.get('.blog').eq(0).should('contain', 'blog with the second most likes Anonymous');
        cy.get('.blog').eq(1).should('contain', 'blog with the least likes Anonymous');
        cy.get('.blog').eq(2).should('contain', 'blog with the most likes Anonymous');
      });
    });
  });
});
