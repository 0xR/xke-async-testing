export /* @ngInject */ default function PeopleService(fetch) {
  this.getPeople = (id) =>
    fetch(`http://swapi.co/api/people/${id}/`)
      .then(res => res.json());
}
