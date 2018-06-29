import Axios from 'axios';

interface PlayerParams {
  account_id: number;
}

export default async function getTotals(params: PlayerParams): Promise<any> {
  const url = `https://api.opendota.com/api/players/${params.account_id}/totals`;
  return Axios.get(url);
}