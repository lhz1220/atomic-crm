import { useMemo } from "react";
import { useStore, useTranslate } from "ra-core";

import type { DealStage, LabeledValue, NoteStatus } from "../types";
import { defaultConfiguration } from "./defaultConfiguration";
import { localizeConfiguration } from "./localizeConfiguration";

export const CONFIGURATION_STORE_KEY = "app.configuration";

export interface ConfigurationContextValue {
  companySectors: LabeledValue[];
  currency: string;
  dealCategories: LabeledValue[];
  dealPipelineStatuses: string[];
  dealStages: DealStage[];
  noteStatuses: NoteStatus[];
  taskTypes: LabeledValue[];
  title: string;
  darkModeLogo: string;
  lightModeLogo: string;
}

/**
 * Configuration as stored, with built-in labels in their original (English)
 * wording. Use it where labels are matched against external data (imports).
 */
export const useRawConfigurationContext = (): ConfigurationContextValue => {
  const [config] = useStore<ConfigurationContextValue>(
    CONFIGURATION_STORE_KEY,
    defaultConfiguration,
  );
  // Merge with defaults so that missing fields in stored config
  // fall back to default values (e.g. when new settings are added)
  return useMemo(() => ({ ...defaultConfiguration, ...config }), [config]);
};

/** Configuration with built-in choice labels translated to the current locale. */
export const useConfigurationContext = (): ConfigurationContextValue => {
  const config = useRawConfigurationContext();
  const translate = useTranslate();
  return useMemo(
    () => localizeConfiguration(config, translate),
    [config, translate],
  );
};

export const useConfigurationUpdater = () => {
  const [, setConfig] = useStore<ConfigurationContextValue>(
    CONFIGURATION_STORE_KEY,
  );
  return setConfig;
};
