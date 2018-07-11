import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import player, { Peers } from '../../interface/player';
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

function getNamefromList(key: string): string {
  let val = '';
  wordList.forEach((item) => {
    if(key === item.param) {
      val = item.name
    }
  })
  return val;
}

class DropDown extends React.Component <Props> {
  
  constructor(props: Props) {
    super(props);

    this.click = this.click.bind(this);
    this.pick = this.pick.bind(this);
  }

  public state: State = {
    toggle: false,
    word: player.keyWordHistory ? getNamefromList(player.keyWordHistory) : wordList[0].name
  }

  public click(e: React.MouseEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      toggle: !this.state.toggle
    })
  }

  public pick(key: {name: string, param: string}): void {
    this.setState({
      word: key.name
    })
    // console.log(key.param,33333);
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
        ) : <div></div>
      }
        <div className={styles.block}
        onClick={(e) => {
          this.click(e);
        }}
        >
        <div className={styles.innerBox}>
          <div className={styles.text}>{this.state.word}</div>
          <div className={classNames([
            'fa fa-caret-down',
            styles.icon
          ])}>
          </div>
        </div>

        <div className={classNames({
          [styles.hide]: true,
          [styles.visible]: this.state.toggle,
        })}>
        {
          this.state.toggle ? (
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
            ) : null
        }
        </div>
        </div>
      </div>
    )
  }
}


export default DropDown;