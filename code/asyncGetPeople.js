import fetch from 'node-fetch';

export default async function asyncGetPeople(id) {
  const res = await fetch(`http://swapi.co/api/people/${id}/`);
  return res.json();
}
