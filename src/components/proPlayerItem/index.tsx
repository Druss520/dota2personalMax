import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import { ProPlayers } from '../../interface/proplayer';
import ImgView from '../ImgView';
import history from '../../history';
import player from '../../interface/player';


interface Props {
  proplayer: ProPlayers;
  onclick?: () => void;
}

const MatchItem = (props: Props) => {
  const { proplayer } = props;
  // console.log(match.game_mode,gameMode);

  return (
    <div className={styles.block}
    onClick={() => {
      config.global.Global.accountId = proplayer.account_id.toString();
      history.replace('/');
    }}
    >
      <ImgView
      className={styles.avatar}
      src={proplayer.avatarmedium}
      />
      <div className={styles.name}>
        {proplayer.name}
      </div>
      <div className={styles.team}>
        {proplayer.team_name}
      </div>
    </div>
  )
}


export default MatchItem;