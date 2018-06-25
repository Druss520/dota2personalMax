import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import history from '../../history';
import Toast from '../../components/Toast';

interface State {
  playerId: string;
}

class Entry extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public state: State = {
    playerId: ''
  }

  public onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    this.setState({
      playerId: value
    })
  }

  public onSubmit(): void {
    const value = this.state.playerId;
    const regex = /^[0-9]{8,9}$/;
    if (value.match(regex)) {
      config.global.Global.accountId = value;
      setTimeout(() => {
        history.push('/');
      }, 300)
    } else {
      Toast.warning('ID格式不正确',2);
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
            菜不菜战绩说了算
          </div>
          <div className={styles.body}>
            <img
              className={styles.img}
              src={config.img.aegis}
            />
            <div className={styles.text}>
              CN DOTA, BEST DOTA
            </div>
            <div className={styles.row}>
              <input
              className={styles.input}
              type="number"
              placeholder={'输入8-9位游戏id以继续'}
              onChange={(e) => {
                this.onChange(e);
              }}
              />
              <div className={classNames([
                'fa fa-arrow-circle-right fa-2x',
                styles.button
              ])}
              onClick={() => {
                this.onSubmit();
              }}
              ></div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Entry;