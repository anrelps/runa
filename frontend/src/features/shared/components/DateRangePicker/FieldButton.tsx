'use client';
import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../../../utils/utils';

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon';
}

let button = tv({
  extend: focusRing,
  base:
    'relative inline-flex items-center border-0 font-sans text-sm text-center transition rounded-md cursor-default p-1 flex items-center justify-center' +
    ' text-[var(--color-text-secondary,#6e8a85)] bg-transparent hover:bg-[var(--color-border-card,rgba(32,224,150,0.08))] pressed:bg-[var(--color-border-card,rgba(32,224,150,0.12))] disabled:bg-transparent [-webkit-tap-highlight-color:transparent]',
  variants: {
    isDisabled: {
      true: 'bg-transparent text-[var(--color-text-secondary,#6e8a85)] border-none',
    },
  },
});

export function FieldButton(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, className }),
      )}
    >
      {props.children}
    </RACButton>
  );
}
