import Axios from 'axios';

interface PlayerParams {
  account_id: number;
}

export default async function getPeers(params: PlayerParams): Promise<any> {
  const url = `https://api.opendota.com/api/players/${params.account_id}/peers`;
  return Axios.get(url);
}