import config from '../../config';
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

const lobby_type = require('../../assets/json/lobby_type.json');
const gameMode = require('../../assets/json/game_mode.json');
const server = require('../../assets/json/region.json');


interface State {
  call1: boolean;
  fail: number;
  call2: boolean;
  toggle: number | string;
}


@observer class Record extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);

    this.itemToggle = this.itemToggle.bind(this);
  }

  public state: State = {
    call1: false,
    call2: false,
    fail: 0,
    toggle: -1,
  }

  public tempid: string;
  public radiantTotalDamage: number = 0;
  public direTotalDamage: number = 0;
  public radiantCount: number = 0;
  public direCount: number = 0;

  public componentDidMount(): void {
    this.makeReq();
    window.scrollTo(0,0);
  }

  public async makeReq(): Promise<void> {
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
      }
    })
    
  }

  public componentWillUnmount(): void {
    this.setState = () => {
      return;
    }
  }

  public dataPrepare(): void {
    const Lgth = Math.floor(matchDetail.matchDetail.players.length/2);
    for (let i=0; i< Lgth;i++) {
      this.radiantTotalDamage += matchDetail.matchDetail.players[i].hero_damage
      this.radiantCount += matchDetail.matchDetail.players[i].kills
    }
    for (let i=Lgth; i< Lgth*2;i++) {
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

    const DashItem = (name:string, value: string | number) => {
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
          ])}>{Math.floor(this.radiantCount/10)}</div>
          <div className={classNames([
            styles.scoreBorderItem,
            styles.rd
          ])}>{Math.floor(this.radiantCount%10)}</div>
          <div className={styles.coma}>:</div>
          <div className={classNames([
            styles.scoreBorderItem,
            styles.dr
          ])}>{Math.floor(this.direCount/10)}</div>
          <div className={classNames([
            styles.scoreBorderItem,
            styles.dr
          ])}>{Math.floor(this.direCount%10)}</div>
        </div>
      )
    }

    const groupBoard = (match: MatchDetail, group: 'rd' | 'dr') => {
      const Lgth = Math.floor(match.players.length/2);
      let rdg = 0;
      let rdx = 0;
      if (group === 'rd') {
        for (let i=0; i< Lgth;i++) {
          rdg += match.players[i].gold_per_min;
          rdx += match.players[i].xp_per_min;
        }
      } else {
        for (let i=Lgth; i< Lgth*2;i++) {
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

      return(
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
          this.state.call1 && this.state.call2 ? (
            <div>
              <div className={styles.dashBoard}>
                {DashItem('比赛ID',matchDetail.matchDetail.match_id)}
                {DashItem('比赛时长',standardTime(matchDetail.matchDetail.duration))}
                {DashItem('开始时间',timeDifference(matchDetail.matchDetail.start_time))}
                {DashItem('比赛模式',(
                  matchDetail.matchDetail.lobby_type === 0 ? (
                    gameMode[matchDetail.matchDetail.game_mode] ? (
                      gameMode[matchDetail.matchDetail.game_mode].chinese
                    ) : null
                  ) : (
                    matchDetail.matchDetail.lobby_type  === 4 ? (
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
                {DashItem('服务器',server[matchDetail.matchDetail.region])}
                {DashItem('一血时间',standardTime(matchDetail.matchDetail.first_blood_time))}
                {DashItem('比赛分段',getMatchLevel(matchDetail.matchDetail.skill))}
              </div>
              <div className={styles.score}>
                {groupBoard(matchDetail.matchDetail,'rd')}
                {makeBoard(matchDetail.matchDetail)}
                {groupBoard(matchDetail.matchDetail,'dr')}
              </div>
              <div className={styles.leagueBlock}>
                <div className={styles.radiant}>
                  <div className={styles.leagueBlockTitle}>天辉</div>
                  <div className={styles.leagueBlockResult}>{matchDetail.matchDetail.radiant_win ? '胜利':'失败'}</div>
                </div>
                {
                  matchDetail.matchDetail.players.map((item, i) => {
                    if (i<5) {
                      return (
                        <PlayerDetial
                        item={item}
                        totalCount={this.radiantCount}
                        totalDamage={this.radiantTotalDamage}
                        key={i}
                        type='rd'
                        toggle={this.itemToggle}
                        onSelect={this.state.toggle}
                        />
                      )
                    }
                  })
                }
              </div>
              <div className={styles.leagueBlock}>
                <div className={styles.dire}>
                  <div className={styles.leagueBlockTitle}>夜魇</div>
                  <div className={styles.leagueBlockResult}>{matchDetail.matchDetail.radiant_win ? '失败':'胜利'}</div>
                </div>
                {
                  matchDetail.matchDetail.players.map((item, i) => {
                    if (i>4 && i<10) {
                      return (
                        <PlayerDetial
                        item={item}
                        totalCount={this.direCount}
                        totalDamage={this.direTotalDamage}
                        key={i}
                        type='dr'
                        toggle={this.itemToggle}
                        onSelect={this.state.toggle}
                        />
                      )
                    }
                  })
                }
              </div>
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