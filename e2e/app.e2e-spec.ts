import { ClientRestaurantePage } from './app.po';

describe('client-restaurante App', function() {
  let page: ClientRestaurantePage;

  beforeEach(() => {
    page = new ClientRestaurantePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
