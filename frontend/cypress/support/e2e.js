// Cypress support file (minimal)
// Ignore uncaught exceptions from the AUT so tests don't fail unexpectedly
if (typeof Cypress !== 'undefined' && Cypress.on) {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
}
