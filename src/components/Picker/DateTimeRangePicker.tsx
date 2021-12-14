import React, { useEffect, useState } from 'react';
import { DatePicker, Toast } from '@douyinfe/semi-ui';

import { useGlobal } from '../../layout/Global';
import moment, { Moment } from 'moment';
import { ElonDateTimePicker } from './DateTimePicker';

export interface ElonDateTimeRangePickerProps {
  value: Moment[];
  onChange: (mnt: Moment[]) => void;
  showTime?: boolean;
  title?: 'string';
}

export const ElonDateTimeRangePicker = ({
  value,
  onChange,
  title,
}: ElonDateTimeRangePickerProps) => {
  const { isMobile } = useGlobal();

  if (isMobile) {
    return (
      <ElonDateTimeRange value={value} onChange={onChange} title={title} />
    );
  }

  return (
    <DatePicker
      value={[value?.[0]?.toDate(), value?.[1]?.toDate()]}
      onChange={(date: any) =>
        onChange && onChange([moment(date[0]), moment(date[1])])
      }
      type="dateRange"
      density="compact"
      style={{ width: 250 }}
    />
  );
};

const ElonDateTimeRange = ({
  value,
  onChange,
  title,
}: ElonDateTimeRangePickerProps) => {
  const [start, setStart] = useState(value?.[0]);
  const [end, setEnd] = useState(value?.[1]);

  useEffect(() => {
    if (!start || !end) return;

    if (start.isAfter(end)) {
      Toast.error('结束日期不能早于开始日期');
      setEnd(start);
      return;
    } else {
      onChange && onChange([start, end]);
    }
  }, [onChange, start, end]);

  return (
    <span className="flex items-center justify-start space-x-1">
      <ElonDateTimePicker value={start} onChange={setStart} titlePre="开始" />
      <span className="text-gray-500 dark:text-gray-50">~</span>
      <ElonDateTimePicker value={end} onChange={setEnd} titlePre="结束" />
    </span>
  );
};
