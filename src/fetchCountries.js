const URL = 'https://restcountries.com/v3.1/name/';

const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export default function fetchCountries(name) {
  return fetch(`${URL}${name}?${searchParams}`).then(response =>
    response.json()
  );
}
