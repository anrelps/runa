import { CalendarIcon } from '@phosphor-icons/react/dist/icons/Calendar';
import {
  DateRangePicker as AriaDateRangePicker,
  type DateRangePickerProps as AriaDateRangePickerProps,
  type DateValue,
  type ValidationResult,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../../../utils/utils';
import { DateInput } from './DateField';
import { Description, FieldError, FieldGroup, Label } from './Field';
import { FieldButton } from './FieldButton';
import { Popover } from './Popover';
import { RangeCalendar } from './RangeCalendar';

export interface DateRangePickerProps<
  T extends DateValue,
> extends AriaDateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DateRangePickerProps<T>) {
  return (
    <AriaDateRangePicker
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1 font-sans max-w-full',
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className='min-w-52 w-auto cursor-text disabled:cursor-default'>
        <div className='flex-1 w-fit flex items-center overflow-x-auto overflow-y-clip [scrollbar-width:none]'>
          <DateInput slot='start' className='ps-3 pe-2 text-sm' />
          <span
            aria-hidden='true'
            className='text-neutral-800 dark:text-neutral-200 forced-colors:text-[ButtonText] group-disabled:text-neutral-200 dark:group-disabled:text-neutral-600 forced-colors:group-disabled:text-[GrayText]'
          >
            –
          </span>
          <DateInput slot='end' className='flex-1 ps-2 pe-3 text-sm' />
        </div>
        <FieldButton className='w-6 mr-1 outline-offset-0'>
          <CalendarIcon aria-hidden size={16} weight='regular' />
        </FieldButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className='p-2'>
        <RangeCalendar />
      </Popover>
    </AriaDateRangePicker>
  );
}
