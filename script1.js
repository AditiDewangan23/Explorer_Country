
let countriesData = [];
let currentPage = 1;
const pageSize = 20;

let favorites = JSON.parse(localStorage.getItem("likedCountries")) || [];

async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    countriesData = await response.json();
    displayCountries();
    displayFavorites(); 
  } catch (error) {
    console.error('Error fetching country data:', error);
  }
}

function displayAutocomplete(filteredCountries) {
  const autocomplete = document.getElementById('autocomplete');
  autocomplete.innerHTML = ''; 

  const limitedCountries = filteredCountries.slice(0, 5); 
  limitedCountries.forEach(country => {
    const suggestion = document.createElement('div');
    suggestion.className = 'suggestion';
    suggestion.innerText = country.name.common;
    suggestion.onclick = () => {
      document.getElementById('search-bar').value = country.name.common;
      displayCountries([country]); 
      autocomplete.innerHTML = ''; 
    };
    autocomplete.appendChild(suggestion);
  });
}

document.getElementById('search-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = event.target.value.toLowerCase();
    const country = countriesData.find(country => country.name.common.toLowerCase() === query);
    currentPage = 1;

    if (country) {
      displayCountries([country]);
    } else {
      displayCountries([]); 
    }
  }
});
document.getElementById('search-bar').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  const filteredCountries = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(query)
  );

  displayCountries(filteredCountries); 
  displayAutocomplete(filteredCountries); 
});
function displayCountries(filteredCountries = countriesData) {
  const countryList = document.getElementById('country-list');
  countryList.innerHTML = ''; 

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

  paginatedCountries.forEach(country => {
    const countryCard = createCountryCard(country);
    countryList.appendChild(countryCard);
  });
}

function createCountryCard(country) {
  const countryCard = document.createElement('div');
  countryCard.className = 'country-card';

  countryCard.innerHTML = `
    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="80">
    <h4>${country.name.common}</h4>
    <span class="like-icon">${favorites.includes(country.name.common) ? '❤️' : '♡'}</span>
    <button class="details-button">➡️</button> <!-- Button with arrow emoji -->
  `;

  const detailsButton = countryCard.querySelector('.details-button');
  detailsButton.onclick = (event) => {
    event.stopPropagation(); 
    window.location.href = `detail.html?name=${encodeURIComponent(country.name.common)}`;
  };

  const likeIcon = countryCard.querySelector('.like-icon');
  likeIcon.onclick = (event) => {
    event.stopPropagation(); 
    toggleLike(country.name.common);
  };

  return countryCard;
}

function toggleLike(countryName) {
  if (favorites.includes(countryName)) {
    favorites = favorites.filter(fav => fav !== countryName);
  } else {
    if (favorites.length < 5) { 
      favorites.push(countryName);
    } else {
      alert("You can only add up to 5 favorites!"); 
    }
  }
  localStorage.setItem('likedCountries', JSON.stringify(favorites));
  displayCountries(); 
  displayFavorites(); 
}

function displayFavorites() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = ''; 

  favorites.forEach(countryName => {
    const country = countriesData.find(c => c.name.common === countryName);
    if (country) {
      const countryCard = createCountryCard(country);
      favoritesList.appendChild(countryCard);
    }
  });
}

document.getElementById('search-bar').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  const filteredCountries = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(query)
  );

  displayAutocomplete(filteredCountries); 

  if (event.key === 'Enter') {
    const country = countriesData.find(country => country.name.common.toLowerCase() === query);
    currentPage = 1; 

    if (country) {
      displayCountries([country]);
    } else {
      displayCountries([]); 
    }
  }
});

function displayAutocomplete(filteredCountries) {
  const autocomplete = document.getElementById('autocomplete');
  autocomplete.innerHTML = ''; 

  const limitedCountries = filteredCountries.slice(0, 5); 
  limitedCountries.forEach(country => {
    const suggestion = document.createElement('div');
    suggestion.className = 'suggestion';
    suggestion.innerText = country.name.common;
    suggestion.onclick = () => {
      document.getElementById('search-bar').value = country.name.common;
      displayCountries([country]); 
      autocomplete.innerHTML = ''; 
    };
    autocomplete.appendChild(suggestion);
  });
}

document.getElementById('region-filter').addEventListener('change', filterCountries);
document.getElementById('language-filter').addEventListener('input', filterCountries);

function filterCountries() {
  const region = document.getElementById('region-filter').value;
  const language = document.getElementById('language-filter').value.toLowerCase();
  currentPage = 1; 

  const filteredCountries = countriesData.filter(country => {
    const matchesRegion = !region || country.region === region;
    const matchesLanguage = !language || (country.languages && Object.values(country.languages).some(lang => lang.toLowerCase().includes(language)));
    return matchesRegion && matchesLanguage;
  });

  displayCountries(filteredCountries);
}

document.getElementById('show-more').addEventListener('click', () => {
  currentPage++;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCountries = countriesData.slice(startIndex, endIndex);

  const countryList = document.getElementById('country-list');
  paginatedCountries.forEach(country => {
    const countryCard = createCountryCard(country);
    countryList.appendChild(countryCard);
  });

  if (endIndex >= countriesData.length) {
    document.getElementById('show-more').style.display = 'none';
  }
});

document.getElementById('search-bar').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  const filteredCountries = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(query)
  );

  displayCountries(filteredCountries);
  displayAutocomplete(filteredCountries);

  document.getElementById('show-more').style.display = 'none';

  if (filteredCountries.length > pageSize) {
    document.getElementById('show-more').style.display = 'block'; 
  }
});

document.getElementById('region-filter').addEventListener('change', filterCountries);
document.getElementById('language-filter').addEventListener('input', filterCountries);

function filterCountries() {
  const region = document.getElementById('region-filter').value;
  const language = document.getElementById('language-filter').value.toLowerCase();
  currentPage = 1; 

  const filteredCountries = countriesData.filter(country => {
    const matchesRegion = !region || country.region === region;
    const matchesLanguage = !language || (country.languages && Object.values(country.languages).some(lang => lang.toLowerCase().includes(language)));
    return matchesRegion && matchesLanguage;
  });

  displayCountries(filteredCountries);

  document.getElementById('show-more').style.display = 'none';

  if (filteredCountries.length > pageSize) {
    document.getElementById('show-more').style.display = 'block';
  }
}

function displayCountries(filteredCountries = countriesData) {
  const countryList = document.getElementById('country-list');
  countryList.innerHTML = ''; 


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

 
  paginatedCountries.forEach(country => {
    const countryCard = createCountryCard(country);
    countryList.appendChild(countryCard);
  });

  if (endIndex >= filteredCountries.length) {
    document.getElementById('show-more').style.display = 'none';
  } else {
    document.getElementById('show-more').style.display = 'block'; 
  }
}

fetchCountries();
