import axios from 'axios';

export class MoviesFetcher {
  #PRIVATE_KEY = '9b19f947fd56f1488a190c13578ec724';
  page = 1;
  baseUrl = 'https://api.themoviedb.org/3/';
  queue = '';

  constructor() {}

  composeGenresURL() {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.#PRIVATE_KEY}`;
  }
  composeMovieByIdURL(id) {
    return `${this.baseUrl}/movie/${id}?api_key=${this.#PRIVATE_KEY}`;
  }
  composeSearchURL() {
    return `${this.baseUrl}search/movie?api_key=${this.#PRIVATE_KEY}&query=${this.queue}&page=${
      this.page
    }`;
  }

  composeTrendingURL() {
    return `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.#PRIVATE_KEY}&page=${this.page}`;
  }

  async getTrending() {
    const movieArray = await axios.get(this.composeTrendingURL());
    await this.translateGenres(movieArray);
    return movieArray.data;
  }

  async searchMovie() {
    const movieArray = await axios.get(this.composeSearchURL());
    this.onEmptyQ(movieArray.data.results);
    await this.translateGenres(movieArray);
    return movieArray.data;
  }

  async openModal(id) {
    const movieArray = await axios.get(this.composeMovieByIdURL(id));
    return movieArray.data;
  }

  async translateGenres(movies) {
    const genres = await axios.get(this.composeGenresURL());
    movies.data.results.forEach(e => {
      const newGenres = [];
      genres.data.genres.forEach(ee => {
        e.genre_ids.forEach(e => {
          if (e == ee.id) {
            newGenres.push(ee.name);
          }
        });
      });
      e.okGenres = newGenres;
    });
  }

  //в local storage будет 2 объкта, получается 1 для q второй для watched и просто по ключу будем брать массив id и прогонять через эту функцию

  openLocalLib(ids) {
    ids.forEach(e => {
      axios.get(this.composeMovieById(e)).then(e => {});
    });
  }

  onEmptyQ(data) {
    if (data.length === 0) {
      throw new Error();
    }
  }
}

export default MoviesFetcher;

// instance.openLocalLib(ids);

// логика локал стореджа
// const ok = JSON.parse(localStorage.getItem('feedback-form-state'));

// ok.kek = 'sdsd';

// localStorage.setItem('feedback-form-state', JSON.stringify(ok));

// console.log(localStorage.getItem('feedback-form-state'));
