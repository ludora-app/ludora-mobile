import { useState } from 'react';
import * as Updates from 'expo-updates';
import { Box, Button, Separator, String } from '@ludo/ui';

import { resetCaches } from '@/utils/reset-caches.utils';

import { runBunScript } from '../queries/run-script.query';

export default function DevToolsSection() {
  const [isGeneratingTrad, setIsGeneratingTrad] = useState(false);
  const [isGeneratingIcons, setIsGeneratingIcons] = useState(false);
  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);

  const handleGenerateTrad = async () => {
    setIsGeneratingTrad(true);
    await runBunScript('bun generate:translations:local');
    setIsGeneratingTrad(false);
  };
  const handleGenerateIcons = async () => {
    setIsGeneratingIcons(true);
    await runBunScript('bun generate:icons');
    setIsGeneratingIcons(false);
  };

  const handleGenerateHooks = async () => {
    setIsGeneratingHooks(true);
    await runBunScript('bun generate:api');
    setIsGeneratingHooks(false);
  };

  const handleResetCaches = () => {
    resetCaches();
    Updates.reloadAsync();
  };

  return (
    <>
      <Box className="gap-3">
        <String variant="body-2" font="primaryBold">
          Outils de dev
        </String>
        <Button
          title="🌐 Générer la traduction"
          className="bg-primary"
          onPress={handleGenerateTrad}
          isLoading={isGeneratingTrad}
        />
        <Button
          title="🎨 Générer les icones"
          className="bg-primary"
          onPress={handleGenerateIcons}
          isLoading={isGeneratingIcons}
        />
        <Button
          title="🔄 Générer clients api"
          className="bg-primary"
          onPress={handleGenerateHooks}
          isLoading={isGeneratingHooks}
        />
        <Button title="🗑️ Nettoyer le cache" className="bg-primary" onPress={handleResetCaches} />
      </Box>
      <Separator />
    </>
  );
}
