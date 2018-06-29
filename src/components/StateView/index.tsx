import img from '../../config/imgCfg';
import * as React from 'react';
import * as styles from './index.scss';

interface Props {
  state: string;
  onClick?: () => void;
}

const StateView = (props: Props) => {
  const {state} = props;

  return (
    state === 'loading' ? (
      <div className={styles.emptyPage}>
        <img
          className={'loading'}
          src={img.loading}
        />
      </div>
    ) : (
      state === 'empty' ? (
        <div className={styles.reload}>
        <img
        className={styles.noSuch}
        src={img.empty}
        />
        <div className={styles.hint}>未找到玩家信息</div>
        </div>
      ) : (
        <div className={styles.reload}
        onClick={() => {
          window.location.reload();
        }}
        > 
          <img
          className={styles.fail}
          src={img.fail}
          />
          点击重新加载
        </div>
      )
    )
  )
}


export default StateView;