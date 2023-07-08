/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Spin } from 'antd';
import Invoice from './Invoice';
import InvoicePDF from './InvoicePDF';
import Icon from '../../Icon';

import SettingCreators from '../SettingPage/reducer';
import './styles.less';

const InvoicePage = (props) => {
  const { user, paymentDetails, match, fetching } = props;
  const { hash } = match.params;
  const history = useHistory();

  const [statePaymentDetails, setStatePaymentDetails] = useState(null);

  useEffect(() => {
    if (hash) {
      props.getPaymentDetails({retrieve_invoice_id: hash});
    } else {
      history.push('/login');
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, []);

  useEffect(() => {
    if (paymentDetails?.['invoice_id']) {
      setStatePaymentDetails(paymentDetails)
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [paymentDetails]);

  return (
    <Spin spinning={fetching}>
      {statePaymentDetails ? (
        <div className="invoice-landing-page">
          <Invoice user={user} invoice={statePaymentDetails} />
          <PDFDownloadLink
            document={<InvoicePDF user={user} invoice={statePaymentDetails} />}
            fileName={`invoice_${statePaymentDetails?.['invoice_id']}.pdf`}
            className="invoice-pdf-btn-landing"
          >
            {({ loading }) =>
              loading ? '...' : <Icon role="icon" type="download" />
            }
          </PDFDownloadLink>
        </div>)
        : null}
    </Spin>
  );
};

const mapStateToProps = (state) => ({
  isMobile: state.nav.isMobile,
  paymentDetails: state.setting.paymentDetailsResult,
  user: state.auth.userInfo,
  fetching: state.setting.paymentDetailsFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getPaymentDetails: (id) =>
    dispatch(SettingCreators.getPaymentDetailsRequest({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);
