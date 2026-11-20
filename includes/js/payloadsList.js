var payloadsPath = "./includes/payloads/Bins/";

var payloadsList = [
  
  {
    id: "BinLoader",
    name: "Bin Loader",
    author: "Exploit",
    description: "Launches BinLoader server on port 9020 to send bin payloads.",
    specificFW: "4.50 - 5.07, 7.00 - 9.60",
    category: "tools",
    src: undefined,
    legacySrc: undefined
  },
  {
    id: "ElfLoader",
    name: "Elf Loader",
    author: "John T&#246;rnblom",
    description: "Launches the Elf Loader server on port 9021 to receive ELF payloads.",
    specificFW: "4.71 - latest",
    category: "tools",
    src: payloadsPath + "elfldr.elf"
  },

  {
    id: "FanThreshold",
    name: "Fan Threshold",
    author: "Scene Collective",
    description: "Sets the cooling fan's profile on the PlayStation 4",
    specificFW: "4.73 - latest",
    category: "tools",
    src: null
  },
];