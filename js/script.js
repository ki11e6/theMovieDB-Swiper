//building a router
const global = {
  currentPage: window.location.pathname,
};

//fetch data from api
async function fetchApiData(endpoint) {
  const API_KEY = '11a4948741e9c8b773fa0ab01a719418';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

//display 20 popular movies
async function displayPopularMovies() {
  const { results } = await fetchApiData('movie/popular');
  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement('div');
    // Logical Assignment (||=) This will assigns the right side value only if the left is a falsy value.
    let img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img ||= 'images/no-image.jpg';
    div.classList.add('card');
    div.innerHTML = `
    
    <a href="movie-details.html?id=${movie.id}">
      <img src=${img} class="card-img-top" alt=${movie.title} />
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release:${movie.release_date}</small>
      </p>
    </div>
 
    `;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

//display 20 most popular tv shows
async function displayPopularShows() {
  const { results } = await fetchApiData('tv/popular');
  console.log(results);

  results.forEach((show) => {
    const div = document.createElement('div');
    // Logical Assignment (||=) This will assigns the right side value only if the left is a falsy value.
    let img = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
    img ||= 'images/no-image.jpg';
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=1">
      <img src=${img} class="card-img-top" alt=${show.name} />
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Aired: ${show.first_air_date}</small>
      </p>
    </div>
   
      `;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

//spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//highlight active links
function highlightActiveLinks() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html': {
      console.log('Home');
      displayPopularMovies();
      break;
    }
    case '/shows.html': {
      console.log('Shows');
      displayPopularShows();
      break;
    }
    case '/movie-details.html': {
      console.log('Movie Details');
      break;
    }
    case '/tv-details.html': {
      console.log('TV Details');
      break;
    }
    case '/search.html': {
      console.log('Search');
      break;
    }
  }
  highlightActiveLinks();
}

document.addEventListener('DOMContentLoaded', init);
