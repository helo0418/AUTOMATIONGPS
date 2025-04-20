import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 },  // Fase inicial con 50 usuarios
    { duration: '1m', target: 100 },  // Aumentar a 100 usuarios
    { duration: '1m', target: 200 },  // Aumentar a 200 usuarios
    { duration: '1m', target: 500 },  // Aumentar a 500 usuarios
    { duration: '30s', target: 0 },   // Reducir la carga gradualmente
  ],
};

export default function () {
  // Simulando el envío de coordenadas GPS (puedes cambiar las coordenadas por las reales)
  let coordinates = {
    latitude: 19.432608, // Ejemplo: coordenada de Ciudad de México
    longitude: -99.133209,
  };

  let res = http.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(coordinates), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'respuesta es 200': (r) => r.status === 200,
    'tiempo de respuesta es menor a 500ms': (r) => r.timings.duration < 500,
  });
}
