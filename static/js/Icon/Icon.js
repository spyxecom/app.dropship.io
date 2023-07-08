import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classname';
import { Tooltip } from 'antd';
import Utils from '../Utils/utils';
import * as svg from './img';
import './style.less';

class Icon extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      btnClass: '',
    };
  }

  render() {
    const {
      type,
      id,
      onClick,
      color,
      opacity,
      role,
      btnType,
      titleText,
      className,
      href,
      theme,
      width,
      height,
      style,
      tooltipProps,
      ...other
    } = this.props;

    const IconComp = svg[Utils.toPascalCase(type)];

    if (role === 'button') {
      return (
        <Tooltip placement="right"
                 title={titleText}
                 arrow={true}
                 destroyTooltipOnHide={true}
                 {...tooltipProps}>
          <span id={id} onClick={onClick} className={cls('icon-btn', btnType)}>
            {IconComp && (
              <IconComp theme={theme} className={cls('icon', className)} {...other} opacity={opacity} color={color} width={width} height={height}/>
            )}
          </span>
        </Tooltip>
      );
    }
    if (role === 'icon') {
      return (
        <IconComp
          className={className}
          onClick={onClick}
          opacity={opacity}
          color={color}
          type={type}
          width={width}
          height={height}
          style={style}
          {...other}
        />
      );
    }

    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={() => this.setState({ btnClass: 'hover-btn' })}
        onMouseLeave={() => this.setState({ btnClass: '' })}
      >
        {IconComp && (
          <IconComp
            className={this.state.btnClass}
            onClick={onClick}
            opacity={opacity}
            color={color}
            type={type}
          />
        )}
      </a>
    );
  }
}

Icon.defaultProps = {
  btnType: '',
};

Icon.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  opacity: PropTypes.number,
  titleText: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  href: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  fill: PropTypes.string,
  tooltipProps: PropTypes.object,
  type: PropTypes.string.isRequired,
  role: PropTypes.string,
  btnType: PropTypes.string,
};

export default Icon;
