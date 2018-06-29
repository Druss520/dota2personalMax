import { observable } from 'mobx';
import getSearchName from './searchName';
import {action} from 'mobx';
import config from '../../config';

interface Params {
  q: string
}

export interface NameResults {
  account_id: number,
  avatarfull: string,
  personaname: string,
  last_match_time: string,
  similarity: number,
}



class SearchPlayer {
  @observable public playerNames: NameResults[] | undefined;

  public params: Params = {
    q: ''
  }

  @action public async getAllInfo(queryString: string): Promise<number> {
    let typeNum = 0;
    this.params.q = queryString;

    await getSearchName(this.params).then((res) => {
      this.playerNames= res.data;
      // console.log(this.playerNames.slice());
      if (this.playerNames.length === 0) {
        typeNum = 2;
      }
    }).catch((e) => {
      console.log(e);
      typeNum = 1;
    })

    return typeNum;
  }

}

const searchplayer = new SearchPlayer();

export default searchplayer;