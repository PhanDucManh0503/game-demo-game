import { useUserStore } from '@stores/user';

const usePrint = () => {
  const { user } = useUserStore();

  const getPdfLink = (values: any) => {
    let params = 'fcltOrgnNo=' + user?.fclt_orgn_no;

    for (const key in values) {
      params += '&' + key + '=' + values[key];
    }

    return 'http://175.45.200.78:8083/report.jsp?' + params;
  };

  const handleOpenLink = (link: string) => {
    window.open(
      link,
      'reportView',
      'popup=yes,width=1200,height=800,scrollbars=yes,resizable=yes',
    );
  };

  const handlePrintCall = (values: any) => {
    let params = 'fcltOrgnNo=' + user?.fclt_orgn_no;

    for (const key in values) {
      params += '&' + key + '=' + values[key];
    }

    const reportUrl = 'http://175.45.200.78:8083/report.jsp?' + params; // 레포트 공통 호출 URL값과 파라메터값 설정

    window.open(
      reportUrl,
      'reportView',
      'popup=yes,width=1200,height=800,scrollbars=yes,resizable=yes',
    ); // 레포트 공통 jsp 호출, 호출하는 리포트 크기에 따라 크기 조정 필요
  };

  return { getPdfLink, handlePrintCall, handleOpenLink };
};

export default usePrint;
