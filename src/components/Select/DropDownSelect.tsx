import { useMemo } from 'react';
import { ElonDropdown, ElonDropdownOption } from '../DropDown/index';

export const DropDownSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value?: string) => void;
  options: ElonDropdownOption[];
}) => {
  const matchItem = useMemo(() => {
    return options?.find((opt) => opt.key === value)?.title || value;
  }, [options, value]);

  return (
    <ElonDropdown value={value} onChange={onChange} options={options}>
      <p
        className="text-base font-bold text-gray-600 dark:text-gray-100"
        style={{ lineHeight: '32px' }}
      >
        {matchItem}
      </p>
    </ElonDropdown>
  );
};
