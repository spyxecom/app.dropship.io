import { StyleSheet } from '@react-pdf/renderer';

// import InterMedium from '../../assets/fonts/Inter-Medium.woff';
// import InterRegular from '../../assets/fonts/Inter-Regular.woff';
// import InterBold from '../../assets/fonts/Inter-Bold.woff';
// import InterExtraBold from '../../assets/fonts/Inter-ExtraBold.woff';
//
// Font.register({ family: 'Inter', fonts: [
//     {src: InterMedium, fontWeight: 'normal'},
//     {src: InterRegular, fontWeight: 'normal'},
//     {src: InterBold, fontWeight: 'bold'},
//     {src: InterExtraBold, fontWeight: 'ultrabold'}
//   ]});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    width: '595pt',
    height: '842pt',
    padding: '40pt',
  },
  title: {
    height: '40pt',
    width: '100%',
    borderRadius: '6pt',
    backgroundColor: '#F2F6FF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_text: {
    display: 'block',
    width: '200pt',
    fontSize: '18pt',
    textAlign: 'center',
    color: '#225aea',
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
  text_grey: {
    fontFamily: 'Helvetica',
    fontWeight: 'normal',
    fontSize: '12pt',
    color: '#6E7DAE',
    display: 'flex',
  },
  text_dark: {
    fontFamily: 'Helvetica',
    fontWeight: 'normal',
    fontSize: '12pt',
    color: '#151E3A',
    display: 'flex',
  },

  header: {
    marginTop: '24pt',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '48pt',
    textExtra: {
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      fontSize: '24pt',
      color: '#151E3A',
    },

    invoice_img: {
      display: 'inline-block',
      height: '48pt',
      width: '154pt',
      paddingRight: '3pt',
    },
    info: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '48pt',
    },
    info_text: {
      height: '48pt',
    },
    flexBlock: {
      padding: '4pt 0',
      width: '240pt',
      height: '24pt',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  paid: {
    height: '64pt',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '24pt',
    paddingBottom: '24pt',
    borderBottom: '1pt solid #F2F3F8',
    date: {
      padding: '8pt 0',
      width: '250pt',
      height: '40pt',
      text: {
        fontSize: '18pt',
        color: '#151E3A',
        fontFamily: 'Helvetica',
        fontWeight: 'ultrabold',
      },
    },
    amount: {
      width: '126pt',
      height: '40pt',
      backgroundColor: '#F2F6FF',
      borderRadius: '6pt',

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      text: {
        fontSize: '18pt',
        color: '#225aea',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        display: 'inline-block',
      },
      small: {
        fontSize: '12pt',
        color: '#225aea',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        display: 'inline-block',
        paddingTop: '4pt',
        paddingLeft: '3pt',
      },
    },
  },
  bill: {
    marginTop: '24pt',
    paddingBottom: '24pt',
    borderBottom: '1pt solid #F2F3F8',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boldText: {
      height: '24px',
      fontSize: '14pt',
      color: '#151E3A',
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      marginBottom: '12pt',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    block: {
      height: '148pt',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  rows: {
    height: '40pt',
    padding: '12pt 0',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottom: '1pt solid #F2F3F8',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '16pt',
    height: '40pt',
    amount: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  },
  footer: {
    height: '40pt',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    borderTop: '1pt solid #F2F3F8',
    paddingTop: '16pt',
    image: {
      width: '24pt',
      height: '24pt',
      display: 'block',
      marginLeft: 'auto',
    },
  },
});

export default styles;
