import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import { NameResults } from '../../interface/searchName';
import ImgView from '../ImgView';
import history from '../../history';


interface Props {
  searchplayer: NameResults;
  onclick?: () => void;
}

const MatchItem = (props: Props) => {
  const { searchplayer } = props;
  // console.log(match.game_mode,gameMode);

  return (
    <div className={styles.block}
    onClick={() => {
      config.global.Global.accountId = searchplayer.account_id.toString();
      history.replace('/');
    }}
    >
      <ImgView
      className={styles.avatar}
      src={searchplayer.avatarfull}
      />
      <div className={styles.name}>
        {searchplayer.personaname}
      </div>
      <div className={styles.id}>
        ID: {searchplayer.account_id}
      </div>
    </div>
  )
}


export default MatchItem;