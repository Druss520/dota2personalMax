import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import { MatchesRecord } from '../../interface/player';
import ImgView from '../ImgView';
import heroStats, { Heroes } from '../../interface/heros';
import Duration from '../../utils/standardTime';
import TimeDif from '../../utils/timeDifference';
import history from '../../history';

interface Props {
  records: MatchesRecord;
  name: string;
  param: string;
  onclick?: () => void;
}

const RecordItem = (props: Props) => {
  const { records, name, param } = props;
  // console.log(records.game_mode,gameMode);
  let hero: Heroes = undefined;
  for (let i = 0; i < heroStats.heroArray.length; i++) {
    if (heroStats.heroArray[i].id === records.hero_id) {
      hero = heroStats.heroArray[i];
      break;
    }
  }

  return (
    <div className={styles.block}
    onClick={() => {
      config.global.Global.matchId = records.match_id.toString();
      history.push('/matchDetail');
    }}
    >
      <ImgView
      className={styles.heroIcon}
      src={hero.img}
      host={config.global.domain}
      />
      <div className={styles.name}>
        {name}
      </div>
      <div className={styles.score}>
        {!records[param] ? '--' : (
          param === 'duration' ? (
            Duration(records[param])
          ) : (
            records[param]
          )
        )}
      </div>
      <div className={styles.history}>
        {TimeDif(records.start_time)}
      </div>
      {
          (records.radiant_win && records.player_slot >= 0 && records.player_slot < 128) || (
            !records.radiant_win && records.player_slot >= 128
          ) ? (
            <div className={styles.win}>
              W
            </div>
          ) : (
            <div className={styles.lose}>
              L
            </div>
          )
        }
    </div>
  )
}


export default RecordItem;