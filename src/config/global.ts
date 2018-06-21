const domain = 'https://api.opendota.com';

class Global {
  public static get accountId(): string {
    return localStorage.getItem('accountId') ? localStorage.getItem('accountId') : '';
  }
  public static set accountId(accountId: string) {
    localStorage.setItem('accountId', accountId);
  }
}

export default {
  domain,
  Global
}