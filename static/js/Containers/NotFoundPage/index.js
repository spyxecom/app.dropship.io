import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Images from '../../Images'
import './styles.less'

function NotFoundPage(props) {
  const {auth} = props;

  return (
    <div className="not-found">
      <img src={Images.logo} alt=""/>
      <div className="not-found-content">
        <div>404</div>
        <p>Unfortunately, this page doesn’t exist.</p>
        <p>Try <Link to={!!auth?.accessToken && auth?.userInfo?.onboarding_finished && !auth?.isAdmin ? '/dashboard' : '/login'}>
          start from the mainpage
        </Link>
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(NotFoundPage);
