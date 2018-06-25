import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames'
import history from '../../history';
import global from '../../config/global';

interface Props {
  
}

interface State {
  activeIndex: number
}

const TitleArray = [
  {
    'title': '个人数据',
    'icon': 'fa fa-user',
    'path': '/'
  },
  {
    'title': '职业玩家',
    'icon': 'fa fa-users',
    'path': '/proplayer'
  }
]

class TabBottom extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);

  }

  public state: State = {
    activeIndex: global.Global.tabActive
  }

  public render(): JSX.Element {
    return (
      <div className={styles.block}>
        {
          TitleArray.map((item, i) => {
            return (
              <div
              className={styles.box}
              key={i}
              onClick={() => {
                this.setState({
                  activeIndex: i
                });
                global.Global.tabActive = i;
                history.replace(item.path);
              }}
              >
                <div className={classNames({
                  [item.icon]: true,
                  [styles.text]: true,
                  [styles.textActive]: this.state.activeIndex === i
                })}></div>
                <div className={classNames({
                  [styles.text]: true,
                  [styles.textActive]: this.state.activeIndex === i,
                })}>
                  {item.title}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default TabBottom;