import Axios from 'axios';
import getApiDataFromCache from '../../utils/getApiDataFromCache';

interface PlayerParams {
  account_id: number;
}

const url = 'https://api.opendota.com/api/players/';

export default async function getPlayer(params: PlayerParams): Promise<any> {
  const reqUrl = url + params.account_id;
  return await getApiDataFromCache(reqUrl).then((data) => {
    if (data) {
      const obj = Object.assign({}, {
        data: data
      });
      return Promise.resolve(obj);
    } else {
      return Axios.get(reqUrl);
    }
  })
}