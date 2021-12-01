import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import MarkupCreator from './markup-creator';
import MoviesFetcher from './fetcher-class';
const container = document.getElementById('pagination');

const options = {
totalItems:500,
     itemsPerPage: 20,
     visiblePages: 5,
     page: 1,
     centerAlign: true,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
    template: {
        
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton: ({ type }) => {
             

            let lastPage = 500/20;
            let template = ' ';

            if (type === 'next') {
                template =
                  '<span>next</span>'
                
              }

              if (type === 'prev') {
                template =
                  '<span>prev</span>'
                
              }

              if (type === 'last') {
                template =
                  `<span class="inner-page-number">${lastPage}</span>`
                
              }



              if (type === 'first') {
                  
                template =
                  `<span class="inner-page-number">1</span>`
              }



        
            return template;
          },
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
     }
};
 const pagination = new Pagination(container, options);

const pageListEl = document.getElementById('pagination');
const movieLoad = new MoviesFetcher;
const markup = new MarkupCreator;
// pageListEl.addEventListener('click', switchPage)
// function switchPage(event) {
//     movieLoad.page = event.page
//     movieLoad.searchMovie()
// }
pagination.on('beforeMove', async evt => {
    movieLoad.page = evt.page;
    console.log(evt.page)
    const movies = await movieLoad.getTrending();
    markup.createMarkup(movies.results);
});
    let itemsQuantity;

    const init = async totalV => {
        if (totalV === undefined && !itemsQuantity) {
            itemsQuantity = await movieLoad.searchMovie();
        }

        if (totalV === undefined)  totalV = itemsQuantity.total_results; 

        pagination.setTotalItems(totalV);
        pagination.reset();
    }



// pagination.on('beforeMove', async evt => {
//     MoviesFetcher.page = evt.page;
//     const result = MoviesFetcher.searchMovie({ page });

//     let itemsQuantity;

    
    // export default {
    //     reset: init,
    // };
// })
