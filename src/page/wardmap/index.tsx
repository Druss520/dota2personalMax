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
  img1Width: number;
  img2Width: number;
  key1: string;
  key2: string;
}


@observer class PeersClass extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);

    this.onImgClick = this.onImgClick.bind(this);
  }

  public state: State = {
    call1: false,
    fail: 0,
    img1Width: window.innerWidth-50 > 600 ? 600 : window.innerWidth-50,
    img2Width: window.innerWidth-50 > 600 ? 600 : window.innerWidth-50,
    key1: Math.random().toString(),
    key2: Math.random().toString()
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

  public onImgClick(name: string): void {
    // console.log(name);
    if (name === 'obs') {
      this.setState({
        img1Width: this.state.img1Width === 600 ? window.innerWidth-50 : 600,
        key1: Math.random().toString(),
      })
    } else {
      this.setState({
        img2Width: this.state.img2Width === 600 ? window.innerWidth-50 : 600,
        key2: Math.random().toString()
      })
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
            <div className={styles.overflow}>
            <HeatMap
            points={unpackPositionData(player.wardmap.obs)}
            width={this.state.img1Width}
            imgClick={this.onImgClick}
            name={'obs'}
            key={this.state.key1}
            />
            </div>
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
            <div className={styles.overflow}>
            <HeatMap
            points={unpackPositionData(player.wardmap.sen)}
            width={this.state.img2Width}
            imgClick={this.onImgClick}
            name={'sen'}
            key={this.state.key2}
            />
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

  export default PeersClass;