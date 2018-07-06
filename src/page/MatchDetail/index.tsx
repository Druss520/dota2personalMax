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
              数据我已经请求到了，奈何没空写UI，等着吧
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