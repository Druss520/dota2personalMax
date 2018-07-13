import Axios from 'axios';

interface PlayerParams {
  account_id: number;
}

const url = 'https://api.opendota.com/api/players/';

export default async function getPlayer(params: PlayerParams): Promise<any> {
  const reqUrl = url + params.account_id;
  return Axios.get(reqUrl);
}