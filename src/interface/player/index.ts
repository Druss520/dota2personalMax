import { observable } from 'mobx';
import getPlayer from './getPlayer';
import getRecentMatch from './getRecentMatches';
import getWinLose from './getWinLose';
import {action} from 'mobx';

interface Params {
  account_id: number;
} 

interface PlayerProfile {
  mmr_estimate: number;
  profile: Profile
}

interface Profile {
  account_id: number;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  loccountrycode: string;
  personaname: string;
}

interface PlayerInfo {
  playerProfile: PlayerProfile
}

class Player {
  @observable public playerProfile: PlayerProfile | undefined;
  @observable public winLose: any | undefined;
  @observable public recentMatch: any | undefined;

  public params: Params = {
    account_id: 192820722
  }

  @action public async getAllInfo(): Promise<boolean> {
    let fail = false;

    await  getPlayer(this.params).then((res) => {
      this.playerProfile = res.data;
    }).catch((e) => {
      console.log(e);
      fail = true;
    })

    await  getWinLose(this.params).then((res) => {
      this.winLose = res.data;
    }).catch((e) => {
      console.log(e);
      fail = true;
    })
    
    await  getRecentMatch(this.params).then((res) => {
      this.recentMatch = res.data;
    }).catch((e) => {
      console.log(e);
      fail = true;
    })

    return fail;
  }

}

const player = new Player();

export default player;