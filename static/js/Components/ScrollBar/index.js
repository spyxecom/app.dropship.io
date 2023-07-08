import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import css from 'dom-css'; // react-custom-scrollbars
import 'overlayscrollbars/css/OverlayScrollbars.css'; // overlayscrollbars

import './styles.less';

export const ShadowScrollbar = ({ ...props }) => {
  const shadowTop = useRef();
  const shadowBottom = useRef();

  const onUpdate = (values) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    css(shadowTop.current, { opacity: shadowTopOpacity });
    css(shadowBottom.current, { opacity: shadowBottomOpacity });
  };

  return (
    <div className="scroll-bar scroll-bar--shadow" style={props.style}>
      <Scrollbars onUpdate={onUpdate} {...props} />
      <div ref={shadowTop} className="scroll-shadow scroll-shadow--top" />
      <div ref={shadowBottom} className="scroll-shadow scroll-shadow--bottom" />
    </div>
  );
};

export const DefaultScrollbar = ({ ...props }) => (
  <div className="scroll-bar scroll-bar--shadow" style={props.style}>
    <Scrollbars {...props} />
  </div>
);

export const OverlayScrollbar = React.forwardRef(
  ({ children, callbacks, visibility, ...props }, ref) => (
    <OverlayScrollbarsComponent
      ref={ref}
      options={{
        scrollbars: {
          autoHide: 'leave',
          autoHideDelay: 300,
          visibility: visibility || 'auto',
        },
        callbacks,
      }}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  ),
);

OverlayScrollbar.propTypes = {};

ShadowScrollbar.propTypes = {
  style: PropTypes.object,
};

DefaultScrollbar.propTypes = {
  style: PropTypes.object,
};

export default ShadowScrollbar;
