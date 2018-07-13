import Axios from 'axios';
// import getApiDataFromCache from '../../utils/getApiDataFromCache';

interface PlayerParams {
  account_id: number;
}

export default async function getWinLose(params: PlayerParams): Promise<any> {
  const url = `https://api.opendota.com/api/players/${params.account_id}/wl`;
  // return await getApiDataFromCache(url).then((data) => {
  //   if (data) {
  //     const obj = Object.assign({}, {
  //       data: data
  //     });
  //     return Promise.resolve(obj);
  //   } else {
      return Axios.get(url);
  //   }
  // })
}