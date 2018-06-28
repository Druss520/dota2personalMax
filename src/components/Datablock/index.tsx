import img from '../../config/imgCfg';
import * as React from 'react';
import * as styles from './index.scss';

interface Props {
  name: string;
  value: any;
  flat?: boolean;
}

const Datablock = (props: Props) => {
  const {name, value, flat} = props;

  return (
    <div className={flat? styles.propertyBlockFlat : styles.propertyBlock}>
      <div className={styles.property}>{name}</div>
      <div className={styles.propertyValue}>{value ? value : '--'}</div>
    </div>
  )
}


export default Datablock;