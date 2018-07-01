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


@observer class PeersClass extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);
  }

  public state: State = {
    call1: false,
    fail: 0,
  }



  public componentDidMount(): void {
    player.wardPage().then((value) => {
      if (value === 1) {
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
            眼位热力图
          </div>
          
         {
          this.state.call1 ? (
          <div className={styles.wardmap}>
            <div className={styles.title}>
              <div
              className={styles.icon}
              style={{
                backgroundImage: `url('${config.img.jiayan}')`
              }}
              >
              </div>
              侦查守卫
            </div>
            <HeatMap
            points={unpackPositionData(player.wardmap.obs)}
            width={window.screen.width-50}
            name={'obs'}
            />

            <div className={styles.title}>
            <div
              className={styles.icon}
              style={{
                backgroundImage: `url('${config.img.zhenyan}')`
              }}
              >
              </div>
              岗哨守卫
            </div>
            <HeatMap
            points={unpackPositionData(player.wardmap.sen)}
            width={window.screen.width-50}
            name={'sen'}
            />
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

  export default PeersClass;