function fetchCountry(countryName) {
    return fetch (
      `https://restcountries.eu/rest/v2/name/${countryName}`
      ).then(r => r.json());
  }

  export default { fetchCountry };