import React, { FC } from 'react';
import { Table } from '@douyinfe/semi-ui';

import { useGlobal } from '../../layout/Global';

export interface ElonTableProps {
  height?: number;
  pageSize?: number;
}

export const ElonTable: FC<ElonTableProps> = ({
  height = 400,
  pageSize = 10,
  ...tableProps
}) => {
  const { locale } = useGlobal();
  return (
    <Table
      style={{ height }}
      bordered
      tableLayout="fixed"
      pagination={{
        pageSize,
        formatPageText: (info) => {
          if (!info) return '';
          return locale.table.pagination(info);
        },
      }}
      {...tableProps}
    />
  );
};
