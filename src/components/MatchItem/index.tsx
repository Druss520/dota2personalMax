import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import { RecentMatches } from '../../interface/player';
import heroStats, { Heroes } from '../../interface/heros';
import TimeDif from '../../utils/timeDifference';
import Duration from '../../utils/standardTime';
import KDA from '../../utils/getKDA';
import ImgView from '../ImgView';
import history from '../../history';


const lobby_type = require('../../assets/json/lobby_type.json');
const gameMode = require('../../assets/json/game_mode.json');


interface Props {
  match: RecentMatches;
  onclick?: () => void;
}

const MatchItem = (props: Props) => {
  const { match } = props;
  let hero: Heroes = undefined;
  for (let i = 0; i < heroStats.heroArray.length; i++) {
    if (heroStats.heroArray[i].id === match.hero_id) {
      hero = heroStats.heroArray[i];
      break;
    }
  }
  // console.log(match.game_mode,gameMode);

  return (
    <div className={styles.block}
    onClick={() => {
      config.global.Global.matchId = match.match_id.toString();
      history.push('/matchDetail');
    }}
    >
      <div className={styles.left}>
        {/* <img
          className={styles.heroIcon}
          src={config.global.domain + hero.img}
        /> */}
        <ImgView
        className={styles.heroIcon}
        src={hero.img}
        host={config.global.domain}
        />
        {
          (match.radiant_win && match.player_slot >= 0 && match.player_slot < 128) || (
            !match.radiant_win && match.player_slot >= 128
          ) ? (
            <div className={styles.win}>
              胜
            </div>
          ) : (
            <div className={styles.lose}>
              败
            </div>
          )
        }
        <div className={styles.level}>
          {
            match.lobby_type === 0 ? (
              gameMode[match.game_mode] ? (
                gameMode[match.game_mode].chinese
              ) : null
            ) : (
              match.lobby_type  === 4 ? (
                gameMode[match.game_mode] ? (
                  gameMode[match.game_mode].chinese
                ) : null
              ) : (
                lobby_type[match.lobby_type] ? (
                  lobby_type[match.lobby_type].chinese
                ) : null
              )
            )
          }
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.right1}>
          <div className={styles.row1}>
            {TimeDif(match.start_time)}
          </div>
          <div className={styles.row2}>
            {Duration(match.duration)}
          </div>
        </div>
        <div className={styles.right2}>
          <div className={styles.row1}>
            {KDA(match.kills, match.deaths, match.assists)}
          </div>
          <div className={styles.row2}>
            {
              match.kills + '/' + match.deaths + '/' + match.assists
            }
          </div>
        </div>
      </div>
    </div>
  )
}


export default MatchItem;