import type { TranslateFunction } from "ra-core";

import type { LabeledValue } from "../types";
import type { ConfigurationContextValue } from "./ConfigurationContext";
import { defaultConfiguration } from "./defaultConfiguration";

const LOCALIZED_LISTS = {
  companySectors: "company_sectors",
  dealStages: "deal_stages",
  dealCategories: "deal_categories",
  noteStatuses: "note_statuses",
  taskTypes: "task_types",
} as const;

type LocalizedListKey = keyof typeof LOCALIZED_LISTS;
type LocalizedListNamespace = (typeof LOCALIZED_LISTS)[LocalizedListKey];

export interface ConfigurationLabelMessages {
  crm: {
    configuration: Partial<
      Record<LocalizedListNamespace, Record<string, string>>
    >;
  };
}

const localizeList = <T extends LabeledValue>(
  items: T[],
  defaults: LabeledValue[],
  namespace: LocalizedListNamespace,
  translate: TranslateFunction,
): T[] =>
  items.map((item) => {
    const builtIn = defaults.find((d) => d.value === item.value);
    // A label the user edited in the settings is their own wording: keep it.
    if (!builtIn || builtIn.label !== item.label) return item;
    return {
      ...item,
      label: translate(`crm.configuration.${namespace}.${item.value}`, {
        _: item.label,
      }),
    };
  });

/**
 * Translates the labels of the built-in configuration choices (deal stages,
 * note statuses, ...) into the current locale. Stored values never change.
 */
export const localizeConfiguration = (
  config: ConfigurationContextValue,
  translate: TranslateFunction,
): ConfigurationContextValue => {
  const localized = { ...config };
  for (const key of Object.keys(LOCALIZED_LISTS) as LocalizedListKey[]) {
    const items = config[key];
    if (!Array.isArray(items)) continue;
    // Each list keeps its own item type (e.g. NoteStatus carries a color).
    (localized[key] as LabeledValue[]) = localizeList(
      items,
      defaultConfiguration[key],
      LOCALIZED_LISTS[key],
      translate,
    );
  }
  return localized;
};
