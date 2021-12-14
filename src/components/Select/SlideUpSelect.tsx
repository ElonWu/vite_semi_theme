import { useMemo, useState } from 'react';
import { ElonDropdownOption } from '../DropDown';
import { Button, SideSheet, ScrollItem, ScrollList } from '@douyinfe/semi-ui';

export const SlideUpSelect = ({
  title,
  value,
  onChange,
  options,
}: {
  title: string;
  value: string;
  onChange: (value?: string) => void;
  options: ElonDropdownOption[];
}) => {
  const matchItem = useMemo(() => {
    return options?.find((opt) => opt.key === value)?.title || value;
  }, [options, value]);

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(options?.[0]?.key);

  const list = useMemo(
    () => options?.map((opt) => ({ value: opt.title, key: opt.key })),
    [options],
  );

  const selectedIndex = useMemo(
    () => options?.findIndex((opt) => opt.key === value) || 0,
    [options, value],
  );

  return (
    <>
      <p
        className="text-base font-bold text-gray-600 dark:text-gray-100 cursor-pointer"
        style={{ lineHeight: '32px' }}
        onClick={() => setVisible(true)}
      >
        {matchItem}
      </p>

      <SideSheet
        placement="bottom"
        title={title}
        visible={visible && !!selected}
        onCancel={() => setVisible(false)}
        height={360}
        bodyStyle={{
          overflow: 'auto',
          paddingTop: 4,
          paddingBottom: 16,
        }}
      >
        <ScrollList
          footer={
            <Button
              block
              theme="solid"
              type="primary"
              onClick={() => {
                onChange(selected);
                setVisible(false);
              }}
            >
              确定
            </Button>
          }
        >
          <ScrollItem
            mode="wheel"
            cycled={false}
            list={list}
            selectedIndex={selectedIndex}
            onSelect={(item) => setSelected(item.key)}
          />
        </ScrollList>
      </SideSheet>
    </>
  );
};
