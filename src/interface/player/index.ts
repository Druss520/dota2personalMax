import { observable } from 'mobx';
import getPlayer from './getPlayer';
import getRecentMatch from './getRecentMatches';
import getWinLose from './getWinLose';
import {action} from 'mobx';
import config from '../../config';

interface Params {
  account_id: number;
} 

interface PlayerProfile {
  mmr_estimate: {
    estimate: number
  };
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

interface WinLose {
  win: number;
  lose: number;
}

export interface RecentMatches {
  match_id: number,
  player_slot: number,
  radiant_win: boolean,
  duration: number,
  game_mode: number,
  lobby_type: number,
  hero_id: number,
  start_time: number,
  version: number,
  kills: number,
  deaths: number,
  assists: number,
  skill: number,
  lane: number,
  lane_role: number,
  is_roaming: boolean,
  cluster: number,
  leaver_status: number,
  party_size: number
}

class Player {
  @observable public playerProfile: PlayerProfile | undefined;
  @observable public winLose: WinLose | undefined;
  @observable public recentMatch: RecentMatches[] | undefined;

  // 192820722
  public params: Params = {
    account_id: parseInt(config.global.Global.accountId)
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