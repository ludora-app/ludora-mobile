import React, { useState } from 'react';
import COLORS from '@/constants/COLORS';
import { TextInput } from 'react-native';

import cn from '../cn/cn';
import Box from '../box/Box';
import { Icon } from '../icon';
import { FormInputProps } from '../utils/types';
import String from '../string/components/String';

export default function Input(props: Partial<FormInputProps>) {
  const { className, label, required, secureTextEntry, ...rest } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  return (
    <Box>
      <String weight="semiBold" className="pl-1" useFastText={false}>
        {label}
        {!!label && required && (
          <String weight="semiBold" className="text-red-500" useFastText={false}>
            *
          </String>
        )}
      </String>
      <Box className="relative justify-center">
        <TextInput
          className={cn('rounded-lg border-2 border-[#D8DADC] bg-white p-3 font-nunitoBold text-lg', className)}
          cursorColor="#000"
          placeholderTextColor={COLORS.ring}
          secureTextEntry={isPasswordVisible}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...rest}
        />
        <Box className="absolute right-3">
          {secureTextEntry && (
            <Icon
              variant={isPasswordVisible ? 'eye-solid' : 'eye-slash-solid'}
              wrapper
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
