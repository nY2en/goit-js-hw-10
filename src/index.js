import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
let searchQuerry = '';

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  searchQuerry = e.target.value.trim();

  if (!searchQuerry) {
    resetUlContent();
    resetCardContent();
    return;
  }

  fetchCountries(searchQuerry)
    .then(data => {
      if (!searchQuerry) {
        resetUlContent();

        return;
      }

      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );

        return;
      }

      if (data.length !== 1) {
        resetCardContent();
        refs.countriesList.innerHTML = createListMarkup(data);
        

        return;
      }


      resetUlContent();
      refs.countryInfo.innerHTML = createCardMarkup(data);
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function createListMarkup(array) {
  return array
    .map(
      el => `<li class="country-list__item">
            <img src="${el.flags.svg}" width="40" height="20"alt="">
            <p class="country_list__title">${el.name.official}</p>
           </li>`
    )
    .join('');
}

function createCardMarkup(array) {
  return array
    .map(
      el => `<img src="${el.flags.svg}" width="40" height="20"alt="">
              <h1 style="display:inline;">${el.name.common}</h1>
              <p>Capital: ${el.capital}</p>
              <p>Population: ${el.population}</p>
              <p>Languages: ${Object.values(el.languages).join(' ')} </p>`
    )
    .join('');
}

function resetUlContent() {
  refs.countriesList.innerHTML = '';
}

function resetCardContent() {
  refs.countryInfo.innerHTML = '';
}
