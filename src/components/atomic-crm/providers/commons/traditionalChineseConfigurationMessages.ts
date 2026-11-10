import type { ConfigurationLabelMessages } from "../../root/localizeConfiguration";

// Labels for the built-in configuration choices, keyed by their stored `value`.
// Only labels the user has not customized are replaced (see localizeConfiguration).
export const traditionalChineseConfigurationMessages = {
  crm: {
    configuration: {
      company_sectors: {
        "communication-services": "通訊服務",
        "consumer-discretionary": "非必需消費品",
        "consumer-staples": "民生消費品",
        energy: "能源",
        financials: "金融",
        "health-care": "醫療保健",
        industrials: "工業",
        "information-technology": "資訊科技",
        materials: "原物料",
        "real-estate": "不動產",
        utilities: "公用事業",
      },
      deal_stages: {
        opportunity: "潛在商機",
        "proposal-sent": "已送出提案",
        "in-negociation": "議價中",
        won: "成交",
        lost: "失敗",
        delayed: "延後",
      },
      deal_categories: {
        other: "其他",
        copywriting: "文案撰寫",
        "print-project": "印刷專案",
        "ui-design": "UI 設計",
        "website-design": "網站設計",
      },
      note_statuses: {
        cold: "觀望中",
        warm: "有興趣",
        hot: "積極洽談",
        "in-contract": "已簽約",
      },
      task_types: {
        none: "無",
        email: "電子郵件",
        demo: "產品展示",
        lunch: "餐敘",
        meeting: "會議",
        "follow-up": "後續追蹤",
        "thank-you": "致謝",
        ship: "出貨",
        call: "電話",
      },
    },
  },
} satisfies ConfigurationLabelMessages;
