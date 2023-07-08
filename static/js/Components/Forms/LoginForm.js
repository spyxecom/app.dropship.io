import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Input, Checkbox } from 'antd';
import Icon from '../../Icon';
import cls from 'classname';
import ButtonComponent from "../Button";
import InputComponent from "../Input";

function LoginForm({ rememberMe, setRemember, onSubmit, error, otpRequired, ...props }) {

  const [errorText, setErrorText] = useState(null);
  const [emailIconColor, setEmailIconColor] = useState('#707BA0');
  const [passIconColor, setPassIconColor] = useState('#707BA0');
  const [otpIconColor, setOtpIconColor] = useState('#707BA0');
  const [isBackError, setIsBackError] = useState(false);

  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      setIsBackError(true);
      if (typeof error === 'string') {
        setErrorText(error);
        setEmailIconColor('#D71313');
        setPassIconColor('#D71313');
        setOtpIconColor('#D71313');
      } else {
        setErrorText(Object.values(error)[0]);
        setEmailIconColor('#D71313');
        setPassIconColor('#D71313');
        setOtpIconColor('#D71313');
      }
    }else{
      if(setErrorText && isBackError)
      setIsBackError(false);
      setErrorText(null);
      setEmailIconColor('#707BA0');
      setPassIconColor('#707BA0');
      setOtpIconColor('#707BA0');
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [error]);

  const onFinish = values => {
    if (rememberMe) setRemember(values);
    onSubmit(values);
  };

  const onFinishFailed = ({ errorFields }) => {
    if (errorFields) {
      setErrorText(errorFields[0]['errors']);
      setEmailIconColor('#D71313');
      setPassIconColor('#D71313');
      setOtpIconColor('#D71313');
    }
  };

  function onChange(e) {
    if (e.target.checked) {
      let data = form.getFieldsValue();
      setRemember(data);
    } else {
      setRemember(null);
    }
  }

  function handleClearError(e, field) {
    form.setFields([
      {
        name: field,
        errors: [],
      },
    ]);
    setErrorText(null);
    setEmailIconColor('#707BA0');
    setPassIconColor('#707BA0');
    setOtpIconColor('#707BA0');
    setIsBackError(false);
  }

  function onBlurHandler(e) {
    const target = e.target;

    setTimeout(() => {
      let error = form.getFieldError(target.name);
      if (error.length) {
        setErrorText(error[0]);
        setEmailIconColor('#D71313')
        setPassIconColor('#D71313')
        setOtpIconColor('#D71313')
      } else {
        setEmailIconColor('#707BA0');
      }
    }, 10);
  }

  return (
    <Form onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateTrigger='onSubmit'
          className="login-form"
          layout="vertical"
          form={form}
          requiredMark={false}
    >
      <Form.Item noStyle shouldUpdate={true}>
        {() =>
          <div className={cls('error-text', { 'error-text_empty': !errorText })}>
            {errorText && <Icon type={'alert_triangle_error'} role={'icon'} />}
            <span>{errorText}</span>
          </div>}
      </Form.Item>

      <Form.Item label="Email"
                 name="email"
                 initialValue={rememberMe?.email}
                 validateStatus={errorText || isBackError ? 'error' : null}
                 rules={[
                   { type: 'email', message: t('The email or password you entered is incorrect.') },
                   { required: true, message: t('The email or password you entered is incorrect.') },
                 ]}
      >
        <InputComponent
          placeholder={t('Email Address')}
          name="email"
          type="email"
          prefix={<Icon type={'email'} color={errorText ? '#D71313' : emailIconColor} />}
          onChange={e => {
            handleClearError(e, 'email')
            setEmailIconColor('#225AEA')
          }}
          onFocus={() => setEmailIconColor('#225AEA')}
          onBlur={onBlurHandler}
        />
      </Form.Item>
      <Form.Item label="Password"
                 name="password"
                 initialValue={rememberMe?.password}
                 validateStatus={errorText || isBackError ? 'error' : null}
                 rules={[{ required: true, message: t('The email or password you entered is incorrect.') }]}
      >
        <Input.Password
          size="large"
          placeholder={t('Password')}
          autoComplete="new-password"
          visibilityToggle
          prefix={<Icon type={'lock'} color={errorText ? '#D71313' : passIconColor} />}
          onChange={e => {
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

      {
        otpRequired ?
          <Form.Item label="OTP"
                     name="otp_pass"
                     initialValue={''}
                     validateStatus={errorText || isBackError ? 'error' : null}
                     rules={[{ required: true, message: t('OTP is required') }]}
          >
            <InputComponent
              placeholder={t('6-digit Code')}
              name="otp_pass"
              type="number"
              prefix={<Icon type={'lock'} color={errorText ? '#D71313' : otpIconColor} />}
              onChange={e => {
                handleClearError(e, 'otp')
                setOtpIconColor('#225AEA')
              }}
              onFocus={() => setOtpIconColor('#225AEA')}
              onBlur={() => setOtpIconColor('#707ba0')}
            />
          </Form.Item>
          :
          null
      }

      <ButtonComponent type="primary" htmlType="submit" className="btn-primary btn-primary_animation" style={{ width: '100%' }}>
        {t('Sign In')}
      </ButtonComponent>

      <div className="bottom-part">
        <Checkbox
          // type={'path'}
          checked={!!rememberMe}
          onChange={onChange}
        >
          {t('Remember Me')}
        </Checkbox>
        <Link to="/restore-password">{t('Forgot Password?')}</Link>
      </div>

      {
        props.children
      }

    </Form>
  );
}

export default LoginForm;
