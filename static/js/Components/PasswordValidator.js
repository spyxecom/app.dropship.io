import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from "../Icon";
import cls from "classname";

function PasswordValidator({ value, error, isLogin=false, isSignup=false, setValidPass=null }) {
  const { t } = useTranslation();
  const [text, setText] = useState(isLogin ? 'At least 6 characters' : 'Must be at least 6 characters');
  const [errorText, setErrorText] = useState(null);
  const [custom, setCustom] = useState({ status: '', color: '' });

  const great = /^(?=.*[a-zA-Z])(?=.*[±!@#$%^&*()_+=;:'"|?/.,><`~])(?=.*[0-9]).{8,}$/;
  const good1 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
  const good2 = /^(?=.*[a-zA-Z])(?=.*[±!@#$%^&*()_+=;:'"|?/.,><`~]).{8,}$/;

  useEffect(() => {
    if (error && !isSignup) {
      if (typeof error === 'string') {
        setErrorText(error);
      } else {
        setErrorText(error?.code === 'token_not_valid' ?
          'You have already created a password. Try to log in'
          :
          Object.values(error)[0]);
      }
    } else if (errorText) {
      setErrorText(false);
      checkValue(value);
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [!!error]);

  function defaultValue() {
    setText(isLogin ? '' : 'Must be at least 6 characters');
    setCustom({ status: '', color: '' });
    if (isLogin && setValidPass) setValidPass(false);
  }

  useEffect(() => {
    value ? checkValue(value) : defaultValue();
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [value]);

  function checkValue(val) {
    if (val) {
      if (val?.match(great)) {
        if (val?.length >= 6) {
          if (isLogin && setValidPass) setValidPass(true);
          setText(isLogin ? '' : 'Your password is outstanding!');
          setCustom({ status: 'Great', color: 'green' });
        }
      } else if (val?.match(good1) || val.match(good2)) {
        if (val?.length >= 6) {
          if (isLogin && setValidPass) setValidPass(true);
          setText(isLogin ? '' : 'You can make it better!');
          setCustom({ status: 'Good', color: 'yellow' });
        }
      } else if (val?.length >= 6) {
        if (isLogin && setValidPass) setValidPass(true);
        setText(isLogin ? '' : 'You can make it better!');
        setCustom({ status: 'Good', color: 'yellow' });
      } else {
        if (isLogin && setValidPass) setValidPass(false);
        setCustom({ status: 'Bad', color: 'red' });
        setText(isLogin ? 'At least 6 characters' : 'Must be at least 6 characters');
      }
    }
  }

  return (
    <div id="psw-validator" className={cls(custom.color, {
      'login-password-validator': isLogin
    })}>
      <span
        className={`${text === 'You can make it better!' ? 'yellow ' : ''}${
          error || (value && value?.length < 6) ? 'error' : ''
        }${text === 'Your password is outstanding!' ? 'green ' : ''}`}
      >
        {errorText && <Icon type={'alert_triangle_error'} role={'icon'} />}
        { error?.code === 'token_not_valid' ?
          <span>You have already created a password. Try to <a href="/login">log in</a></span>
          :
          t(errorText || text)
        }
      </span>

      <div className="wrap">
        {value &&
        errorText !== t('Passwords do not match') &&
        errorText !== 'You already have this password' ? (
          <>
            <div className="items-validator">
              <div />
              <div />
              <div />
            </div>
            <div className="text-validator">{t(custom?.status)}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default PasswordValidator;
