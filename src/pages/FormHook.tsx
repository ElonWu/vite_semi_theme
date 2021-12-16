import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import { Button, DatePicker, Input } from '@douyinfe/semi-ui';

import { ElonForm } from '../components/Form/Form';
import { ElonFormItem } from '@/components/Form/useForm';

const FormHook = () => {
  const formItems: ElonFormItem[] = useMemo(
    () => [
      {
        key: 'name',
        label: '名字',
        defaultValue: 'ElonWu',
        rules: { required: { value: true, message: '必填的' } },
        content: <Input placeholder="请输入名字" />,
      },
      {
        key: 'birthday',
        label: '出生日',
        rules: {
          validate: (date?: Date) => {
            if (!date) return '必填的';
            if (date && moment(date).isAfter(moment().startOf('day'))) {
              return '错误日期';
            }
          },
        },
        content: <DatePicker placeholder="请输入生日" className="flex-1" />,
        row: false,
        labelWidth: 120,
      },
    ],
    [],
  );

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onError = (error: any) => {
    console.log({ error });
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ElonForm
        formItems={formItems}
        onSubmit={onSubmit}
        onError={onError}
        trigger={({ submit, isSubmitting }: any) => (
          <Button loading={isSubmitting} onClick={submit}>
            提交
          </Button>
        )}
        row={false}
      />

      {/* <FlexWrap /> */}
    </div>
  );
};

export default FormHook;

const FlexWrap = () => {
  const list = useMemo(() => {
    return Array.from(new Array(20)).map((_, i) => i);
  }, []);

  return (
    <div>
      <div className="border rounded-md flex-auto-row">
        {list.map((li) => {
          const width = Math.ceil(Math.random() * 140 + 10);
          return (
            <div
              className={`card mr-2 mb-2 aspect-square`}
              style={{ width }}
            ></div>
          );
        })}
      </div>

      <div
        className="border rounded-md flex-auto-col overflow-auto"
        style={{ height: 450 }}
      >
        {list.map((li) => {
          const height = Math.ceil(Math.random() * 80 + 80);
          return (
            <div className={`card w-24 mr-2 mb-2`} style={{ height }}></div>
          );
        })}
      </div>
    </div>
  );
};
