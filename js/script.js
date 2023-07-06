//building a router
const global = {
  currentPage: window.location.pathname,
};

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

//fetch data from api
async function fetchApiData(endpoint) {
  const API_KEY = '11a4948741e9c8b773fa0ab01a719418';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  return data;
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

//highlight active links
function highlightActiveLinks() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
