/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const PendingPool = {};
const ReadyPool = {};

class ImageCell extends Component {
  constructor(props) {
    super(props);
    this.loadImage = this.loadImage.bind(this);
    this.onLoadImage = this.onLoadImage.bind(this);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      ready: false,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.loadImage(this.props.src);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({ src: null });
      this.loadImage(nextProps.src);
    }
  }

  loadImage(src) {
    if (ReadyPool[src]) {
      this.setState({ src });
      return;
    }

    if (PendingPool[src]) {
      PendingPool[src].push(this.onLoadImage);
      return;
    }
    PendingPool[src] = [this.onLoadImage];

    if (typeof Image === 'undefined') return;

    const img = new Image();

    img.onload = () => {
      PendingPool[src].forEach((callback) => {
        callback(src);
      });
      delete PendingPool[src];
      img.onload = null;
      // eslint-disable-next-line no-param-reassign
      src = undefined;
    };
    img.src = src;
  }

  onLoadImage(src) {
    ReadyPool[src] = true;
    if (src === this.props.src) {
      this.setState({
        src,
      });
    }
  }

  getStyle = (src) => ({
    backgroundImage: `url(${src})`,
    backgroundSize: this.props.small ? 'unset': 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  });

  render() {
    const { src, loading } = this.state;
    const { className } = this.props;

    return src ? (
      <div style={this.getStyle(src)} className={className} />
    ) : (
      <Spin spinning={loading} />
    );
  }
}

export const ImageCellComponent = ({ src, className }) => {
  const [srcLocal, setSrcLocal] = useState(null);

  function loadImage(path) {
    if (ReadyPool[path]) {
      setSrcLocal(path);
      return;
    }

    if (PendingPool[path]) {
      PendingPool[path].push(onLoadImage);
      return;
    }

    PendingPool[path] = [onLoadImage];

    if (typeof Image === 'undefined') return;

    const img = new Image();

    img.onload = () => {
      PendingPool[path].forEach((callback) => {
        callback(path);
      });
      delete PendingPool[path];
      img.onload = null;
      // eslint-disable-next-line no-param-reassign
      path = undefined;
    };
    img.src = path;
  }

  function onLoadImage(path) {
    ReadyPool[path] = true;
    if (path === src) {
      setSrcLocal(path);
    }
  }

  function getStyle(path) {
    return {
      position: 'absolute',
      top: 0,
      backgroundImage: `url(${path})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
    };
  }

  return <div style={getStyle(src)} className={className} />;
};

ImageCell.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ImageCell.defaultProps = {
  className: '',
};

ImageCellComponent.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  small: PropTypes.bool
};

ImageCellComponent.defaultProps = {
  className: '',
  small: false
};

export default ImageCell;
