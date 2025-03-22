export const Environments = ["PRODUCTION", "DEVELOPMENT", "SEEDING"] as const;
export type EnvironmentEnum = (typeof Environments)[number];

export const SocketEvents = ["NOTIFICATION"] as const;
export type SocketEventEnum = (typeof SocketEvents)[number];

export const AccessTypes = ["ADMIN", "APPROVED", "DENIED"] as const;
export type AccessTypeEnum = (typeof AccessTypes)[number];

// ********************************* //

export const WarehouseItemCategories = [
  "FOOD",
  "BEVERAGES",
  "SNACKS",
  "BAKERY",
  "DAIRY",
  "MEAT",
  "SEAFOOD",
  "FRUITS",
  "VEGETABLES",
  "FROZEN_FOODS",
  "CANNED_GOODS",
  "SPICES",
  "HERBS",
  "CEREALS",
  "PASTA",
  "RICE",
  "COFFEE",
  "TEA",
  "ALCOHOL",
  "TOBACCO",
  "CIGARETTES",
  "VAPING_PRODUCTS",
  "CANDY",
  "CHOCOLATE",
  "CONFECTIONERY",
  "PERSONAL_CARE",
  "TOILETRIES",
  "COSMETICS",
  "SKINCARE",
  "HAIRCARE",
  "ORAL_CARE",
  "SHAVING_PRODUCTS",
  "BABY_CARE",
  "FEMININE_HYGIENE",
  "VITAMINS",
  "SUPPLEMENTS",
  "MEDICATIONS",
  "HEALTH_AIDS",
  "ELECTRONICS",
  "MOBILE_PHONES",
  "LAPTOPS",
  "COMPUTERS",
  "TABLETS",
  "TELEVISIONS",
  "AUDIO_EQUIPMENT",
  "CAMERAS",
  "SMART_HOME_DEVICES",
  "GAMING_CONSOLES",
  "ACCESSORIES",
  "SOFTWARE",
  "APPLIANCES",
  "KITCHEN_APPLIANCES",
  "HOME_APPLIANCES",
  "LAUNDRY_APPLIANCES",
  "CLEANING_APPLIANCES",
  "CLOTHING",
  "SHOES",
  "ACCESSORIES",
  "MENSWEAR",
  "WOMENSWEAR",
  "CHILDRENSWEAR",
  "UNDERGARMENTS",
  "SPORTSWEAR",
  "FORMALWEAR",
  "JEWELRY",
  "WATCHES",
  "BAGS",
  "LUGGAGE",
  "FURNITURE",
  "LIVING_ROOM",
  "BEDROOM",
  "DINING_ROOM",
  "OFFICE_FURNITURE",
  "OUTDOOR_FURNITURE",
  "DECOR",
  "LIGHTING",
  "RUGS",
  "CURTAINS",
  "ARTWORK",
  "PLANTS",
  "TOYS",
  "GAMES",
  "BOARD_GAMES",
  "VIDEO_GAMES",
  "OUTDOOR_PLAY",
  "EDUCATIONAL_TOYS",
  "HOBBY_SUPPLIES",
  "CRAFTS",
  "ART_SUPPLIES",
  "SEWING",
  "KNITTING",
  "PAINTING",
  "SCULPTING",
  "SPORTING_GOODS",
  "EXERCISE_EQUIPMENT",
  "CYCLING",
  "CAMPING",
  "FISHING",
  "OUTDOOR_GEAR",
  "AUTOMOTIVE",
  "CAR_PARTS",
  "ACCESSORIES",
  "TOOLS",
  "EQUIPMENT",
  "MOTORCYCLE_GEAR",
  "OFFICE_SUPPLIES",
  "STATIONERY",
  "PRINTERS",
  "INK",
  "PAPER",
  "FILING",
  "ORGANIZERS",
  "PET_SUPPLIES",
  "FOOD",
  "TREATS",
  "TOYS",
  "ACCESSORIES",
  "GROOMING",
  "HEALTH_CARE",
  "BABY_PRODUCTS",
  "DIAPERS",
  "FORMULA",
  "CLOTHING",
  "TOYS",
  "NURSERY_FURNITURE",
  "BATH",
  "FEEDING",
  "SAFETY",
  "BOOKS",
  "MAGAZINES",
  "NEWSPAPERS",
  "EBOOKS",
  "AUDIOBOOKS",
  "MUSIC",
  "INSTRUMENTS",
  "VINYL",
  "CDS",
  "DIGITAL_MUSIC",
  "MOVIES",
  "DVDS",
  "BLU-RAY",
  "STREAMING",
  "GARDENING",
  "TOOLS",
  "PLANTS",
  "SEEDS",
  "SOIL",
  "DECOR",
  "OUTDOOR_LIGHTING",
  "TOOLS",
  "HARDWARE",
  "POWER_TOOLS",
  "HAND_TOOLS",
  "PAINT",
  "PLUMBING",
  "ELECTRICAL",
  "BUILDING_MATERIALS",
  "CLEANING_SUPPLIES",
  "LAUNDRY",
  "DISHWASHING",
  "SURFACE_CLEANERS",
  "TRASH_BAGS",
  "AIR_FRESHENERS",
  "PARTY_SUPPLIES",
  "DECORATIONS",
  "UTENSILS",
  "TABLEWARE",
  "INVITATIONS",
  "SPECIALTY_FOODS",
  "ORGANIC",
  "GLUTEN-FREE",
  "VEGAN",
  "KETO",
  "ETHNIC_FOODS",
  "INTERNATIONAL_CUISINE",
  "LUXURY_GOODS",
  "DESIGNER_CLOTHING",
  "HANDBAGS",
  "PERFUMES",
  "HIGH-END_JEWELRY",
  "COLLECTIBLES",
  "ANTIQUES",
  "COINS",
  "STAMPS",
  "MEMORABILIA",
  "ARTIFACTS",
  "SEASONAL",
  "HOLIDAY_DECOR",
  "GIFTS",
  "GIFT_CARDS",
  "WRAPPING_SUPPLIES",
  "CARDS",
  "FLOWERS",
  "PLANTS",
  "FOOD_BASKETS",
] as const;
export type WarehouseItemCategoryEnum = (typeof WarehouseItemCategories)[number];

