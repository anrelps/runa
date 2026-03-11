'use client';
import {
  type FieldErrorProps,
  Group,
  type GroupProps,
  type InputProps,
  type LabelProps,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  Text,
  type TextProps,
  composeRenderProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../../../utils/utils';

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        'font-sans text-sm text-neutral-600 dark:text-neutral-300 font-medium cursor-default w-fit',
        props.className,
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot='description'
      className={twMerge('text-sm text-neutral-600', props.className)}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'text-sm text-red-600 forced-colors:text-[Mark]',
      )}
    />
  );
}

export const fieldBorderStyles = tv({
  base: 'transition',
  variants: {
    isFocusWithin: {
      false:
        'border-neutral-300 hover:border-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500 forced-colors:border-[ButtonBorder]',
      true: 'border-neutral-600 dark:border-neutral-300 forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'border-red-600 dark:border-red-600 forced-colors:border-[Mark]',
    },
    isDisabled: {
      true: 'border-neutral-200 dark:border-neutral-700 forced-colors:border-[GrayText]',
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base:
    'group flex items-center h-9 box-border border rounded-lg overflow-hidden transition' +
    ' bg-[var(--color-background-card,#141f1f)] border-[var(--color-border-card,rgba(32,224,150,0.08))]',
  variants: fieldBorderStyles.variants,
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'px-3 py-0 min-h-9 flex-1 min-w-0 border-0 outline outline-0 font-sans text-sm' +
          ' text-[var(--color-text-primary,#fff)] bg-[var(--color-background-card,#141f1f)]' +
          ' placeholder:text-[var(--color-text-secondary,#6e8a85)] disabled:text-[var(--color-text-secondary,#6e8a85)] disabled:placeholder:text-[var(--color-text-secondary,#6e8a85)] [-webkit-tap-highlight-color:transparent]',
      )}
    />
  );
}
