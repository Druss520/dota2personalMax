import Axios from 'axios';

interface NameParams {
  q: string;
}

export default async function getPeers(params: NameParams): Promise<any> {
  const url = `https://api.opendota.com/api/search`;
  return Axios.get(url, {
    params: {
      q: params.q
    }
  });
}