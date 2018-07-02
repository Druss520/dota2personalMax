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
import getRankTier from '../../utils/getRankTier';
import DataBlock from '../../components/Datablock';

interface State {
  fail: number;
  call1: boolean;
  call2: boolean;
  dropdata: boolean;
}

interface ThemeBlock {
  name: string;
  img: string;
  path: string;
  href?: string;
}

const blockArray: ThemeBlock[] = [
  {
    name: '队友榜',
    img: config.img.tp,
    path: '/peer'
  },
  {
    name: '眼位图',
    img: config.img.jiayan,
    path: '/wardmap'
  },{
    name: '记录榜(外链)',
    img: config.img.buxiudun,
    path: '/record',
    href: `https://www.opendota.com/players/${parseInt(config.global.Global.accountId)}/records`
  },{
    name: '直方图',
    img: config.img.sanyeduijian,
    path: '/histogram'
  }
]

const ThemeBlock = (item: ThemeBlock, i: number) => {
  return (
    <div
    key={i}
    className={styles.peer}
    onClick={() => {
      if (item.href) {
        window.location.href = item.href
      } else
      history.push(item.path);
    }}
    >
      <div
      className={styles.peerIcon}
      style={{
        backgroundImage: `url('${item.img}')`
      }}
      >
      </div>
      {item.name}
    </div>
  )
}

@observer class App extends React.Component<IAppProps, State>{

  constructor(props: IAppProps) {
    super(props);

    this.openData = this.openData.bind(this);
  }

  public state: State = {
    fail: 0,
    call1: false,
    call2: false,
    dropdata: false,
  }

  public tempid: string;

  public componentDidMount(): void {
    this.tempid = config.global.Global.accountId
    const prevAccountId = player.previousAccountId;
    if (this.tempid === '') {
      history.push('/entry');
    } else {
      if (player.isFakeId || prevAccountId !== this.tempid) {
        this.sendRequest();
      } else {
        // console.log('cache');
        if (player.playerProfile && heroes.heroArray && player.winLose && player.totalData && player.recentMatch) {
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
        player.previousAccountId = this.tempid;
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

  public openData(): void {
    this.setState({
      dropdata: true
    })
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
                  {/* 切换玩家 */}
                </div>
              </div>
              <div>
                Visual Dota
              </div>
            </div>
            <div className={classNames({
              [styles.person]: true,
            })}>
              <div className={styles.person1}>
                <div className={styles.personLeft}>
                  <ImgView
                  className={styles.personAvatar}
                  src={player.playerProfile.profile.avatarfull}
                  fail={config.img.userDefault}
                  />
                </div>
                <div className={styles.personRight}>
                  <div className={styles.personName}>
                    {player.playerProfile.profile.personaname}
                  </div>
                  {
                    player.playerProfile.profile.name ? (
                      <div className={styles.proRow}>
                        <div className={classNames([
                          'fa fa-id-card-o',
                          styles.proIcon
                        ])}></div>
                        <div className={styles.proName}>
                        {player.playerProfile.profile.name}
                        </div>
                      </div>
                    ) : null
                  }
                  <div className={styles.row3}>
                    <DataBlock name={'ID'} value={player.playerProfile.profile.account_id} flat/>
                    <DataBlock name={'steamID'} value={player.playerProfile.profile.steamid} flat/>
                  </div>
                </div>
              </div>
              <div className={styles.whiteLine}></div>
              <div className={styles.dataTitle}>数据统计（场均）</div>
              <div className={styles.person2}>
                <div className={styles.generalLeft}>
                  <DataBlock name={'胜场'} value={player.winLose.win}/>
                  <DataBlock name={'负场'} value={player.winLose.lose} />
                  <DataBlock name={'胜率'} value={(player.winLose.win/(player.winLose.win +
                  player.winLose.lose)*100).toFixed(1) + '%'}/>
                  <DataBlock name={'MMR'} value={player.playerProfile.mmr_estimate.estimate} />
                  <DataBlock name={'击杀'} value={(player.totalData[0].sum/player.totalData[0].n).toFixed(1)} />
                  <DataBlock name={'死亡'} value={(player.totalData[1].sum/player.totalData[1].n).toFixed(1)} />
                  <DataBlock name={'助攻'} value={(player.totalData[2].sum/player.totalData[2].n).toFixed(1)} />
                  <DataBlock name={'KDA'} value={(player.totalData[3].sum/player.totalData[3].n).toFixed(1)} />
                  <DataBlock name={'GPM'} value={(player.totalData[4].sum/player.totalData[4].n).toFixed(1)} />
                  <DataBlock name={'XPM'} value={(player.totalData[5].sum/player.totalData[5].n).toFixed(1)} />
                </div>
                <div className={styles.generalRight}>
                  <div
                  className={styles.rankTier}
                  style={{
                    backgroundImage: `url('${getRankTier(player.playerProfile.rank_tier, player.playerProfile.leaderboard_rank)}')`
                  }}
                  >
                  {
                    player.playerProfile.leaderboard_rank ? (
                      <div className={styles.rankNum}>{player.playerProfile.leaderboard_rank}</div>
                    ) : null
                  }
                  </div>
                </div>
              </div>
              
              <div className={classNames({
                [styles.person3]: true,
                [styles.person3Change]: this.state.dropdata
              })}>
                <DataBlock name={'正补'} value={(player.totalData[6].sum/player.totalData[6].n).toFixed(1)} />
                <DataBlock name={'反补'} value={(player.totalData[7].sum/player.totalData[7].n).toFixed(1)} />
                <DataBlock name={'线优'} value={(player.totalData[8].sum/player.totalData[8].n).toFixed(1) + '%'} />
                <DataBlock name={'比赛时长'} value={(player.totalData[9].sum/player.totalData[9].n/60).toFixed(1) + '分'} />
                <DataBlock name={'英雄等级'} value={(player.totalData[10].sum/player.totalData[10].n).toFixed(1)} />
                <DataBlock name={'英雄伤害'} value={(player.totalData[11].sum/player.totalData[11].n).toFixed(1)} />
                <DataBlock name={'建筑伤害'} value={(player.totalData[12].sum/player.totalData[12].n).toFixed(1)} />
                <DataBlock name={'治疗'} value={(player.totalData[13].sum/player.totalData[13].n).toFixed(1)} />
                <DataBlock name={'刷野数'} value={(player.totalData[16].sum/player.totalData[16].n).toFixed(1)} />
                <DataBlock name={'买假眼'} value={(player.totalData[19].sum/player.totalData[19].n).toFixed(1)} />
                <DataBlock name={'买真眼'} value={(player.totalData[20].sum/player.totalData[20].n).toFixed(1)} />
                <DataBlock name={'APM'} value={(player.totalData[28].sum/player.totalData[28].n).toFixed(1)} />
                <DataBlock name={'地区'} value={player.playerProfile.profile.loccountrycode} />
              </div>
              
              {
                !this.state.dropdata ? (
                  <div className={styles.person3Unopen}
                  onClick={() => this.openData()}
                  >
                    <div className={classNames([
                      'fa fa-angle-double-down',
                      styles.icon
                    ])}></div>
                    更多数据
                  </div>
                ) : null
              }
            </div>
            
            <div
            className={styles.peerFrame}
            >
              {
                blockArray.map((item,i) => {
                  return (
                    ThemeBlock(item, i)
                  )
                })
              }
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