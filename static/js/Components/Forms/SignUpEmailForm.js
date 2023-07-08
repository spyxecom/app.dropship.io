import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {Form, Row, Col} from 'antd'
import utils from '../../Utils/utils'
import cls from 'classname'
import Icon from "../../Icon";
import ButtonComponent from "../Button";
import InputComponent from "../Input";
import PasswordValidator from "../PasswordValidator";

function SignUpEmailForm({error, ...props}) {

  const [errorText, setErrorText] = useState(null)
  const [value, setValue] = useState(null)

  const [isVisibleEmail, setIsVisibleEmail] = useState(false)
  const [emailIconColor, setEmailIconColor] = useState('#707BA0')
  const [passIconColor, setPassIconColor] = useState('#707BA0')
  const [isVisibleBtn, setIsVisibleBtn] = useState(false)
  const [isBackError, setIsBackError] = useState(false)

  const [form] = Form.useForm()
  const { t } = useTranslation()

  useEffect(() => {
    if (error) {
      if (typeof error === 'string') {
        if(error.length > 100){
          setErrorText(t('Server response error'))
        }else{
          setErrorText(error)
        }
      } else {
        setErrorText(Object.values(error)[0])
        setEmailIconColor('#D71313')
        // setPassIconColor('#D71313')
      }
      setIsBackError(true)
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [!!error])

  const onFinish = values => {
    const data = {...values}
    delete data.accept
    delete data.confirm
    props.onSubmit(values)
  }

  const onFinishFailed = ({errorFields}) => {
    if (errorFields) setErrorText(errorFields[0]['errors'])
  }

  function handleClearError(e, field) {
    form.setFields([
      {
        name: field,
        errors: [],
      },
    ])
    let newError = null
    let errorList = form.getFieldsError()

    errorList.forEach(field => {
      if(field.errors.length && !newError) newError = field.errors[0]
    })
    setIsBackError(false)
    setErrorText(newError)
  }

  function handleChange(e) {
    const {name, value} = e.target

    if(name === 'last_name'){
      if(value){
        if(!isVisibleEmail) setIsVisibleEmail(true)
      } else {
        if(isVisibleEmail) setIsVisibleEmail(false)
      }
    }
    if (name === 'password') {
      setValue(value)
    }

    if (utils.validateEmail(name === 'email' ? value : form.getFieldValue('email'))
      && form.getFieldValue('password')?.length >= 6
      && form.getFieldValue('first_name') && form.getFieldValue('last_name')) {
      setIsVisibleBtn(true)
    } else {
      setIsVisibleBtn(false)
    }
  }

  return (
    <Form form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateTrigger='onSubmit'
          className="login-form sign-up-new-form"
          layout="vertical"
          requiredMark={false}
    >

      {
        props.children
      }

      <Form.Item noStyle shouldUpdate={true}>
        {() => <div className={cls('error-text', {'error-text_empty': !errorText})}>
          {errorText && <Icon type={'alert_triangle_error'} role={'icon'} />}
          {
            isBackError
              ? errorText.includes('social') ?
              errorText
              : (<>{errorText + ` ${t('Kindly try another one or')} `} <Link to='/login'>{t('Sign In')}</Link></>)
              : errorText
          }

        </div>}
      </Form.Item>

      <Row gutter={16}>
        <Col span={12} style={{paddingRight: 6}}>
          <Form.Item label="First Name"
                     name="first_name"
                     rules={[
                       {required: true, message: t('Kindly insert your full name')},
                       {
                         type: 'string',
                         message: t('You can only use letters to insert your name'),
                         pattern: /^[a-zA-Z ]+$/,
                         transform(value) {
                           if(value) return value.trim()
                         },
                       },
                       ]}
          >
            <InputComponent
              placeholder={t('First Name')}
              onChange={e => {handleChange(e); handleClearError(e, 'first_name')}}
              onFocus={() => {
                setEmailIconColor('#707BA0')
                setPassIconColor('#707BA0')
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12} style={{paddingLeft: 6}}>
          <Form.Item label="Last Name"
                     name="last_name"
                     rules={[
                       {required: true, message: t('Kindly insert your full name')},
                       {
                         type: 'string',
                         message: t('You can only use letters to insert your name'),
                         pattern: /^[a-zA-Z ]+$/,
                         transform(value) {
                           if(value) return value.trim()
                         },
                       },
                       ]}
          >
            <InputComponent
              placeholder={t('Last Name')}
              name='last_name'
              onChange={e => {handleChange(e); handleClearError(e, 'last_name')}}
              onFocus={() => {
                setEmailIconColor('#707BA0')
                setPassIconColor('#707BA0')
              }}
            />
          </Form.Item>
        </Col>
      </Row>

        <Form.Item label="Email"
                   name="email"
                   validateStatus={isBackError ? "error" : null}
                   rules={[
                     {required: true, message: t('Please insert your Email')},
                     {type: 'email', message: t('The email you entered is incorrect')}
                   ]}
        >
          <InputComponent
            placeholder={'john@example.com'}
            name='email'
            type="email"
            onChange={e => {
              handleChange(e);
              handleClearError(e, 'email')
              setEmailIconColor('#225AEA')
              setPassIconColor('#707BA0')
            }}
            prefix={<Icon type={'email'}
                          color={(errorText
                          && typeof errorText !== 'object') ?
                            '#D71313' : emailIconColor} />}
            onBlur={() => setEmailIconColor('#707BA0')}
            onFocus={() => {
              setEmailIconColor('#225AEA')
              setPassIconColor('#707BA0')
            }}
          />
        </Form.Item>
      {
        !errorText ?
          <PasswordValidator value={value} error={errorText} isLogin={true} isSignup={true}/>
          :
          null
      }
        <Form.Item label="Password"
                   name="password"
                   // validateStatus={errorText || isBackError ? 'error' : null}
                   rules={[{ required: true, message: t('Please insert your password') }]}
        >
          <InputComponent
            placeholder={'*********'}
            name={'password'}
            type={'password'}
            autoComplete="new-password"
            visibilityToggle
            prefix={<Icon type={'lock'} color={passIconColor} />}
            onChange={e => {
              handleChange(e)
              handleClearError(e, 'password')
              setPassIconColor('#225AEA')
            }}
            onFocus={() => setPassIconColor('#225AEA')}
            onBlur={() => setPassIconColor('#707BA0')}
            iconRender={visible => (
              visible
                ? <Icon type='eye' color={'#C5CCE3'}/>
                : <Icon type='eye_invisible' color={'#C5CCE3'}/>
            )
            }
          />
        </Form.Item>

        <ButtonComponent type="primary"
                htmlType="submit"
                className="btn-primary btn-primary_animation"
                disabled={!isVisibleBtn}
                style={{width: '100%'}}
        >
          {t('Create Account')}
        </ButtonComponent>

      <div className="sign-up-link">
        {t('Already have an account?')} <Link to="/login">{t('Sign In')}</Link>
      </div>

      <div className="sign-up-link small">
        By signing up, you agree to our
        <p>
          <a href="https://www.dropship.io/privacy-policy"
             target='_blank'
             rel="noopener noreferrer">
            {t('Privacy Policy')}
          </a> and <a href="https://www.dropship.io/terms-and-conditions"
                                target='_blank'
                                rel="noopener noreferrer">
          {t('Terms & Conditions')}
        </a>
        </p>
      </div>

    </Form>
  )
}

export default SignUpEmailForm
