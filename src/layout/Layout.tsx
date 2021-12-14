import React, { useMemo, useState } from 'react';
import { Outlet } from '@elonwu/router';
import Menu from './Menu';
import { ElonDropdown } from '../components';
import { localeOptions, useGlobal } from './Global';
import { Avatar, SideSheet, Tooltip } from '@douyinfe/semi-ui';
import { IconGlobe, IconMenu, IconMoon, IconSun } from '@douyinfe/semi-icons';

import logo from '../assets/imgs/company_logo.png';
import logoDark from '../assets/imgs/company_logo_dark.png';

const GlobalLayout = () => {
  const { isMobile } = useGlobal();

  return isMobile ? <MobileLayout /> : <PCLayout />;
};

export default GlobalLayout;

const Logo = () => {
  const { isMobile, theme } = useGlobal();
  return (
    <div
      className="h-full p-4 flex items-center justify-center"
      style={{ width: isMobile ? 'auto' : 240 }}
    >
      <img
        src={theme === 'dark' ? logoDark : logo}
        alt="logo"
        className="max-h-12"
      />
    </div>
  );
};

const GameInfo = () => {
  return (
    <div className="flex space-x-2 items-center justify-start">
      <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-50 to-gray-600 dark:from-gray-600 dark:to-gray-50"></div>

      <div className="h-full flex flex-col items-start justify-between">
        <h3 className="text-base font-bold md:text-lg text-gray-800 dark:text-gray-50">
          新信长之野望
        </h3>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-200">
          日本地区新信长之野望
        </p>
      </div>
    </div>
  );
};

const HeaderAction = () => {
  const { isMobile, theme, toggleDarkMode, lang, setLang } = useGlobal();

  const trigger = useMemo(() => (isMobile ? 'click' : 'hover'), [isMobile]);

  return (
    <div className="flex items-center justify-end space-x-4">
      <span
        className="flex items-center cursor-pointer"
        onClick={toggleDarkMode}
      >
        {theme === 'dark' ? (
          isMobile ? (
            <IconMoon size="extra-large" className="text-priamry-500" />
          ) : (
            <Tooltip content="亮色模式">
              <IconMoon size="extra-large" className="text-priamry-500" />
            </Tooltip>
          )
        ) : isMobile ? (
          <IconSun size="extra-large" className="text-priamry-500" />
        ) : (
          <Tooltip content="暗色模式">
            <IconSun size="extra-large" className="text-priamry-500" />
          </Tooltip>
        )}
      </span>

      <ElonDropdown
        options={localeOptions}
        value={lang}
        onChange={setLang}
        trigger={trigger}
      >
        <IconGlobe size="extra-large" />
      </ElonDropdown>

      <Avatar size="small" className="bg-primary-400 text-white">
        Wu
      </Avatar>
    </div>
  );
};

const PCLayout = () => {
  return (
    <div
      data-role="pc-layout-container"
      className="w-screen h-screen flex flex-col"
    >
      <header className="flex items-stretch justify-start bg-white dark:bg-gray-700">
        <Logo />

        <div className="p-4 flex-1 flex items-center justify-between">
          <GameInfo />
          <HeaderAction />
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        <Menu />
        <div
          data-role="content-container"
          className="flex-1 w-full h-full overflow-y-auto bg-gray-100 dark:bg-gray-800"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const MobileLayout = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      data-role="mobile-layout-container"
      className="w-screen h-screen flex flex-col"
    >
      <header className="p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-600">
        <div
          className="flex items-center justify-start space-x-4 cursor-pointer"
          onClick={() => setShowMenu(true)}
        >
          <GameInfo />
        </div>

        <HeaderAction />
      </header>
      <div
        data-role="content-container"
        className="flex-1 w-full h-full overflow-y-auto bg-gray-100 dark:bg-gray-800"
      >
        <Outlet />
      </div>

      <SideSheet
        title={<Logo />}
        visible={showMenu}
        onCancel={() => setShowMenu(false)}
        placement="left"
        width={288}
      >
        <Menu />
      </SideSheet>
    </div>
  );
};
