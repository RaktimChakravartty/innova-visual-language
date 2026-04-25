export interface IconEntry {
  id: string;
  assetNum: string;
  category: string;
  label: string;
  path: string;
}

export interface IconCategory {
  id: string;
  label: string;
  count: number;
}

export const ICON_CATEGORIES: IconCategory[] = [
  {
    "id": "all",
    "label": "All Icons",
    "count": 299
  },
  {
    "id": "social",
    "label": "Social & Users",
    "count": 11
  },
  {
    "id": "business",
    "label": "Business & Data",
    "count": 28
  },
  {
    "id": "media",
    "label": "Media & Sound",
    "count": 31
  },
  {
    "id": "navigation",
    "label": "Arrows & Navigation",
    "count": 37
  },
  {
    "id": "interface",
    "label": "Interface & Controls",
    "count": 39
  },
  {
    "id": "weather",
    "label": "Weather & Nature",
    "count": 30
  },
  {
    "id": "files",
    "label": "Files & Documents",
    "count": 54
  },
  {
    "id": "phone",
    "label": "Phone & Mobile",
    "count": 17
  },
  {
    "id": "shopping",
    "label": "Shopping & Commerce",
    "count": 16
  },
  {
    "id": "design",
    "label": "Design & Creative",
    "count": 36
  }
];

