import { FbloginherePage } from './app.po';

describe('fbloginhere App', () => {
  let page: FbloginherePage;

  beforeEach(() => {
    page = new FbloginherePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
