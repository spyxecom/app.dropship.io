import React from 'react'

import './TitleAnimationColor.less'

const TitleAnimationColor = (props) => {
  return (
    <div className={'box-with-text'}>
      {props.children}
    </div>
  )
}

export default TitleAnimationColor
