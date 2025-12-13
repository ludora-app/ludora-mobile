import { useState } from 'react';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChilluiDevToolsProps } from '../../../types';
import ChilluiDevToolsAction from './ChilluiDevToolAction';

export default function ChilluiDevToolImpl(props: ChilluiDevToolsProps) {
  const [isStorybook, setIsStorybook] = useState(false);

  const handleToggleStorybook = () => {
    setIsStorybook(!isStorybook);
  };

  return (
    <ChilluiDevToolsAction handleToggleStorybook={handleToggleStorybook} {...props}>
      <Modal visible={isStorybook} onRequestClose={handleToggleStorybook} animationType="slide">
        <SafeAreaView className="flex-1">
          <WebView source={{ uri: 'https://storybook.chillui.com' }} style={{ flex: 1 }} useWebView2 />
        </SafeAreaView>
        <ChilluiDevToolsAction handleToggleStorybook={handleToggleStorybook} {...props} />
      </Modal>
    </ChilluiDevToolsAction>
  );
}
