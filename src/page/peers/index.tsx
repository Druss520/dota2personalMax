import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import Toast from '../../components/Toast';

interface State {
}

class Peers extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);

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
            诶？队友呢
          </div>
          <div className={styles.body}>
            
          </div>
        </div>
      )
    }
  }

  export default Peers;