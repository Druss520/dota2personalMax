import Axios from 'axios';

interface MatchParams {
  match_id: number;
}

export default async function getMatchDetailes(params: MatchParams): Promise<any> {
  const url = `https://api.opendota.com/api/matches/${params.match_id}`;
  return Axios.get(url);
}