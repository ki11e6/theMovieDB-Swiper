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
  try {
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
  } catch (e) {
    console.log('Error:', e.message);
  }
}

//display 20 most popular tv shows
async function displayPopularShows() {
  const { results } = await fetchApiData('tv/top_rated');
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

//movie details
async function getMovieDetails() {
  try {
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchApiData(`movie/${movieId}`);
    console.log(movie);
    const div = document.querySelector('#movie-details');
    let img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img ||= 'images/no-image.jpg';
    div.innerHTML = `
    <div class="details-top">
        <div>
          <img src=${img} class="card-img-top" alt=${movie.title} />
        </div>
        <div>
          <h2>${movie.title} </h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toPrecision(2)} / 10
          </p>
          <p class="text-muted">Release Date: ${movie.release_date}</p>
          <p>
            ${movie.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
          ${movie.genres.map((g) => `<li>${g.name}</li>`).join('')}
          </ul>
          <a href=${
            movie.homepage
          } target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
            movie.budget
          )}</li>
          <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
            movie.revenue
          )}</li>
          <li><span class="text-secondary">Runtime:</span> ${
            movie.runtime
          } minutes</li>
          <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${movie.production_companies
          .map((c) => `<span>${c.name}</span>`)
          .join(', ')}</div>
      </div>
    `;
  } catch (e) {
    console.log(e);
  }
}
//add commas
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      getMovieDetails();
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
