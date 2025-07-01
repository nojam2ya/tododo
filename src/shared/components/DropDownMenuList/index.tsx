import type { HTMLAttributes } from 'react';
import * as React from 'react';
import type { ChildrenProps } from '@/types/global';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';

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
  buttonChildren: React.ReactElement | ButtonRenderProp;
  anchor?: AnchorProps;
}

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
DropDownMenuList.Item = Item;

export default DropDownMenuList;
