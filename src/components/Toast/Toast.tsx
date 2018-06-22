import _yj from '../../typings/index';
import * as React from 'react';
import Icon from '../Icon';
import svgRootPath from '../../utils/svgRootPath';
const svgFile = {
  success: svgRootPath + require('../../assets/success.svg').id,
  fail: svgRootPath + require('../../assets/fail.svg').id,
  loading: svgRootPath + require('../../assets/loading.svg').id
};

export interface ToastProps extends _yj.ComponentProps {
  type?: 'success' | 'fail' | 'loading';
  children?: any;
}

const prefixCls = 'yj-component-toast';
const Toast = (props: ToastProps) => {
  const { type, children } = props;

  return type ? (
    <div className={`${prefixCls}-text ${prefixCls}-text-icon`}>
      <Icon src={svgFile[type]} />
      <div className={`${prefixCls}-text-info`}>{children}</div>
    </div>
  ) : (
    <div className={`${prefixCls}-text`}>
      <div className={`${prefixCls}-text-label`}>{children}</div>
    </div>
  );
};

export default Toast;