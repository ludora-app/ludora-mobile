import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StorybookScreen() {
  return (
    <SafeAreaView className="flex-1" edges={['bottom']}>
      <WebView source={{ uri: 'https://storybook.chillui.com' }} style={{ flex: 1 }} useWebView2 />
    </SafeAreaView>
  );
}
