import React, { useMemo } from 'react';
import { useController, useForm, useFormState } from 'react-hook-form';

import { Tooltip } from '@douyinfe/semi-ui';
import { IconAlertCircle } from '@douyinfe/semi-icons';
import { notNil } from '@elonwu/utils';

export const useElonForm = (
  formItems: any[],
  onSubmit: any,
  onError?: any,
  row?: boolean,
) => {
  const methods = useForm();

  const { isValidating, isSubmitting, errors } = useFormState({
    control: methods.control,
  });

  const sections = useMemo(() => {
    const sections: any = {};

    formItems.forEach((item) => {
      sections[item.key] = (
        <FormItem item={item} control={methods.control} row={row} />
      );
    }, []);

    return sections;
  }, [formItems, methods, row]);

  return {
    sections,
    submit: methods.handleSubmit(onSubmit, onError),
    isValidating,
    isSubmitting,
    errors,
    ...methods,
  };
};

const FormItem = ({
  control,
  item: { key, label, rules, defaultValue, content, render, row },
  row: formRow,
}: any) => {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched },
    formState: { errors, isValidating, isSubmitSuccessful, isSubmitted },
  } = useController({
    name: key,
    control,
    rules,
    defaultValue,
  });

  // 仅指定content, 默认构造
  if (content) {
    const props = Object.assign({}, content?.props, {
      value,
      onChange,
    });

    return (
      <FormItemRenderer
        key={key}
        name={key}
        label={label}
        row={formRow || row}
        error={errors?.[key]}
        isValidating={isValidating}
      >
        {React.cloneElement(content, props)}
      </FormItemRenderer>
    );
  }

  // 完全自定义render
  if (render) {
    return render({
      key: name,
      value,
      label,
      onChange,
      onBlur,
      invalid,
      isTouched,

      isValidating,
      isSubmitSuccessful,
      isSubmitted,
      ref,
    });
  }
};

const FormItemRenderer = ({
  name,
  label,
  error,
  isValidating,
  children,
  row = false,
  labelWidth = 80,
}: any) => {
  const errMsg = useMemo(() => error?.message, [error]);

  const layoutCls = useMemo(
    () => (row ? 'flex items-center space-x-2' : 'flex flex-col space-y-2'),
    [row],
  );

  const labelCls = useMemo(
    () =>
      notNil(error)
        ? 'text-red-500 dark:text-red-600 animate-jello-vertical'
        : 'text-gray-500 dark:text-gray-50',
    [error],
  );

  const visible = useMemo(
    () => !isValidating && !!errMsg,
    [isValidating, errMsg],
  );

  return (
    <div key={name} className={layoutCls}>
      <span
        className={`flex items-center space-x-1 ${labelCls}`}
        style={{ width: labelWidth, minWidth: labelWidth }}
      >
        <Tooltip
          content={errMsg}
          visible={visible}
          className="text-gray-100"
          trigger="click"
        >
          {visible && <IconAlertCircle className={labelCls} />}
        </Tooltip>

        <label className="flex-1 truncate">{label}</label>
      </span>
      {children}
    </div>
  );
};
