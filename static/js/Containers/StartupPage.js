import React from 'react';
import { Spin } from 'antd';

export default function StartupPage() {
  return (
    <Spin spinning size="large">
      <div className="page-full-wrapper" />
    </Spin>
  );
}
