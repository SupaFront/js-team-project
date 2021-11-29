import MoviesFetcher from './fetcher-class';

const searchBtnRef = document.querySelector('.btn');
const userQuery = document.querySelector('input');
const formRef = document.querySelector('form');

const fetcherInstance = new MoviesFetcher();

formRef.addEventListener('submit', e => {
  e.preventDefault();
  fetcherInstance.queue = userQuery.value;
  userQuery.value = '';
  searchMovies();
});

fetcherInstance.openModal(312132);

async function searchMovies() {
  const arr = await fetcherInstance.getTrending();
  //   console.log(arr);
  // дальше рисовать маркап по этому объекту
}
