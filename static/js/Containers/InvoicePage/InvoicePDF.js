import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import styles from '../../Components/BillingSubPage/InvoicePDFStyles';
import { useTranslation } from 'react-i18next';
import utils from '../../Utils/utils';
import dayjs from 'dayjs';
import acc from 'accounting';

const logoInvoice = require('../../Images/logo-invoice.png');
const heardRed = require('../../Images/heart-red.png');
const heardBlue = require('../../Images/heart-blue.png');

function InvoicePDF({ invoice }) {
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
    <Document author="dropship" title="Invoice">
      <Page style={styles.page} orientation="portrait" size="a4" wrap={false}>
        <View
          style={{
            ...styles.title,
            ...(status?.id === 0
              ? { backgroundColor: '#FFF4F4' }
              : null),
          }}
        >
          <Text
            style={{
              ...styles.title_text,
              ...(status?.id === 0
                ? { color: '#D71313' }
                : null),
            }}
          >
            {status?.id !== 1
              ? t('setting_billing.UNPAID')
              : t('setting_billing.PAID')}
          </Text>
        </View>
        <View style={styles.header}>
          <View style={styles.header.info}>
            <Image style={styles.header.invoice_img} src={logoInvoice} />
          </View>
          <View style={styles.header.info_text}>
            <View style={styles.header.flexBlock}>
              <Text style={styles.text_grey}>
                {t('setting_billing.Invoice Number')}:
              </Text>
              <Text style={styles.text_dark}>#{invoice_id}</Text>
            </View>
            <View style={styles.header.flexBlock}>
              <Text style={styles.text_grey}>
                {t('setting_billing.Payment Method')}:
              </Text>

              <Text style={styles.text_dark}>
                {utils.toUpperLatter(payment_method?.card_type)} *
                {payment_method?.last_4}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.paid}>
          <View style={styles.paid.date}>
            <Text style={styles.paid.date.text}>
              {status?.id === 1
                ? `${t('setting_billing.PAID')} ${dayjs(issued_date).format(
                    'MMMM DD, YYYY',
                  )}`
                : t('setting_billing.TOTAL DUE')}
            </Text>
          </View>
          <View
            style={{
              ...styles.paid.amount,
              ...(status?.id === 0
                ? { backgroundColor: '#FFF4F4' }
                : null),
            }}
          >
            <Text
              style={{
                ...styles.paid.amount.text,
                ...(status?.id === 0
                  ? { color: '#D71313' }
                  : null),
              }}
            >
              ${acc.formatNumber(total/100, 2, ' ', ',')}
            </Text>
            <Text
              style={{
                ...styles.paid.amount.small,
                ...(status?.id === 0
                  ? { color: '#D71313' }
                  : null),
              }}
            >
              USD
            </Text>
          </View>
        </View>
        <View style={styles.bill}>
          <View style={styles.bill.block}>
            <Text style={styles.bill.boldText}>
              {t('setting_billing.Bill From')}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                marginBottom: '8px',
                height: '16px',
              }}
            >
              {bill_from?.name}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                marginBottom: '8px',
                height: '16px',
              }}
            >
              {`${bill_from?.['address_line_1']} ${bill_from?.['address_line_2'] || ''}`}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                marginBottom: '8px',
                height: '16px',
              }}
            >
              {`${bill_from?.city}, ${bill_from?.postal_code || bill_from?.zip}`}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                marginBottom: '8px',
                height: '16px',
              }}
            >
              {`${bill_from?.country} ${bill_from?.state || ''}`}
            </Text>
            <Text style={{ ...styles.text_dark, height: '16px' }}>
              {bill_from?.['VAT']}
            </Text>
          </View>
          <View style={styles.bill.block}>
            <Text style={{ ...styles.bill.boldText, marginLeft: 'auto' }}>
              {t('setting_billing.Bill To')}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                marginBottom: '8px',
                marginLeft: 'auto',
                height: '16px',
              }}
            >
              {
                billing?.company
                  ? billing?.company
                  : `${billing?.first_name} ${billing?.last_name}`
              }
            </Text>
            {
              billing?.company
                ? null
                : <Text
                  style={{
                    ...styles.text_dark,
                    marginBottom: '8px',
                    marginLeft: 'auto',
                    height: '16px',
                  }}
                >
                  {email}
              </Text>
            }
            <Text
              style={{
                ...styles.text_dark,
                marginBottom: '8px',
                marginLeft: 'auto',
                height: '16px',
              }}
            >
              {billing?.['line1']}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                marginBottom: '8px',
                marginLeft: 'auto',
                height: '16px',
              }}
            >
              {billing?.city}, {billing?.zip || billing?.postal_code}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                marginLeft: 'auto',
                height: '16px',
              }}
            >
              {billing?.country}
            </Text>
            {
              billing?.['vat_number']
                ? <Text
                  style={{
                    ...styles.text_dark,
                    marginLeft: 'auto',
                    height: '16px',
                  }}
                >
                  { `VAT ${billing?.['vat_number']}` }
              </Text>
                : null
            }
          </View>
        </View>
        <View style={styles.rows}>
          <Text
            style={{ ...styles.text_grey, width: ' 200pt', textAlign: 'left' }}
          >
            {t('setting_billing.Plan')}
          </Text>
          <Text
            style={{ ...styles.text_grey, width: ' 150pt', textAlign: 'left' }}
          >
            {t('setting_billing.Bill Cycle')}
          </Text>
          <Text
            style={{ ...styles.text_grey, width: ' 100pt', textAlign: 'right' }}
          >
            {t('setting_billing.Amount')}
          </Text>
        </View>
        {items.map((item) => (
          <View style={styles.rows} key={item?.plan?.plan?.id}>
            <Text
              style={{
                ...styles.text_dark,
                width: ' 200pt',
                textAlign: 'left',
              }}
            >
              {utils.toUpperLatter(t(item?.plan?.plan?.name)  || t(item?.label))}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                width: ' 150pt',
                textAlign: 'left',
              }}
            >
              {items?.[0]?.['bill_cycle'] || '-'}
            </Text>
            <Text
              style={{
                ...styles.text_dark,
                width: ' 100pt',
                textAlign: 'right',
              }}
            >
              ${acc.formatNumber(item?.price/100 , 2, ' ', ',')}
            </Text>
          </View>
        ))}

        {
          discount
            ? (
              <View style={{...styles.total, marginTop: 0}}>
                <Text style={styles.text_dark}> {t('setting_billing.Discount')}</Text>
                <View style={styles.total.amount}>
                  <Text style={styles.text_dark}>
                    -${acc.formatNumber(discount/100, 2, ' ', ',')}
                  </Text>
                </View>
              </View>)
            : null
        }

        {
          credits_applied
            ? (
              <View style={{...styles.total, marginTop: 0}}>
                <Text style={styles.text_dark}> {t('setting_billing.Credits_applied')}</Text>
                <View style={styles.total.amount}>
                  <Text style={styles.text_dark}>
                    -${acc.formatNumber(credits_applied/100, 2, ' ', ',')}
                  </Text>
                </View>
              </View>)
            : null
        }

        <View style={styles.total}>
          <Text style={styles.text_grey}> {t('setting_billing.Total')}</Text>
          <View style={styles.total.amount}>
            <Text style={{ ...styles.paid.amount.text, color: '#151E3A' }}>
              ${acc.formatNumber(total/100, 2, ' ', ',')}
            </Text>
            <Text
              style={{
                ...styles.paid.amount.small,
                paddingTop: '6pt',
                color: '#151E3A',
              }}
            >
              USD
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_grey}>
            {t('setting_billing.Questions about your bill? Contact us at')}:{' '}
          </Text>
          <Text style={styles.text_dark}> support@dropship.io</Text>

          <Image
            style={styles.footer.image}
            src={status?.id > 0 ? heardBlue : heardRed}
          />
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDF;
