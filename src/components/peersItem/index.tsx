import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import { Peers } from '../../interface/player';
import ImgView from '../ImgView';
// import history from '../../history';
import Toast from '../Toast';
import * as classNames from 'classnames';


interface Props {
  peer: Peers;
  onclick: (id: string) => void;
  checkState: {};
  onCheck: boolean;
}

class MatchItem extends React.Component <Props> {
  
  constructor(props: Props) {
    super(props);

    this.click = this.click.bind(this);
  }

  public peer: Peers = this.props.peer;

  public click(): void {
    if (this.props.onCheck) {
      this.props.onclick(this.peer.account_id.toString());
    } else {
      const idDiv = this.refs[this.peer.account_id.toString()] as HTMLElement;
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(idDiv);
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('Copy',false, null);
      Toast.show('已复制id到剪贴板', 1, 'success');
      sel.removeAllRanges();
    }
  }
  
  public render(): JSX.Element {

    return (
      <div className={styles.block}
      onClick={() => {
        this.click();
      }}
      >
      {
        this.props.onCheck ? (
          <div className={styles.outerLeft}>
            <div className={classNames({
              [styles.checkIcon]: true,
              ['fa fa-circle-thin']: this.props.checkState[this.peer.account_id.toString()] === undefined,
              ['fa fa-check-circle']: this.props.checkState[this.peer.account_id.toString()] === this.peer.account_id.toString()
            })}>
            </div>
          </div>
        ) : null
      }
        <div className={ this.props.onCheck ? styles.outerRightShrink : styles.outerRight}>
          <ImgView
          className={styles.avatar}
          src={this.peer.avatarfull}
          />
          <div className={styles.left}>
            <div className={styles.name}>
              {this.peer.personaname}
            </div>
            <div className={styles.id}
            ref={this.peer.account_id.toString()}
            >
              {this.peer.account_id}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.upRow}>
              <div className={styles.upRowLeft}>{this.peer.with_games}</div>
              <div>{(this.peer.with_win/this.peer.with_games*100).toFixed(1) + '%'}</div>
            </div>
            <div className={styles.bottomRowFrame}>
              <div className={styles.bottomRow}
              style={{
                width: `${(this.peer.with_win/this.peer.with_games*100).toFixed(1)}%`
              }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default MatchItem;