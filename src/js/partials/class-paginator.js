import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
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
          let lastPage = hits / 20;
          let template = ' ';

          if (type === 'next') {
            template = '<span>next</span>';
          }

          if (type === 'prev') {
            template = '<span>prev</span>';
          }

          if (type === 'last') {
            template = `<span class="inner-page-number">${lastPage}</span>`;
          }

          if (type === 'first') {
            template = `<span class="inner-page-number">1</span>`;
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
          '</a>',
      },
    }).on('beforeMove', async evt => {
      this.markup.clearMarkup();
      this.fetcher.page = evt.page;
      console.log(evt.page);
      const movies = await this.fetcher.getTrending();
      console.log(movies);
      this.markup.createMarkup('beforeend', movies.results);
    });
  }

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
          let lastPage = hits / 20;
          let template = ' ';

          if (type === 'next') {
            template = '<span>next</span>';
          }

          if (type === 'prev') {
            template = '<span>prev</span>';
          }

          if (type === 'last') {
            template = `<span class="inner-page-number">${lastPage}</span>`;
          }

          if (type === 'first') {
            template = `<span class="inner-page-number">1</span>`;
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
            template = '<span>next</span>';
          }

          if (type === 'prev') {
            template = '<span>prev</span>';
          }

          if (type === 'last') {
            template = `<span class="inner-page-number">${lastPage}</span>`;
          }

          if (type === 'first') {
            template = `<span class="inner-page-number">1</span>`;
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
          '</a>',
      },
    }).on('beforeMove', async evt => {
      console.log(this.q);
      let perPage = evt.page * 20;
      this.markup.clearMarkup();
      const arr = [];
      for (let i = perPage - 20; i < perPage; i++) {
        if (load(this.q)[i] !== undefined) {
          arr.push(load(this.q)[i]);
        }
      }
      this.markup.createMarkup('beforeend', arr);
    });
  }
}

export default Paginator;
