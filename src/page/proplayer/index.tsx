import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import Toast from '../../components/Toast';
import StateView from '../../components/StateView';
import { observer } from 'mobx-react';
import proplayers from '../../interface/proplayer';
import ListView from '../../components/ListView';

interface State {
  fail: number,
}

@observer  class ProPlayers extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);
  }

  public state: State = {
    fail: 0,
  }

  public componentDidMount(): void {
    if (proplayers.proplayers) {

    } else {
      proplayers.getAllInfo().then((value) => {
        if (value === 1) {
          this.setState({
            fail: 1
          })
        }
      })
    }
  }

  public componentWillUnmount(): void {
    this.setState = () => {
      return;
    }
  }

  public render(): JSX.Element {
      return(
        proplayers.proplayers ? (
        <div className={styles.page}>
            <div className={styles.title}>
              <div className={styles.titleName}>职业ID</div>
              <div className={styles.titleTeam}>team</div>
            </div>
            <ListView
            itemArray={proplayers.proplayers}
            />
        </div>
        ) : this.state.fail === 1 ? (
          <StateView state={'fail'} />
        ) : (
          <StateView state={'loading'} />
        )
      )
    }
  }

  export default ProPlayers;