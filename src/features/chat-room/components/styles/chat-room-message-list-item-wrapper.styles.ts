import { tv } from 'tailwind-variants';

export const chatRoomMessageListItemWrapperTv = tv({
  base: 'rounded-lg p-2',
  compoundVariants: [
    {
      className: 'bg-transparent border border-primary',
      isMessageDeleted: true,
      isMessageFromMe: true,
    },
    {
      className: 'bg-transparent border border-ring',
      isMessageDeleted: true,
      isMessageFromMe: false,
    },
    {
      className: 'bg-primary',
      isMessageDeleted: false,
      isMessageFromMe: true,
    },
    {
      className: 'bg-ring',
      isMessageDeleted: false,
      isMessageFromMe: false,
    },
  ],
  variants: {
    isMessageDeleted: {
      false: '',
      true: '',
    },
    isMessageFromMe: {
      false: '',
      true: '',
    },
  },
});
