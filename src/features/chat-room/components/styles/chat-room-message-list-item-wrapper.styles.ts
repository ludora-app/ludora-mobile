import { tv } from 'tailwind-variants';

export const chatRoomMessageListItemWrapperTv = tv({
  base: 'rounded-lg p-2 shrink',
  compoundVariants: [
    {
      className: 'bg-transparent border border-primary',
      isMessageDeleted: true,
      isMessageFromMe: true,
    },
    {
      className: 'bg-transparent border border-secondary',
      isMessageDeleted: true,
      isMessageFromMe: true,
      isSessionChat: true,
      isTeamLabelA: false,
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
      className: 'bg-secondary',
      isMessageDeleted: false,
      isMessageFromMe: true,
      isSessionChat: true,
      isTeamLabelA: false,
    },
    {
      className: 'bg-white border-1 border-primary',
      isMessageDeleted: false,
      isMessageFromMe: false,
    },
    {
      className: 'bg-white border-1 border-secondary',
      isMessageDeleted: false,
      isMessageFromMe: false,
      isSessionChat: true,
      isTeamLabelA: false,
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
    isSessionChat: {
      false: '',
      true: '',
    },
    isTeamLabelA: {
      false: '',
      true: '',
    },
  },
});
