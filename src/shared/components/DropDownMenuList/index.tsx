import * as React from 'react';
import type { ChildrenProps } from '@/types/global';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import type { AnchorProps } from '@headlessui/react/dist/internal/floating';

interface DropDownMenuListProps extends ChildrenProps {
  buttonChildren: React.ReactNode;
  anchor?: AnchorProps;
}

const Item: React.FC<ChildrenProps> = ({ children }) => {
  return <MenuItem>{children}</MenuItem>;
};

const DropDownMenuListComp: React.FC<DropDownMenuListProps> = ({ anchor, buttonChildren, children }) => {
  return (
    <Menu>
      <MenuButton>{buttonChildren}</MenuButton>
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
