import * as React from 'react';
import * as style from './index.scss';
import * as classNames from 'classnames';

interface Props {
  text: string;
  loadingState: 'loading' | 'complete';
}

const Loading = (props: Props) => {
  const {text, loadingState} = props;

  return (
      <div className={classNames({
        [style.loading]: true,
        [style.loadingNomask]: loadingState === 'complete',
        [style.loadingMask]: loadingState === 'loading',
        [style.loadingFade]: loadingState === 'loading'
      })}>
        <div className={style.loadingText}>
          {text}
        </div>
      </div>
  );
};

export default Loading;