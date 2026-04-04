import { useState } from 'react';
import { ScalePressable } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import DatePicker from 'react-native-date-picker';
import { FieldValues, useController } from 'react-hook-form';

import dayjs from '@/lib/dayjs';
import COLORS from '@/constants/colors.contstants';
import { useLanguages } from '@/hooks/languages.hook';

import { Input } from '../input';
import { FormDatePickerInputProps } from '../../types';

export default function FormDatePickerInput<T extends FieldValues = FieldValues>(props: FormDatePickerInputProps<T>) {
  const {
    className,
    control,
    datePickerProps,
    hasClearIcon,
    hasErrorTranslation,
    inputContainerClassName,
    inputFieldClassName,
    label,
    name,
    onChange: onChangeData,
    placeholder,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);

  const { t } = useTranslate();
  const { getLanguage } = useLanguages();

  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController({ control, name });
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());

  const dateValue = value ? dayjs(value).format('DD/MM/YYYY') : '';

  return (
    <>
      <ScalePressable onPress={() => setOpen(true)} className="w-full">
        <Input
          inputFieldProps={{
            className: inputFieldClassName,
            editable: false,
            onBlur,
            placeholder,
            pointerEvents: 'box-none',
            value: dateValue,
            ...rest,
          }}
          label={label}
          inputContainerClassName={inputContainerClassName}
          className={className}
          hasError
          hasClearIcon={hasClearIcon}
          hasMessageError
          error={hasErrorTranslation ? t(error?.message ?? '') : error?.message}
        />
      </ScalePressable>
      <DatePicker
        modal
        open={open}
        date={selectedDate}
        mode="date"
        locale={getLanguage()}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
          onChangeData?.(date);
          setSelectedDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        confirmText={t('common.button_confirm')}
        cancelText={t('common.button_cancel')}
        title={t('common.date_picker_title')}
        maximumDate={new Date()}
        minimumDate={new Date('1900-01-01')}
        dividerColor={COLORS.primary}
        {...datePickerProps}
      />
    </>
  );
}
