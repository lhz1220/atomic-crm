import { describe, expect, it } from "vitest";
import type { TranslateFunction } from "ra-core";

import { defaultConfiguration } from "./defaultConfiguration";
import { localizeConfiguration } from "./localizeConfiguration";

const catalog: Record<string, string> = {
  "crm.configuration.deal_stages.won": "成交",
  "crm.configuration.note_statuses.hot": "積極洽談",
};

const translate: TranslateFunction = (key, options) =>
  catalog[key] ?? (options?._ as string) ?? key;

describe("localizeConfiguration", () => {
  it("translates labels of built-in choices", () => {
    // Arrange
    const config = {
      ...defaultConfiguration,
      dealStages: [{ value: "won", label: "Won" }],
      noteStatuses: [{ value: "hot", label: "Hot", color: "#e88b7d" }],
    };

    // Act
    const result = localizeConfiguration(config, translate);

    // Assert
    expect(result.dealStages).toEqual([{ value: "won", label: "成交" }]);
    expect(result.noteStatuses).toEqual([
      { value: "hot", label: "積極洽談", color: "#e88b7d" },
    ]);
  });

  it("keeps a label the user customized", () => {
    const config = {
      ...defaultConfiguration,
      dealStages: [{ value: "won", label: "Signed" }],
    };

    const result = localizeConfiguration(config, translate);

    expect(result.dealStages).toEqual([{ value: "won", label: "Signed" }]);
  });

  it("keeps choices the user added", () => {
    const config = {
      ...defaultConfiguration,
      dealStages: [{ value: "pilot", label: "Pilot" }],
    };

    const result = localizeConfiguration(config, translate);

    expect(result.dealStages).toEqual([{ value: "pilot", label: "Pilot" }]);
  });

  it("falls back to the original label when no translation exists", () => {
    const config = {
      ...defaultConfiguration,
      taskTypes: [{ value: "call", label: "Call" }],
    };

    const result = localizeConfiguration(config, translate);

    expect(result.taskTypes).toEqual([{ value: "call", label: "Call" }]);
  });

  it("does not mutate the given configuration", () => {
    const dealStages = [{ value: "won", label: "Won" }];
    const config = { ...defaultConfiguration, dealStages };

    localizeConfiguration(config, translate);

    expect(dealStages).toEqual([{ value: "won", label: "Won" }]);
  });
});
