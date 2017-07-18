import { Angular2withBarchartPage } from './app.po';

describe('angular2with-barchart App', () => {
  let page: Angular2withBarchartPage;

  beforeEach(() => {
    page = new Angular2withBarchartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
