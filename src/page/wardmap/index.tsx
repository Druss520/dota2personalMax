import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import player from '../../interface/player';
import StateView from '../../components/StateView';
import PeerItem from '../../components/peersItem';
import Dialog from '../../components/dialog';
import Toast from '../../components/Toast';
import ImgView from '../../components/ImgView';
import { Peers } from '../../interface/player';
import getPeers from '../../interface/player/getPeers';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

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
          
        </div>
      )
    }
  }

  export default PeersClass;