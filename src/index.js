import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
  divEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInputChange, 300));

function onInputChange() {
  if (refs.inputEl.value === '' || refs.inputEl.value === ' ') {
    return;
  }
  let value = refs.inputEl.value.trim();

  fetchCountries(value).then(filterCountry).catch(console.log);
}

function filterCountry(countries) {
  if (countries.length >= 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length >= 2 && countries.length < 10) {
    return renderCountries(countries);
  }
  if (countries.length > 0) {
    renderCountry(countries);
  }
}

function renderCountries(countries) {
  refs.divEl.innerHTML = '';

  countries.map(country => {
    const countriesElems = `
    <div class="countries">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="40"/>
        <span>${country.name.official}</span>
    </div>`;

    refs.divEl.insertAdjacentHTML('beforeend', countriesElems);
  });
}

function renderCountry(country) {
  refs.divEl.innerHTML = '';
  const lang = Object.values(country[0].languages);

  const countryElems = `
    <div class="country">
      <div class="country-head">
          <img src="${country[0].flags.svg}" alt="${
    country[0].name.official
  }" width="40" />
          <span class="country-name">${country[0].name.official}</span>
      </div>
      <ul class="country-list">
          <li class="country-item"><span class="country-item-span">Capital</span>: ${
            country[0].capital
          }</li>
          <li class="country-item"><span class="country-item-span">Population</span>: ${
            country[0].population
          }</li>
          <li class="country-item"><span class="country-item-span">Languages</span>: ${lang.join(
            ', '
          )}</li>
      </ul>
    </div>`;

  refs.divEl.insertAdjacentHTML('beforeend', countryElems);
}
