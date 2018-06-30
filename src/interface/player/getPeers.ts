import Axios from 'axios';

interface PlayerParams {
  account_id: number;
  included_account_id?: number[]
}

export default async function getPeers(params: PlayerParams): Promise<any> {
  const url = `https://api.opendota.com/api/players/${params.account_id}/peers`;
  return Axios.get(url, {
    params: {
      included_account_id: params.included_account_id
    }
  });
}