import React from 'react';
import { DatePicker } from '@douyinfe/semi-ui';

import { SlideUpDatePicker } from './SlideUpDatePicker';
import { useGlobal } from '../../layout/Global';
import moment, { Moment } from 'moment';
import { SlideUpTimePicker } from './SlideUpTimePicker';

export interface ElonDateTimePickerProps {
  value: Moment;
  onChange: (mnt: Moment) => void;
  titlePre?: string;
}

export const ElonDateTimePicker = ({
  value,
  onChange,
  titlePre,
}: ElonDateTimePickerProps) => {
  const { isMobile } = useGlobal();

  if (isMobile) {
    return (
      <span className="flex items-center justify-start space-x-1">
        <SlideUpDatePicker
          value={value}
          onChange={onChange}
          titlePre={titlePre}
        />
        <SlideUpTimePicker
          value={value}
          onChange={onChange}
          titlePre={titlePre}
        />
      </span>
    );
  }

  return (
    <DatePicker
      value={value?.toDate()}
      onChange={(date: any) => onChange && onChange(moment(date))}
      type="dateTime"
      density="compact"
      style={{ width: 250 }}
    />
  );
};
