import * as React from 'react';
import { Link } from 'react-router-dom';
import { getPlayer } from '../../interface/getPlayer';
import * as styles from './index.css';

interface State {
  player : any;
}

export default class App extends React.Component<IAppProps, State>{

  public state: State = {
    player: undefined
  }

  public async getData(): Promise<void> {
    getPlayer({account_id: 192820722}).then((res) => {
      console.log(res.data);
      this.setState({
        player: res.data
      });
    }).catch((e) => {
      console.log(e);
    })
  }

  public componentDidMount(): void {
    this.getData();
  }

  public render(): JSX.Element {
      return(
        <div className={styles.hehe}>
          <div className={styles.header}>
            Dota2 个人信息
          </div>
          <div className={styles.body}>
            body
          </div>
        </div>
      )
    }
  }