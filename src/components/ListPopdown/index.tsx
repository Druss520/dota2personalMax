import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import { RecentMatches } from '../../interface/player';
import MatchItem from '../MatchItem';

interface State {
  toggle: boolean;
}

interface Props {
  matches: RecentMatches[]
}

class ListPopdown extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);
    if(this.props.matches.length <= 5) {
      this.setState({
        toggle: true
      })
    }
  }

  public state: State = {
    toggle: false
  }

  public render(): JSX.Element {

    return (
      <div className={styles.block}>
        <div className={styles.blockTitle}>
          最近比赛
        </div>
        <div className={styles.title}>
          <div className={styles.tleft}>
            <div className={styles.tleft1}>英雄</div>
            <div className={styles.tleft2}>胜负</div>
            <div className={styles.tleft3}>类型</div>
          </div>
          <div className={styles.tright}>
            <div className={styles.tright1}>时长</div>
            <div className={styles.tright2}>KDA</div>
          </div>
        </div>
        {
          this.state.toggle ? (
            this.props.matches.map((match, i) => {
              return (
                <MatchItem
                key={i}
                match={match}
                />
              )
            })
          ) : (
            <div>
              {
                this.props.matches.map((match, i) => {
                  if (i<5) {
                    return (
                      <MatchItem
                      key={i}
                      match={match}
                      />
                    )
                  }
                })
              }
              <div className={styles.showMore}
              onClick={() => {
                this.setState({
                  toggle: true
                })
              }}
              >
                <img
                className={styles.addIcon}
                src={config.img.add}
                />
                加载更多
              </div>
            </div>
          )
        }
      </div>
    )
  }  
}

export default ListPopdown;