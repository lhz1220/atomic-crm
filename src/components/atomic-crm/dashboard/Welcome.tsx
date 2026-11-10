import { useTranslate } from "ra-core";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURE_KEYS = ["contacts", "deals", "tasks"] as const;

export const Welcome = () => {
  const translate = useTranslate();
  return (
    <Card>
      <CardHeader className="px-4">
        <CardTitle>{translate("crm.dashboard.welcome.title")}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 text-sm">
        <p className="mb-2">{translate("crm.dashboard.welcome.intro")}</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          {FEATURE_KEYS.map((key) => (
            <li key={key}>
              {translate(`crm.dashboard.welcome.features.${key}`)}
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground">
          {translate("crm.dashboard.welcome.demo_notice")}
        </p>
      </CardContent>
    </Card>
  );
};
