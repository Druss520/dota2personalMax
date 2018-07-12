import { observable } from 'mobx';
import getPlayer from './getPlayer';
import getRecentMatch from './getRecentMatches';
import getWinLose from './getWinLose';
import {action} from 'mobx';
import config from '../../config';
import getTotalData from './getTotalData';
import getPeers from './getPeers';
import getWard from './getward';
import getRecord, { PlayerMatchRecordParams } from './getMatchesForRecord';

interface Params {
  account_id: number;
} 

interface PlayerProfile {
  tracked_until: string,
  solo_competitive_rank: string,
  competitive_rank: string,
  rank_tier: number,
  leaderboard_rank: number,
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
  steamid: string,
  name: string,
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

export interface TotalData {
  field: string,
  n: number,
  sum: number
}


export interface Peers  {
  account_id: number,
  last_played: number,
  win: number,
  games: number,
  with_win: number,
  with_games: number,
  against_win: number,
  against_games: number,
  with_gpm_sum: number,
  with_xpm_sum: number,
  personaname: string,
  last_login: string,
  avatar: string,
  avatarfull: string
}

export interface Wardmap {
    obs: {},
    sen: {}
}

export interface MatchesRecord {
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
  party_size: number,
  hero_damage: number,
  leaver_status: number,
  courier_kills: number
  actions_per_min: number,
  denies: number,
  lane_efficiency_pct: number,
  gold_per_min: number,
  kda: number;
  xp_per_min: number,
  last_hits: number,
  tower_damage,
  hero_healing,
  neutral_kills,
  purchase_ward_observer,
  purchase_ward_sentry,
}

interface RecordPair {
  match: MatchesRecord,
  key: string;
}

interface RecordParams {
  sort: string;
  limit?: number;
}

class Player {
  @observable public playerProfile: PlayerProfile | undefined;
  @observable public winLose: WinLose | undefined;
  @observable public recentMatch: RecentMatches[] | undefined;
  @observable public totalData: TotalData[] | undefined;
  @observable public peers: Peers[] | undefined;
  public wardmap: Wardmap | undefined;
  public recordTemp: RecordPair[]  = [];
  public RecordData: RecordPair[]  = [];
  @observable public recordList: MatchesRecord[] | undefined;
  public keyWordHistory: string = undefined;
  public keyNameHistory: string = undefined;

  // 192820722
  public params: Params = {
    account_id: parseInt(config.global.Global.accountId)
  }

  public previousAccountId: string | undefined;
  public previousPeer: string | undefined;
  public previousRecord: string | undefined;

  public isFakeId: boolean = false;

  @action public async getAllInfo(): Promise<number> {
    let typeNum = 0;
    this.params = {
      account_id: parseInt(config.global.Global.accountId)
    }

    await  getPlayer(this.params).then((res) => {
      this.playerProfile = res.data;
      if (this.playerProfile.profile === undefined) {
        typeNum = 2;
        this.isFakeId = true;
      }
    }).catch((e) => {
      console.log(e);
      typeNum = 1;
    })

    await  getWinLose(this.params).then((res) => {
      this.winLose = res.data;
      if (this.winLose.lose ===0 && this.winLose.win === 0) {
        typeNum = 2;
        this.isFakeId = true;
      }
    }).catch((e) => {
      console.log(e);
      typeNum = 1;
    })
    
    await  getRecentMatch(this.params).then((res) => {
      this.recentMatch = res.data;
      if (this.recentMatch.length === 0) {
        typeNum = 2;
        this.isFakeId = true;
      }
    }).catch((e) => {
      console.log(e);
      typeNum = 1;
    })

    await  getTotalData(this.params).then((res) => {
      this.totalData = res.data;
      if (this.totalData.length === 0) {
        typeNum = 2;
        this.isFakeId = true;
      }
    }).catch((e) => {
      console.log(e);
      typeNum = 1;
    })

    return typeNum;
  }

  @action public async PeerPage(): Promise<number> {
    let errornum = 0;

    await getPeers(this.params).then((res) => {
      const temp: Peers[] = res.data
      if (temp.length === 0) {
        errornum = 2;
      } else {
        if (temp.length <= 20) {
          this.peers = temp;
        } else {
          this.peers = temp.slice(0,20);
        }
      }
    }).catch(e => {
      console.log(e);
      errornum = 1;
    })

    return errornum;
  }

  public async wardPage(): Promise<number> {
    let errornum = 0;

    await getWard(this.params).then((res) => {
      this.wardmap = res.data;
    }).catch(e => {
      console.log(e);
      errornum = 1;
    })

    return errornum;
  }

  public async getMatchRecords(partial: RecordParams): Promise<number> {

    const Prms: PlayerMatchRecordParams = Object.assign({}, this.params, partial);
    
    let num  = 1;
    await getRecord(Prms).then((res) => {
      const temp: MatchesRecord[] = res.data
      const final: RecordPair = Object.assign({}, {
        match: temp[0],
        key: Prms.sort
      })
      this.recordTemp.push(final);
      // console.log(2222);
    }).catch(e => {
      console.log(e);
      num = 0;
    })
    // console.log(5555);
    return num;
  }

  public async getMatchRecordList(partial: RecordParams): Promise<number> {

    const Prms: PlayerMatchRecordParams = Object.assign({}, this.params, partial);
    
    let num  = 1;
    await getRecord(Prms).then((res) => {
      const temp: MatchesRecord[] = res.data
      this.recordList = temp;
      // console.log(2222);
    }).catch(e => {
      console.log(e);
      num = 0;
    })
    // console.log(5555);
    return num;
  }

}

const player = new Player();

export default player;