import * as React from 'react';
import * as styles from './index.scss'
import player from '../../interface/player';
import { observer } from 'mobx-react';
import config from '../../config';
import StateView from '../../components/StateView';
import heroes from '../../interface/heros';
import { values } from 'mobx';
import MatchItem from '../../components/MatchItem';
import ListPopdown from '../../components/ListPopdown';
import * as classNames from 'classnames';
import history from '../../history';
import ImgView from '../../components/ImgView';

interface State {
  fail: number;
  call1: boolean;
  call2: boolean
}

@observer class App extends React.Component<IAppProps, State>{

  public state: State = {
    fail: 0,
    call1: false,
    call2: false,
  }

  public componentDidMount(): void {
    const tempid = config.global.Global.accountId
    const prevAccountId = player.previousAccountId;
    if (tempid === '') {
      history.push('/entry');
    } else {
      if (player.isFakeId || prevAccountId !== tempid) {
        player.previousAccountId = tempid;
        this.sendRequest();
      } else {
        // console.log('cache');
        if (player.playerProfile && heroes.heroArray && player.winLose && player.recentMatch) {
          this.setState({
            call1: true,
            call2: true,
          })
        } else {
          this.sendRequest();
        }
      }
    }
  }

  public sendRequest(): void {
    player.getAllInfo().then((value) => {
      // console.log(value);
      if (value === 1) {
        this.setState({
          fail: 1
        })
      } else if (value === 2) {
        this.setState({
          fail: 2
        })
      } else {
        player.isFakeId = false;
        this.setState({
          call1: true
        })
      }
    });
    if (heroes.heroArray) {
      this.setState({
        call2: true
      })
    } else {
      heroes.getHeroInfo().then((value) => {
        if(value) {
          this.setState({
            fail: 1
          })
        } else {
          this.setState({
            call2: true
          })
        }
      })
    }
  }

  public componentWillUnmount(): void {
    this.setState = (state, callback) => {
      return;
    };
  }

  public render(): JSX.Element {
      return(
        this.state.call1 && this.state.call2 ? (
          <div className={styles.hehe}>
            <div className={styles.header}>
              <div className={styles.switch1}
              onClick={() => {
                history.push('/entry');
              }}
              >
                <div className={classNames([
                  styles.switchIcon,
                  'fa fa-exchange'
                ])}
                >
                </div>
                <div className={styles.switchText}>
                  切换玩家
                </div>
              </div>
              Dota2 miniMax+
            </div>
            <div className={styles.person}>
              <div className={styles.personLeft}>
                {/* <img
                  className={styles.personAvatar}
                  src={player.playerProfile.profile.avatarfull}
                /> */}
                <ImgView
                className={styles.personAvatar}
                src={player.playerProfile.profile.avatarfull}
                fail={config.img.userDefault}
                />
                <div className={styles.personName}>
                  {player.playerProfile.profile.personaname}
                </div>
                {
                  player.playerProfile.profile.name ? (
                    <div className={styles.proRow}>
                    (
                      <div className={classNames([
                        'fa fa-id-card-o',
                        styles.proIcon
                      ])}></div>
                      <div className={styles.proName}>
                      {player.playerProfile.profile.name}
                      </div>
                    )
                    </div>
                  ) : null
                }
              </div>
              <div className={styles.personRight}>
                <div className={styles.personRightRow1}>
                  MMR: {player.playerProfile.mmr_estimate.estimate}
                </div>
                <div className={styles.personRightRow2}>
                  天梯排名: {player.playerProfile.leaderboard_rank ? player.playerProfile.leaderboard_rank : '--'}
                </div>
                <div className={styles.personRightRow2}>
                  Region: {player.playerProfile.profile.loccountrycode ? player.playerProfile.profile.loccountrycode : '--'}
                </div>
                <div className={styles.personRightSmall}>
                  Win: {player.winLose.win + '　'} Lose: {player.winLose.lose}
                </div>
                {/* <div className={styles.personRightSmall}>
                  {player.playerProfile.profile.steamid}
                </div> */}
              </div>
            </div>

            <ListPopdown
            matches={player.recentMatch}
            />
          </div>
        ) : (
          this.state.fail === 1 ? (
            <StateView state={'fail'} />
          ) : (
            this.state.fail === 2 ? (
              <div className={styles.reload}>
                <img
                className={styles.noSuch}
                src={config.img.empty}
                />
                <div className={styles.hint}>未找到玩家信息</div>
                <div className={styles.btnGo}
                onClick={() => {
                  history.push('/entry');
                }}
                >
                  重新输入
                </div>
              </div>
            ) : (
              <StateView state={'loading'} />
            )
          )
        )
      )
    }
}

export default App;