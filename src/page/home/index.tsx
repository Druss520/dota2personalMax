import * as React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './index.css';

interface State {
  
}

export default class App extends React.Component<IAppProps, State>{

  public async getData(): Promise<void> {
    
  }

  public componentDidMount(): void {

  }

  public render(): JSX.Element {
      return(
        <div className={styles.hehe}>
          <div className={styles.header}>
            Dota2 个人信息
          </div>
          <div className={styles.body}>
            <div>

            </div>
          </div>
        </div>
      )
    }
  }