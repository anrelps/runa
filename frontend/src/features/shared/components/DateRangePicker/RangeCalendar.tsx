'use client';
import {
  RangeCalendar as AriaRangeCalendar,
  type RangeCalendarProps as AriaRangeCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  type DateValue,
  Text,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../../../utils/utils';
import { CalendarGridHeader, CalendarHeader } from './Calendar';

export interface RangeCalendarProps<T extends DateValue> extends Omit<
  AriaRangeCalendarProps<T>,
  'visibleDuration'
> {
  errorMessage?: string;
}

const cell = tv({
  extend: focusRing,
  base:
    'w-full h-full flex items-center justify-center rounded-full forced-color-adjust-none' +
    ' text-[var(--color-text-primary,#fff)] bg-transparent',
  variants: {
    selectionState: {
      none: 'hover:bg-[var(--color-border-card,rgba(32,224,150,0.08))] pressed:bg-[var(--color-border-card,rgba(32,224,150,0.12))]',
      middle: [
        'hover:bg-blue-200 dark:hover:bg-blue-900',
        'group-invalid:hover:bg-red-200 dark:group-invalid:hover:bg-red-900',
        'pressed:bg-blue-300 dark:pressed:bg-blue-800',
        'group-invalid:pressed:bg-red-300 dark:group-invalid:pressed:bg-red-800',
      ],
      cap: 'bg-blue-600 group-invalid:bg-red-600 text-white',
    },
    isDisabled: {
      true: 'text-[var(--color-text-secondary,#6e8a85)]',
    },
  },
});

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'font-sans w-[calc(9*var(--spacing)*7)] max-w-full @container',
      )}
    >
      <CalendarHeader />
      <CalendarGrid className='[&_td]:px-0 [&_td]:py-px border-spacing-0'>
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className='group w-[calc(100cqw/7)] aspect-square text-sm outline outline-0 cursor-default outside-month:text-neutral-300 selected:bg-blue-100 dark:selected:bg-blue-700/30 forced-colors:selected:bg-[Highlight] invalid:selected:bg-red-100 dark:invalid:selected:bg-red-700/30 forced-colors:invalid:selected:bg-[Mark] [td:first-child_&]:rounded-s-full selection-start:rounded-s-full [td:last-child_&]:rounded-e-full selection-end:rounded-e-full [-webkit-tap-highlight-color:transparent]'
            >
              {({
                formattedDate,
                isSelected,
                isSelectionStart,
                isSelectionEnd,
                isFocusVisible,
                isDisabled,
              }) => (
                <span
                  className={cell({
                    selectionState:
                      isSelected && (isSelectionStart || isSelectionEnd)
                        ? 'cap'
                        : isSelected
                          ? 'middle'
                          : 'none',
                    isDisabled,
                    isFocusVisible,
                  })}
                >
                  {formattedDate}
                </span>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot='errorMessage' className='text-sm text-red-600'>
          {errorMessage}
        </Text>
      )}
    </AriaRangeCalendar>
  );
}
