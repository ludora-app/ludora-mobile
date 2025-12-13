import { Box, cn } from '@chillui/ui';
import { tv } from 'tailwind-variants';
import { ScrollView } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { WrapperProps } from '../utils/types';

const classNameViewVariants = tv({
  base: 'flex-grow',
  defaultVariants: {
    px: true,
  },
  variants: {
    height: {
      'h-full': 'h-full',
      'h-screen': 'h-screen',
    },
    itemsCenter: {
      true: 'items-center',
    },
    justifyBetween: {
      true: 'justify-between',
    },
    my: {
      true: 'my-6',
    },
    pt: {
      1: 'pt-1',
      10: 'pt-10',
      2: 'pt-2',
      3: 'pt-3',
      4: 'pt-4',
      5: 'pt-5',
      6: 'pt-6',
      7: 'pt-7',
      8: 'pt-8',
      9: 'pt-9',
    },
    px: {
      true: 'px-4',
    },
    py: {
      true: 'py-6',
    },
  },
});

const containerClassName = (props: WrapperProps) => {
  const { className, ...rest } = props;
  return cn(classNameViewVariants({ ...rest }), className);
};

function ViewComponent(props: WrapperProps, children: React.ReactNode) {
  return <Box className={containerClassName(props)}>{children}</Box>;
}

function ScrollViewComponent(props: WrapperProps, children: React.ReactNode) {
  const { nestedScrollEnabled } = props;
  return (
    <ScrollView
      contentContainerClassName={containerClassName(props)}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={nestedScrollEnabled ?? false}
    >
      {children}
    </ScrollView>
  );
}

function KeyboardAwareScrollViewComponent(props: WrapperProps, children: React.ReactNode) {
  return (
    <KeyboardAwareScrollView
      contentContainerClassName={containerClassName(props)}
      keyboardShouldPersistTaps="handled"
      bottomOffset={20}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

function KeyboardAvoidingViewComponent(props: WrapperProps, children: React.ReactNode) {
  const { scrollView } = props;
  return (
    <KeyboardAvoidingView className={containerClassName(props)} behavior="padding" keyboardVerticalOffset={10}>
      {scrollView ? ScrollViewComponent(props, children) : children}
    </KeyboardAvoidingView>
  );
}

const IsScrollComponent = (props: WrapperProps, children: React.ReactNode) => {
  if (props.keyboardAwareScrollView) {
    return KeyboardAwareScrollViewComponent(props, children);
  }
  if (props.keyboardAvoidingView) {
    return KeyboardAvoidingViewComponent(props, children);
  }
  if (props.scrollView) {
    return ScrollViewComponent(props, children);
  }
  return ViewComponent(props, children);
};

const safeAreaViewComponents = (props: WrapperProps, children: React.ReactNode) => {
  const { edges } = props;
  return (
    <SafeAreaView mode="padding" className="flex-1" edges={edges as Edge[]}>
      {IsScrollComponent(props, children)}
    </SafeAreaView>
  );
};

const IsSafeAreaViewComponent = (props: WrapperProps, children: React.ReactNode) => {
  const { safeAreaView } = props;
  return safeAreaView ? safeAreaViewComponents(props, children) : IsScrollComponent(props, children);
};

export default function Wrapper(props: WrapperProps) {
  const { children } = props;

  return IsSafeAreaViewComponent(props, children);
}
