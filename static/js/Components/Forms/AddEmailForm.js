import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {Form} from 'antd'
import Images from '../../Images'
import Fade from '../Fade'
import utils from '../../Utils/utils'
import cls from 'classname'
import ButtonComponent from "../Button";
import InputComponent from "../Input";

function AddEmailForm({error, ...props}) {

  const [errorText, setErrorText] = useState(null)

  const [isVisibleBtn, setIsVisibleBtn] = useState(false)
  const [isBackError, setIsBackError] = useState(false)

  const [form] = Form.useForm()
  const {t} = useTranslation()

  useEffect(() => {
    if (error) {
      if (typeof error === 'string') {
        if (error.length > 100) {
          setErrorText(t('Server response error'))
        } else {
          setErrorText(error)
        }
      } else {
        setErrorText(Object.values(error)[0])
      }
      setIsBackError(true)
    }

    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [error])

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
      if (field.errors.length && !newError) newError = field.errors[0]
    })
    setIsBackError(false)
    setErrorText(newError)
  }

  function handleChange(e) {
    const {name, value} = e.target
    if (name === 'email') {
      if (utils.validateEmail(value)) {
        if (!isVisibleBtn) setIsVisibleBtn(true)
      } else {
        if (isVisibleBtn) setIsVisibleBtn(false)
      }
    }
  }

  return (
    <Form form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateTrigger='onSubmit'
          className="login-form"
          layout="vertical"
    >

      <Form.Item noStyle shouldUpdate={true}>
        {() => <div className={cls('error-text', {'error-text_empty': !errorText})}>
          {
            isBackError
              ? (<>{errorText + ` ${t('Kindly try another one or')} `} <Link to='/login'>{t('Sign In')}</Link></>)
              : errorText
          }

        </div>}
      </Form.Item>

      <Form.Item label=""
                 name="email"
                 validateStatus={isBackError ? "error" : null}
                 rules={[
                   {required: true, message: t('Please insert your Email')},
                   {type: 'email', message: t('The email you entered is incorrect')}
                 ]}
      >
        <InputComponent
          placeholder={t('Email Address')}
          name='email'
          type="email"
          onChange={e => {
            handleChange(e)
            handleClearError(e, 'email')
          }}
          prefix={<img src={Images.email} alt=""/>}
        />
      </Form.Item>

      <Fade inProp={isVisibleBtn} style={{order: 1, marginTop: 'auto'}}>
        <ButtonComponent type="primary"
                htmlType="submit"
                className="btn-primary btn-primary_animation"
                disabled={!isVisibleBtn}
                style={{width: '100%'}}
        >
          {t('Create Account')}
        </ButtonComponent>
      </Fade>

    </Form>
  )
}

export default AddEmailForm
