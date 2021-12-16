import React, { FC, ReactChild, ReactElement, ReactNode, useMemo } from 'react';
import {
  Control,
  useController,
  useForm,
  useFormState,
  FieldError,
  ValidationRule,
  RegisterOptions,
} from 'react-hook-form';

import { Tooltip } from '@douyinfe/semi-ui';
import { IconAlertCircle } from '@douyinfe/semi-icons';
import { notNil } from '@elonwu/utils';

export type FormItemRules = Omit<
  RegisterOptions<any, any>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export interface ElonFormItem {
  key: string;
  label?: string;
  defaultValue?: any;
  rules?: FormItemRules;
  content?: ReactNode;
  render?: (value: any) => ReactNode;
  row?: boolean;
  labelWidth?: number;
}

export interface UseElonFormProps {
  formItems: ElonFormItem[];
  onSubmit: (value: any) => void;
  onError?: (err: any) => void;
  row?: boolean;
}

export interface FormItemRendererProps {
  name: string;
  label?: string;
  error?: Error;
  isValidating?: boolean;
  row?: boolean;
  labelWidth?: number;
}

export const useElonForm = (props: UseElonFormProps) => {
  const { formItems, onSubmit, onError, row } = props;

  const methods = useForm();

  const { isValidating, isSubmitting, errors } = useFormState({
    control: methods.control,
  });

  const sections = useMemo(() => {
    const sections: { [key: string]: ReactNode } = {};

    formItems.forEach((item) => {
      sections[item.key] = (
        // @ts-ignore
        <FormItem
          key={item.key}
          item={item}
          control={methods.control}
          row={row}
        />
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
  item: { key, label, rules, defaultValue, content, render, row, labelWidth },
  row: formRow,
}: {
  control: Control;
  item: ElonFormItem;
  row?: boolean;
}) => {
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
  if (!!content) {
    const props = Object.assign({}, (content as any)?.props, {
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
        labelWidth={labelWidth}
      >
        {React.cloneElement(content as any, props)}
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

const FormItemRenderer: FC<FormItemRendererProps> = (props) => {
  const {
    name,
    label,
    error,
    isValidating,
    children,
    row = false,
    labelWidth = 80,
  } = props;
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
