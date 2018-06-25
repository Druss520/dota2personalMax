import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import Toast from '../../components/Toast';

interface State {
  playerId: string;
}

class ProPlayers extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);
  }

  public state: State = {
    playerId: ''
  }

  public render(): JSX.Element {
      return(
        <div className={styles.page}>
        
        </div>
      )
    }
  }

  export default ProPlayers;