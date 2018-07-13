import Axios from 'axios';
import getApiDataFromCache from '../../utils/getApiDataFromCache';

const url = 'https://api.opendota.com/api/heroStats';

export default async function getHeroStats(): Promise<any> {
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

