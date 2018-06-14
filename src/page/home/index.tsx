import * as React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './index.scss'
import player from '../../interface/player';
import { observer } from 'mobx-react';
import img from '../../config/imgCfg';

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
              </div>
            </div>
          </div>
        ) : (
          this.state.needReload ? (
            <div className={styles.reload}
            onClick={() => {
              window.location.reload();
            }}
            >
              点击重新加载
            </div>
          ) : (
            <div className={styles.emptyPage}>
              <img
                className={'loading'}
                src={img.loading}
              />
            </div>
          )
        )
      )
    }
}

export default App;