import { CATEGORY_FILTERS, RATED_FILTERS } from "../constants";

export const API_URL = "https://api.qongfu.com";
//"https://staging-api.qongfu.com"; //
export const APP_URL = "http://localhost:4300";

export const defaultPageSize = 10;

export const Week_Days = [
  { id: "1", day: "Monday" },
  { id: "2", day: "Tuesday" },
  { id: "3", day: "Wednesday" },
  { id: "4", day: "Thursday" },
  { id: "5", day: "Friday" },
  { id: "6", day: "Saturday" },
  { id: "7", day: "Sunday" },
];

export const Map_Key = "AIzaSyAa50F53uzHl7CVh_bfmwQq5y-hFtfI_C8"; //"AIzaSyCQaRhaAVV-IUI0hyd-EOW2HoSPheY39xg";

export const QongfuIPAddressKey = "---qongfu-ip-address---";

export const QongfuGeoLocationKey = "---qongfu-geo-location---";

export const IP_API = "https://ipapi.co/";

export const SuccessStatusCode = [200, 201, 202];

export const IMAGE_API = "https://qongfu.s3.me-south-1.amazonaws.com";

export const DefaultCountry = {
  // id: 18,
  // country: "Bahrain",
  // country_code: "BH",
  // nationality: null,
  // dial_code: "973",
  // approved: 1,
  // country_flag: "FlagBahrain",
  id: 18,
  country: "Bahrain",
  native: null,
  capital: "Manama",
  country_code: "BH",
  nationality: "Bahrain",
  dial_code: "973",
  approved: 1,
  currency: null,
  currency_code: null,
  currency_decimal: null,
  emoji: "🇧🇭",
  emojiU: null,
  flag: "🇧🇭",
  content: null,
  slag: null,
  meta: null,
  official_language: null,
  regions: [],
};

export const filterQueryParams = [
  "search",
  "sort_by",
  "lifestyles",
  "country_id",
  "stars",
  "location",
];

export const DefaultSearchFilters = {
  sortBy: "distance",
  lifestyle: [],
  country: `${DefaultCountry.id}`,
  areaAndCities: [],
  rated: [],
  search: "",
};

export const settingsNavLinks = [
  "account-info",
  "profile-info",
  "location-setup",
  "lifestyles-and-qongfus",
];

export const countriesLocations = {
  Bahrain: [
    { key: "manama", value: "Manama" },
    { key: "saar", value: "Saar" },
    { key: "riffa", value: "Riffa" },
    { key: "muharraq", value: "Muharraq" },
    { key: "juffair", value: "Juffair" },
    { key: "seef", value: "Seef" },
    { key: "isa-town", value: "Isa Town" },
    { key: "hamad-town", value: "Hamad Town" },
  ],
  Oman: ["Muscat", "Salalah", "Sohar", "Nizwa", "Rustaq", "Bawshar", "Sur", "Khasab", "Bahla"],
  Kuwait: [
    "Kuwait City",
    "Hawalli",
    "Salwa",
    "Salmiyah",
    "Al Ahmadi",
    "Jahra",
    "Farwaniya",
    "Al Wafrah",
    "Safat",
    "Jabriya",
  ],
  Qatar: [
    "Doha",
    "Al Wakra",
    "Umm Said",
    "Al Khor",
    "Madinat",
    "Al-Shamal",
    "Al Ruwais",
    "Al Zubara",
    "Dukhan",
  ],
  UAE: [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
    "Al Ain",
    "Madinat Zayed",
  ],
  "Saudi Arabia": [
    "Riyadh",
    "Jeddah",
    "Makkah",
    "Madinah",
    "Dammam",
    "Al Khobar",
    "Dhahran",
    "Al Ahsa",
    "Qatif",
    "Jubail",
    "Najran",
    "Qassem",
    "Taif",
    "Hail",
    "Jizan",
    "Yanbu",
  ],
};
export const userOnboardingNavLinks = ["", "step1", "step2", "step3", "success"];

export const FilterSortBy = [
  { label: "Nearby", icon: "InnerFilterNearestIcon", value: "distance" },
  { label: "Highest Rated", icon: "HighestRated", value: "rating" },
  // { label: "Most Reviewed", icon: "MostReviewed", value: "views" },
];
