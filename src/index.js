import debounce from '../node_modules/lodash.debounce';
import './sass/main.scss';
import getRefs from './get-refs';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css'
import countryCardTpl from './templates/countrycardTpl.hbs';
import countryListTpl from './templates/countryListTpl.hbs';

const refs = getRefs();

refs.searchform.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(e) {
  const form = e.target;
  const searchQuery = form.value;

  fetchCountry(searchQuery)
  .then(renderCountryCard)
  .catch(error => {
    alert('Error');
  })
  
}

function fetchCountry(countryName) {
  return fetch (
    `https://restcountries.eu/rest/v2/name/${countryName}`
    ).then(r => r.json());
}

function renderCountryCard(country) {
  if(country.length > 10) {
    alert({
      text: 'That`s too much! Type again!'
    });
    return;
  } else if(country.length === 1) {
    const cardMarkup = country.map(countryCardTpl).join('');
    refs.markup.innerHTML = cardMarkup;
    return;
  } else (country.length < 10) 
    const listMarkup = country.map(countryListTpl).join('');
    refs.markup.innerHTML = listMarkup;
    return;
}





// function renderCountryCard(country) {
//   const cardMarkup = country.map(countryCardTpl).join('');
//   refs.markup.innerHTML = cardMarkup;
//   console.log(country.length);
// }