export const ICONS: IconEntry[] = [
  {
    "id": "align-center",
    "assetNum": "88",
    "category": "files",
    "label": "Align Center",
    "path": "/icons/Asset 88.svg"
  },
  {
    "id": "align-justify",
    "assetNum": "90",
    "category": "files",
    "label": "Align Justify",
    "path": "/icons/Asset 90.svg"
  },
  {
    "id": "align-left",
    "assetNum": "87",
    "category": "files",
    "label": "Align Left",
    "path": "/icons/Asset 87.svg"
  },
  {
    "id": "align-right",
    "assetNum": "89",
    "category": "files",
    "label": "Align Right",
    "path": "/icons/Asset 89.svg"
  },
  {
    "id": "align-v-bottom",
    "assetNum": "163",
    "category": "design",
    "label": "Align V Bottom",
    "path": "/icons/Asset 163.svg"
  },
  {
    "id": "align-v-center",
    "assetNum": "162",
    "category": "design",
    "label": "Align V Center",
    "path": "/icons/Asset 162.svg"
  },
  {
    "id": "align-v-top",
    "assetNum": "161",
    "category": "design",
    "label": "Align V Top",
    "path": "/icons/Asset 161.svg"
  },
  {
    "id": "area-chart",
    "assetNum": "40",
    "category": "business",
    "label": "Area Chart",
    "path": "/icons/Asset 40.svg"
  },
  {
    "id": "arrow-bend-left",
    "assetNum": "259",
    "category": "navigation",
    "label": "Arrow Bend Left",
    "path": "/icons/Asset 259.svg"
  },
  {
    "id": "arrow-circle-right",
    "assetNum": "261",
    "category": "navigation",
    "label": "Arrow Circle Right",
    "path": "/icons/Asset 261.svg"
  },
  {
    "id": "arrow-diagonal",
    "assetNum": "265",
    "category": "navigation",
    "label": "Arrow Diagonal",
    "path": "/icons/Asset 265.svg"
  },
  {
    "id": "arrow-down",
    "assetNum": "115",
    "category": "navigation",
    "label": "Arrow Down",
    "path": "/icons/Asset 115.svg"
  },
  {
    "id": "arrow-down-alt",
    "assetNum": "119",
    "category": "navigation",
    "label": "Arrow Down Alt",
    "path": "/icons/Asset 119.svg"
  },
  {
    "id": "arrow-down-box",
    "assetNum": "118",
    "category": "navigation",
    "label": "Arrow Down Box",
    "path": "/icons/Asset 118.svg"
  },
  {
    "id": "arrow-down-box-alt",
    "assetNum": "268",
    "category": "navigation",
    "label": "Arrow Down Box Alt",
    "path": "/icons/Asset 268.svg"
  },
  {
    "id": "arrow-down-double",
    "assetNum": "270",
    "category": "navigation",
    "label": "Arrow Down Double",
    "path": "/icons/Asset 270.svg"
  },
  {
    "id": "arrow-down-left",
    "assetNum": "120",
    "category": "navigation",
    "label": "Arrow Down Left",
    "path": "/icons/Asset 120.svg"
  },
  {
    "id": "arrow-down-thin",
    "assetNum": "269",
    "category": "navigation",
    "label": "Arrow Down Thin",
    "path": "/icons/Asset 269.svg"
  },
  {
    "id": "arrow-left-long",
    "assetNum": "258",
    "category": "navigation",
    "label": "Arrow Left Long",
    "path": "/icons/Asset 258.svg"
  },
  {
    "id": "arrow-left-long-alt",
    "assetNum": "272",
    "category": "navigation",
    "label": "Arrow Left Long Alt",
    "path": "/icons/Asset 272.svg"
  },
  {
    "id": "arrow-left-phone",
    "assetNum": "224",
    "category": "phone",
    "label": "Arrow Left Phone",
    "path": "/icons/Asset 224.svg"
  },
  {
    "id": "arrow-right",
    "assetNum": "114",
    "category": "navigation",
    "label": "Arrow Right",
    "path": "/icons/Asset 114.svg"
  },
  {
    "id": "arrow-right-alt",
    "assetNum": "260",
    "category": "navigation",
    "label": "Arrow Right Alt",
    "path": "/icons/Asset 260.svg"
  },
  {
    "id": "arrow-right-phone",
    "assetNum": "225",
    "category": "phone",
    "label": "Arrow Right Phone",
    "path": "/icons/Asset 225.svg"
  },
  {
    "id": "arrow-right-thin",
    "assetNum": "271",
    "category": "navigation",
    "label": "Arrow Right Thin",
    "path": "/icons/Asset 271.svg"
  },
  {
    "id": "arrow-up",
    "assetNum": "116",
    "category": "navigation",
    "label": "Arrow Up",
    "path": "/icons/Asset 116.svg"
  },
  {
    "id": "arrow-up-alt",
    "assetNum": "117",
    "category": "navigation",
    "label": "Arrow Up Alt",
    "path": "/icons/Asset 117.svg"
  },
  {
    "id": "arrow-up-box",
    "assetNum": "267",
    "category": "navigation",
    "label": "Arrow Up Box",
    "path": "/icons/Asset 267.svg"
  },
  {
    "id": "arrow-up-right",
    "assetNum": "113",
    "category": "navigation",
    "label": "Arrow Up Right",
    "path": "/icons/Asset 113.svg"
  },
  {
    "id": "arrow-up-right-box",
    "assetNum": "266",
    "category": "navigation",
    "label": "Arrow Up Right Box",
    "path": "/icons/Asset 266.svg"
  },
  {
    "id": "arrows-burst",
    "assetNum": "264",
    "category": "navigation",
    "label": "Arrows Burst",
    "path": "/icons/Asset 264.svg"
  },
  {
    "id": "arrows-scatter",
    "assetNum": "263",
    "category": "navigation",
    "label": "Arrows Scatter",
    "path": "/icons/Asset 263.svg"
  },
  {
    "id": "arrows-zigzag",
    "assetNum": "121",
    "category": "navigation",
    "label": "Arrows Zigzag",
    "path": "/icons/Asset 121.svg"
  },
  {
    "id": "bar-chart-group",
    "assetNum": "48",
    "category": "business",
    "label": "Bar Chart Group",
    "path": "/icons/Asset 48.svg"
  },
  {
    "id": "bar-chart-h",
    "assetNum": "42",
    "category": "business",
    "label": "Bar Chart H",
    "path": "/icons/Asset 42.svg"
  },
  {
    "id": "bar-chart-v",
    "assetNum": "47",
    "category": "business",
    "label": "Bar Chart V",
    "path": "/icons/Asset 47.svg"
  },
  {
    "id": "battery-charging",
    "assetNum": "171",
    "category": "interface",
    "label": "Battery Charging",
    "path": "/icons/Asset 171.svg"
  },
  {
    "id": "battery-empty",
    "assetNum": "172",
    "category": "interface",
    "label": "Battery Empty",
    "path": "/icons/Asset 172.svg"
  },
  {
    "id": "battery-full",
    "assetNum": "170",
    "category": "interface",
    "label": "Battery Full",
    "path": "/icons/Asset 170.svg"
  },
  {
    "id": "battery-half",
    "assetNum": "169",
    "category": "interface",
    "label": "Battery Half",
    "path": "/icons/Asset 169.svg"
  },
  {
    "id": "bell",
    "assetNum": "6",
    "category": "navigation",
    "label": "Bell",
    "path": "/icons/Asset 6.svg"
  },
  {
    "id": "bell-alert",
    "assetNum": "152",
    "category": "phone",
    "label": "Bell Alert",
    "path": "/icons/Asset 152.svg"
  },
  {
    "id": "bell-desk",
    "assetNum": "208",
    "category": "weather",
    "label": "Bell Desk",
    "path": "/icons/Asset 208.svg"
  },
  {
    "id": "bell-notification",
    "assetNum": "75",
    "category": "media",
    "label": "Bell Notification",
    "path": "/icons/Asset 75.svg"
  },
  {
    "id": "bell-ring",
    "assetNum": "76",
    "category": "media",
    "label": "Bell Ring",
    "path": "/icons/Asset 76.svg"
  },
  {
    "id": "bell-ring-alt",
    "assetNum": "153",
    "category": "phone",
    "label": "Bell Ring Alt",
    "path": "/icons/Asset 153.svg"
  },
  {
    "id": "bell-slash",
    "assetNum": "154",
    "category": "phone",
    "label": "Bell Slash",
    "path": "/icons/Asset 154.svg"
  },
  {
    "id": "bell-small",
    "assetNum": "143",
    "category": "design",
    "label": "Bell Small",
    "path": "/icons/Asset 143.svg"
  },
  {
    "id": "bird-tweet",
    "assetNum": "209",
    "category": "weather",
    "label": "Bird Tweet",
    "path": "/icons/Asset 209.svg"
  },
  {
    "id": "box-3d",
    "assetNum": "111",
    "category": "design",
    "label": "Box 3d",
    "path": "/icons/Asset 111.svg"
  },
  {
    "id": "box-open",
    "assetNum": "112",
    "category": "design",
    "label": "Box Open",
    "path": "/icons/Asset 112.svg"
  },
  {
    "id": "bracket-left",
    "assetNum": "174",
    "category": "interface",
    "label": "Bracket Left",
    "path": "/icons/Asset 174.svg"
  },
  {
    "id": "bracket-right",
    "assetNum": "175",
    "category": "interface",
    "label": "Bracket Right",
    "path": "/icons/Asset 175.svg"
  },
  {
    "id": "briefcase",
    "assetNum": "36",
    "category": "business",
    "label": "Briefcase",
    "path": "/icons/Asset 36.svg"
  },
  {
    "id": "brush-paint",
    "assetNum": "274",
    "category": "shopping",
    "label": "Brush Paint",
    "path": "/icons/Asset 274.svg"
  },
  {
    "id": "calculator",
    "assetNum": "15",
    "category": "business",
    "label": "Calculator",
    "path": "/icons/Asset 15.svg"
  },
  {
    "id": "calendar",
    "assetNum": "13",
    "category": "business",
    "label": "Calendar",
    "path": "/icons/Asset 13.svg"
  },
  {
    "id": "candlestick",
    "assetNum": "91",
    "category": "files",
    "label": "Candlestick",
    "path": "/icons/Asset 91.svg"
  },
  {
    "id": "candlestick-alt",
    "assetNum": "166",
    "category": "design",
    "label": "Candlestick Alt",
    "path": "/icons/Asset 166.svg"
  },
  {
    "id": "cart-add",
    "assetNum": "249",
    "category": "shopping",
    "label": "Cart Add",
    "path": "/icons/Asset 249.svg"
  },
  {
    "id": "cart-check",
    "assetNum": "251",
    "category": "shopping",
    "label": "Cart Check",
    "path": "/icons/Asset 251.svg"
  },
  {
    "id": "cart-remove",
    "assetNum": "250",
    "category": "shopping",
    "label": "Cart Remove",
    "path": "/icons/Asset 250.svg"
  },
  {
    "id": "cart-x",
    "assetNum": "252",
    "category": "shopping",
    "label": "Cart X",
    "path": "/icons/Asset 252.svg"
  },
  {
    "id": "celsius",
    "assetNum": "129",
    "category": "weather",
    "label": "Celsius",
    "path": "/icons/Asset 129.svg"
  },
  {
    "id": "chain-link",
    "assetNum": "127",
    "category": "weather",
    "label": "Chain Link",
    "path": "/icons/Asset 127.svg"
  },
  {
    "id": "chat-bubble",
    "assetNum": "3",
    "category": "social",
    "label": "Chat Bubble",
    "path": "/icons/Asset 3.svg"
  },
  {
    "id": "check",
    "assetNum": "32",
    "category": "interface",
    "label": "Check",
    "path": "/icons/Asset 32.svg"
  },
  {
    "id": "check-circle",
    "assetNum": "246",
    "category": "business",
    "label": "Check Circle",
    "path": "/icons/Asset 246.svg"
  },
  {
    "id": "chevron-double-down",
    "assetNum": "254",
    "category": "navigation",
    "label": "Chevron Double Down",
    "path": "/icons/Asset 254.svg"
  },
  {
    "id": "chevron-double-left",
    "assetNum": "256",
    "category": "navigation",
    "label": "Chevron Double Left",
    "path": "/icons/Asset 256.svg"
  },
  {
    "id": "chevron-double-up",
    "assetNum": "253",
    "category": "navigation",
    "label": "Chevron Double Up",
    "path": "/icons/Asset 253.svg"
  },
  {
    "id": "chevron-left",
    "assetNum": "255",
    "category": "navigation",
    "label": "Chevron Left",
    "path": "/icons/Asset 255.svg"
  },
  {
    "id": "circle-slash",
    "assetNum": "299",
    "category": "interface",
    "label": "Circle Slash",
    "path": "/icons/Asset 299.svg"
  },
  {
    "id": "clipboard",
    "assetNum": "28",
    "category": "business",
    "label": "Clipboard",
    "path": "/icons/Asset 28.svg"
  },
  {
    "id": "cloud",
    "assetNum": "122",
    "category": "weather",
    "label": "Cloud",
    "path": "/icons/Asset 122.svg"
  },
  {
    "id": "cloud-alt",
    "assetNum": "123",
    "category": "weather",
    "label": "Cloud Alt",
    "path": "/icons/Asset 123.svg"
  },
  {
    "id": "cloud-double",
    "assetNum": "124",
    "category": "weather",
    "label": "Cloud Double",
    "path": "/icons/Asset 124.svg"
  },
  {
    "id": "cloud-moon",
    "assetNum": "138",
    "category": "weather",
    "label": "Cloud Moon",
    "path": "/icons/Asset 138.svg"
  },
  {
    "id": "cloud-rain",
    "assetNum": "198",
    "category": "weather",
    "label": "Cloud Rain",
    "path": "/icons/Asset 198.svg"
  },
  {
    "id": "cloud-snow",
    "assetNum": "199",
    "category": "weather",
    "label": "Cloud Snow",
    "path": "/icons/Asset 199.svg"
  },
  {
    "id": "cloud-sun",
    "assetNum": "197",
    "category": "weather",
    "label": "Cloud Sun",
    "path": "/icons/Asset 197.svg"
  },
  {
    "id": "cloud-wind",
    "assetNum": "200",
    "category": "weather",
    "label": "Cloud Wind",
    "path": "/icons/Asset 200.svg"
  },
  {
    "id": "code-angle",
    "assetNum": "236",
    "category": "shopping",
    "label": "Code Angle",
    "path": "/icons/Asset 236.svg"
  },
  {
    "id": "code-brackets",
    "assetNum": "234",
    "category": "files",
    "label": "Code Brackets",
    "path": "/icons/Asset 234.svg"
  },
  {
    "id": "code-html",
    "assetNum": "235",
    "category": "design",
    "label": "Code Html",
    "path": "/icons/Asset 235.svg"
  },
  {
    "id": "comment",
    "assetNum": "17",
    "category": "social",
    "label": "Comment",
    "path": "/icons/Asset 17.svg"
  },
  {
    "id": "compass-east",
    "assetNum": "134",
    "category": "weather",
    "label": "Compass East",
    "path": "/icons/Asset 134.svg"
  },
  {
    "id": "compass-electro",
    "assetNum": "136",
    "category": "weather",
    "label": "Compass Electro",
    "path": "/icons/Asset 136.svg"
  },
  {
    "id": "compass-ne",
    "assetNum": "135",
    "category": "weather",
    "label": "Compass Ne",
    "path": "/icons/Asset 135.svg"
  },
  {
    "id": "compass-north",
    "assetNum": "132",
    "category": "weather",
    "label": "Compass North",
    "path": "/icons/Asset 132.svg"
  },
  {
    "id": "compass-south",
    "assetNum": "133",
    "category": "weather",
    "label": "Compass South",
    "path": "/icons/Asset 133.svg"
  },
  {
    "id": "copy-duplicate",
    "assetNum": "85",
    "category": "files",
    "label": "Copy Duplicate",
    "path": "/icons/Asset 85.svg"
  },
  {
    "id": "crop-frame",
    "assetNum": "182",
    "category": "interface",
    "label": "Crop Frame",
    "path": "/icons/Asset 182.svg"
  },
  {
    "id": "cursor",
    "assetNum": "257",
    "category": "navigation",
    "label": "Cursor",
    "path": "/icons/Asset 257.svg"
  },
  {
    "id": "desktop-share",
    "assetNum": "100",
    "category": "files",
    "label": "Desktop Share",
    "path": "/icons/Asset 100.svg"
  },
  {
    "id": "diamond-gem",
    "assetNum": "128",
    "category": "weather",
    "label": "Diamond Gem",
    "path": "/icons/Asset 128.svg"
  },
  {
    "id": "disc-cd",
    "assetNum": "63",
    "category": "media",
    "label": "Disc Cd",
    "path": "/icons/Asset 63.svg"
  },
  {
    "id": "disc-vinyl",
    "assetNum": "62",
    "category": "media",
    "label": "Disc Vinyl",
    "path": "/icons/Asset 62.svg"
  },
  {
    "id": "distribute-h",
    "assetNum": "164",
    "category": "design",
    "label": "Distribute H",
    "path": "/icons/Asset 164.svg"
  },
  {
    "id": "distribute-v",
    "assetNum": "165",
    "category": "design",
    "label": "Distribute V",
    "path": "/icons/Asset 165.svg"
  },
  {
    "id": "divider-line",
    "assetNum": "192",
    "category": "design",
    "label": "Divider Line",
    "path": "/icons/Asset 192.svg"
  },
  {
    "id": "document",
    "assetNum": "9",
    "category": "files",
    "label": "Document",
    "path": "/icons/Asset 9.svg"
  },
  {
    "id": "document-fold",
    "assetNum": "31",
    "category": "interface",
    "label": "Document Fold",
    "path": "/icons/Asset 31.svg"
  },
  {
    "id": "donut-chart",
    "assetNum": "50",
    "category": "business",
    "label": "Donut Chart",
    "path": "/icons/Asset 50.svg"
  },
  {
    "id": "download",
    "assetNum": "21",
    "category": "navigation",
    "label": "Download",
    "path": "/icons/Asset 21.svg"
  },
  {
    "id": "download-arrow",
    "assetNum": "213",
    "category": "phone",
    "label": "Download Arrow",
    "path": "/icons/Asset 213.svg"
  },
  {
    "id": "download-box",
    "assetNum": "215",
    "category": "phone",
    "label": "Download Box",
    "path": "/icons/Asset 215.svg"
  },
  {
    "id": "download-cloud",
    "assetNum": "214",
    "category": "phone",
    "label": "Download Cloud",
    "path": "/icons/Asset 214.svg"
  },
  {
    "id": "envelope-alt",
    "assetNum": "98",
    "category": "files",
    "label": "Envelope Alt",
    "path": "/icons/Asset 98.svg"
  },
  {
    "id": "envelope-check",
    "assetNum": "18",
    "category": "social",
    "label": "Envelope Check",
    "path": "/icons/Asset 18.svg"
  },
  {
    "id": "envelope-check-alt",
    "assetNum": "233",
    "category": "files",
    "label": "Envelope Check Alt",
    "path": "/icons/Asset 233.svg"
  },
  {
    "id": "envelope-circle",
    "assetNum": "229",
    "category": "files",
    "label": "Envelope Circle",
    "path": "/icons/Asset 229.svg"
  },
  {
    "id": "envelope-heart",
    "assetNum": "231",
    "category": "files",
    "label": "Envelope Heart",
    "path": "/icons/Asset 231.svg"
  },
  {
    "id": "envelope-lock",
    "assetNum": "232",
    "category": "files",
    "label": "Envelope Lock",
    "path": "/icons/Asset 232.svg"
  },
  {
    "id": "envelope-open",
    "assetNum": "8",
    "category": "files",
    "label": "Envelope Open",
    "path": "/icons/Asset 8.svg"
  },
  {
    "id": "envelope-open-alt",
    "assetNum": "228",
    "category": "files",
    "label": "Envelope Open Alt",
    "path": "/icons/Asset 228.svg"
  },
  {
    "id": "envelope-plain",
    "assetNum": "227",
    "category": "files",
    "label": "Envelope Plain",
    "path": "/icons/Asset 227.svg"
  },
  {
    "id": "envelope-x",
    "assetNum": "230",
    "category": "files",
    "label": "Envelope X",
    "path": "/icons/Asset 230.svg"
  },
  {
    "id": "equalizer",
    "assetNum": "58",
    "category": "media",
    "label": "Equalizer",
    "path": "/icons/Asset 58.svg"
  },
  {
    "id": "fahrenheit",
    "assetNum": "131",
    "category": "weather",
    "label": "Fahrenheit",
    "path": "/icons/Asset 131.svg"
  },
  {
    "id": "fast-forward",
    "assetNum": "94",
    "category": "files",
    "label": "Fast Forward",
    "path": "/icons/Asset 94.svg"
  },
  {
    "id": "file-copy",
    "assetNum": "288",
    "category": "files",
    "label": "File Copy",
    "path": "/icons/Asset 288.svg"
  },
  {
    "id": "file-plus",
    "assetNum": "287",
    "category": "files",
    "label": "File Plus",
    "path": "/icons/Asset 287.svg"
  },
  {
    "id": "file-text",
    "assetNum": "289",
    "category": "files",
    "label": "File Text",
    "path": "/icons/Asset 289.svg"
  },
  {
    "id": "flag",
    "assetNum": "7",
    "category": "navigation",
    "label": "Flag",
    "path": "/icons/Asset 7.svg"
  },
  {
    "id": "flip-horizontal",
    "assetNum": "167",
    "category": "design",
    "label": "Flip Horizontal",
    "path": "/icons/Asset 167.svg"
  },
  {
    "id": "flip-vertical",
    "assetNum": "168",
    "category": "design",
    "label": "Flip Vertical",
    "path": "/icons/Asset 168.svg"
  },
  {
    "id": "folder-open-alt",
    "assetNum": "291",
    "category": "files",
    "label": "Folder Open Alt",
    "path": "/icons/Asset 291.svg"
  },
  {
    "id": "folder-outline",
    "assetNum": "290",
    "category": "files",
    "label": "Folder Outline",
    "path": "/icons/Asset 290.svg"
  },
  {
    "id": "fork-knife",
    "assetNum": "191",
    "category": "design",
    "label": "Fork Knife",
    "path": "/icons/Asset 191.svg"
  },
  {
    "id": "forward-fill",
    "assetNum": "55",
    "category": "media",
    "label": "Forward Fill",
    "path": "/icons/Asset 55.svg"
  },
  {
    "id": "gear",
    "assetNum": "11",
    "category": "business",
    "label": "Gear",
    "path": "/icons/Asset 11.svg"
  },
  {
    "id": "gear-cog-alt",
    "assetNum": "286",
    "category": "interface",
    "label": "Gear Cog Alt",
    "path": "/icons/Asset 286.svg"
  },
  {
    "id": "globe",
    "assetNum": "14",
    "category": "business",
    "label": "Globe",
    "path": "/icons/Asset 14.svg"
  },
  {
    "id": "grid-controls",
    "assetNum": "16",
    "category": "interface",
    "label": "Grid Controls",
    "path": "/icons/Asset 16.svg"
  },
  {
    "id": "grid-layout",
    "assetNum": "37",
    "category": "business",
    "label": "Grid Layout",
    "path": "/icons/Asset 37.svg"
  },
  {
    "id": "hamburger-menu",
    "assetNum": "296",
    "category": "interface",
    "label": "Hamburger Menu",
    "path": "/icons/Asset 296.svg"
  },
  {
    "id": "headphones",
    "assetNum": "60",
    "category": "media",
    "label": "Headphones",
    "path": "/icons/Asset 60.svg"
  },
  {
    "id": "headphones-alt",
    "assetNum": "139",
    "category": "media",
    "label": "Headphones Alt",
    "path": "/icons/Asset 139.svg"
  },
  {
    "id": "heart",
    "assetNum": "210",
    "category": "social",
    "label": "Heart",
    "path": "/icons/Asset 210.svg"
  },
  {
    "id": "heart-bag",
    "assetNum": "211",
    "category": "social",
    "label": "Heart Bag",
    "path": "/icons/Asset 211.svg"
  },
  {
    "id": "home",
    "assetNum": "19",
    "category": "navigation",
    "label": "Home",
    "path": "/icons/Asset 19.svg"
  },
  {
    "id": "home-alt",
    "assetNum": "292",
    "category": "files",
    "label": "Home Alt",
    "path": "/icons/Asset 292.svg"
  },
  {
    "id": "layers-alt",
    "assetNum": "184",
    "category": "interface",
    "label": "Layers Alt",
    "path": "/icons/Asset 184.svg"
  },
  {
    "id": "layers-stack",
    "assetNum": "183",
    "category": "interface",
    "label": "Layers Stack",
    "path": "/icons/Asset 183.svg"
  },
  {
    "id": "layout-asymmetric",
    "assetNum": "83",
    "category": "files",
    "label": "Layout Asymmetric",
    "path": "/icons/Asset 83.svg"
  },
  {
    "id": "layout-card",
    "assetNum": "159",
    "category": "design",
    "label": "Layout Card",
    "path": "/icons/Asset 159.svg"
  },
  {
    "id": "layout-columns-3",
    "assetNum": "78",
    "category": "files",
    "label": "Layout Columns 3",
    "path": "/icons/Asset 78.svg"
  },
  {
    "id": "layout-footer",
    "assetNum": "84",
    "category": "files",
    "label": "Layout Footer",
    "path": "/icons/Asset 84.svg"
  },
  {
    "id": "layout-full",
    "assetNum": "81",
    "category": "files",
    "label": "Layout Full",
    "path": "/icons/Asset 81.svg"
  },
  {
    "id": "layout-grid-4",
    "assetNum": "77",
    "category": "files",
    "label": "Layout Grid 4",
    "path": "/icons/Asset 77.svg"
  },
  {
    "id": "layout-rows",
    "assetNum": "80",
    "category": "files",
    "label": "Layout Rows",
    "path": "/icons/Asset 80.svg"
  },
  {
    "id": "layout-sidebar",
    "assetNum": "79",
    "category": "files",
    "label": "Layout Sidebar",
    "path": "/icons/Asset 79.svg"
  },
  {
    "id": "layout-split",
    "assetNum": "82",
    "category": "files",
    "label": "Layout Split",
    "path": "/icons/Asset 82.svg"
  },
  {
    "id": "layout-tiles",
    "assetNum": "160",
    "category": "design",
    "label": "Layout Tiles",
    "path": "/icons/Asset 160.svg"
  },
  {
    "id": "lightning-bolt",
    "assetNum": "126",
    "category": "weather",
    "label": "Lightning Bolt",
    "path": "/icons/Asset 126.svg"
  },
  {
    "id": "line-break",
    "assetNum": "297",
    "category": "interface",
    "label": "Line Break",
    "path": "/icons/Asset 297.svg"
  },
  {
    "id": "line-chart",
    "assetNum": "41",
    "category": "business",
    "label": "Line Chart",
    "path": "/icons/Asset 41.svg"
  },
  {
    "id": "link-chain",
    "assetNum": "177",
    "category": "interface",
    "label": "Link Chain",
    "path": "/icons/Asset 177.svg"
  },
  {
    "id": "list-bullet",
    "assetNum": "284",
    "category": "files",
    "label": "List Bullet",
    "path": "/icons/Asset 284.svg"
  },
  {
    "id": "list-columns",
    "assetNum": "29",
    "category": "interface",
    "label": "List Columns",
    "path": "/icons/Asset 29.svg"
  },
  {
    "id": "list-format",
    "assetNum": "282",
    "category": "files",
    "label": "List Format",
    "path": "/icons/Asset 282.svg"
  },
  {
    "id": "list-lines",
    "assetNum": "283",
    "category": "files",
    "label": "List Lines",
    "path": "/icons/Asset 283.svg"
  },
  {
    "id": "list-rows",
    "assetNum": "30",
    "category": "interface",
    "label": "List Rows",
    "path": "/icons/Asset 30.svg"
  },
  {
    "id": "lock-open",
    "assetNum": "242",
    "category": "shopping",
    "label": "Lock Open",
    "path": "/icons/Asset 242.svg"
  },
  {
    "id": "magnifier",
    "assetNum": "278",
    "category": "shopping",
    "label": "Magnifier",
    "path": "/icons/Asset 278.svg"
  },
  {
    "id": "maximize",
    "assetNum": "180",
    "category": "interface",
    "label": "Maximize",
    "path": "/icons/Asset 180.svg"
  },
  {
    "id": "megaphone",
    "assetNum": "73",
    "category": "media",
    "label": "Megaphone",
    "path": "/icons/Asset 73.svg"
  },
  {
    "id": "megaphone-alt",
    "assetNum": "74",
    "category": "media",
    "label": "Megaphone Alt",
    "path": "/icons/Asset 74.svg"
  },
  {
    "id": "menu-lines",
    "assetNum": "294",
    "category": "files",
    "label": "Menu Lines",
    "path": "/icons/Asset 294.svg"
  },
  {
    "id": "mic-off",
    "assetNum": "68",
    "category": "media",
    "label": "Mic Off",
    "path": "/icons/Asset 68.svg"
  },
  {
    "id": "mic-podcast",
    "assetNum": "144",
    "category": "design",
    "label": "Mic Podcast",
    "path": "/icons/Asset 144.svg"
  },
  {
    "id": "microphone",
    "assetNum": "67",
    "category": "media",
    "label": "Microphone",
    "path": "/icons/Asset 67.svg"
  },
  {
    "id": "microphone-stand",
    "assetNum": "142",
    "category": "media",
    "label": "Microphone Stand",
    "path": "/icons/Asset 142.svg"
  },
  {
    "id": "minimize",
    "assetNum": "181",
    "category": "interface",
    "label": "Minimize",
    "path": "/icons/Asset 181.svg"
  },
  {
    "id": "minus",
    "assetNum": "34",
    "category": "interface",
    "label": "Minus",
    "path": "/icons/Asset 34.svg"
  },
  {
    "id": "minus-alt",
    "assetNum": "241",
    "category": "interface",
    "label": "Minus Alt",
    "path": "/icons/Asset 241.svg"
  },
  {
    "id": "minus-circle",
    "assetNum": "247",
    "category": "business",
    "label": "Minus Circle",
    "path": "/icons/Asset 247.svg"
  },
  {
    "id": "monitor",
    "assetNum": "22",
    "category": "business",
    "label": "Monitor",
    "path": "/icons/Asset 22.svg"
  },
  {
    "id": "monitor-alt",
    "assetNum": "99",
    "category": "files",
    "label": "Monitor Alt",
    "path": "/icons/Asset 99.svg"
  },
  {
    "id": "monitor-play",
    "assetNum": "176",
    "category": "design",
    "label": "Monitor Play",
    "path": "/icons/Asset 176.svg"
  },
  {
    "id": "moon-cloud",
    "assetNum": "205",
    "category": "weather",
    "label": "Moon Cloud",
    "path": "/icons/Asset 205.svg"
  },
  {
    "id": "moon-crescent",
    "assetNum": "137",
    "category": "weather",
    "label": "Moon Crescent",
    "path": "/icons/Asset 137.svg"
  },
  {
    "id": "moon-half",
    "assetNum": "202",
    "category": "weather",
    "label": "Moon Half",
    "path": "/icons/Asset 202.svg"
  },
  {
    "id": "move-arrows",
    "assetNum": "226",
    "category": "phone",
    "label": "Move Arrows",
    "path": "/icons/Asset 226.svg"
  },
  {
    "id": "music-cloud",
    "assetNum": "64",
    "category": "media",
    "label": "Music Cloud",
    "path": "/icons/Asset 64.svg"
  },
  {
    "id": "music-note-alt",
    "assetNum": "65",
    "category": "media",
    "label": "Music Note Alt",
    "path": "/icons/Asset 65.svg"
  },
  {
    "id": "music-note-beamed",
    "assetNum": "140",
    "category": "media",
    "label": "Music Note Beamed",
    "path": "/icons/Asset 140.svg"
  },
  {
    "id": "music-note-double",
    "assetNum": "61",
    "category": "media",
    "label": "Music Note Double",
    "path": "/icons/Asset 61.svg"
  },
  {
    "id": "music-note-single",
    "assetNum": "59",
    "category": "media",
    "label": "Music Note Single",
    "path": "/icons/Asset 59.svg"
  },
  {
    "id": "music-playlist",
    "assetNum": "66",
    "category": "media",
    "label": "Music Playlist",
    "path": "/icons/Asset 66.svg"
  },
  {
    "id": "music-wave",
    "assetNum": "141",
    "category": "media",
    "label": "Music Wave",
    "path": "/icons/Asset 141.svg"
  },
  {
    "id": "node-editor",
    "assetNum": "189",
    "category": "design",
    "label": "Node Editor",
    "path": "/icons/Asset 189.svg"
  },
  {
    "id": "org-chart",
    "assetNum": "245",
    "category": "business",
    "label": "Org Chart",
    "path": "/icons/Asset 245.svg"
  },
  {
    "id": "paint-roller",
    "assetNum": "103",
    "category": "files",
    "label": "Paint Roller",
    "path": "/icons/Asset 103.svg"
  },
  {
    "id": "paste",
    "assetNum": "185",
    "category": "design",
    "label": "Paste",
    "path": "/icons/Asset 185.svg"
  },
  {
    "id": "pause-button",
    "assetNum": "52",
    "category": "media",
    "label": "Pause Button",
    "path": "/icons/Asset 52.svg"
  },
  {
    "id": "pause-fill",
    "assetNum": "54",
    "category": "media",
    "label": "Pause Fill",
    "path": "/icons/Asset 54.svg"
  },
  {
    "id": "pen-nib",
    "assetNum": "190",
    "category": "design",
    "label": "Pen Nib",
    "path": "/icons/Asset 190.svg"
  },
  {
    "id": "pen-tool",
    "assetNum": "273",
    "category": "shopping",
    "label": "Pen Tool",
    "path": "/icons/Asset 273.svg"
  },
  {
    "id": "phone-incoming",
    "assetNum": "149",
    "category": "phone",
    "label": "Phone Incoming",
    "path": "/icons/Asset 149.svg"
  },
  {
    "id": "phone-landscape",
    "assetNum": "218",
    "category": "phone",
    "label": "Phone Landscape",
    "path": "/icons/Asset 218.svg"
  },
  {
    "id": "phone-outgoing",
    "assetNum": "150",
    "category": "phone",
    "label": "Phone Outgoing",
    "path": "/icons/Asset 150.svg"
  },
  {
    "id": "phone-portrait",
    "assetNum": "217",
    "category": "phone",
    "label": "Phone Portrait",
    "path": "/icons/Asset 217.svg"
  },
  {
    "id": "phone-rotate",
    "assetNum": "219",
    "category": "phone",
    "label": "Phone Rotate",
    "path": "/icons/Asset 219.svg"
  },
  {
    "id": "phone-tilt",
    "assetNum": "220",
    "category": "phone",
    "label": "Phone Tilt",
    "path": "/icons/Asset 220.svg"
  },
  {
    "id": "phone-vibrate",
    "assetNum": "148",
    "category": "phone",
    "label": "Phone Vibrate",
    "path": "/icons/Asset 148.svg"
  },
  {
    "id": "pie-chart",
    "assetNum": "49",
    "category": "business",
    "label": "Pie Chart",
    "path": "/icons/Asset 49.svg"
  },
  {
    "id": "play-button",
    "assetNum": "51",
    "category": "media",
    "label": "Play Button",
    "path": "/icons/Asset 51.svg"
  },
  {
    "id": "play-circle",
    "assetNum": "4",
    "category": "media",
    "label": "Play Circle",
    "path": "/icons/Asset 4.svg"
  },
  {
    "id": "play-fill",
    "assetNum": "53",
    "category": "media",
    "label": "Play Fill",
    "path": "/icons/Asset 53.svg"
  },
  {
    "id": "play-skip",
    "assetNum": "92",
    "category": "files",
    "label": "Play Skip",
    "path": "/icons/Asset 92.svg"
  },
  {
    "id": "playlist",
    "assetNum": "97",
    "category": "files",
    "label": "Playlist",
    "path": "/icons/Asset 97.svg"
  },
  {
    "id": "plus",
    "assetNum": "35",
    "category": "interface",
    "label": "Plus",
    "path": "/icons/Asset 35.svg"
  },
  {
    "id": "plus-circle",
    "assetNum": "248",
    "category": "business",
    "label": "Plus Circle",
    "path": "/icons/Asset 248.svg"
  },
  {
    "id": "plus-circle-alt",
    "assetNum": "301",
    "category": "interface",
    "label": "Plus Circle Alt",
    "path": "/icons/Asset 301.svg"
  },
  {
    "id": "pulse",
    "assetNum": "45",
    "category": "business",
    "label": "Pulse",
    "path": "/icons/Asset 45.svg"
  },
  {
    "id": "qr-code",
    "assetNum": "237",
    "category": "shopping",
    "label": "Qr Code",
    "path": "/icons/Asset 237.svg"
  },
  {
    "id": "rainbow",
    "assetNum": "206",
    "category": "weather",
    "label": "Rainbow",
    "path": "/icons/Asset 206.svg"
  },
  {
    "id": "raindrop",
    "assetNum": "201",
    "category": "weather",
    "label": "Raindrop",
    "path": "/icons/Asset 201.svg"
  },
  {
    "id": "refresh",
    "assetNum": "104",
    "category": "files",
    "label": "Refresh",
    "path": "/icons/Asset 104.svg"
  },
  {
    "id": "refresh-arrow",
    "assetNum": "179",
    "category": "interface",
    "label": "Refresh Arrow",
    "path": "/icons/Asset 179.svg"
  },
  {
    "id": "rewind",
    "assetNum": "93",
    "category": "files",
    "label": "Rewind",
    "path": "/icons/Asset 93.svg"
  },
  {
    "id": "rocket-launch",
    "assetNum": "276",
    "category": "shopping",
    "label": "Rocket Launch",
    "path": "/icons/Asset 276.svg"
  },
  {
    "id": "rotate-ccw",
    "assetNum": "106",
    "category": "files",
    "label": "Rotate Ccw",
    "path": "/icons/Asset 106.svg"
  },
  {
    "id": "rotate-cw",
    "assetNum": "105",
    "category": "files",
    "label": "Rotate Cw",
    "path": "/icons/Asset 105.svg"
  },
  {
    "id": "ruler",
    "assetNum": "275",
    "category": "shopping",
    "label": "Ruler",
    "path": "/icons/Asset 275.svg"
  },
  {
    "id": "scatter-dots",
    "assetNum": "43",
    "category": "business",
    "label": "Scatter Dots",
    "path": "/icons/Asset 43.svg"
  },
  {
    "id": "scissors",
    "assetNum": "102",
    "category": "files",
    "label": "Scissors",
    "path": "/icons/Asset 102.svg"
  },
  {
    "id": "search",
    "assetNum": "107",
    "category": "interface",
    "label": "Search",
    "path": "/icons/Asset 107.svg"
  },
  {
    "id": "search-alt",
    "assetNum": "277",
    "category": "interface",
    "label": "Search Alt",
    "path": "/icons/Asset 277.svg"
  },
  {
    "id": "search-zoom",
    "assetNum": "223",
    "category": "design",
    "label": "Search Zoom",
    "path": "/icons/Asset 223.svg"
  },
  {
    "id": "selection",
    "assetNum": "186",
    "category": "design",
    "label": "Selection",
    "path": "/icons/Asset 186.svg"
  },
  {
    "id": "serve-dome",
    "assetNum": "207",
    "category": "weather",
    "label": "Serve Dome",
    "path": "/icons/Asset 207.svg"
  },
  {
    "id": "settings-gear-alt",
    "assetNum": "285",
    "category": "interface",
    "label": "Settings Gear Alt",
    "path": "/icons/Asset 285.svg"
  },
  {
    "id": "shape-circle",
    "assetNum": "188",
    "category": "design",
    "label": "Shape Circle",
    "path": "/icons/Asset 188.svg"
  },
  {
    "id": "shape-square",
    "assetNum": "187",
    "category": "design",
    "label": "Shape Square",
    "path": "/icons/Asset 187.svg"
  },
  {
    "id": "share-network",
    "assetNum": "23",
    "category": "business",
    "label": "Share Network",
    "path": "/icons/Asset 23.svg"
  },
  {
    "id": "signal-bars",
    "assetNum": "173",
    "category": "interface",
    "label": "Signal Bars",
    "path": "/icons/Asset 173.svg"
  },
  {
    "id": "sitemap",
    "assetNum": "238",
    "category": "shopping",
    "label": "Sitemap",
    "path": "/icons/Asset 238.svg"
  },
  {
    "id": "skip-back",
    "assetNum": "95",
    "category": "files",
    "label": "Skip Back",
    "path": "/icons/Asset 95.svg"
  },
  {
    "id": "skip-forward",
    "assetNum": "96",
    "category": "files",
    "label": "Skip Forward",
    "path": "/icons/Asset 96.svg"
  },
  {
    "id": "slash",
    "assetNum": "298",
    "category": "interface",
    "label": "Slash",
    "path": "/icons/Asset 298.svg"
  },
  {
    "id": "sort-down",
    "assetNum": "155",
    "category": "navigation",
    "label": "Sort Down",
    "path": "/icons/Asset 155.svg"
  },
  {
    "id": "sort-horizontal",
    "assetNum": "158",
    "category": "design",
    "label": "Sort Horizontal",
    "path": "/icons/Asset 158.svg"
  },
  {
    "id": "sort-up",
    "assetNum": "156",
    "category": "navigation",
    "label": "Sort Up",
    "path": "/icons/Asset 156.svg"
  },
  {
    "id": "sort-vertical",
    "assetNum": "157",
    "category": "design",
    "label": "Sort Vertical",
    "path": "/icons/Asset 157.svg"
  },
  {
    "id": "spacing-decrease",
    "assetNum": "194",
    "category": "design",
    "label": "Spacing Decrease",
    "path": "/icons/Asset 194.svg"
  },
  {
    "id": "spacing-increase",
    "assetNum": "193",
    "category": "design",
    "label": "Spacing Increase",
    "path": "/icons/Asset 193.svg"
  },
  {
    "id": "sparkle",
    "assetNum": "5",
    "category": "navigation",
    "label": "Sparkle",
    "path": "/icons/Asset 5.svg"
  },
  {
    "id": "speaker",
    "assetNum": "69",
    "category": "media",
    "label": "Speaker",
    "path": "/icons/Asset 69.svg"
  },
  {
    "id": "speaker-fill",
    "assetNum": "146",
    "category": "design",
    "label": "Speaker Fill",
    "path": "/icons/Asset 146.svg"
  },
  {
    "id": "speaker-mute",
    "assetNum": "70",
    "category": "media",
    "label": "Speaker Mute",
    "path": "/icons/Asset 70.svg"
  },
  {
    "id": "speaker-mute-fill",
    "assetNum": "147",
    "category": "design",
    "label": "Speaker Mute Fill",
    "path": "/icons/Asset 147.svg"
  },
  {
    "id": "speaker-wireless",
    "assetNum": "145",
    "category": "design",
    "label": "Speaker Wireless",
    "path": "/icons/Asset 145.svg"
  },
  {
    "id": "speaker-x",
    "assetNum": "71",
    "category": "media",
    "label": "Speaker X",
    "path": "/icons/Asset 71.svg"
  },
  {
    "id": "stack-layers",
    "assetNum": "86",
    "category": "files",
    "label": "Stack Layers",
    "path": "/icons/Asset 86.svg"
  },
  {
    "id": "star-badge",
    "assetNum": "221",
    "category": "social",
    "label": "Star Badge",
    "path": "/icons/Asset 221.svg"
  },
  {
    "id": "star-fill",
    "assetNum": "12",
    "category": "business",
    "label": "Star Fill",
    "path": "/icons/Asset 12.svg"
  },
  {
    "id": "star-outline",
    "assetNum": "10",
    "category": "business",
    "label": "Star Outline",
    "path": "/icons/Asset 10.svg"
  },
  {
    "id": "star-outline-alt",
    "assetNum": "293",
    "category": "files",
    "label": "Star Outline Alt",
    "path": "/icons/Asset 293.svg"
  },
  {
    "id": "star-sparkle",
    "assetNum": "222",
    "category": "design",
    "label": "Star Sparkle",
    "path": "/icons/Asset 222.svg"
  },
  {
    "id": "sun",
    "assetNum": "125",
    "category": "weather",
    "label": "Sun",
    "path": "/icons/Asset 125.svg"
  },
  {
    "id": "sun-rays",
    "assetNum": "262",
    "category": "navigation",
    "label": "Sun Rays",
    "path": "/icons/Asset 262.svg"
  },
  {
    "id": "sunrise",
    "assetNum": "203",
    "category": "weather",
    "label": "Sunrise",
    "path": "/icons/Asset 203.svg"
  },
  {
    "id": "table-grid",
    "assetNum": "281",
    "category": "files",
    "label": "Table Grid",
    "path": "/icons/Asset 281.svg"
  },
  {
    "id": "tag-label",
    "assetNum": "212",
    "category": "design",
    "label": "Tag Label",
    "path": "/icons/Asset 212.svg"
  },
  {
    "id": "tag-price",
    "assetNum": "279",
    "category": "shopping",
    "label": "Tag Price",
    "path": "/icons/Asset 279.svg"
  },
  {
    "id": "text-format",
    "assetNum": "280",
    "category": "files",
    "label": "Text Format",
    "path": "/icons/Asset 280.svg"
  },
  {
    "id": "thermometer",
    "assetNum": "130",
    "category": "weather",
    "label": "Thermometer",
    "path": "/icons/Asset 130.svg"
  },
  {
    "id": "three-dots",
    "assetNum": "109",
    "category": "interface",
    "label": "Three Dots",
    "path": "/icons/Asset 109.svg"
  },
  {
    "id": "timer-clock",
    "assetNum": "243",
    "category": "shopping",
    "label": "Timer Clock",
    "path": "/icons/Asset 243.svg"
  },
  {
    "id": "toggle-off",
    "assetNum": "178",
    "category": "interface",
    "label": "Toggle Off",
    "path": "/icons/Asset 178.svg"
  },
  {
    "id": "transform-add",
    "assetNum": "195",
    "category": "design",
    "label": "Transform Add",
    "path": "/icons/Asset 195.svg"
  },
  {
    "id": "transform-remove",
    "assetNum": "196",
    "category": "design",
    "label": "Transform Remove",
    "path": "/icons/Asset 196.svg"
  },
  {
    "id": "trending-break",
    "assetNum": "101",
    "category": "files",
    "label": "Trending Break",
    "path": "/icons/Asset 101.svg"
  },
  {
    "id": "trending-down",
    "assetNum": "39",
    "category": "business",
    "label": "Trending Down",
    "path": "/icons/Asset 39.svg"
  },
  {
    "id": "trending-up",
    "assetNum": "38",
    "category": "business",
    "label": "Trending Up",
    "path": "/icons/Asset 38.svg"
  },
  {
    "id": "trending-zigzag",
    "assetNum": "46",
    "category": "business",
    "label": "Trending Zigzag",
    "path": "/icons/Asset 46.svg"
  },
  {
    "id": "umbrella",
    "assetNum": "204",
    "category": "weather",
    "label": "Umbrella",
    "path": "/icons/Asset 204.svg"
  },
  {
    "id": "upload-arrow",
    "assetNum": "295",
    "category": "files",
    "label": "Upload Arrow",
    "path": "/icons/Asset 295.svg"
  },
  {
    "id": "upload-cloud",
    "assetNum": "216",
    "category": "phone",
    "label": "Upload Cloud",
    "path": "/icons/Asset 216.svg"
  },
  {
    "id": "usb",
    "assetNum": "108",
    "category": "interface",
    "label": "Usb",
    "path": "/icons/Asset 108.svg"
  },
  {
    "id": "user-card",
    "assetNum": "26",
    "category": "social",
    "label": "User Card",
    "path": "/icons/Asset 26.svg"
  },
  {
    "id": "user-circle",
    "assetNum": "24",
    "category": "social",
    "label": "User Circle",
    "path": "/icons/Asset 24.svg"
  },
  {
    "id": "user-group",
    "assetNum": "2",
    "category": "social",
    "label": "User Group",
    "path": "/icons/Asset 2.svg"
  },
  {
    "id": "user-search",
    "assetNum": "27",
    "category": "social",
    "label": "User Search",
    "path": "/icons/Asset 27.svg"
  },
  {
    "id": "user-settings",
    "assetNum": "25",
    "category": "social",
    "label": "User Settings",
    "path": "/icons/Asset 25.svg"
  },
  {
    "id": "volume-high",
    "assetNum": "57",
    "category": "media",
    "label": "Volume High",
    "path": "/icons/Asset 57.svg"
  },
  {
    "id": "volume-low",
    "assetNum": "56",
    "category": "media",
    "label": "Volume Low",
    "path": "/icons/Asset 56.svg"
  },
  {
    "id": "volume-max",
    "assetNum": "72",
    "category": "media",
    "label": "Volume Max",
    "path": "/icons/Asset 72.svg"
  },
  {
    "id": "warning-triangle",
    "assetNum": "239",
    "category": "interface",
    "label": "Warning Triangle",
    "path": "/icons/Asset 239.svg"
  },
  {
    "id": "wave-chart",
    "assetNum": "44",
    "category": "business",
    "label": "Wave Chart",
    "path": "/icons/Asset 44.svg"
  },
  {
    "id": "wifi",
    "assetNum": "20",
    "category": "navigation",
    "label": "Wifi",
    "path": "/icons/Asset 20.svg"
  },
  {
    "id": "x-circle",
    "assetNum": "300",
    "category": "interface",
    "label": "X Circle",
    "path": "/icons/Asset 300.svg"
  },
  {
    "id": "x-circle-alt",
    "assetNum": "244",
    "category": "shopping",
    "label": "X Circle Alt",
    "path": "/icons/Asset 244.svg"
  },
  {
    "id": "x-close",
    "assetNum": "33",
    "category": "interface",
    "label": "X Close",
    "path": "/icons/Asset 33.svg"
  },
  {
    "id": "x-mark",
    "assetNum": "240",
    "category": "interface",
    "label": "X Mark",
    "path": "/icons/Asset 240.svg"
  },
  {
    "id": "zoom-in",
    "assetNum": "110",
    "category": "interface",
    "label": "Zoom In",
    "path": "/icons/Asset 110.svg"
  }
];
