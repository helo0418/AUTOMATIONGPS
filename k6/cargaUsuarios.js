import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

// Definimos el número de usuarios virtuales y la duración de la prueba
export let options = {
  vus: 10, // Número de usuarios virtuales
  duration: '30s', // Duración de la prueba
};

export default function () {
  // Realizamos una solicitud GET al endpoint de posts
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  // Verificamos que la respuesta tenga un código de estado 200
  check(res, {
    'status es 200': (r) => r.status === 200,
    'tamaño de la respuesta es mayor a 0': (r) => r.body.length > 0,
  });

  // Agregamos un retraso de 1 segundo entre las solicitudes
  sleep(1);
}
