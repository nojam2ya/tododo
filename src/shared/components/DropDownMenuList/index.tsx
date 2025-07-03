import * as React from 'react';
import { type HTMLAttributes, memo } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import type { ChildrenProps } from '@/types/component';

interface DropDownMenuItem extends HTMLAttributes<any> {
  as?: React.ElementType;
}

type AnchorProps =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'left start'
  | 'left end'
  | 'right start'
  | 'right end';

type ButtonRenderProp = (props: {
  open?: boolean;
  autofocus?: boolean;
  focus?: boolean;
  hover?: boolean;
  disabled?: boolean;
  active?: boolean;
}) => React.ReactElement;

interface DropDownMenuListProps extends ChildrenProps {
  buttonChildren: React.ReactElement | ButtonRenderProp; // 렌더 함수 O
  anchor?: AnchorProps;
}

/**
 * 드롭 다운 메뉴 아이템 컴포넌트
 * @param as
 * @param children
 * @param className
 * @param props
 * @constructor
 */
const Item: React.FC<DropDownMenuItem> = ({ as, children, className, ...props }) => {
  return (
    <MenuItem
      className={clsx(
        'rounded-md block w-full dark:text-white text-left flex gap-2 items-center p-1',
        'hover:bg-black/5 dark:hover:bg-white/10',
        className,
      )}
      as={as ?? 'div'}
      {...props}
    >
      {children}
    </MenuItem>
  );
};

/**
 * 드롭 다운 메뉴 컨테이너 컴포넌트
 * @param anchor - 드롭다운 창 위치
 * @param buttonChildren
 * @param children
 * @constructor
 */
const DropDownMenuListComp: React.FC<DropDownMenuListProps> = ({ anchor, buttonChildren, children }) => {
  return (
    <Menu>
      <MenuButton>
        {props => (typeof buttonChildren === 'function' ? buttonChildren(props) : buttonChildren)}
      </MenuButton>
      <MenuItems anchor={anchor ?? 'bottom end'} className={'box w-32'}>
        {children}
      </MenuItems>
    </Menu>
  );
};

type DropDownMenuList = typeof DropDownMenuListComp & { Item: typeof Item };
const DropDownMenuList = DropDownMenuListComp as DropDownMenuList;
DropDownMenuList.Item = memo(Item);

export default DropDownMenuList;
