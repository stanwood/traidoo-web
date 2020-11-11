import Config from "../../config";

interface Currency {
  code: "EUR" | "CHF";
  symbol: string;
}

export const currencies: Record<string, Currency> = {
  EUR: {
    code: "EUR",
    symbol: "€",
  },
  CHF: {
    code: "CHF",
    symbol: "CHF",
  },
};

export const getCurrencySymbol = () => {
  return currencies[Config.currency].symbol;
};

export const getCurrencyCode = () => {
  return currencies[Config.currency].code;
};