export const Countries = [
  "AFGHANISTAN",
  "ALBANIA",
  "ALGERIA",
  "ANDORRA",
  "ANGOLA",
  "ANTIGUA_AND_BARBUDA",
  "ARGENTINA",
  "ARMENIA",
  "AUSTRALIA",
  "AUSTRIA",
  "AZERBAIJAN",
  "BAHAMAS",
  "BAHRAIN",
  "BANGLADESH",
  "BARBADOS",
  "BELARUS",
  "BELGIUM",
  "BELIZE",
  "BENIN",
  "BHUTAN",
  "BOLIVIA",
  "BOSNIA_AND_HERZEGOVINA",
  "BOTSWANA",
  "BRAZIL",
  "BRUNEI",
  "BULGARIA",
  "BURKINA_FASO",
  "BURUNDI",
  "CABO_VERDE",
  "CAMBODIA",
  "CAMEROON",
  "CANADA",
  "CENTRAL_AFRICAN_REPUBLIC",
  "CHAD",
  "CHILE",
  "CHINA",
  "COLOMBIA",
  "COMOROS",
  "CONGO",
  "COSTA_RICA",
  "CROATIA",
  "CUBA",
  "CYPRUS",
  "CZECHIA",
  "DENMARK",
  "DJIBOUTI",
  "DOMINICA",
  "DOMINICAN_REPUBLIC",
  "ECUADOR",
  "EGYPT",
  "EL_SALVADOR",
  "EQUATORIAL_GUINEA",
  "ERITREA",
  "ESTONIA",
  "ESWATINI",
  "ETHIOPIA",
  "FIJI",
  "FINLAND",
  "FRANCE",
  "GABON",
  "GAMBIA",
  "GEORGIA",
  "GERMANY",
  "GHANA",
  "GREECE",
  "GRENADA",
  "GUATEMALA",
  "GUINEA",
  "GUINEA-BISSAU",
  "GUYANA",
  "HAITI",
  "HONDURAS",
  "HUNGARY",
  "ICELAND",
  "INDIA",
  "INDONESIA",
  "IRAN",
  "IRAQ",
  "IRELAND",
  "PALESTINE",
  "ITALY",
  "JAMAICA",
  "JAPAN",
  "JORDAN",
  "KAZAKHSTAN",
  "KENYA",
  "KIRIBATI",
  "KOREA_NORTH",
  "KOREA_SOUTH",
  "KOSOVO",
  "KUWAIT",
  "KYRGYZSTAN",
  "LAOS",
  "LATVIA",
  "LEBANON",
  "LESOTHO",
  "LIBERIA",
  "LIBYA",
  "LIECHTENSTEIN",
  "LITHUANIA",
  "LUXEMBOURG",
  "MADAGASCAR",
  "MALAWI",
  "MALAYSIA",
  "MALDIVES",
  "MALI",
  "MALTA",
  "MARSHALL_ISLANDS",
  "MAURITANIA",
  "MAURITIUS",
  "MEXICO",
  "MICRONESIA",
  "MOLDOVA",
  "MONACO",
  "MONGOLIA",
  "MONTENEGRO",
  "MOROCCO",
  "MOZAMBIQUE",
  "MYANMAR",
  "NAMIBIA",
  "NAURU",
  "NEPAL",
  "NETHERLANDS",
  "NEW_ZEALAND",
  "NICARAGUA",
  "NIGER",
  "NIGERIA",
  "NORTH_MACEDONIA",
  "NORWAY",
  "OMAN",
  "PAKISTAN",
  "PALAU",
  "PANAMA",
  "PAPUA_NEW_GUINEA",
  "PARAGUAY",
  "PERU",
  "PHILIPPINES",
  "POLAND",
  "PORTUGAL",
  "QATAR",
  "ROMANIA",
  "RUSSIA",
  "RWANDA",
  "SAINT_KITTS_AND_NEVIS",
  "SAINT_LUCIA",
  "SAINT_VINCENT_AND_THE_GRENADINES",
  "SAMOA",
  "SAN_MARINO",
  "SAO_TOME_AND_PRINCIPE",
  "SAUDI_ARABIA",
  "SENEGAL",
  "SERBIA",
  "SEYCHELLES",
  "SIERRA_LEONE",
  "SINGAPORE",
  "SLOVAKIA",
  "SLOVENIA",
  "SOLOMON_ISLANDS",
  "SOMALIA",
  "SOUTH_AFRICA",
  "SOUTH_SUDAN",
  "SPAIN",
  "SRI_LANKA",
  "SUDAN",
  "SURINAME",
  "SWEDEN",
  "SWITZERLAND",
  "SYRIA",
  "TAIWAN",
  "TAJIKISTAN",
  "TANZANIA",
  "THAILAND",
  "TIMOR-LESTE",
  "TOGO",
  "TONGA",
  "TRINIDAD_AND_TOBAGO",
  "TUNISIA",
  "TURKEY",
  "TURKMENISTAN",
  "TUVALU",
  "UGANDA",
  "UKRAINE",
  "UNITED_ARAB_EMIRATES",
  "UNITED_KINGDOM",
  "UNITED_STATES",
  "URUGUAY",
  "UZBEKISTAN",
  "VANUATU",
  "VATICAN_CITY",
  "VENEZUELA",
  "VIETNAM",
  "YEMEN",
  "ZAMBIA",
  "ZIMBABWE",
] as const;
export type CountryEnum = (typeof Countries)[number];

export const AgeGroups = ["INFANT", "TODDLER", "CHILD", "TEENAGER", "ADULT", "SENIOR"] as const;
export type AgeGroupEnum = (typeof AgeGroups)[number];

export const QuantityUnits = ["KG", "LITER", "PIECE"] as const;
export type QuantityUnitEnum = (typeof QuantityUnits)[number];

export const NotificationTypes = ["LOW_STOCK_WARNING"] as const;
export type NotificationTypeEnum = (typeof NotificationTypes)[number];
