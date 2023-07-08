import React from 'react'
import {Transition} from 'react-transition-group'

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, height ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
  opacity: 0,
  height: 0,
  transform: 'translateY(0px)',
}

const transitionStyles = {
  entering: {opacity: 1, height: 'auto', transform: 'translateY(0px)'},
  entered: {opacity: 1, height: 'auto', transform: 'translateY(0px)'},
  exiting: {opacity: 0, height: 'auto', transform: 'translateY(20px)'},
  exited: {opacity: 0, height: 0, transform: 'translateY(20px)', overflow: 'hidden'},
}

const Fade = ({inProp, ...props}) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state],
        ...props.style
      }}>
        {props.children}
      </div>
    )}
  </Transition>
)

export default Fade
