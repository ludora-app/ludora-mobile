import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { Box, BoxRow, BoxRowCenterBetween, Chip, Separator, String, Toggle } from '@ludo/ui';

import { mmkvStorage } from '@/utils/mmkvStorage';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

import { runBunScript } from '../queries/run-script.query';
import { updateApiEnv } from '../queries/update-api-env.query';

const ENVIRONMENTS = [
  { id: 'localhost', label: 'localhost' },
  { id: 'test', label: 'test' },
  { id: 'prod', label: 'prod' },
];

const apiEnvVar = process.env.EXPO_PUBLIC_API_ENV;

export default function DevToolsEnvironmentSection() {
  const [isGeneratedApiLocal, setIsGeneratedApiLocal] = useState(false);
  const isGeneratedApi = mmkvStorage.getBoolean(MMKV_STORAGE_KEY.DEV_TOOL_ENV_KEY_IS_GENERATE_ENABLE);

  useEffect(() => {
    if (isGeneratedApi) {
      setIsGeneratedApiLocal(isGeneratedApi);
    }
  }, [isGeneratedApi]);

  const handleSelectEnv = async (envLabel: string) => {
    await updateApiEnv(envLabel);
    if (isGeneratedApiLocal) {
      await runBunScript('bun generate:api');
      Updates.reloadAsync();
    }
  };

  const handleToggleGenerate = async (value: boolean) => {
    setIsGeneratedApiLocal(value);
    mmkvStorage.setItem(MMKV_STORAGE_KEY.DEV_TOOL_ENV_KEY_IS_GENERATE_ENABLE, value);
  };

  return (
    <>
      <Box className="gap-3">
        <String variant="body-2" font="primaryBold">
          Changement d&apos;environnement
        </String>
        <BoxRow className="flex-wrap items-center gap-2">
          {ENVIRONMENTS.map(env => (
            <Chip
              key={env.id}
              onPress={() => handleSelectEnv(env.label)}
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
