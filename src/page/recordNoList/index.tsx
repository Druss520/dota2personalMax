import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import player from '../../interface/player';
import StateView from '../../components/StateView';
// import ImgView from '../../components/ImgView';
import { observer } from 'mobx-react';
// import { observable, action, values } from 'mobx';
import RecordListItem from '../../components/recordListItem';
import heroes from '../../interface/heros';
import DropDown from '../../components/DropDown';

interface State {
  call1: boolean;
  fail: number;
  call2: boolean;
  // keyWord: string;
}

export const wordList = [
  {
    param: 'kills',
    name: '最高击杀'
  },
  {
    param: 'deaths',
    name: '最高死亡'
  },
  {
    param: 'assists',
    name: '最多助攻'
  },
  {
    param: 'kda',
    name: 'KDA'
  },
  {
    param: 'gold_per_min',
    name: 'GPM'
  },
  {
    param: 'xp_per_min',
    name: 'XPM'
  },
  {
    param: 'last_hits',
    name: '最高正补'
  },
  {
    param: 'denies',
    name: '最多反补'
  },
  {
    param: 'lane_efficiency_pct',
    name: '对线效率(%)'
  },
  {
    param: 'duration',
    name: '比赛时长'
  },
  {
    param: 'hero_damage',
    name: '最高伤害'
  },
  {
    param: 'tower_damage',
    name: '建筑伤害'
  },
  {
    param: 'hero_healing',
    name: '最高治疗'
  },
  {
    param: 'courier_kills',
    name: '信使击杀'
  },
  {
    param: 'purchase_ward_observer',
    name: '假眼购买'
  },
  {
    param: 'purchase_ward_sentry',
    name: '真眼购买'
  },
  {
    param: 'actions_per_min',
    name: 'APM'
  },
]

function getNamefromList(key: string): string {
  let val = '';
  wordList.forEach((item) => {
    if(key === item.param) {
      val = item.name
    }
  })
  return val;
}


@observer class Record extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);

    this.changeKeyWord = this.changeKeyWord.bind(this);
  }

  public state: State = {
    call1: false,
    call2: false,
    fail: 0,
    // keyWord: 'kills',
  }

  public tempid: string;
  public keyWord: string = 'kills';

  public componentDidMount(): void {
    window.scrollTo(0,0);

    this.tempid = config.global.Global.accountId
    const prevAccountId = player.previousRecord;
    if (this.tempid !== prevAccountId) {
      this.makeReq();
    } else {
      if (heroes.heroArray && player.recordList.length !== 0) {
        this.setState({
          call1: true,
          call2: true
        })
      } else {
        this.makeReq();
      }
    }
  
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

    const params = {
      sort: this.keyWord,
      limit: 10
    }

    // console.log(params.sort, 555555);

    player.getMatchRecordList(params).then(res => {
      if (res) {
        this.setState({
          call1: true
        })
        player.previousRecord = this.tempid;
      } else {
        this.setState({
          fail: 1
        })
      }
    })

  }

  public componentWillUnmount(): void {
    this.setState = () => {
      return;
    }
  }

  public changeKeyWord(key: string): void {
    // console.log(key, 44444);
    this.setState({
      call1: false
    });
    this.keyWord = key;
    this.makeReq();
  }


  public render(): JSX.Element {
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
            记录排行
          </div>
          <div className={styles.selectRow}>
            <div className={styles.word}>
              选择类型
            </div>
            <DropDown
            onPick={this.changeKeyWord}
            />
          </div>
          <div className={styles.title}>
            <div className={styles.tt1}>英雄</div>
            <div className={styles.tt3}>分数</div>
            <div className={styles.tt4}>时间</div>
            <div className={styles.tt5}>结果</div>
          </div>
        {
          this.state.call1 && this.state.call2 ? (
            player.recordList.map((item, i) => {
              return (
                <RecordListItem
                records={item}
                name={getNamefromList(this.keyWord)}
                param={this.keyWord}
                key={i}
                />
              )
            })
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