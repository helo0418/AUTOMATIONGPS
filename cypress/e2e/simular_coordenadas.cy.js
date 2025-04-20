describe('Simulación de GPS con intercept', () => {
  it('Debe mostrar coordenadas simuladas al hacer clic en el botón', () => {
    cy.intercept('GET', '/api/coordenadas', {
      statusCode: 200,
      body: {
        lat: 4.60971,
        lng: -74.08175
      }
    }).as('getCoordenadas');

    cy.visit('http://127.0.0.1:8080/mapa.html');

    cy.contains('Enviar coordenadas').click();

    cy.wait('@getCoordenadas');

    cy.get('#coordenadas').should('contain', 'lat: 4.60971');
  });
});
