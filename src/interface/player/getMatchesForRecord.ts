import Axios from 'axios';

export interface PlayerMatchRecordParams {
  account_id: number;
  sort: string;
  limit?: number
}

export default async function getRecord(params: PlayerMatchRecordParams): Promise<any> {
  const url = `https://api.opendota.com/api/players/${params.account_id}/matches`;
  return Axios.get(url, {
    params: {
      sort: params.sort,
      limit: params.limit ? params.limit : 1
    }
  });
}