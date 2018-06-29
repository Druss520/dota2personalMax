import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames';
import StateView from '../../components/StateView';
import { observer } from 'mobx-react';
import search from '../../interface/searchName';
import PlayerItem from '../../components/searchPlayerItem';
import Toast from '../../components/Toast';

interface State {
  call1: boolean,
  fail: number,
  input: string;
}

@observer  class SearchName extends React.Component<IAppProps,State>{

  constructor(props: IAppProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public state: State = {
    call1: true,
    fail: 0,
    input: ''
  }

  public componentDidMount(): void {
    
  }

  public componentWillUnmount(): void {
    this.setState = () => {
      return;
    }
  }

  public onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    this.setState({
      input: value
    })
  }

  public onSubmit (): void {
    if (this.state.input === '') {
      Toast.warning('请输入内容', 1.5);
    } else {
      this.setState({
        call1: false,
        fail: 0
      });
      search.getAllInfo(this.state.input).then((value) => {
        if (value === 1) {
          this.setState({
            fail: 1,
          })
        } else if (value === 2) {
          this.setState({
            fail: 2
          })
        } else {
          this.setState({
            call1: true,
            fail: 0
          })
        }
      })
    }
  }

  public render(): JSX.Element {
      return(
        <div>
        <div className={styles.searchHeader}>
          <div className={styles.inputFrame}>
            <input
            className={styles.input}
            type={'text'}
            placeholder={'输入玩家Steam昵称'}
            onChange={(e) => {
              this.onChange(e);
            }}
            value={this.state.input}
            />
          </div>
          <div className={styles.searchBtn}
          onClick={() => this.onSubmit()}
          >
            <div
            className={classNames([
              'fa fa-search'
            ])}
            ></div>
          </div>
        </div>
        {
          this.state.call1 ? (
          <div className={styles.page}>
            <div className={styles.container}>
              {
                search.playerNames ? (
                  search.playerNames.map((item, i) => {
                    return (
                      <PlayerItem
                      key={i}
                      searchplayer={item}
                      />
                    )
                  })
                ) : null
              }
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

  export default SearchName;