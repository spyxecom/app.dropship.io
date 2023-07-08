import React from 'react';
import cls from 'classname';
import acc from 'accounting';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import utils from '../../Utils/utils';
import Images from '../../Images';

export default function Invoice(props) {
  const { invoice } = props;
  const {
    invoice_id,
    total,
    status,
    issued_date,
    payment_method,
    items,
    bill_from,
    billing,
    email,
    discount,
    credits_applied,
  } = invoice;
  const { t } = useTranslation();
  return (
    <div className="invoice">
      <div
        className={cls('title-block-landing', {
          error: status?.id === 0,
        })}
      >
        {status?.id === 0
          ? t('setting_billing.UNPAID')
          : t('setting_billing.PAID')}
      </div>
      <div className="invoice-header">
        <img src={Images.logoInvoice} alt="" />
        <div className="invoice-header_info-landing">
          <div className="invoice-header-flexbox">
            <div className="text-grey">
              {t('setting_billing.Invoice Number')}:
            </div>
            <div className="text-dark">#{invoice_id}</div>
          </div>
          <div className="invoice-header-flexbox">
            <div className="text-grey">
              {t('setting_billing.Payment Method')}:
            </div>
            <div className="text-dark">
              {utils.toUpperLatter(payment_method?.card_type)} *
              {payment_method?.last_4}
            </div>
          </div>
        </div>
      </div>
      <div className="invoice-paid">
        <div className="invoice-paid_date">
          {status?.id > 0
            ? `${t('setting_billing.PAID')} ${dayjs(issued_date).format(
                'MMMM DD, YYYY',
              )}`
            : t('setting_billing.TOTAL DUE')}
        </div>
        <div
          className={cls('invoice-paid_amount', {
            error: status?.id === 0,
          })}
        >
          ${acc.formatNumber(total/100, 2, ' ', ',')}
          <span>USD</span>
        </div>
      </div>
      <div className="invoice-bill">
        <div className="bill-block">
          <div className="bill-header">{t('setting_billing.Bill From')}</div>
          <div className="bill-text">{bill_from?.name}</div>
          <div className="bill-text">{`${bill_from?.['address_line_1']} ${bill_from?.['address_line_2'] || ''}`}</div>
          <div className="bill-text">{`${bill_from?.city}, ${bill_from?.postal_code || bill_from?.zip}`}</div>
          <div className="bill-text">{`${bill_from?.country} ${bill_from?.state || ''}`}</div>
          <div className="bill-text">{bill_from?.['VAT']}</div>
        </div>
        <div className="bill-block bill-to">
          <div className="bill-header">{t('setting_billing.Bill To')}</div>
          <div className="bill-text">
            {
              billing?.company
              ? billing?.company
              : `${billing?.first_name} ${billing?.last_name}`
          }
          </div>
          { billing?.company ? null : <div className="bill-text">{email}</div> }
          <div className="bill-text">{billing?.['line1']}</div>
          <div className="bill-text">{billing?.city}, {billing?.zip || billing?.postal_code}</div>
          <div className="bill-text">{billing?.country}</div>
          { billing?.['vat_number'] ? <div className="bill-text">{`VAT ${billing?.['vat_number']}`}</div> : null }
        </div>
      </div>
      <div className="invoice-table">
        <div className="invoice-table-header">
          <div>{t('setting_billing.Plan')}</div>
          <div>{t('setting_billing.Bill Cycle')}</div>
          <div>{t('setting_billing.Amount')}</div>
        </div>
        {items.map((item) => (
          <div className="invoice-table-rows" key={item?.plan?.plan?.id}>
            <div>{utils.toUpperLatter(t(item?.plan?.plan?.name)) || t(item?.label)}</div>
            <div>{items?.[0]?.['bill_cycle'] || '-'}</div>
            <div>${acc.formatNumber(item?.price/100, 2, ' ', ',')}</div>
          </div>
        ))}
      </div>

      {
        discount
          ? (
            <div className="invoice-item">
              <div>{t('setting_billing.Discount')}</div>
              <div>-${acc.formatNumber(discount / 100, 2, ' ', ',')}</div>
            </div>)
          : null
      }

      {
        credits_applied
          ? (
            <div className="invoice-item">
              <div>{t('setting_billing.Credits_applied')}</div>
              <div>-${acc.formatNumber(credits_applied / 100, 2, ' ', ',')}</div>
            </div>)
          : null
      }

      <div className="invoice-total">
        <div>{t('setting_billing.Total')}</div>
        <div>
          ${acc.formatNumber(total/100, 2, ' ', ',')}
          <span>USD</span>
        </div>
      </div>
      <div className="invoice-footer-landing">
        <div>
          {t('setting_billing.Questions about your bill? Contact us at')}:
          <span style={{marginLeft: 4}}><a href={'mailto:support@dropship.io'}>support@dropship.io</a></span>
        </div>
        <img
          src={
            status?.id > 0
              ? Images.heartBlue
              : Images.heartRed
          }
          alt="heart"
        />
      </div>
    </div>
  );
}
