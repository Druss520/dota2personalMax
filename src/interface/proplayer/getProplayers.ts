import Axios from 'axios';

const url = 'https://api.opendota.com/api/proPlayers';

export default async function getHeroStats(): Promise<any> {
  return Axios.get(url);
}