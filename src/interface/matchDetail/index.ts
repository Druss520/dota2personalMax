import getMatchDetail from './getMatchDetail';
import config from '../../config';

export interface MatchDetail {
    match_id: number,
    barracks_status_dire: number,
    barracks_status_radiant: number,
    chat: [
      {
        time: number,
        unit: string,
        key: string,
        slot: number,
        player_slot: number
      }
    ],
    cluster: number,
    cosmetics: {},
    dire_score: number,
    draft_timings: [
      {
        order: number,
        pick: boolean,
        active_team: number,
        hero_id: number,
        player_slot: number,
        extra_time: number,
        total_time_taken: number
      }
    ],
    duration: number,
    engine: number,
    first_blood_time: number,
    game_mode: number,
    human_players: number,
    leagueid: number,
    lobby_type: number,
    match_seq_num: number,
    negative_votes: number,
    objectives: {},
    picks_bans: {},
    positive_votes: number,
    radiant_gold_adv: {},
    radiant_score: number,
    radiant_win: boolean,
    radiant_xp_adv: {},
    start_time: number,
    teamfights: {},
    tower_status_dire: number,
    tower_status_radiant: number,
    version: number,
    replay_salt: number,
    series_id: number,
    series_type: number,
    radiant_team: {},
    dire_team: {},
    league: {},
    skill: number,
    players: [
      {
        match_id: number,
        player_slot: number,
        ability_upgrades_arr: [
          number
        ],
        ability_uses: {},
        ability_targets: {},
        damage_targets: {},
        account_id: number,
        actions: {},
        additional_units: {},
        assists: number,
        backpack_number: number,
        backpack_1: number,
        backpack_2: number,
        buyback_log: [
          {
            time: number,
            slot: number,
            player_slot: number
          }
        ],
        camps_stacked: number,
        creeps_stacked: number,
        damage: {},
        damage_inflictor: {},
        damage_inflictor_received: {},
        damage_taken: {},
        deaths: number,
        denies: number,
        dn_t: [
          number
        ],
        gold: number,
        gold_per_min: number,
        gold_reasons: {},
        gold_spent: number,
        gold_t: [
          number
        ],
        hero_damage: number,
        hero_healing: number,
        hero_hits: {},
        hero_id: number,
        item_number: number,
        item_1: number,
        item_2: number,
        item_3: number,
        item_4: number,
        item_5: number,
        item_uses: {},
        kill_streaks: {},
        killed: {},
        killed_by: {},
        kills: number,
        kills_log: [
          {
            time: number,
            key: string
          }
        ],
        lane_pos: {},
        last_hits: number,
        leaver_status: number,
        level: number,
        lh_t: [
          number
        ],
        life_state: {},
        max_hero_hit: {},
        multi_kills: {},
        obs: {},
        obs_left_log: [
          {}
        ],
        obs_log: [
          {}
        ],
        obs_placed: number,
        party_id: number,
        permanent_buffs: [
          {}
        ],
        pings: number,
        purchase: {},
        purchase_log: [
          {
            time: number,
            key: string
          }
        ],
        rune_pickups: number,
        runes: {
          property1: number,
          property2: number
        },
        runes_log: [
          {
            time: number,
            key: number
          }
        ],
        sen: {},
        sen_left_log: [
          {}
        ],
        sen_log: [
          {}
        ],
        sen_placed: number,
        stuns: number,
        times: [
          number
        ],
        tower_damage: number,
        xp_per_min: number,
        xp_reasons: {},
        xp_t: [
          number
        ],
        personaname: string,
        name: string,
        last_login: null,
        radiant_win: boolean,
        start_time: number,
        duration: number,
        cluster: number,
        lobby_type: number,
        game_mode: number,
        patch: number,
        region: number,
        isRadiant: boolean,
        win: number,
        lose: number,
        total_gold: number,
        total_xp: number,
        kills_per_min: number,
        kda: number,
        abandons: number,
        neutral_kills: number,
        tower_kills: number,
        courier_kills: number,
        lane_kills: number,
        hero_kills: number,
        observer_kills: number,
        sentry_kills: number,
        roshan_kills: number,
        necronomicon_kills: number,
        ancient_kills: number,
        buyback_count: number,
        observer_uses: number,
        sentry_uses: number,
        lane_efficiency: number,
        lane_efficiency_pct: number,
        lane: number,
        lane_role: number,
        is_roaming: boolean,
        purchase_time: {},
        first_purchase_time: {},
        item_win: {},
        item_usage: {},
        purchase_tpscroll: {},
        actions_per_min: number,
        life_state_dead: number,
        rank_tier: number,
        cosmetics: [
          number
        ],
        benchmarks: {}
      }
    ],
    patch: number,
    region: number,
    all_word_counts: {},
    my_word_counts: {},
    throw: number,
    loss: number,
    replay_url: string
}

interface MatchParams {
  match_id: number;
}


class Match {
  public matchDetail: MatchDetail | undefined;

  public params: MatchParams = {
    match_id: parseInt(config.global.Global.matchId)
  }

  public async detailMatchPage(): Promise<number> {
    let errornum = 0;

    await getMatchDetail(this.params).then((res) => {
      this.matchDetail = res.data;
    }).catch(e => {
      console.log(e);
      errornum = 1;
    })

    return errornum;
  }

}

const matchDetail = new Match();

export default matchDetail;