import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollList, ScrollItem, Button, SideSheet } from '@douyinfe/semi-ui';
import moment, { Moment } from 'moment';

export const SlideUpDatePicker = ({
  value,
  onChange,
  title,
  titlePre,
  yearSpan = 100,
}: {
  value?: Moment;
  onChange?: (m: Moment) => void;
  title?: string;
  titlePre?: string;
  yearSpan?: number;
}) => {
  const [visible, setVisible] = useState(false);

  const [selectYear, setSelectYear] = useState<number>();
  const [selectMonth, setSelectMonth] = useState<number>();
  const [selectDay, setSelectDay] = useState<number>();

  // 选项
  const years = useMemo(() => {
    const year = (value || moment()).year();
    // 前后各 yearSpan 年的范围
    let years = [{ value: year }];
    for (let i = 1; i <= yearSpan; i++) {
      years = [{ value: year - i }, ...years, { value: year + i }];
    }

    return years;
  }, [value, yearSpan]);

  const months = useMemo(
    () => new Array(12).fill(0).map((_, index) => ({ value: index + 1 })),
    [],
  );

  const [days, setDays] = useState(
    new Array(31).fill(0).map((_, index) => ({ value: index + 1 })),
  );

  // 首次更新
  useEffect(() => {
    const date = value || moment();

    const year = date?.year();
    const month = date?.month();
    const day = date?.date();

    setSelectYear(year);
    setSelectMonth(month + 1);
    setSelectDay(day);
  }, [value]);

  // 根据年月重置选项
  const resetDaysOptions = useCallback(
    (selectYear: number, selectMonth: number) => {
      // 根据年月份来判断天数
      const daysCountOfMonth = moment(`${selectYear}-${selectMonth}-01`)
        .endOf('month')
        .date();

      const days = new Array(daysCountOfMonth)
        .fill(0)
        .map((_, index) => ({ value: index + 1 }));

      setDays(days);
    },
    [],
  );

  useEffect(() => {
    if (!selectYear || !selectMonth) return;
    resetDaysOptions(selectYear, selectMonth);
  }, [resetDaysOptions, selectYear, selectMonth]);

  const selectYearIndex = useMemo(() => {
    return years.findIndex((year) => year.value === selectYear);
  }, [years, selectYear]);

  const selectMonthIndex = useMemo(() => {
    return months.findIndex((month) => month.value === selectMonth);
  }, [months, selectMonth]);

  const selectDayIndex = useMemo(() => {
    return days.findIndex((day) => day.value === selectDay);
  }, [days, selectDay]);

  const onSelect = useCallback(
    (selected) => {
      const value = selected?.value;

      switch (selected.type) {
        case 1:
          if (value !== selectYear) setSelectYear(value);
          break;

        case 2:
          if (value !== selectMonth) setSelectMonth(value);

          break;
        case 3:
          if (value !== selectDay) setSelectDay(value);

          break;
      }
    },
    [selectYear, selectMonth, selectDay],
  );

  const dateStr = useMemo(() => {
    const toStr = (num: number): string => {
      return `${num < 10 ? 0 : ''}${num}`;
    };

    return selectYear && selectMonth && selectDay
      ? `${selectYear} - ${toStr(selectMonth)} -  ${toStr(selectDay)}`
      : '-';
  }, [selectYear, selectMonth, selectDay]);

  const onDateChange = useCallback(() => {
    if (onChange && selectYear && selectMonth && selectDay) {
      // 保留当前时间的 time
      onChange(
        moment(value)
          .year(selectYear)
          .month(selectMonth - 1)
          .date(selectDay),
      );
    }
    setVisible(false);
  }, [value, onChange, selectYear, selectMonth, selectDay]);

  return (
    <>
      <p
        className="text-base font-bold text-gray-600 dark:text-gray-100 cursor-pointer"
        style={{ lineHeight: '32px' }}
        onClick={() => setVisible(true)}
      >
        {value?.format('YYYY-MM-DD') || '请选择'}
      </p>

      <SideSheet
        placement="bottom"
        title={title || (titlePre && `选择${titlePre}日期`) || '选择日期'}
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
              {dateStr}
            </p>
          }
          footer={
            <Button block theme="solid" type="primary" onClick={onDateChange}>
              确定
            </Button>
          }
        >
          <ScrollItem
            mode="wheel"
            cycled={false}
            list={years}
            type={1}
            selectedIndex={selectYearIndex}
            onSelect={onSelect}
          />

          <ScrollItem
            mode="wheel"
            cycled={false}
            list={months}
            type={2}
            selectedIndex={selectMonthIndex}
            onSelect={onSelect}
          />

          <ScrollItem
            mode="wheel"
            cycled={false}
            list={days}
            type={3}
            selectedIndex={selectDayIndex}
            onSelect={onSelect}
          />
        </ScrollList>
      </SideSheet>
    </>
  );
};
