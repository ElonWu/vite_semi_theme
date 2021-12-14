import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollList, ScrollItem, Button, SideSheet } from '@douyinfe/semi-ui';
import moment, { Moment } from 'moment';

export const SlideUpTimePicker = ({
  value,
  onChange,
  title,
  titlePre,
}: {
  value?: Moment;
  onChange?: (m: Moment) => void;
  title?: string;
  titlePre?: string;
}) => {
  const [visible, setVisible] = useState(false);

  const [selectHour, setSelectHour] = useState<number>(1);
  const [selectMinute, setSelectMinute] = useState<number>(1);
  const [selectSecond, setSelectSecond] = useState<number>(1);

  // 首次
  useEffect(() => {
    const time = value || moment();

    const hour = time?.hour();
    const minute = time?.minute();
    const second = time?.second();

    setSelectHour(hour);
    setSelectMinute(minute);
    setSelectSecond(second);
  }, []);

  const [hours, minutes, seconds]: { value: number }[][] = useMemo(() => {
    return [
      new Array(24).fill(0).map((_, index) => ({ value: index })),
      new Array(60).fill(0).map((_, index) => ({ value: index })),
      new Array(60).fill(0).map((_, index) => ({ value: index })),
    ];
  }, []);

  const timeStr = useMemo(() => {
    const toStr = (num: number): string => {
      return `${num < 10 ? 0 : ''}${num}`;
    };
    return `${toStr(selectHour)} : ${toStr(selectMinute)} :  ${toStr(
      selectSecond,
    )}`;
  }, [selectHour, selectMinute, selectSecond]);

  const onSelect = useCallback(
    (selected) => {
      const value = selected?.value;

      switch (selected.type) {
        case 1:
          if (value !== selectHour) setSelectHour(value);
          break;

        case 2:
          if (value !== selectMinute) setSelectMinute(value);

          break;
        case 3:
          if (value !== selectSecond) setSelectSecond(value);

          break;
      }
    },
    [selectHour, selectMinute, selectSecond],
  );

  const onTimeChange = useCallback(() => {
    const time = value || moment();

    // 保留默认的日期
    const result = moment(time)
      .hour(selectHour)
      .minute(selectMinute)
      .second(selectSecond);

    if (onChange) onChange(result);
    setVisible(false);
  }, [value, onChange, selectHour, selectMinute, selectSecond]);

  return (
    <>
      <p
        className="text-base font-bold text-gray-600 dark:text-gray-100 cursor-pointer"
        style={{ lineHeight: '32px' }}
        onClick={() => setVisible(true)}
      >
        {value?.format('HH:mm:ss') || '请选择'}
      </p>

      <SideSheet
        placement="bottom"
        title={title || (titlePre && `选择${titlePre}时间`) || '选择时间'}
        visible={visible}
        onCancel={() => setVisible(false)}
        height={360}
        bodyStyle={{
          overflow: 'auto',
          paddingTop: 4,
          paddingBottom: 16,
        }}
      >
        <ScrollList
          header={
            <p className="text-base font-bold text-gray-600 dark:text-gray-100">
              {timeStr}
            </p>
          }
          footer={
            <Button block theme="solid" type="primary" onClick={onTimeChange}>
              确定
            </Button>
          }
        >
          <ScrollItem
            mode="wheel"
            cycled={true}
            list={hours}
            type={1}
            selectedIndex={selectHour}
            onSelect={onSelect}
          />

          <ScrollItem
            mode="wheel"
            cycled={true}
            list={minutes}
            type={2}
            selectedIndex={selectMinute}
            onSelect={onSelect}
          />

          <ScrollItem
            mode="wheel"
            cycled={true}
            list={seconds}
            type={3}
            selectedIndex={selectSecond}
            onSelect={onSelect}
          />
        </ScrollList>
      </SideSheet>
    </>
  );
};
