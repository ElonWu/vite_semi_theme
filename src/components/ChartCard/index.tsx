import React, { useEffect, useMemo, useState } from 'react';

import {
  IconBarChartHStroked,
  IconDownload,
  IconGridView,
  IconInfoCircle,
  IconLineChartStroked,
  IconPieChartStroked,
  IconRefresh,
} from '@douyinfe/semi-icons';

import moment from 'moment';

import { Select } from '@douyinfe/semi-ui';

import { LineGroup, Pie, BarGroup } from '@elonwu/web-chart';

import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';
import { useGlobal } from '@/layout/Global';
import { Divider, ElonSelect, ElonTable } from '@/components';

import { ElonDateTimeRangePicker } from '../Picker';

const ChartCard = ({ cardKey }: { cardKey: string }) => {
  const [chartType, setChartType] = useState<string>();

  // 随机图
  useEffect(() => {
    const options = ['line', 'pie', 'bar', 'table'];
    const randomType = options[Math.floor(Math.random() * options.length)];
    return setChartType(randomType);
  }, []);

  return (
    <div
      data-role="ChartCard"
      className="h-full flex flex-col space-y-4 bg-white dark:bg-gray-700 p-4 rounded-md min-w-0"
    >
      <CardTitle />

      <div className="flex flex-col items-stretch justify-between space-y-4 md:flex-row md:items-center md:justify-start md:space-y-0">
        <DateRangeSelect />

        <div className="flex flex-wrap items-center justify-start space-x-2 md:flex-1 md:pl-2">
          <TimeDimSelect />
          <Divider />
          <DimSelect />
        </div>

        <ChartTypeSelect value={chartType} onChange={setChartType} />
      </div>

      <div className="flex items-center justify-between">
        <Desc title="515,17" unit="万" />
        <Desc title="515,17" unit="万" />
        <Desc title="515,17" unit="万" />
      </div>

      <DataPreview cardKey={cardKey} chartType={chartType} />
    </div>
  );
};

export default ChartCard;

const CardTitle = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex-1 flex items-center space-x-4 justify-start">
        <h4 className="font-bold text-lg text-gray-800 dark:text-gray-50">
          标题
        </h4>
        <IconInfoCircle />
      </div>

      <div className="flex-1 flex items-center space-x-4 justify-end">
        <IconRefresh />
        <IconDownload />
      </div>
    </div>
  );
};

const ChartTypeSelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: any) => void;
}) => {
  const { isMobile } = useGlobal();
  const options: OptionProps[] = useMemo(() => {
    return [
      {
        value: 'line',
        label: '线图',
      },
      {
        value: 'pie',
        label: '饼图',
      },
      {
        value: 'bar',
        label: '柱图',
      },
      {
        value: 'table',
        label: '图表',
      },
    ];
  }, []);

  const prefixIcon = useMemo(() => {
    switch (value) {
      case 'table':
        return <IconGridView />;
      case 'pie':
        return <IconPieChartStroked />;
      case 'bar':
        return <IconBarChartHStroked />;
      case 'line':
      default:
        return <IconLineChartStroked />;
    }
  }, [value]);

  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ width: isMobile ? '100%' : 160 }}
      prefix={prefixIcon}
      optionList={options}
      placeholder="选择图表类型"
    />
  );
};

