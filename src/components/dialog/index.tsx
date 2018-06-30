import * as React from 'react';
import * as style from './index.scss';


interface Props {
  dialogclose: () => void;
  visible?: boolean;
}

class Dialog extends React.Component <Props> {
  
  constructor (props: Props) {
    super(props);
  }


  public render(): JSX.Element {
    const props = this.props

    return (
      <div className={style.pageDialog} style={{display: props.visible ? 'block' : 'none'}}>
        <div className={style.pageDialogMask}/>
        <div className={style.pageDialogBox}>
          {this.props.children}
          <div
          className={style.pageDialogBtn}
          onClick={(e) => {
            e.stopPropagation();
            props.dialogclose();
          }}
          >
          返回
          </div>
        </div>
      </div>
    );
  }
};

export default Dialog;