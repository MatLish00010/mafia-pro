'use client';

import {CaretSortIcon} from '@radix-ui/react-icons';
import {ClassValue} from 'clsx';
import * as React from 'react';

import useMediaQuery from '@/hooks/screen/useMediaQuery.ts';
import {cn} from '@/lib/utils.ts';
import {Button} from '@/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command';
import {Drawer, DrawerContent, DrawerTrigger} from '@/ui/drawer';
import {Popover, PopoverContent, PopoverTrigger} from '@/ui/popover';

type ItemList = {
  label: string;
  id: string;
};

type ListProps = {
  setOpen: (open: boolean) => void;
  onSelect: (item: ItemList['id'] | null) => void;
  items: ItemList[];
  disabledKeys?: string[];
};

const List = ({setOpen, onSelect, items, disabledKeys}: ListProps) => {
  return (
    <Command>
      <CommandInput placeholder="Filter ..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items.map(item => (
            <CommandItem
              disabled={disabledKeys?.includes(item.id)}
              key={item.id}
              value={item.label}
              onSelect={() => {
                onSelect(item.id);
                setOpen(false);
              }}>
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

type Props = {
  classNames?: {
    openButton: ClassValue[];
  };
  buttonLabel: string;
  items: ItemList[];
  onSelect: (id: ItemList['id'] | null) => void;
  disabledKeys?: string[];
};

const ComboBoxResponsive = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn([props?.classNames?.openButton, 'w-[200px] justify-between'])}>
            {props.buttonLabel}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]  p-0" align="start">
          <List
            disabledKeys={props.disabledKeys}
            items={props.items}
            setOpen={setOpen}
            onSelect={props.onSelect}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn([props?.classNames?.openButton, 'w-[200px] justify-between'])}>
          {props.buttonLabel}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <List
            disabledKeys={props.disabledKeys}
            items={props.items}
            setOpen={setOpen}
            onSelect={props.onSelect}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ComboBoxResponsive;
