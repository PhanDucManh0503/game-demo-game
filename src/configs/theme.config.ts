import { Noto_Sans_KR } from 'next/font/google';
import type { ThemeConfig } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export interface TokenCustom extends AliasToken {
  siderWidth: number;
  collapseSiderWidth: number;
  headerHeight: number;
  bgColor: string;
}

interface ThemeConfigCustom extends ThemeConfig {
  token?: Partial<TokenCustom>;
}
const THEME_CONFIG: ThemeConfigCustom = {
  token: {
    fontFamily: `${notoSansKr.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    siderWidth: 240,
    collapseSiderWidth: 60,
    headerHeight: 60,
    bgColor: '#38475F',
  },
  components: {
    Button: {
      borderRadius: 6,
    },
    Menu: {
      itemHeight: 50,
      itemSelectedColor: '#38475F',
      itemSelectedBg: '#38475F',
      dropdownWidth: 210,
    },
    Input: {
      controlHeight: 46,
      colorBorder: '#e5e5e5',
    },
    Select: {
      controlHeight: 46,
    },
    DatePicker: {
      controlHeight: 46,
    },
    Radio: {
      colorPrimary: '#2AAD9B',
    },
    Checkbox: {
      borderRadiusSM: 0,
    },
    Descriptions: {
      paddingXS: 8,
    },
  },
};

export { THEME_CONFIG };
