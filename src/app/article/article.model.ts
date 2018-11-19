export class Article {
  constructor(
    public title: string,
    public link: string,
    public votes?: number
  ){
    this.votes = votes || 0;
  };

  voteUp(): void {
    this.votes += 1;
  }

  voteDown(): void {
    this.votes -= 1;
  }

  domain(): string {
    try {
      // e.g. http://foo.com/path/to/bar
      const domainAndPath: string = this.link.split('//')[1];
      // e.g. foo.com/path/to/bar
      return domainAndPath.split('/')[0];
    }
    catch (err) {
      return 'shoot!';
    }
  }
}
