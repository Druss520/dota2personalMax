import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import matchDetail, { MatchDetail } from '../../interface/matchDetail';
import StateView from '../../components/StateView';
// import ImgView from '../../components/ImgView';
import { observer } from 'mobx-react';
// import { observable, action, values } from 'mobx';
import heroes from '../../interface/heros';
import standardTime from '../../utils/standardTime';
import timeDifference from '../../utils/timeDifference';
import PlayerDetial from '../../components/playerDetail';
import * as Echart from 'echarts';

const lobby_type = require('../../assets/json/lobby_type.json');
const gameMode = require('../../assets/json/game_mode.json');
const server = require('../../assets/json/region.json');


interface State {
  call1: boolean;
  fail: number;
  toggle: number | string;
}


@observer class Record extends React.Component<IAppProps, State>{

  constructor(props: IAppProps) {
    super(props);

    this.itemToggle = this.itemToggle.bind(this);
  }

  public state: State = {
    call1: false,
    fail: 0,
    toggle: -1,
  }

  public tempid: string;
  public radiantTotalDamage: number = 0;
  public direTotalDamage: number = 0;
  public radiantCount: number = 0;
  public direCount: number = 0;
  public provideProData: boolean = false;
  public hasChat: boolean = false;

  public componentDidMount(): void {
    this.makeReq();
    window.scrollTo(0, 0);
  }

  public async makeReq(): Promise<void> {
    if (heroes.heroArray) {

    } else {
      heroes.getHeroInfo().then((value) => {
        if (value) {
          this.setState({
            fail: 1
          })
        }
      })
    }

    matchDetail.detailMatchPage().then(res => {
      if (res) {
        this.setState({
          fail: 1
        })
      } else {
        this.dataPrepare();
        // console.log(this.direTotalDamage,this.direCount);
        this.setState({
          call1: true
        })
        setTimeout(() => {
          this.makeCharts();
        },100);
      }
    })

  }

