import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

import { load } from './local-storage-functions';

class Paginator {
  constructor(container, markup, fetcher, q) {
    this.container = container;
    this.markup = markup;
    this.fetcher = fetcher;
    this.q = q;
  }

  paginateTrending(hits) {
    new Pagination(this.container, {
      totalItems: hits,
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

             

            let lastPage = hits/20;
            let template = ' ';

            if (type === 'next') {
                template =
                  '<span id="next" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
              }

              
            //   if (type === 'first') {
            //     template =
            //       '<span>first</span>'
                
            //   }

              if (type === 'prev') {
                template =
                  '<span class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
              }

              // if (type === 'last') {
              //   template =
              //     `<span class="inner-page-number">${lastPage}</span>`
                
              // }



              // if (type === 'first') {
              //     if(true){}
              //   template =
              //     `<span class="inner-page-number">1</span>`
              // }



        
            return template;
          },
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 `<span class="tui-ico-ellip">...</span>` +
             '</a>'
     }
}).on('beforeMove', async evt => {
            this.markup.clearMarkup();
            this.fetcher.page = evt.page;
            
            const movies = await this.fetcher.getTrending();
            
    this.markup.createMarkup('beforeend', movies.results);
    window.scrollTo(0, 200);

        });
    }


  //   paginateSearch(hits) {
  //       new Pagination(this.container, {
  //           totalItems: hits,
  //           itemsPerPage: 20,
  //           visiblePages: 5,
  //           page: 1,
  //           centerAlign: true,
  //           firstItemClassName: 'tui-first-child',
  //           lastItemClassName: 'tui-last-child',
  //           template: {
        
  //               page: '<a href="#" class="tui-page-btn">{{page}}</a>',
  //               currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
  //               moveButton: ({ type }) => {
             
  //         let lastPage = hits / 20;
  //         let template = ' ';

  //           if (type === 'next') {
  //               template =
  //                 '<span id="next" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
  //             }

              
  //           //   if (type === 'first') {
  //           //     template =
  //           //       '<span>first</span>'
                
  //           //   }

  //             if (type === 'prev') {
  //               template =
  //                 '<span class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
  //             }

  //             if (type === 'last') {
  //               template =
  //                 `<span class="inner-page-number">${lastPage}</span>`
                
  //             }



  //             if (type === 'first') {
  //                 if(true){}
  //               template =
  //                 `<span class="inner-page-number">1</span>`
  //             }



        
  //           return template;
  //         },
  //       disabledMoveButton:
  //         '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
  //         '<span class="tui-ico-{{type}}">{{type}}</span>' +
  //         '</span>',
  //       moreButton:
  //         '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
  //         '<span class="tui-ico-ellip">...</span>' +
  //         '</a>',
  //     },
  //   }).on('beforeMove', async evt => {
  //     this.markup.clearMarkup();
  //     this.fetcher.page = evt.page;
  //     console.log(evt.page);
  //     const movies = await this.fetcher.getTrending();
  //     console.log(movies);
  //     this.markup.createMarkup('beforeend', movies.results);
  //   });
  // }

  paginateSearch(hits) {
    new Pagination(this.container, {
      totalItems: hits,
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

             

            let lastPage = hits/20;
            let template = ' ';

            if (type === 'next') {
                template =
                  '<span id="next" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
              }

              
            //   if (type === 'first') {
            //     template =
            //       '<span>first</span>'
                
            //   }

              if (type === 'prev') {
                template =
                  '<span class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
              }

              // if (type === 'last') {
              //   template =
              //     `<span class="inner-page-number">${lastPage}</span>`
                
              // }



              // if (type === 'first') {
              //     if(true){}
              //   template =
              //     `<span class="inner-page-number">1</span>`
              // }



        
            return template;
          },
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    }).on('beforeMove', async evt => {
      this.markup.clearMarkup();
      this.fetcher.page = evt.page;
      console.log(evt.page);
      const movies = await this.fetcher.searchMovie();
      console.log(movies);
      this.markup.createMarkup('beforeend', movies.results);
    });
  }

  paginateLib(hits) {
    new Pagination(this.container, {
      totalItems: hits,
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
          let lastPage = hits / 20;
          let template = ' ';

            if (type === 'next') {
                template =
                  '<span id="next" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
              }

              
            //   if (type === 'first') {
            //     template =
            //       '<span>first</span>'
                
            //   }

              if (type === 'prev') {
                template =
                  '<span class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
              }

              // if (type === 'last') {
              //   template =
              //     `<span class="inner-page-number">${lastPage}</span>`
                
              // }



              // if (type === 'first') {
              //     if(true){}
              //   template =
              //     `<span class="inner-page-number">1</span>`
              // }



        
            return template;
          },
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    }).on('beforeMove', async evt => {
      
      let perPage = evt.page * 20;
      this.markup.clearMarkup();
      const arr = [];
      for (let i = perPage - 20; i < perPage; i++) {
        if (load(this.q)[i] !== undefined) {
          arr.push(load(this.q)[i]);
        }
      }
        this.markup.createMarkup('beforeend', arr);
        window.scrollTo(0, 200);
    });
  }

}

export default Paginator;
