import fetch from 'node-fetch';

export default function getPeople(id) {
  return fetch(`http://swapi.co/api/people/${id}/`)
    .then(res => res.json());
}
