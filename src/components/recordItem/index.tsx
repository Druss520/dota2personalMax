import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import { MatchesRecord } from '../../interface/player';
import ImgView from '../ImgView';
import heroStats, { Heroes } from '../../interface/heros';

interface Props {
  records: MatchesRecord;
  name: string;
  param: string;
  onclick?: () => void;
}

const RecordItem = (props: Props) => {
  const { records, name, param } = props;
  // console.log(match.game_mode,gameMode);
  let hero: Heroes = undefined;
  for (let i = 0; i < heroStats.heroArray.length; i++) {
    if (heroStats.heroArray[i].id === records.hero_id) {
      hero = heroStats.heroArray[i];
      break;
    }
  }

  return (
    <div className={styles.block}
    >
      <ImgView
      className={styles.heroIcon}
      src={hero.img}
      host={config.global.domain}
      />
      <div className={styles.name}>
        {name}
      </div>
      <div className={styles.team}>
        {records[param]}
      </div>
    </div>
  )
}


export default RecordItem;