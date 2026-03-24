import { Wrapper } from '@ludo/ui';

import { EmptyResult } from '@/components/ui/empty-resulat';


export default function ChatRoomMessagesListEmpty() {
  return (
    <Wrapper fill className='items-center justify-end'>
      <EmptyResult
        center
        hasRandomTitle
        iconNames={["ludo-sunglass", "ludo-eating-pizza"]}
        randomOptions={3}
        title="chat-room.chat-room-messages-list-empty.title_v"
        className='mb-6'
        stringProps={{
          font: "primarySemiBold"
        }}
      />
    </Wrapper>
  )
}