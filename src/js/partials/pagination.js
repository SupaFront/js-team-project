import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { MoviesFetcher } from './fetcher-class';

// var pagination2 = new Pagination(document.querySelector('#pagination'), {
//     totalItems: 500,
//     itemsPerPage: 20,
//     visiblePages: 5,
//     centerAlign: true,
//     lastItemClassName: 'last-child',
//     // firstItemClassName: '.is-hidden',
//     template: {
        
//         page: '<a href="#" data-page={{page}}><div class="inner-page-number">{{page}}</div></a>',
//         currentPage: '<span class="page">{{page}}</span>',
        

//         // moreButton:
//         // '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
//         //     '<span class="tui-ico-ellip">...</span>' +
//         // '</a>',
//         moveButton: ({type}) => {

//             let lastPage = 500/20;
//             let template = ' ';

//             if (type === 'next') {
//                 template =
//                   '<span>next</span>'
                
//               }

              
//             //   if (type === 'first') {
//             //     template =
//             //       '<span>first</span>'
                
//             //   }

//               if (type === 'prev') {
//                 template =
//                   '<span>prev</span>'
                
//               }

//             //   if (type === 'last') {
//             //     template =
//             //       <span class="inner-page-number">${lastPage}</span>
                
//             //   }



//               if (type === 'first') {
//                 //   if(true){}
//                 template = '<span class="inner-page-number">1</span>'
//               }



        
//             return template;
//           },

// }});






const container = document.getElementById('pagination');
const options = {

     itemsPerPage: 20,
     visiblePages: 50,
     page: 1,
     centerAlign: true,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
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

pagination.on('beforeMove', async evt => {
    MoviesFetcher.page = evt.page;
    const result = MoviesFetcher.searchMovie({ page });

    let itemsQuantity;

    const init = async totalV => {
        if (totalV === undefined && !itemsQuantity) {
            itemsQuantity = await MoviesFetcher.searchMovie();
        }

        if (totalV === undefined) { totalV = itemsQuantity.total_results; }

        pagination.setTotalItems(totalV);
        pagination.reset();
    };

    // export default {
    //     reset: init,
    // };
});