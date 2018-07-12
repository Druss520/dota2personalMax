import Axios from 'axios';
import getApiDataFromCache from '../../utils/getApiDataFromCache';

interface PlayerParams {
  account_id: number;
}

export default async function getTotals(params: PlayerParams): Promise<any> {
  const url = `https://api.opendota.com/api/players/${params.account_id}/totals`;
  return await getApiDataFromCache(url).then((data) => {
    if (data) {
      const obj = Object.assign({}, {
        data: data
      });
      return Promise.resolve(obj);
    } else {
      return Axios.get(url);
    }
  })
}