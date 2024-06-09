import { useUserStore } from '@stores/user';
import { notification } from 'antd';
import axios from 'axios';

const LINK_API = '/macro/save_macro_work';

const useMacro = () => {
  const { user } = useUserStore();

  const longTermSync = async (apiId: string, body: any = {}) => {
    try {
      const dataInfo = JSON.stringify({
        fclt_orgn_no: '33611000089' || user?.fclt_orgn_no,
        fclt_orgn_pw: 'ejemfla8778!',
        fclt_orgn_nm: '시니어데이케어센터주은',
        ...body,
      });
      const res = axios.post(process.env.NEXT_PUBLIC_MACRO_URL + LINK_API, {
        centerId: '33611000089' || user?.fclt_orgn_no,
        apiId,
        dataInfo,
      });
      return res;
    } catch (err: any) {
      console.log('🚀 ~ longTermSync ~ err:', err);
      notification.error({ message: '실패했습니다' });
    }
  };

  return { longTermSync };
};

export default useMacro;
