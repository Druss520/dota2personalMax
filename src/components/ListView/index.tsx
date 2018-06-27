import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import ProPlayerItem from '../../components/proPlayerItem';
import { ProPlayers } from '../../interface/proplayer';

interface State {
  toggle: number;
}

interface Props {
  itemArray: ProPlayers[],
}

class ListPopdown extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.listSize = this.props.itemArray.length;
    // console.log(this.listSize);
    if(this.listSize <= this.pageSize) {
      this.setState({
        toggle: this.listSize
      })
    }
  }

  public listSize: number;

  public pageSize: number = 30;

  public state: State = {
    toggle: this.pageSize
  }

  public handleClick(): void {
    this.setState({
      toggle: this.state.toggle + this.pageSize
    })
  }

  public render(): JSX.Element {

    return (
      <div className={styles.block}>
        {
          this.props.itemArray.map((item, i) => {
            if (i<this.state.toggle) {
              return (
                <ProPlayerItem
                key={i}
                proplayer={item}
                />
              )
            }
          })
        }
        {
          this.state.toggle >= this.listSize ? (
            null
          ) : (
            <div className={styles.showMore}
            onClick={() => {
              this.handleClick();
            }}
            >
              <img
              className={styles.addIcon}
              src={config.img.add}
              />
              加载更多
            </div>
          
          )
        }
      </div>
    )
  }  
}

export default ListPopdown;