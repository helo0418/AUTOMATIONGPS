describe('Simulación de GPS con coordenadas dinámicas', () => {
  it('Debe mostrar coordenadas simuladas al hacer clic en el botón', () => {
    // Interceptamos la solicitud GET a la API de coordenadas
    cy.intercept('GET', '/api/coordenadas', (req) => {
      // Generamos coordenadas aleatorias
      const lat = parseFloat((Math.random() * (90 - (-90)) + (-90)).toFixed(5));
      const lng = parseFloat((Math.random() * (180 - (-180)) + (-180)).toFixed(5));

      // Respondemos con las coordenadas generadas
      req.reply({
        statusCode: 200,
        body: { lat, lng }
      });
    }).as('getCoordenadas');

    // Cargar el archivo HTML desde el servidor local
    cy.visit('http://127.0.0.1:8080/map2.html'); // Asegúrate de que el archivo esté en esta ruta

    // Hacer clic en el botón de "Enviar Coordenadas"
    cy.contains('Enviar Coordenadas').click();

    // Esperar a que la API de coordenadas se haya llamado
    cy.wait('@getCoordenadas');

    // Verificar que las coordenadas se muestran en la página
    cy.get('#coordenadas')
  .invoke('text')
  .should('match', /lat: -?\d{1,2}\.\d{5}, lng: -?\d{1,3}\.\d{5}/);

  });
});