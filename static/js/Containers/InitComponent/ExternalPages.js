import React, {Suspense, lazy} from 'react'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {PrivateRoute} from '../../Components/PrivateRoute'

// const SignUpConfirmPage = lazy(() => import('../SignUpConfirmPage'))
const CheckMailboxPage = lazy(() => import('../CheckMailboxPage'))
const RestorePasswordPage = lazy(() => import('../RestorePasswordPage'))
const VerifyCodePage = lazy(() => import('../VerifyCodePage'))
const NewPasswordPage = lazy(() => import('../NewPasswordPage'))
// const SuccessPage = lazy(() => import('../SuccessPage'))
const ExpiredPage = lazy(() => import('../ExpiredPage'))
const AlreadyRegisteredPage = lazy(() => import('../AlreadyRegisteredPage'))
const OnBoardingPlanNew = lazy(() => import('../OnboardingPlanNew'))
const CheckEmailCode = lazy(() => import('../CheckEmailCode'))
const OnBoardingCheckout = lazy(() => import('../OnboardingCheckout'))

function ExternalPages(props) {
  const {
    auth,
    userInfo,
    isAdmin,
  } = props

  return (
    <Switch>
      <Suspense fallback={null}>
        <Route path="/check-mailbox" component={CheckMailboxPage}/>
        <Route exact path="/sign-up/confirm-email/:hash" component={OnBoardingPlanNew}/>
        <Route path="/sign-up/confirm/:hash" component={CheckEmailCode}/>
        <Route exact path="/restore-password" component={RestorePasswordPage}/>
        <Route path="/verify-code" component={VerifyCodePage}/>
        <Route path="/restore-password/:hash" component={NewPasswordPage}/>
        {/*<Route path={['/success/:hash', '/success']} component={SuccessPage}/>*/}
        <Route path="/expired" component={ExpiredPage}/>
        <Route path="/already-registered" component={AlreadyRegisteredPage}/>

        <PrivateRoute
          path="/onboarding/plan"
          redirectPath="/login"
          auth={!!auth?.accessToken && !userInfo?.['onboarding_finished'] && !isAdmin}
          component={OnBoardingPlanNew}
        />
        <Route
          path={["/onboarding/checkout/:mode/:intentId", "/onboarding/checkout/:mode"]}
          component={OnBoardingCheckout}
        />
      </Suspense>
    </Switch>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  userInfo: state.auth.userInfo,
  isAdmin: state.auth.isAdmin,
})

ExternalPages.propTypes = {
  auth: PropTypes.shape({
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    isValidRefreshToken: PropTypes.bool,
  }),
  userInfo: PropTypes.shape({
    onboarding_finished: PropTypes.bool,
  }),
  isAdmin: PropTypes.bool,
}

export default connect(mapStateToProps, null)(ExternalPages)
