import * as React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './index.scss'
import player from '../../interface/player';
import { observer } from 'mobx-react';
import config from '../../config';
import StateView from '../../components/StateView';
import heroes from '../../interface/heros';
import { values } from 'mobx';

interface State {
  needReload: boolean;
}

@observer class App extends React.Component<IAppProps, State>{

  public state: State = {
    needReload: false
  }

  public componentDidMount(): void {
    player.getAllInfo().then((value) => {
      // console.log(value);
      if (value) {
        this.setState({
          needReload: true
        })
      }
    });
    heroes.getHeroInfo().then((value) => {
      if(value) {
        this.setState({
          needReload: true
        })
      }
    })
  }

  public render(): JSX.Element {
      return(
        player.playerProfile && player.recentMatch && player.winLose ? (
          <div className={styles.hehe}>
            <div className={styles.header}>
              Dota2 个人信息
            </div>
            <div className={styles.person}>
              <div className={styles.personLeft}>
                <img
                  className={styles.personAvatar}
                  src={player.playerProfile.profile.avatarfull}
                />
                <div className={styles.personName}>
                  {player.playerProfile.profile.personaname}
                </div>
              </div>
              <div className={styles.personRight}>
                <div className={styles.personRightRow1}>
                  MMR: {player.playerProfile.mmr_estimate.estimate}
                </div>
                <div className={styles.personRightRow2}>
                  Region: {player.playerProfile.profile.loccountrycode}
                </div>
                <div className={styles.personRightRow2}>
                  Win: {player.winLose.win + '　'} Lose: {player.winLose.lose}
                </div>
              </div>
            </div>
            <div>
              {
                player.recentMatch
              }
            </div>
          </div>
        ) : (
          this.state.needReload ? (
            <StateView state={'fail'} />
          ) : (
            <StateView state={'loading'} />
          )
        )
      )
    }
}

export default App;