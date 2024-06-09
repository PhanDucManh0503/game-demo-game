export interface IElderly {
  ad_memo_cntn?: string;
  addr?: string;
  bevl_rmrk_cntn?: string | null;
  brdt?: string;
  ccs_dcmt_file_nm?: string;
  ccs_dcmt_path?: string;
  ccs_end_dt?: string;
  ccs_no?: string;
  ccs_rtn_cd?: string;
  ccs_str_dt?: string;
  cntr_dt?: string;
  cntr_end_dt?: string;
  cntr_str_dt?: string;
  del_yn?: boolean;
  fclt_orgn_no?: string | null;
  oself_sld_rate?: string;
  rcev_nm?: string;
  rcev_no?: string;
  rspb_cwr_stf_no?: string | null;
  sex_cd?: 'F' | 'M';
  svc_lup_bath_yn?: boolean;
  svc_lup_nrs_yn?: boolean;
  svc_lup_rcpr_yn?: boolean;
  tag_bcn_instl_yn?: string;
  telno?: string;
}
