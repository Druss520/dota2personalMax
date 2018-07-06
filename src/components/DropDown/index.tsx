import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import { Peers } from '../../interface/player';
import ImgView from '../ImgView';
// import history from '../../history';
import Toast from '../Toast';
import * as classNames from 'classnames';
import { wordList } from '../../page/recordNoList';


interface Props {
  onPick: (keyword: string) => void;
}

interface State {
  toggle: boolean;
  word: string;
}

class DropDown extends React.Component <Props> {
  
  constructor(props: Props) {
    super(props);

    this.click = this.click.bind(this);
    this.pick = this.pick.bind(this);
  }

  public state: State = {
    toggle: false,
    word: wordList[0].name
  }

  public click(): void {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  public pick(key: {name: string, param: string}): void {
    this.setState({
      word: key.name
    })
    this.props.onPick(key.param);
  }
  
  public render(): JSX.Element {

    return (
      <div>
      {
        this.state.toggle ? (
          <div className={styles.pageDialogMask}
          onClick={() => {
            this.setState({
              toggle: false
            })
          }}
          />
        ) : null
      }
        <div className={styles.block}
        onClick={() => {
          this.click();
        }}
        >
        {this.state.word}
        <div className={classNames([
          'fa fa-caret-down',
          styles.icon
        ])}>
        </div>
        {
          this.state.toggle ? (
            <div className={styles.visible}>
              {
                wordList.map((item, i) => {
                  return (
                    <div className={styles.unit}
                    key={i}
                    onClick={() => this.pick(item)}
                    >
                    {item.name}
                    </div>
                  )
                })
              }
            </div>
          ) : <div className={styles.hide}></div>
        }
        </div>
      </div>
    )
  }
}


export default DropDown;