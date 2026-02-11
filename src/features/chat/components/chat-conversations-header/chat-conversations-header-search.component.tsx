import { useForm } from 'react-hook-form';
import { FormInput, WrapperSafeAreaView } from '@ludo/ui';

export default function ChatConversationsHeaderSearch() {
  const { control } = useForm();
  return (
    <WrapperSafeAreaView edges={['top']} fill={false}>
      <FormInput
        control={control}
        name="search"
        placeholder="Rechercher une conversation..."
        inputContainerClassName="rounded-full"
        size="lg"
        leftIconAction={{
          color: '#000',
          name: 'search-regular',
        }}
      />
    </WrapperSafeAreaView>
  );
}
