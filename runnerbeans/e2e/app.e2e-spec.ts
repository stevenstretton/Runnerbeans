import { RunnerbeansPage } from './app.po';

describe('runnerbeans App', function() {
  let page: RunnerbeansPage;

  beforeEach(() => {
    page = new RunnerbeansPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
