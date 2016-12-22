import { PMFrontendPage } from './app.po';

describe('pm-frontend App', function() {
  let page: PMFrontendPage;

  beforeEach(() => {
    page = new PMFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
