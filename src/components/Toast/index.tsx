
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as classNames from 'classnames';
import ToastPure, { ToastProps } from './Toast';
import './index.scss';

interface Props extends ToastProps {
  className?: string;
  duration?: number;
  onClose?: () => void;
  mask?: boolean;
}

interface State {
  fade: boolean;
}

const now = Date.now();
const prefixCls = 'yj-component-toast';

function getContainer(): HTMLElement {
  const uuid = `toast_${now}`;
  let container = document.getElementById(uuid);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', uuid);
    document.body.appendChild(container);
  }
  return container;
}

class Toast extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  public static defaultProps: Props = {
    type: undefined,
    duration: 3
  };

  public state: State = {
    fade: false
  };

  public static show = (content: string, duration?: number) => {
    ReactDom.render((
      <Toast duration={duration}>{content}</Toast>
    ), getContainer());
  }

  public static warning = (content: string, duration?: number) => {
    ReactDom.render((
      <Toast duration={duration} type={'fail'}>{content}</Toast>
    ), getContainer());
  }

  public static loading = (content: string) => {
    ReactDom.render((
      <Toast className={`${prefixCls}-loading`} duration={10000} mask>{content}</Toast>
    ), getContainer());
  }

  public static close = () => {
    const container = getContainer();
    ReactDom.unmountComponentAtNode(container);
    document.body.removeChild(container);
  }

  private closeTimer: number | NodeJS.Timer | null | undefined;
  private unmountTimer: number | NodeJS.Timer | null | undefined;
  /** 是否执行了componentWillUnmount */
  private isUnmount: boolean = false;

  public componentDidMount(): void {
    if (this.isUnmount === false) {
      this.startCloseTimer();
      setTimeout(() => {
        this.setFade(true);
      });
    }
  }

  public componentWillUnmount(): void {
    this.isUnmount = true;
    this.clearCloseTimer();
  }

  public close = () => {
    if (this.isUnmount === false) {
      this.setFade(false);
      this.unmountTimer = setTimeout(() => {
        if (this.props.onClose) {
          this.props.onClose();
        }
        Toast.close();
      }, 300);
    }
  }

  private setFade(state: boolean): void {
    if (this.isUnmount === false) {
      this.setState({
        fade: state
      });
    }
  }

  private startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration * 1000 - 300);
    }
  }

  private clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer as NodeJS.Timer);
      this.closeTimer = null;
    }

    if (this.unmountTimer) {
      clearTimeout(this.unmountTimer as NodeJS.Timer);
      this.unmountTimer = null;
    }
  }

  public render(): JSX.Element {
    const { mask, className } = this.props;
    return (
      <div
        className={classNames(className, {
          [prefixCls]: true,
          [`${prefixCls}-fade`]: this.state.fade,
          [`${prefixCls}-mask`]: mask,
          [`${prefixCls}-nomask`]: !mask,
        })}
      >
        <ToastPure {...this.props}>{this.props.children}</ToastPure>
      </div>
    );
  }
}

export default Toast;