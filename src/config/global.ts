const domain = 'https://api.opendota.com';
const valveDomain = 'https://api.steampowered.com';

class Global {
  public static get accountId(): string {
    return localStorage.getItem('accountId') ? localStorage.getItem('accountId') : '';
  }
  public static set accountId(accountId: string) {
    localStorage.setItem('accountId', accountId);
  }

  public static get matchId(): string {
    return localStorage.getItem('matchId') ? localStorage.getItem('matchId') : '';
  }
  public static set matchId(matchId: string) {
    localStorage.setItem('matchId', matchId);
  }

  public static tabActive: number = 0;
}

export default {
  domain,
  Global,
  valveDomain,
}