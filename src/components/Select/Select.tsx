import React from 'react';
import { useGlobal } from '../../layout/Global';

import { SlideUpSelect } from './SlideUpSelect';
import { DropDownSelect } from './DropDownSelect';

export const ElonSelect = (props: any) => {
  const { isMobile } = useGlobal();
  return isMobile ? (
    <SlideUpSelect {...props} />
  ) : (
    <DropDownSelect {...props} />
  );
};
