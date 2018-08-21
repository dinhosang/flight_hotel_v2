const CURRENCIES = {
  "GBP": {
    "symbol": "£",
    "name": "British Pound Sterling",
    "symbol_native": "£",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "GBP",
    "name_plural": "British pounds sterling"
  },
  "EUR": {
    "symbol": "€",
    "name": "Euro",
    "symbol_native": "€",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "EUR",
    "name_plural": "euros"
  },
  "USD": {
    "symbol": "$",
    "name": "US Dollar",
    "symbol_native": "$",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "USD",
    "name_plural": "US dollars"
  },
  "AED": {
    "symbol": "AED",
    "name": "United Arab Emirates Dirham",
    "symbol_native": "د.إ.\u200f",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "AED",
    "name_plural": "UAE dirhams"
  },
  "AFN": {
    "symbol": "Af",
    "name": "Afghan Afghani",
    "symbol_native": "؋",
    "decimal_digits": "0",
    "rounding": "0",
    "code": "AFN",
    "name_plural": "Afghan Afghanis"
  },
  "AMD": {
    "symbol": "AMD",
    "name": "Armenian Dram",
    "symbol_native": "դր.",
    "decimal_digits": "0",
    "rounding": "0",
    "code": "AMD",
    "name_plural": "Armenian drams"
  },
  "ARS": {
    "symbol": "AR$",
    "name": "Argentine Peso",
    "symbol_native": "$",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "ARS",
    "name_plural": "Argentine pesos"
  },
  "AUD": {
    "symbol": "AU$",
    "name": "Australian Dollar",
    "symbol_native": "$",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "AUD",
    "name_plural": "Australian dollars"
  },
  "BHD": {
    "symbol": "BD",
    "name": "Bahraini Dinar",
    "symbol_native": "د.ب.\u200f",
    "decimal_digits": "3",
    "rounding": "0",
    "code": "BHD",
    "name_plural": "Bahraini dinars"
  },
  "BRL": {
    "symbol": "R$",
    "name": "Brazilian Real",
    "symbol_native": "R$",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "BRL",
    "name_plural": "Brazilian reals"
  },
  "BWP": {
    "symbol": "BWP",
    "name": "Botswanan Pula",
    "symbol_native": "P",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "BWP",
    "name_plural": "Botswanan pulas"
  },
  "CAD": {
    "symbol": "CA$",
    "name": "Canadian Dollar",
    "symbol_native": "$",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "CAD",
    "name_plural": "Canadian dollars"
  },
  "CHF": {
    "symbol": "CHF",
    "name": "Swiss Franc",
    "symbol_native": "CHF",
    "decimal_digits": "2",
    "rounding": "0.05",
    "code": "CHF",
    "name_plural": "Swiss francs"
  },
  "CNY": {
    "symbol": "CN¥",
    "name": "Chinese Yuan",
    "symbol_native": "CN¥",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "CNY",
    "name_plural": "Chinese yuan"
  },
  "COP": {
    "symbol": "CO$",
    "name": "Colombian Peso",
    "symbol_native": "$",
    "decimal_digits": "0",
    "rounding": "0",
    "code": "COP",
    "name_plural": "Colombian pesos"
  },
  "CZK": {
    "symbol": "Kč",
    "name": "Czech Republic Koruna",
    "symbol_native": "Kč",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "CZK",
    "name_plural": "Czech Republic korunas"
  },
  "DKK": {
    "symbol": "Dkr",
    "name": "Danish Krone",
    "symbol_native": "kr",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "DKK",
    "name_plural": "Danish kroner"
  },
  "HKD": {
    "symbol": "HK$",
    "name": "Hong Kong Dollar",
    "symbol_native": "$",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "HKD",
    "name_plural": "Hong Kong dollars"
  },
  "IDR": {
    "symbol": "Rp",
    "name": "Indonesian Rupiah",
    "symbol_native": "Rp",
    "decimal_digits": "0",
    "rounding": "0",
    "code": "IDR",
    "name_plural": "Indonesian rupiahs"
  },
  "INR": {
    "symbol": "Rs",
    "name": "Indian Rupee",
    "symbol_native": "টকা",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "INR",
    "name_plural": "Indian rupees"
  },
  "JOD": {
    "symbol": "JD",
    "name": "Jordanian Dinar",
    "symbol_native": "د.أ.\u200f",
    "decimal_digits": "3",
    "rounding": "0",
    "code": "JOD",
    "name_plural": "Jordanian dinars"
  },
  "JPY": {
    "symbol": "¥",
    "name": "Japanese Yen",
    "symbol_native": "￥",
    "decimal_digits": "0",
    "rounding": "0",
    "code": "JPY",
    "name_plural": "Japanese yen"
  },
  "KRW": {
    "symbol": "₩",
    "name": "South Korean Won",
    "symbol_native": "₩",
    "decimal_digits": "0",
    "rounding": "0",
    "code": "KRW",
    "name_plural": "South Korean won"
  },
  "KWD": {
    "symbol": "KD",
    "name": "Kuwaiti Dinar",
    "symbol_native": "د.ك.\u200f",
    "decimal_digits": "3",
    "rounding": "0",
    "code": "KWD",
    "name_plural": "Kuwaiti dinars"
  },
  "LTL": {
    "symbol": "Lt",
    "name": "Lithuanian Litas",
    "symbol_native": "Lt",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "LTL",
    "name_plural": "Lithuanian litai"
  },
  "LVL": {
    "symbol": "Ls",
    "name": "Latvian Lats",
    "symbol_native": "Ls",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "LVL",
    "name_plural": "Latvian lati"
  },
  "MAD": {
    "symbol": "MAD",
    "name": "Moroccan Dirham",
    "symbol_native": "د.م.\u200f",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "MAD",
    "name_plural": "Moroccan dirhams"
  },
  "MXN": {
    "symbol": "MX$",
    "name": "Mexican Peso",
    "symbol_native": "$",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "MXN",
    "name_plural": "Mexican pesos"
  },
  "MYR": {
    "symbol": "RM",
    "name": "Malaysian Ringgit",
    "symbol_native": "RM",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "MYR",
    "name_plural": "Malaysian ringgits"
  },
  "NOK": {
    "symbol": "Nkr",
    "name": "Norwegian Krone",
    "symbol_native": "kr",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "NOK",
    "name_plural": "Norwegian kroner"
  },
  "PHP": {
    "symbol": "₱",
    "name": "Philippine Peso",
    "symbol_native": "₱",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "PHP",
    "name_plural": "Philippine pesos"
  },
  "PLN": {
    "symbol": "zł",
    "name": "Polish Zloty",
    "symbol_native": "zł",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "PLN",
    "name_plural": "Polish zlotys"
  },
  "QAR": {
    "symbol": "QR",
    "name": "Qatari Rial",
    "symbol_native": "ر.ق.\u200f",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "QAR",
    "name_plural": "Qatari rials"
  },
  "RUB": {
    "symbol": "RUB",
    "name": "Russian Ruble",
    "symbol_native": "руб.",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "RUB",
    "name_plural": "Russian rubles"
  },
  "SAR": {
    "symbol": "SR",
    "name": "Saudi Riyal",
    "symbol_native": "ر.س.\u200f",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "SAR",
    "name_plural": "Saudi riyals"
  },
  "SEK": {
    "symbol": "Skr",
    "name": "Swedish Krona",
    "symbol_native": "kr",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "SEK",
    "name_plural": "Swedish kronor"
  },
  "THB": {
    "symbol": "฿",
    "name": "Thai Baht",
    "symbol_native": "฿",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "THB",
    "name_plural": "Thai baht"
  },
  "TND": {
    "symbol": "DT",
    "name": "Tunisian Dinar",
    "symbol_native": "د.ت.\u200f",
    "decimal_digits": "3",
    "rounding": "0",
    "code": "TND",
    "name_plural": "Tunisian dinars"
  },
  "TWD": {
    "symbol": "NT$",
    "name": "New Taiwan Dollar",
    "symbol_native": "NT$",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "TWD",
    "name_plural": "New Taiwan dollars"
  },
  "TZS": {
    "symbol": "TSh",
    "name": "Tanzanian Shilling",
    "symbol_native": "TSh",
    "decimal_digits": "0",
    "rounding": "0",
    "code": "TZS",
    "name_plural": "Tanzanian shillings"
  },
  "UAH": {
    "symbol": "₴",
    "name": "Ukrainian Hryvnia",
    "symbol_native": "₴",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "UAH",
    "name_plural": "Ukrainian hryvnias"
  },
  "ZAR": {
    "symbol": "R",
    "name": "South African Rand",
    "symbol_native": "R",
    "decimal_digits": "2",
    "rounding": "0",
    "code": "ZAR",
    "name_plural": "South African rand"
  }
}

export {CURRENCIES as default};
