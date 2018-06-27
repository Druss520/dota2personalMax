import { observable } from 'mobx';
import getProPlayer from './getProplayers';
import {action} from 'mobx';
import config from '../../config';


export  interface ProPlayers {
  account_id: number,
  steamid: string,
  avatar: string,
  avatarmedium: string,
  avatarfull: string,
  profileurl: string,
  personaname: string,
  last_login: string,
  full_history_time: string,
  cheese: number,
  fh_unavailable: boolean,
  loccountrycode: string,
  name: string,
  country_code: string,
  fantasy_role: number,
  team_id: number,
  team_name: string,
  team_tag: string,
  is_locked: boolean,
  is_pro: boolean,
  locked_until: number
}

const teams = {
  'Big God': '',
  'Old Boys': '',
  'Vici Gaming':'',
  'LGD-GAMING':'',
  'PSG.LGD':'',
  'Virtus.pro':'',
  'Team VGJ':'',
  'LGD.Forever Young':'',
  'Invictus Gaming':'',
  'Newbee':'',
  'Team Liquid':'',
  'Mineski.亿鼎博':'',
  'Team Secret':'',
  'Fnatic':'',
  'VGJ Storm':'',
  'Evil Geniuses':'',
  'OG':'',
  'OpTic Gaming':'',
  'EHOME':'',
  'KEEN GAMING':'',
  'Newbee.Young':'',
  ' Echo.Int':'',
  'ForTheDream':'',
  'Sun Gaming':'',
  'paiN Gaming':'',
  'TAICHI GAMING':'',
  'Winstrike':'',
  'Natus Vincere':'',
  'Digital Chaos': '',
  'Eclipse':'',
  'TEAM EVER':'',
  'Team Max':'',
  'iG.Vitality':'',
  'VGJ Thunder':'',
  'Immortals':'',
  'Team Serenity':'',
  'CDEC Gaming':'',
}

const ob = 'OB.';

class ProPlayer {
  @observable public proplayers: ProPlayers[] | undefined;

  public allPro: ProPlayers[] | undefined;

  @action public async getAllInfo(): Promise<number> {
    let typeNum = 0;
    let tempArray: ProPlayers[] = [];

    await getProPlayer().then((res) => {
      this.allPro= res.data;
      this.allPro.forEach((item) => {
        if (item.name && item.team_name) {
          if (item.name.indexOf(ob) >= 0) {
            tempArray.push(item);
          }
          if (teams[item.team_name] !== undefined) {
            tempArray.push(item);
          }
        }
      })
      this.proplayers = tempArray;
    }).catch((e) => {
      console.log(e);
      typeNum = 1;
    })

    return typeNum;
  }

}

const proplayer = new ProPlayer();

export default proplayer;