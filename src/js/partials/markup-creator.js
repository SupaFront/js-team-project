class MarkupCreator {
  constructor(area, template, fetcher) {
    this.area = area;
    this.template = template;
    this.fetcher = fetcher;
  }

  createMarkup(position, items) {
    this.area.insertAdjacentHTML(position, this.template(items));
  }

  clearMarkup() {
    this.area.innerHTML = '';
    this.fetcher.page = 1;
  }
}

export default MarkupCreator;
