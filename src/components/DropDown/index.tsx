import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import { Dropdown } from '@douyinfe/semi-ui';
import { isValidArray } from '@elonwu/utils';
import {
  DropdownProps,
  DropDownMenuItem,
} from '@douyinfe/semi-ui/lib/es/dropdown';

import { useControlled } from '@elonwu/hooks';

export type ItemEventHandler = (key: string, e: MouseEvent) => void;

export interface ElonDropdownOption extends Omit<DropDownMenuItem, 'node'> {
  key: string;
  title?: string;
  items?: ElonDropdownOption[];
}

export interface ElonDropDownProps extends DropdownProps {
  options: ElonDropdownOption[];
  onClick?: ItemEventHandler;
  onContextMenu?: ItemEventHandler;
  onEnter?: ItemEventHandler;
  onLeave?: ItemEventHandler;

  value?: string;
  onChange?: (key: string) => void;
}

export const ElonDropdown: FC<ElonDropDownProps> = ({
  options,
  onClick,
  onContextMenu,
  onEnter,
  onLeave,
  value,
  onChange,
  ...rest
}) => {
  const [active, setActive] = useControlled(
    { value, onChange },
    {
      initialValue: value,
    },
  );

  const onClickItem: ItemEventHandler = useCallback(
    (key, e): void => {
      setActive(key);

      if (onClick) onClick(key, e);
    },
    [onClick, setActive],
  );

  const onContextMenuItem: ItemEventHandler = useCallback(
    (key, e): void => {
      if (onContextMenu) onContextMenu(key, e);
    },
    [onContextMenu],
  );

  const onEnterItem: ItemEventHandler = useCallback(
    (key, e): void => {
      if (onEnter) onEnter(key, e);
    },
    [onEnter],
  );

  const onLeaveItem: ItemEventHandler = useCallback(
    (key, e): void => {
      if (onLeave) onLeave(key, e);
    },
    [onLeave],
  );

  const menu = useMemo(() => {
    if (!isValidArray(options)) return [];

    let menu: DropDownMenuItem[] = [];

    const genMenuItems = (
      options: ElonDropdownOption[],
    ): DropDownMenuItem[] => {
      let menuItems: DropDownMenuItem[] = [];

      options.forEach(({ key, title, items, ...rest }, i, list) => {
        if (items && isValidArray(items)) {
          menuItems = menuItems.concat([
            { node: 'title', name: title },
            ...genMenuItems(items),
          ]);

          // 中间的分组增加分隔符
          if (i !== list.length - 1) {
            menuItems = menuItems.concat({ node: 'divider' });
          }
        } else {
          menuItems = menuItems.concat([
            {
              // @ts-ignore
              node: 'item',
              name: title,
              active: active === key,
              onClick: (e: MouseEvent<HTMLLIElement>) => onClickItem(key, e),
              onContextMenu: (e: MouseEvent<HTMLLIElement>) =>
                onContextMenuItem(key, e),
              onMouseEnter: (e: MouseEvent<HTMLLIElement>) =>
                onEnterItem(key, e),
              onMouseLeave: (e: MouseEvent<HTMLLIElement>) =>
                onLeaveItem(key, e),
              ...rest,
            },
          ]);
        }
      });

      return menuItems;
    };

    return menu.concat(genMenuItems(options));
  }, [
    active,
    options,
    onClickItem,
    onContextMenuItem,
    onEnterItem,
    onLeaveItem,
  ]);

  return <Dropdown showTick menu={menu} {...rest} />;
};
