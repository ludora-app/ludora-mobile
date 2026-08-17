import { useState } from 'react';
import * as Updates from 'expo-updates';
import { Box, BoxRow, BoxRowCenterBetween, Chip, Separator, String, Toggle } from '@ludo/ui';

import { mmkvStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

import { runBunScript } from '../queries/run-script.query';
import { updateApiEnv } from '../queries/update-api-env.query';

const ENVIRONMENTS = [
  { id: 'localhost', label: 'localhost' },
  { id: 'development', label: 'development' },
  { id: 'preview', label: 'preview' },
  { id: 'production', label: 'production' },
] as const;

const apiEnvVar = process.env.EXPO_PUBLIC_API_ENV;

export default function DevToolsEnvironmentSection() {
  const [isGeneratedApiLocal, setIsGeneratedApiLocal] = useState(
    () => mmkvStorage.getBoolean(MMKV_STORAGE_KEY.DEV_TOOL_ENV_KEY_IS_GENERATE_ENABLE) ?? false,
  );
  const handleSelectApiEnv = async (envLabel: string) => {
    await updateApiEnv(envLabel);
    if (isGeneratedApiLocal) {
      await runBunScript('bun generate:api');
      Updates.reloadAsync();
    }
  };

  const handleToggleGenerate = (value: boolean) => {
    setIsGeneratedApiLocal(value);
    mmkvStorage.setItem(MMKV_STORAGE_KEY.DEV_TOOL_ENV_KEY_IS_GENERATE_ENABLE, value);
  };

  return (
    <>
      {/* Section 1 : Environnement backend (API) */}
      <Box className="gap-3">
        <String variant="body-2" font="primaryBold">
          Environnement backend (API)
        </String>
        <BoxRow className="flex-wrap items-center gap-2">
          {ENVIRONMENTS.map(env => (
            <Chip
              key={env.id}
              onPress={() => handleSelectApiEnv(env.label)}
              title={env.label}
              size="xs"
              variant={env.label === apiEnvVar ? 'contained' : 'outlined'}
            />
          ))}
        </BoxRow>
        <BoxRowCenterBetween>
          <String variant="body-sm">Régénérer l&apos;API (React Query)</String>
          <Toggle onChange={handleToggleGenerate} value={isGeneratedApiLocal} />
        </BoxRowCenterBetween>
      </Box>
      <Separator />
    </>
  );
}
