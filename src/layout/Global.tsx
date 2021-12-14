import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { LocaleProvider } from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import zh_TW from '@douyinfe/semi-ui/lib/es/locale/source/zh_TW';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import ko_KR from '@douyinfe/semi-ui/lib/es/locale/source/ko_KR';
import ja_JP from '@douyinfe/semi-ui/lib/es/locale/source/ja_JP';

import zh_CN_Txt from '../locale/zh_CN';
import zh_TW_Txt from '../locale/zh_TW';
import en_US_Txt from '../locale/en_US';
import ko_KR_Txt from '../locale/ko_KR';
import ja_JP_Txt from '../locale/ja_JP';

import { createContext, useMediaQuery } from '@elonwu/hooks';
import { useDarkMode, useRouteInit } from '../hooks';

const { Provider, useContext } = createContext('MediaQuery');

export const useGlobal = useContext;

export const localeOptions = [
  {
    key: 'zh_CN',
    title: '简体中文',
    locale: zh_CN,
    txt: zh_CN_Txt,
  },
  {
    key: 'zh_TW',
    title: '繁体中文',
    locale: zh_TW,
    txt: zh_TW_Txt,
  },
  {
    key: 'en_US',
    title: '英文',
    locale: en_US,
    txt: en_US_Txt,
  },
  {
    key: 'ko_KR',
    title: '韩文',
    locale: ko_KR,
    txt: ko_KR_Txt,
  },
  {
    key: 'ja_JP',
    title: '日文',
    locale: ja_JP,
    txt: ja_JP_Txt,
  },
];

export type Lang = 'zh_CN' | 'zh_TW' | 'en_US' | 'ko_KR' | 'ja_JP';

const Global = () => {
  // 路由初始化参数收集
  const routeInit = useRouteInit();

  // 适配
  const responsive = useMediaQuery();
  const [isMobile, isTablet, isPC] = (responsive || []) as boolean[];

  // 主题
  const { theme, toggleDarkMode } = useDarkMode();

  // 语言
  const [lang, setLang] = useState<Lang>('zh_CN');

  const { locale, txt } = useMemo(() => {
    return localeOptions.find((opt) => opt.key === lang) || localeOptions[0];
  }, [lang]);

  return (
    <LocaleProvider locale={locale}>
      <Provider
        value={{
          // 路由相关
          ...routeInit,

          // 主题
          theme,
          toggleDarkMode,

          // 自适应
          isMobile,
          isTablet,
          isPC,

          // 多语言
          lang,
          setLang,
          locale: txt,
        }}
      >
        <Outlet />
      </Provider>
    </LocaleProvider>
  );
};

export default Global;
