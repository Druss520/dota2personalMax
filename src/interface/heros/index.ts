import { observable } from 'mobx';
import {action} from 'mobx';
import getHeros from './getAllHero';
import getApiDataFromCache from '../../utils/getApiDataFromCache';

export interface Heroes {
  id: number,
  name: string,
  localized_name: string,
  img: string,
  icon: string,
  pro_win: number,
  pro_pick: number,
}

class Heros {
  @observable public heroArray: Heroes[] | undefined;

  @action public async getHeroInfo(): Promise<boolean> {
    let fail = false;

    await getApiDataFromCache('https://api.opendota.com/api/heroStats').then((data) => {
      if (data) {
        this.heroArray = data
      }
      else {
        getHeros().then((res) => {
          this.heroArray = res.data;
        }).catch((e) => {
          console.log(e);
          fail = true;
        })
      }
    })

    return fail;
  }

}

const heros = new Heros();

export default heros;