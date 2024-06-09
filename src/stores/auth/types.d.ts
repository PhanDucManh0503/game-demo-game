/* eslint-disable no-unused-vars */
interface IAuthState {
  auth: TDefaultAuth | null;
  login: (auth: TDefaultAuth) => void;
  logout: () => void;
}

interface IStaffDto {
  addr: string;
  brdt: string;
  dpdt_num?: number;
  email_addr: string;
  hp_carrier_nm: string;
  hp_modl_nm: string;
  hp_no: string;
  hp_ownr_nm: string;
  jncmp_dt: string;
  resign_dt: string;
  sex_cd: string;
  stf_nm: string;
  stf_no: string;
  w4c_val: string;
  wk_dv_cd: string;
  wk_stat_cd: string;
  fclt_orgn_no?: string;
  menu_nos?: any[];
  svc_cds?: any[];
  stf_tkjs?: any[];
  avt_path: string;
  fclt_orgn_tkjs: any[];
}
type TDefaultAuth = {
  accessToken: string;
  refreshToken: string;
};
