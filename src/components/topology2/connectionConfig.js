export const connectionMap = {
  // Group 1
  // "chk-priv1-pub": [
  //   ["top2-priv-1", "top2-fw-1", { path: "arc" }],
  //   ["top2-fw-1", "top2-pub-1", { path: "arc" }],
  //   //prev
  //   ["pre-priv1-pub-1", "pre-priv1-pub-2", { path: "straight" }],
  //   ["pre-priv1-pub-2", "pre-priv1-pub-3", { path: "straight" }],
  // ],
  // "chk-pub1-priv1-fw1": [
  //   ["top2-pub-1", "top2-fw-1", { path: "arc", color: "orange" }],
  //   ["top2-fw-1", "top2-priv-1", { path: "arc", color: "orange" }],
  //   //prev
  //   [
  //     "pre-pub1-priv1-fw1-1",
  //     "pre-pub1-priv1-fw1-2",
  //     { path: "straight", color: "orange" },
  //   ],
  //   [
  //     "pre-pub1-priv1-fw1-2",
  //     "pre-pub1-priv1-fw1-3",
  //     { path: "straight", color: "orange" },
  //   ],
  // ],

  // Group 2
  "chk-inet1-pub1": [
    ["top2-inet-1", "top2-gateway-1", { path: "arc" }],
    ["top2-gateway-1", "top2-pub-1", { path: "arc" }],
    // prev
    ["pre-inet1-pub1-1", "gtw-inet1-pub1-2", { path: "straight" }],
    ["gtw-inet1-pub1-2", "pre-inet1-pub1-3", { path: "straight" }],
  ],
  "chk-pub1-inet1": [
    ["top2-pub-1", "top2-gateway-1", { path: "arc", color: "orange" }],
    ["top2-gateway-1", "top2-inet-1", { path: "arc", color: "orange" }],
    //prev
    ["pre-pub1-inet1-1", "gtw-pub1-inet1-2", { path: "straight" }],
    ["gtw-pub1-inet1-2", "pre-pub1-inet1-3", { path: "straight" }],
  ],

  // Group 3
  "chk-fw1-inet1": [
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
    //prev
    ["pre-fw1-inet1-1", "gtw-fw1-inet1-2", { path: "straight" }],
    ["gtw-fw1-inet1-2", "pre-fw1-inet1-3", { path: "straight" }],
  ],

  // Group 4
  "chk-pub1-fw1": [
    ["top2-pub-1", "top2-fw-1", { path: "arc" }],
    //prev
    ["pre-pub1-fw1-1", "pre-pub1-fw1-2", { path: "straight" }],
  ],
  "chk-fw1-pub1": [
    ["top2-fw-1", "top2-pub-1", { path: "arc", color: "orange" }],
    //prev
    ["pre-fw1-pub1-1", "pre-fw1-pub1-2", { path: "straight", color: "orange" }],
  ],

  // Group 5
  "chk-priv1-inet1-bypass-fw": [
    ["top2-priv-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
    //prev
    [
      "pre-priv1-inet1-bypass-fw-1",
      "gtw-priv1-inet1-bypass-fw-2",
      { path: "straight" },
    ],
    [
      "gtw-priv1-inet1-bypass-fw-2",
      "pre-priv1-inet1-bypass-fw-3",
      { path: "straight" },
    ],
  ],

  // Group 6
  "chk-priv1-inet1-fw": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
    //prev
    ["pre-priv1-inet1-fw-1", "pre-priv1-inet1-fw-2", { path: "straight" }],
    ["pre-priv1-inet1-fw-2", "gtw-priv1-inet1-fw-3", { path: "straight" }],
    ["gtw-priv1-inet1-fw-3", "pre-priv1-inet1-fw-4", { path: "straight" }],
  ],

  // Group 7
  "chk-pub1-priv1": [
    ["top2-pub-1", "top2-priv-1", { path: "arc" }],
    //prev
    ["pre-pub1-priv1-1", "pre-pub1-priv1-2", { path: "straight" }],
  ],
  "chk-priv1-pub1": [
    ["top2-priv-1", "top2-pub-1", { path: "arc", color: "orange" }],
    //prev
    [
      "pre-priv1-pub1-1",
      "pre-priv1-pub1-2",
      { path: "straight", color: "orange" },
    ],
  ],

  // Group 8
  "chk-pub1-priv2": [
    ["top2-pub-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-2"],
    //prev
    ["pre-pub1-priv2-1", "pre-pub1-priv2-2", { path: "straight" }],
    ["pre-pub1-priv2-2", "pre-pub1-priv2-3", { path: "straight" }],
  ],
  "chk-priv2-pub1": [
    ["top2-priv-2", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-pub-1", { path: "arc", color: "orange" }],
    //prev
    [
      "pre-priv2-pub1-1",
      "pre-priv2-pub1-2",
      { path: "straight", color: "orange" },
    ],
    [
      "pre-priv2-pub1-2",
      "pre-priv2-pub1-3",
      { path: "straight", color: "orange" },
    ],
  ],

  // Group 9
  "chk-priv2-inet1": [
    ["top2-priv-2", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
    //prev
    ["pre-priv2-inet1-1", "pre-priv2-inet1-2", { path: "straight" }],
    ["pre-priv2-inet1-2", "gtw-priv2-inet1-3", { path: "straight" }],
    ["gtw-priv2-inet1-3", "pre-priv2-inet1-4", { path: "straight" }],
  ],

  // Group 10
  "chk-priv1-priv2": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-2"],
    //prev
    ["pre-priv1-priv2-1", "pre-priv1-priv2-2", { path: "straight" }],
    ["pre-priv1-priv2-2", "pre-priv1-priv2-3", { path: "straight" }],
  ],
  "chk-priv2-priv1": [
    ["top2-priv-2", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-priv-1", { path: "arc", color: "orange" }],
    //prev
    [
      "pre-priv2-priv1-1",
      "pre-priv2-priv1-2",
      { path: "straight", color: "orange" },
    ],
    [
      "pre-priv2-priv1-2",
      "pre-priv2-priv1-3",
      { path: "straight", color: "orange" },
    ],
  ],

  // Group 11
  "chk-pub1-priv3": [
    ["top2-pub-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-3"],
    //prev
    ["pre-pub1-priv3-1", "pre-pub1-priv3-2", { path: "straight" }],
    ["pre-pub1-priv3-2", "pre-pub1-priv3-3", { path: "straight" }],
  ],
  "chk-priv3-pub1": [
    ["top2-priv-3", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-pub-1", { path: "arc", color: "orange" }],
    //prev
    [
      "pre-priv3-pub1-1",
      "pre-priv3-pub1-2",
      { path: "straight", color: "orange" },
    ],
    [
      "pre-priv3-pub1-2",
      "pre-priv3-pub1-3",
      { path: "straight", color: "orange" },
    ],
  ],

  // Group 12
  "chk-priv3-inet1": [
    ["top2-priv-3", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
    //prev
    ["pre-priv3-inet1-1", "pre-priv3-inet1-2", { path: "straight" }],
    ["pre-priv3-inet1-2", "gtw-priv3-inet1-3", { path: "straight" }],
    ["gtw-priv3-inet1-3", "pre-priv3-inet1-4", { path: "straight" }],
  ],

  // Group 13
  "chk-priv1-priv3": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-3"],
    //prev
    ["pre-priv1-priv3-1", "pre-priv1-priv3-2", { path: "straight" }],
    ["pre-priv1-priv3-2", "pre-priv1-priv3-3", { path: "straight" }],
  ],
  "chk-priv3-priv1": [
    ["top2-priv-3", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-priv-1", { path: "arc", color: "orange" }],
    //prev
    [
      "pre-priv3-priv1-1",
      "pre-priv3-priv1-2",
      { path: "straight", color: "orange" },
    ],
    [
      "pre-priv3-priv1-2",
      "pre-priv3-priv1-3",
      { path: "straight", color: "orange" },
    ],
  ],

  // Group 14
  "chk-priv2-priv3": [
    ["top2-priv-2", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-3"],
    //prev
    ["pre-priv2-priv3-1", "pre-priv2-priv3-2", { path: "straight" }],
    ["pre-priv2-priv3-2", "pre-priv2-priv3-3", { path: "straight" }],
  ],
  "chk-priv3-priv2": [
    ["top2-priv-3", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-priv-2", { path: "", color: "orange" }],
    //prev
    [
      "pre-priv3-priv2-1",
      "pre-priv3-priv2-2",
      { path: "straight", color: "orange" },
    ],
    [
      "pre-priv3-priv2-2",
      "pre-priv3-priv2-3",
      { path: "straight", color: "orange" },
    ],
  ],

  // Group 15 (SBI)
  "chk-priv1-sbi": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-db1", { path: "arc" }],
    //prev
    ["pre-priv1-sbi-1", "pre-priv1-sbi-2", { path: "straight" }],
    ["pre-priv1-sbi-2", "gtw-priv1-sbi-3", { path: "straight" }],
    ["gtw-priv1-sbi-3", "pre-priv1-sbi-4", { path: "straight" }],
  ],

  // Group 16 (SBI)
  "chk-priv2-sbi": [
    ["top2-priv-2", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-db1", { path: "arc" }],
    //prev
    ["pre-priv2-sbi-1", "pre-priv2-sbi-2", { path: "straight" }],
    ["pre-priv2-sbi-2", "gtw-priv2-sbi-3", { path: "straight" }],
    ["gtw-priv2-sbi-3", "pre-priv2-sbi-4", { path: "straight" }],
  ],
  // Group 17 (SBI)
  "chk-priv3-sbi": [
    ["top2-priv-3", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-db1", { path: "arc" }],
    //prev
    ["pre-priv3-sbi-1", "pre-priv3-sbi-2", { path: "straight" }],
    ["pre-priv3-sbi-2", "gtw-priv3-sbi-3", { path: "straight" }],
    ["gtw-priv3-sbi-3", "pre-priv3-sbi-4", { path: "straight" }],
  ],
  // Group 18 (SBI)
  "chk-pub1-sbi": [
    ["top2-pub-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-db1", { path: "arc" }],
    //prev
    ["pre-pub1-sbi-1", "pre-pub1-sbi-2", { path: "straight" }],
    ["pre-pub1-sbi-2", "gtw-pub1-sbi-3", { path: "straight" }],
    ["gtw-pub1-sbi-3", "pre-pub1-sbi-4", { path: "straight" }],
  ],
};

export const endpointIds = [
  "top2-pub-1",
  "top2-priv-1",
  "top2-priv-2",
  "top2-priv-3",
  "top2-db1",
  "top2-inet-1",
  "fw1-grp",
];