  public makeCharts(): void {
    const chart1 = Echart.init(document.getElementById('echart1') as HTMLDivElement);
    const chart2 = Echart.init(document.getElementById('echart2') as HTMLDivElement);

    let tempArr = [];
    let maxNum = 0;
    let minNum = 0;
    let maxExp = 0;
    let minExp = 0;
    matchDetail.matchDetail.radiant_gold_adv.forEach((item, i) => {
      tempArr.push(i);
      if (item > maxNum) {
        maxNum = item
      }
      if (item < minNum) {
        minNum = item
      }
    });
    matchDetail.matchDetail.radiant_xp_adv.forEach((item, i) => {
      if (item > maxExp) {
        maxExp = item
      }
      if (item < minExp) {
        minExp = item
      }
    });

    const divert1 = (maxNum/(maxNum-minNum)).toFixed(3);
    const divert2 = (maxExp/(maxExp-minExp)).toFixed(3);


    const option1 = {
      title: {
        text:'经济图'
      },
      grid: {
        left: '15%',
        right: '15%'
      },
      xAxis: {
        name: '时间',
        type: 'category',
        boundaryGap: false,
        data: tempArr
      },
      yAxis: {
        name: '金钱',
        type: 'value',
        max: maxNum,
        min: minNum,
      },
      series: [{
        data: matchDetail.matchDetail.radiant_gold_adv,
        type: 'line',
        showSymbol: false,
        lineStyle: {
          width: 1,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgb(45, 167, 45)' // 0% 处的颜色
            }, {
              offset: divert1, color: 'rgb(45, 167, 45)'
            }, {
              offset: divert1, color: 'rgb(168, 50, 50)'
            }, {
              offset: 1, color: 'rgb(168, 50, 50)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgb(45, 167, 45)' // 0% 处的颜色
            }, {
              offset: divert1, color: 'rgb(45, 167, 45)'
            }, {
              offset: divert1, color: 'rgb(168, 50, 50)'
            }, {
              offset: 1, color: 'rgb(168, 50, 50)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      }]
    };

    chart1.setOption(option1);

    const option2 = {
      title: {
        text:'经验图'
      },
      grid: {
        left: '15%',
        right: '15%'
      },
      xAxis: {
        name: '时间',
        type: 'category',
        boundaryGap: false,
        data: tempArr
      },
      yAxis: {
        name: '经验值',
        type: 'value',
        max: maxExp,
        min: minExp,
      },
      series: [{
        data: matchDetail.matchDetail.radiant_xp_adv,
        type: 'line',
        showSymbol: false,
        lineStyle: {
          width: 1,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgb(45, 167, 45)' // 0% 处的颜色
            }, {
              offset: divert2, color: 'rgb(45, 167, 45)'
            }, {
              offset: divert2, color: 'rgb(168, 50, 50)'
            }, {
              offset: 1, color: 'rgb(168, 50, 50)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgb(45, 167, 45)' // 0% 处的颜色
            }, {
              offset: divert2, color: 'rgb(45, 167, 45)'
            }, {
              offset: divert2, color: 'rgb(168, 50, 50)'
            }, {
              offset: 1, color: 'rgb(168, 50, 50)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      }]
    };

    chart2.setOption(option2);

  }

  public componentWillUnmount(): void {
    this.setState = () => {
      return;
    }
  }

  public dataPrepare(): void {
    if (matchDetail.matchDetail.chat !== null && matchDetail.matchDetail.version !== null) {
      this.provideProData = true;
    }
    const Lgth = Math.floor(matchDetail.matchDetail.players.length / 2);
    for (let i = 0; i < Lgth; i++) {
      this.radiantTotalDamage += matchDetail.matchDetail.players[i].hero_damage
      this.radiantCount += matchDetail.matchDetail.players[i].kills
    }
    for (let i = Lgth; i < Lgth * 2; i++) {
      this.direTotalDamage += matchDetail.matchDetail.players[i].hero_damage
      this.direCount += matchDetail.matchDetail.players[i].kills
    }
  }

  public itemToggle(slot: string | number) {
    this.setState({
      toggle: slot
    })
  }

  public render(): JSX.Element {

    const DashItem = (name: string, value: string | number) => {
      return (
        <div className={styles.dashItem}>
          <div className={styles.name}>{name}:</div>
          <div className={styles.value}>{value ? value : '--'}</div>
        </div>
      )
    }

    const getMatchLevel = (num: number | null) => {
      if (num === 1 || !num) {
        return '鱼塘局'
      } else if (num === 2) {
        return 'High局'
      } else if (num === 3) {
        return 'VeryHigh局'
      }
    }

    const makeBoard = (match: MatchDetail) => {
      return (
        <div className={styles.scoreBoard}>
          <div className={classNames([
            styles.scoreBorderItem,
            styles.rd
          ])}>{Math.floor(this.radiantCount / 10)}</div>
          <div className={classNames([
            styles.scoreBorderItem,
            styles.rd
          ])}>{Math.floor(this.radiantCount % 10)}</div>
          <div className={styles.coma}>:</div>
          <div className={classNames([
            styles.scoreBorderItem,
            styles.dr
          ])}>{Math.floor(this.direCount / 10)}</div>
          <div className={classNames([
            styles.scoreBorderItem,
            styles.dr
          ])}>{Math.floor(this.direCount % 10)}</div>
        </div>
      )
    }

    const groupBoard = (match: MatchDetail, group: 'rd' | 'dr') => {
      const Lgth = Math.floor(match.players.length / 2);
      let rdg = 0;
      let rdx = 0;
      if (group === 'rd') {
        for (let i = 0; i < Lgth; i++) {
          rdg += match.players[i].gold_per_min;
          rdx += match.players[i].xp_per_min;
        }
      } else {
        for (let i = Lgth; i < Lgth * 2; i++) {
          rdg += match.players[i].gold_per_min;
          rdx += match.players[i].xp_per_min;
        }
      }
      return (
        <div className={styles.groupBoard}>
          <div className={styles.top}>GPM: {rdg}</div>
          <div>XPM: {rdx}</div>
        </div>
      )
    }

    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={classNames([
            styles.back,
            'fa fa-chevron-left'
          ])}
            onClick={() => {
              history.goBack();
            }}
          >
          </div>
          比赛详情
          </div>
        {
          this.state.call1 && heroes.heroArray ? (
            <div>
              <div className={styles.dashBoard}>
                {DashItem('比赛ID', matchDetail.matchDetail.match_id)}
                {DashItem('比赛时长', standardTime(matchDetail.matchDetail.duration))}
                {DashItem('开始时间', timeDifference(matchDetail.matchDetail.start_time))}
                {DashItem('比赛模式', (
                  matchDetail.matchDetail.lobby_type === 0 ? (
                    gameMode[matchDetail.matchDetail.game_mode] ? (
                      gameMode[matchDetail.matchDetail.game_mode].chinese
                    ) : null
                  ) : (
                      matchDetail.matchDetail.lobby_type === 4 ? (
                        gameMode[matchDetail.matchDetail.game_mode] ? (
                          gameMode[matchDetail.matchDetail.game_mode].chinese
                        ) : null
                      ) : (
                          lobby_type[matchDetail.matchDetail.lobby_type] ? (
                            lobby_type[matchDetail.matchDetail.lobby_type].chinese
                          ) : null
                        )
                    )
                ))}
                {DashItem('服务器', server[matchDetail.matchDetail.region])}
                {DashItem('一血时间', standardTime(matchDetail.matchDetail.first_blood_time))}
                {DashItem('比赛分段', getMatchLevel(matchDetail.matchDetail.skill))}
              </div>
              <div className={styles.score}>
                {groupBoard(matchDetail.matchDetail, 'rd')}
                {makeBoard(matchDetail.matchDetail)}
                {groupBoard(matchDetail.matchDetail, 'dr')}
              </div>
              <div className={styles.leagueBlock}>
                <div className={styles.radiant}>
                  <div className={styles.leagueBlockTitle}>天辉</div>
                  <div className={styles.leagueBlockResult}>{matchDetail.matchDetail.radiant_win ? '胜利' : '失败'}</div>
                </div>
                {
                  matchDetail.matchDetail.players.map((item, i) => {
                    if (i < 5) {
                      return (
                        <PlayerDetial
                          item={item}
                          totalCount={this.radiantCount}
                          totalDamage={this.radiantTotalDamage}
                          key={i}
                          type='rd'
                          toggle={this.itemToggle}
                          onSelect={this.state.toggle}
                          providePro={this.provideProData}
                        />
                      )
                    }
                  })
                }
              </div>
              <div className={styles.leagueBlock}>
                <div className={styles.dire}>
                  <div className={styles.leagueBlockTitle}>夜魇</div>
                  <div className={styles.leagueBlockResult}>{matchDetail.matchDetail.radiant_win ? '失败' : '胜利'}</div>
                </div>
                {
                  matchDetail.matchDetail.players.map((item, i) => {
                    if (i > 4 && i < 10) {
                      return (
                        <PlayerDetial
                          item={item}
                          totalCount={this.direCount}
                          totalDamage={this.direTotalDamage}
                          key={i}
                          type='dr'
                          toggle={this.itemToggle}
                          onSelect={this.state.toggle}
                          providePro={this.provideProData}
                        />
                      )
                    }
                  })
                }
              </div>
              {
                this.provideProData ? (
                  <div>
                    <div className={styles.chatTitle}>聊天记录</div>
                    <div className={styles.chatBlock}>
                      {
                        matchDetail.matchDetail.chat.map((item, i) => {
                          if (item.type === 'chat') {
                            this.hasChat = true;
                            if (item.player_slot > 100) {
                              return (
                                <div className={styles.chatItemRed}
                                  key={i}
                                >{item.key}</div>
                              )
                            } else {
                              return (
                                <div className={styles.chatItemGreen}
                                  key={i}
                                >{item.key}</div>
                              )
                            }
                          }
                          if (i === matchDetail.matchDetail.chat.length - 1 && !this.hasChat) {
                            return (
                              <div
                              key={i}
                              >
                                (无聊天内容)
                            </div>
                            )
                          }
                        })
                      }
                    </div>
                    <div className={styles.echartTitle}>
                      比赛走势
                    </div>
                    <div className={styles.echartBlock}>
                      <div className={styles.describe}>
                        <div className={styles.descBlock}>
                          <div className={styles.block1}></div>
                          <div className={styles.chartDescTitle}>天辉</div>
                        </div>
                        <div className={styles.descBlock}>
                          <div className={styles.block2}></div>
                          <div className={styles.chartDescTitle}>夜魇</div>
                        </div>
                      </div>
                      {/* <div className={styles.chartItemTitle1}>经济</div> */}
                      <div
                        className={styles.echart1}
                        id={'echart1'}
                      ></div>
                      {/* <div className={styles.chartItemTitle2}>经验</div> */}
                      <div
                        className={styles.echart1}
                        id={'echart2'}
                      ></div>
                    </div>
                  </div>
                ) : null
              }
            </div>
          ) : this.state.fail === 1 ? (
            <StateView state={'fail'} />
          ) : (
                this.state.fail === 2 ? (
                  <StateView state={'empty'} />
                ) : (
                    <StateView state={'loading'} />
                  )
              )
        }
      </div>
    )
  }
}

export default Record;