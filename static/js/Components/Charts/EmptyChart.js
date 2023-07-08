import React from 'react'
import Images from '../../Images'
import './Empty.less'

function EmptyChart(props) {
  const {type, theme, loading} = props
  return (
    <div
      className={`empty-block performance${theme === 'dark' ? ' dark' : ''}`}
      style={{backgroundImage: `url(${Images[theme === 'dark'? 'emptyChartBgDark' : 'emptyChartBg']})`}}
    >
      {!loading && <span className="empty-text">{`Looks like the ${type} data is not yet available`}</span>}
    </div>
  )
}

export default EmptyChart