const DataPreview = ({
  cardKey,
  chartType,
}: {
  cardKey: string;
  chartType?: string;
}) => {
  const { theme } = useGlobal();

  const dataSource = useMemo(() => {
    return [
      { x: '2021-12-01', y: 100, z: '类型1' },
      { x: '2021-12-02', y: 50, z: '类型1' },
      { x: '2021-12-03', y: 86, z: '类型1' },
      { x: '2021-12-04', y: 67, z: '类型1' },
      { x: '2021-12-05', y: 48, z: '类型1' },
      { x: '2021-12-06', y: 90, z: '类型1' },
      { x: '2021-12-07', y: 24, z: '类型1' },

      { x: '2021-12-01', y: 48, z: '类型2' },
      { x: '2021-12-02', y: 54, z: '类型2' },
      { x: '2021-12-03', y: 33, z: '类型2' },
      { x: '2021-12-04', y: 57, z: '类型2' },
      { x: '2021-12-05', y: 27, z: '类型2' },
      { x: '2021-12-06', y: 87, z: '类型2' },
      { x: '2021-12-07', y: 53, z: '类型2' },

      { x: '2021-12-01', y: 60, z: '类型3' },
      { x: '2021-12-02', y: 40, z: '类型3' },
      { x: '2021-12-03', y: 56, z: '类型3' },
      { x: '2021-12-04', y: 37, z: '类型3' },
      { x: '2021-12-05', y: 88, z: '类型3' },
      { x: '2021-12-06', y: 20, z: '类型3' },
      { x: '2021-12-07', y: 94, z: '类型3' },
    ];
  }, []);

  const key = useMemo(() => `${cardKey}-${chartType}`, [chartType, cardKey]);

  const height = useMemo(() => 400, []);

  const chartProps = { theme, chartKey: key, dataSource, height };

  const tableProps = {
    theme,
    tableKey: key,
    dataSource,
    columns: [
      {
        title: '日期',
        dataIndex: 'x',
      },
      {
        title: '数量',
        dataIndex: 'y',
      },
      {
        title: '类型',
        dataIndex: 'z',
      },
    ],
  };

  switch (chartType) {
    case 'table':
      return <ElonTable height={height} pageSize={6} {...tableProps} />;

    case 'line':
      return <LineGroup {...chartProps} />;

    case 'bar':
      return <BarGroup {...chartProps} />;

    case 'pie':
      return (
        <Pie
          {...chartProps}
          dataSource={[
            { x: '2021-12-01', y: 100 },
            { x: '2021-12-02', y: 50 },
            { x: '2021-12-03', y: 86 },
            { x: '2021-12-04', y: 67 },
            { x: '2021-12-05', y: 48 },
            { x: '2021-12-06', y: 90 },
            { x: '2021-12-07', y: 24 },
          ]}
        />
      );

    default:
      return null;
  }
};

const Desc = ({ title, unit }: { title: string; unit: string }) => {
  return (
    <div className="flex flex-wrap items-end justify-start">
      <h4 className="text-gray-600 dark:text-gray-50 font-bold text-2xl md:text-3xl">
        {title}
      </h4>
      <span className="text-gray-400 dark:text-gray-100 font-bold text-sm md:text-base">
        {unit}
      </span>
    </div>
  );
};

const DimSelect = () => {
  const [value, onChange] = useState('dim1');

  const options = useMemo(() => {
    return [
      { key: 'dim1', title: '维度1' },
      { key: 'dim2', title: '维度2' },
      { key: 'dim3', title: '维度3' },
      { key: 'dim4', title: '维度4' },
      { key: 'dim5', title: '维度5' },
    ];
  }, []);

  const props = { title: '维度', value, onChange: onChange as any, options };

  return <ElonSelect {...props} />;
};

const TimeDimSelect = () => {
  const [value, onChange] = useState('dim2');

  const options = useMemo(() => {
    return [
      { key: 'dim1', title: '小时' },
      { key: 'dim2', title: '按天' },
      { key: 'dim3', title: '按周' },
      { key: 'dim4', title: '按月' },
      { key: 'dim5', title: '季度' },
    ];
  }, []);
  const props = {
    title: '时间维度',
    value,
    onChange: onChange as any,
    options,
  };

  return <ElonSelect {...props} />;
};

const DateRangeSelect = () => {
  const [value, onChange] = useState([moment().subtract(7, 'days'), moment()]);
  return <ElonDateTimeRangePicker value={value} onChange={onChange} />;
  // return <ElonDateRangePicker value={value} onChange={onChange} />;
};
