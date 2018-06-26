import config from '../../config';
import * as React from 'react';
import * as styles from './index.scss';
import * as classNames from 'classnames'
import history from '../../history';
import isHttp from '../../utils/ishttp';

interface Props {
  className: string;
  src: string;
  loading?: string;
  fail?: string;
  host?: string;
}

interface State {
  state: 'loading' | 'fail' | 'complete'
}

class ImgView extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);

    this.elemRef = React.createRef();
    this.onImgLoad = this.onImgLoad.bind(this);
    this.onImgError = this.onImgError.bind(this);
  }
  //用于判定组件是否被卸载，flag，避免state无组件报错警告
  private isUnmount: boolean | undefined;
  private imgElem: HTMLImageElement = new Image();
  private elemRef: React.RefObject<HTMLDivElement>;
  /** 用于加载图片，改变ImgView的状态 */


  public state: State = {
    state: 'loading'
  }

  public componentDidMount(): void {
    this.imgElem.addEventListener('load', this.onImgLoad);
    this.imgElem.addEventListener('error', this.onImgError);
    this.setImgSrc(this.props);
  }

  public componentWillUnmount(): void {
    this.isUnmount = true;

    if (this.imgElem) {
      this.imgElem.removeEventListener('load', this.onImgLoad);
      this.imgElem.removeEventListener('error', this.onImgError);
    }
  }

  private onImgLoad(): void {
    if (!this.isUnmount) {
      this.setState({ state: 'complete' });
    }
  }

  /** 图片的onerror事件 */
  private onImgError(): void {
    if (!this.isUnmount) {
      this.setState({ state: 'fail' });
    }
  }

  private getSrc(props: Props, src: string | undefined): string {
    const url = src && isHttp(src) ? src : props.host + src;

    return url;
  }

  private setImgSrc(props: Props): void {
    const src = this.getSrc(props, props.src);

    if (src && this.imgElem) {
      this.imgElem.src = src;
    } else {
      this.setState({
        state: 'fail'
      });
    }
  }

  public render(): JSX.Element {
    return (
      this.state.state === 'complete' ? (
        <div
        className={classNames({
          [this.props.className]: true
        })}
        style={{
          backgroundImage: `url(${this.getSrc(this.props,this.props.src)})`
        }}
        ref={this.elemRef}
        ></div>
      ) : (
        this.state.state === 'loading' ? (
          <div
          className={classNames({
            [this.props.className]: true,
            [styles.loading]: true
          })}
          ></div>
        ) : (
          <div
          className={classNames({
            [this.props.className]: true,
            [styles.fail]: true
          })}
          style={
            this.props.fail ? {
              backgroundImage: `url(${this.getSrc(this.props,this.props.fail)})`
            } : null
          }
          ></div>
        )
      )
    )
  }
}


export default ImgView;