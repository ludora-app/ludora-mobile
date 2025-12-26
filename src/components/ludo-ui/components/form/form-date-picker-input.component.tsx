import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ScalePressable } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import DatePicker from 'react-native-date-picker';
import { FieldValues, useController } from 'react-hook-form';

import COLORS from '@/constants/COLORS';
import { useLanguages } from '@/hooks/languages.hook';

import { Input } from '../input';
import { FormDatePickerInputProps } from '../../types';

export default function FormDatePickerInput<T extends FieldValues = FieldValues>(props: FormDatePickerInputProps<T>) {
  const {
    className,
    control,
    datePickerProps,
    inputContainerClassName,
    inputFieldClassName,
    label,
    name,
    placeholder,
    ...rest
  } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const { t } = useTranslate();
  const { getLanguage } = useLanguages();

  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController({ control, name });

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
          hasMessageError
          error={error?.message}
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
          setSelectedDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        confirmText={t('common.button_confirm')}
        cancelText={t('common.button_cancel')}
        title={t('common.date_picker_title')}
        maximumDate={new Date()}
        dividerColor={COLORS.primary}
        {...datePickerProps}
      />
    </>
  );
}
