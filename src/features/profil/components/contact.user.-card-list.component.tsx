import { FlatList } from 'react-native';

import users from '../mocks/users.mocks';
import ContactUserCard from './contact-user-card.component';

export default function ContactUserCardList() {
  return (
    <FlatList
      data={users}
      horizontal
      renderItem={({ item }) => <ContactUserCard user={item} />}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 mt-2 py-2"
    />
  );
}
