import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import player from '../../interface/player';
import StateView from '../../components/StateView';
import ImgView from '../../components/ImgView';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
// import * as Echarts from 'echarts';
import unpackPositionData from '../../utils/unpackPositonData';
import HeatMap from '../../components/Heatmap';

interface State {
  call1: boolean,
  fail: number,
}


@observer class Record extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);

  }

  public state: State = {
    call1: false,
    fail: 0,
  }

  public componentDidMount(): void {
    // player.wardPage().then((value) => {
    //   if (value === 1) {
    //     this.setState({
    //       fail: 1
    //     })
    //   } else {
    //     this.setState({
    //       call1: true
    //     })
    //   }
    // })

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
            敬请期待
          </div>
          
        {
          this.state.call1 ? (
            <div>

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