import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import matchDetail from '../../interface/matchDetail';
import StateView from '../../components/StateView';
// import ImgView from '../../components/ImgView';
import { observer } from 'mobx-react';
// import { observable, action, values } from 'mobx';
import heroes from '../../interface/heros';
import standardTime from '../../utils/standardTime';
import timeDifference from '../../utils/timeDifference';

const lobby_type = require('../../assets/json/lobby_type.json');
const gameMode = require('../../assets/json/game_mode.json');
const server = require('../../assets/json/region.json');


interface State {
  call1: boolean;
  fail: number;
  call2: boolean;
}


@observer class Record extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);

  }

  public state: State = {
    call1: false,
    call2: false,
    fail: 0,
  }

  public tempid: string;

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


  public render(): JSX.Element {

    const DashItem = (name:string, value: string | number) => {
      return (
        <div className={styles.dashItem}>
          <div className={styles.name}>{name}:</div>
          <div className={styles.value}>{value ? value : '--'}</div>
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
              </div>
              <div className={styles.leagueBlock}>
                <div className={styles.radiant}>
                  <div className={styles.leagueBlockTitle}>天辉</div>
                  <div className={styles.leagueBlockResult}>{matchDetail.matchDetail.radiant_win ? '胜利':'失败'}</div>
                </div>
              </div>
              <div className={styles.leagueBlock}>
                <div className={styles.dire}>
                  <div className={styles.leagueBlockTitle}>夜魇</div>
                  <div className={styles.leagueBlockResult}>{matchDetail.matchDetail.radiant_win ? '失败':'胜利'}</div>
                </div>
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