import React from "react";
import { createBrowserHistory } from 'history';
import moment from 'moment';
import Images from '../Images';
import {Divider, Spin} from "antd";
import Icon from "../Icon";
import dayjs from "dayjs";
import Chart from "../Components/Charts/Chart";

export const formatDuration = num => {
  let m = Math.floor(num / 60);
  let s = num - m * 60;
  return `${m}m ${s}s`
}

export const debounce = (fn, delay) => {
  let timeOutId;
  return function (...args) {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
export const history = createBrowserHistory();

export const categoryClassName = {
  'random': 'random',
  'household': 'theme-red',
  'fashion': 'theme-yellow',
  'fashion_men': 'theme-yellow',
  'baby': 'theme-pink',
  'fashion_women': 'theme-pink',
  'electronics': 'theme-purple',
  'beauty': 'theme-green',
  'pets': 'theme-brown',
}

export const dateOptions = [
  {id: 1, name: 'Today', value: 'Last 0 days', days: 0},
  {id: 2, name: 'Yesterday', value: 'Last 1 days', days: 1},
  {id: 3, name: 'Last 7 days', value: 'Last 7 days', days: 7},
  {id: 4, name: 'Last 30 days', value: 'Last 30 days', days: 30},
  {id: 5, name: 'Last 90 days', value: 'Last 90 days', days: 90},
  {id: 6, name: 'Last 6 months', value: 'Last 6 months', days: 180},
  {id: 7, name: 'Last 12 months', value: 'Last 12 months', days: 365}
];

export const langMapISO = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_LA',
  fr: 'fr_FR',
  it: 'it_IT',
  nl: 'nl_NL',
  pt: 'pt_PT',
  ru: 'ru_RU',
  'zh-hans': 'zh-CN',
};

export const calendarLocale = (lang) => (
  {
    'lang': {
      'locale': langMapISO[lang],
      'placeholder': 'Select date',
      'rangePlaceholder': ['Start date', 'End date'],
      'today': 'Today',
      'now': 'Now',
      'backToToday': 'Back to today',
      'ok': 'OK',
      'clear': 'Clear',
      'month': 'Month',
      'year': 'Year',
      'timeSelect': 'Select time',
      'dateSelect': 'Select date',
      'monthSelect': 'Choose a month',
      'yearSelect': 'Choose a year',
      'decadeSelect': 'Choose a decade',
      'yearFormat': 'YYYY',
      'dateFormat': 'M/D/YYYY',
      'dayFormat': 'DD',
      'dateTimeFormat': 'M/D/YYYY HH:mm:ss',
      'monthFormat': 'MMMM',
      'monthBeforeYear': true,
      'previousMonth': 'Previous month (PageUp)',
      'nextMonth': 'Next month (PageDown)',
      'previousYear': 'Last year (Control + left)',
      'nextYear': 'Next year (Control + right)',
      'previousDecade': 'Last decade',
      'nextDecade': 'Next decade',
      'previousCentury': 'Last century',
      'nextCentury': 'Next century',
    },
    'timePickerLocale': {
      'placeholder': 'Select time',
    },
    'dateFormat': 'YYYY-MM-DD',
    'dateTimeFormat': 'YYYY-MM-DD HH:mm:ss',
    'weekFormat': 'YYYY-wo',
    'monthFormat': 'YYYY-MM',
  }
)

export const expandedRowRender = (record, chartLoading, chartData, t, isMobile) => (
  <Spin size="large" spinning={chartLoading}>
    <div id={`expandable-chart-info-${record.id}`} className={'expandable-chart-info'}>
      <span>Updated {AppUtils.durationAsString(new Date().toISOString(), chartData?.last_updated)}</span>
      <Icon type={'attention_outline'}
            role={'button'}
            width={16}
            height={16}
            tooltipProps={{
              overlayClassName: 'expandable-chart-info-tooltip-wrapper',
              placement: "top",
              title: () => (
                <div className={'expandable-chart-info-tooltip'}>
                  <div className={'expandable-chart-info-tooltip-title'}>
                    {t('Dashboard data syncs every 2-3 hours. However, delays may occur when high volumes are being processed.')}
                  </div>
                  <Divider style={{margin: '12px 0'}}/>
                  <div className={'expandable-chart-info-tooltip-text'}>
                    <p>Last updated on</p>
                    <p>
                      {dayjs(chartData?.last_updated).format('lll')} UTC
                    </p>
                  </div>
                </div>
              ),
              destroyTooltipOnHide: true,
              getPopupContainer: () => document.getElementById(`expandable-chart-info-${record.id}`),
            }}
      />
    </div>
    <Chart height={isMobile ? null : '280px'} type={'revenue'}
           data={chartData?.chart?.length ? [...chartData.chart] : []}
           loading={chartLoading}
           isMobile={isMobile}
    />
  </Spin>
);

export const getSuffix = (num) => {
  let suffix = '';

  switch (num) {
    case 1:
      suffix = 'st';
      break;
    case 2:
      suffix = 'nd';
      break;
    case 3:
      suffix = 'rd';
      break;
    case 4:
      suffix = 'th';
      break;
    default:
      suffix = 'th';
      break;
  }

  return suffix;
};

export const parseTime = (distanceToDate) => {
  let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let min = Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60));
  let sec = Math.floor((distanceToDate % (1000 * 60)) / 1000);

  if (days < 10) {
    days = `0${days}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  if (sec < 10) {
    sec = `0${sec}`;
  }

  return { days, hours, min, sec };
};

export const serialize = (params) => {
  const search = new URLSearchParams();

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(params)) {
    search.append(key, value);
  }

  return search.toString();
};

export const checkSaturationIndex = (value) => {
  let result;
  switch (true) {
    case value === 0 || value === null:
      result = 0;
      break;

    case value < 12:
      result = 1;
      break;

    case value < 36:
      result = 2;
      break;

    case value < 66:
      result = 3;
      break;

    case value < 76:
      result = 4;
      break;

    case value >= 100:
      result = 6;
      break;

    case value > 75:
      result = 5;
      break;

    default:
      result = 0;
      break;
  }
  return result;
};

export const descriptionPlan = {
  basic: 'The ideal plan to get started and get a feel for Dropship, _name_.',
  standard: 'The most popular plan if you are serious about getting started, _name_.',
  premium: 'The biggest plan to maximize your potential of success, _name_.',
  trial: 'Explore Dropship with a 7-day free trial, no credit card required.',
  free: 'Try Dropship, free forever. No credit card required.',
}

export const descriptionPlanWithoutName = {
  // basic: 'The ideal plan to get started and get a feel for Dropship.',
  basic: 'Everything you need to get started with finding new winning products.',
  standard: 'The most popular plan if you are serious about getting started.',
  premium: 'The biggest plan to maximize your potential of success.',
  trial: 'Explore Dropship with a 7-day free trial, no credit card required.',
  free: 'Try Dropship, free forever. No credit card required.',
}

export function changeGreetingMessage(message, setMessage) {
  let time = AppUtils.getHour();
  let result = null;

  switch (true) {
    case time < 12:
      result = 'Good Morning';
      break;
    case time >= 17:
      result = 'Good Evening';
      break;
    default:
      result = 'Good Afternoon';
      break;
  }

  if (message !== result) setMessage(result);
}

const AppUtils = {
  // Получить сообщение локализации
  getMes(context) {
    const ct = context.intl;
    return function res(mesId, values) {
      try {
        return ct.formatMessage(mesId, values);
      } catch (e) {
        return mesId;
      }
    };
  },

  // валидация и кориктеровка redirect uri
  controlRedirectUrl(redirectUrl, whitelist) {
    if (!redirectUrl) return '';
    // проверка по вайт листу, если он есть
    if (whitelist && whitelist.length > 0) {
      let isRedirect = false;
      whitelist.forEach((item) => {
        if (redirectUrl.indexOf(item) !== -1) {
          isRedirect = true;
        }
      });
      if (!isRedirect) return '';
    }

    return redirectUrl.substring(0, 4) === 'http' ? redirectUrl : '';
  },

  createRequestTypes(base) {
    const REQUEST = 'REQUEST';
    const SUCCESS = 'SUCCESS';
    const FAILURE = 'FAILURE';
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
      acc[type] = `${base}_${type}`;
      return acc;
    }, {});
  },

  // Перевести строку в CamelCase из underscore стиля
  toCamelCase(str, firstUpper) {
    const camelCase = str.replace(/_([a-z])/g, (m, w) => w.toUpperCase());
    if (!firstUpper) return camelCase;
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  },

  toPascalCase(str) {
    if (!str) return;
    let arr = str.split('_');
    arr = arr.map((i) => this.toUpperLatter(i.toLocaleLowerCase()));
    return arr.join('');
  },

  toNormalText(str) {
    if (!str) return;
    let arr = str.split('_');
    arr = arr.map((x, i) => i === 0 ? this.toUpperLatter(x.toLocaleLowerCase()): x);
    return arr.join(' ');
  },

  // Перевести первую букву в верхний регистр
  toUpperLatter(str) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return '';
  },

  toLowerLatter(str) {
    if (str) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return '';
  },

  tryToBool(str) {
    if (str === 'false') return false;
    if (str === 'true') return true;
    return str;
  },

  random() {
    return Math.floor(Math.random() * 0xffff);
  },

  cutUrlToPrevious(str) {
    if (!str || typeof str !== 'string') return;
    const index = str.lastIndexOf('/');
    return str.slice(0, index);
  },

  formatValue(val) {
    if (val == null || isNaN(val)) {
      return;
    }
    val = Math.round(val);
    if (val === 100000) {
      val += '+';
    }
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  },

  checkMailDomain(mail) {
    if (!mail) return { type: 'gmail', name: 'Gmail', link: 'google' };
    if (mail.includes('gmail'))
      return { type: 'gmail', name: 'Gmail', link: 'google' };
    if (mail.includes('outlook'))
      return { type: 'outlook', name: 'Outlook', link: 'outlook' };
    if (mail.includes('yahoo'))
      return { type: 'yahoo', name: 'Yahoo', link: 'yahoo' };
    if (mail.includes('protonmail'))
      return { type: 'protonmail', name: 'ProtonMail', link: 'protonmail' };
    if (mail.includes('aol')) return { type: 'aol', name: 'AOL', link: 'aol' };
    if (mail.includes('zoho'))
      return { type: 'zoho', name: 'Zoho', link: 'zohomail' };
    if (mail.includes('icloud'))
      return { type: 'icloud', name: 'iCloud', link: 'icloud' };
    if (mail.includes('gmx')) return { type: 'gmx', name: 'GMX', link: 'gmx' };
    if (mail.includes('hey')) return { type: 'hey', name: 'Hey', link: 'hey' };
    if (mail.includes('yandex'))
      return { type: 'yandex', name: 'Yandex', link: 'yandex' };
    return { type: 'gmail', name: 'Gmail', link: 'google' };
  },

  convertNumber(value, fractionDigits) {
    if (value >= 1000000000)
      return `${(value / 1000000000).toFixed(fractionDigits)}B`;
    if (value >= 1000000)
      return `${(value / 1000000).toFixed(fractionDigits)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(fractionDigits)}K`;
    return `${value}`;
  },

  goLink(link, target) {

    const a = document.createElement('a');

    a.href = link;
    a.target = target || '_self';
    a.click();
  },

  includeCurrentLocation(locations, pathname) {
    const splitStr = locations.split('/');
    return !!splitStr.includes(pathname);
  },

  addDefaultSrc(event) {
    event.target.src = Images.defaultImg;
  },

  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  range(start, end, step = 1) {
    const output = [];
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    }
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
    return output;
  },

  validateEmail(email) {
    /*eslint-disable-next-line no-useless-escape*/
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  includeSearch(value1, value2) {
    return (
      value1.toLowerCase().indexOf(value2.replace(/\+/g, '').toLowerCase()) >= 0
    );
  },
  starsReplace(value, companyDetails=false) {
    if (value && !companyDetails) {
      return value.length > 12 ? '************' : '*'.repeat(value.length);
    }
    return '*******';
  },

  getHour() {
    const date = new Date();
    return date.getHours();
  },

  getSearchParamsByName(searchParams, name){
    return searchParams?.split('&')?.filter(el => el.includes(name))?.[0]?.split('=')?.[1] || ''
  },

  changeImageSize(url, size){
    if(!url) return ''
    return url.replace(/(\.jpg\?)|(\.png\?)|(\.gif\?)/, function(match){
      return `_${size}x${match}`
    })
  },

  durationAsString(start, end){
    const duration = moment.duration(moment.utc(start).diff(moment.utc(end)));

    //Get Days
    const days = moment.utc(start).diff(moment.utc(end), 'days');
    const daysFormatted = days ? `${days} Days` : ''; // if no full days then do not display it at all

    //Get Hours
    const hours = duration.hours();
    const hoursFormatted = !daysFormatted && !hours ? '' : `${hours} Hours`;

    //Get Minutes
    const minutes = duration.minutes();
    const minutesFormatted = !daysFormatted && !hours && !minutes ? '' : `${minutes} Minutes`;

    const endText = minutesFormatted ? 'ago' : 'just now';

    return [daysFormatted, hoursFormatted, minutesFormatted, endText].join(' ');
  },

  multiplyPriceType: {
    'monthly': 1,
    'yearly': 12
  },
};

export default AppUtils;
