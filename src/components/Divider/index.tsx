import React from 'react';
import cls from 'classnames';

export const Divider = ({ vertical }: { vertical?: boolean }) => {
  return (
    <span
      className={cls('rounded bg-gray-600 dark:bg-50', {
        'block w-full h-px': vertical,
        'inline-block h-4 w-px': !vertical,
      })}
    />
  );
};
