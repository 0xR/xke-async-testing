import fetch from 'node-fetch';

export default function getPeople(id) {
  return (dispatch) =>
    fetch(`http://swapi.co/api/people/${id}/`)
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: 'GOT_PERSON',
        person: json,
      });
    });
}
