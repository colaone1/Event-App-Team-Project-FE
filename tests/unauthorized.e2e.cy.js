describe('Unauthorized Access', () => {
  it('redirects to /unauthorized when accessing /create while logged out', () => {
    cy.clearCookies();
    cy.visit('/create');
    cy.url().should('include', '/unauthorized');
    cy.contains('Access Denied');
  });
}); 