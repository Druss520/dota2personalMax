import Axios from 'axios';

interface PlayerParams {
  account_id: number;
}

const url = 'https://api.opendota.com/api/players/';

export async function getPlayer(params: PlayerParams): Promise<any> {
  return Axios.get(url + params.account_id);
}