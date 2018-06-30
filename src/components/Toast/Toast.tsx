import * as React from 'react';
import * as classNames from 'classnames';

const iconClass = {
  'fail': 'fa fa-warning fa-2x',
  'success': 'fa fa-check-circle fa-2x',
}

export interface ToastProps {
  type?: 'success' | 'fail' | 'loading';
  children?: any;
}

const prefixCls = 'yj-component-toast';
const Toast = (props: ToastProps) => {
  const { type, children } = props;

  return type ? (
    <div className={`${prefixCls}-text ${prefixCls}-text-icon`}>
    <div
    className={classNames({
      [iconClass[type]]: true,
      [`${prefixCls}-fail`]: type === 'fail',
      [`${prefixCls}-success`]: type === 'success'
    })}
    ></div>
      <div className={`${prefixCls}-text-info`}>{children}</div>
    </div>
  ) : (
    <div className={`${prefixCls}-text`}>
      <div className={`${prefixCls}-text-label`}>{children}</div>
    </div>
  );
};

export default Toast;