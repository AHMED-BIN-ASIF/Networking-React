export const connectionMap = {
  // Group 1
  // "chk-priv1-pub": [
  //   ["top3-priv-1", "top3-fw-1", { path: "arc" }],
  //   ["top3-fw-1", "top3-pub-1", { path: "arc" }],
  //   //prev
  //   ["pre-priv1-pub-1", "pre-priv1-pub-2", { path: "straight" }],
  //   ["pre-priv1-pub-2", "pre-priv1-pub-3", { path: "straight" }],
  // ],
  // "chk-pub1-priv1-fw1": [
  //   ["top3-pub-1", "top3-fw-1", { path: "arc", color: "orange" }],
  //   ["top3-fw-1", "top3-priv-1", { path: "arc", color: "orange" }],
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
    ["top3-inet-1", "top3-gateway-1", { path: "arc" }],
    ["top3-gateway-1", "top3-pub-1", { path: "arc" }],
    // prev
    ["pre-inet1-pub1-1", "gtw-inet1-pub1-2", { path: "straight" }],
    ["gtw-inet1-pub1-2", "pre-inet1-pub1-3", { path: "straight" }],
  ],
  "chk-pub1-inet1": [
    ["top3-pub-1", "top3-gateway-1", { path: "arc", startSocket: 'top', endSocket: 'left', color: "orange" }],
    ["top3-gateway-1", "top3-inet-1", { path: "arc", color: "orange" }],
    //prev
    ["pre-pub1-inet1-1", "gtw-pub1-inet1-2", { path: "straight" }],
    ["gtw-pub1-inet1-2", "pre-pub1-inet1-3", { path: "straight" }],
  ],

  // Group 3
  "chk-fw1-inet1": [
    ["top3-fw-1", "top3-gateway-2", { path: "arc", startSocket: 'top',endSocket: 'top' }],
    ["top3-gateway-2", "top3-inet-1", { path: "arc" }],
    //prev
    ["pre-fw1-inet1-1", "gtw-fw1-inet1-2", { path: "straight" }],
    ["gtw-fw1-inet1-2", "pre-fw1-inet1-3", { path: "straight" }],
  ],

  // Group 4
  "chk-pub1-fw1": [
    ["top3-pub-1", "top3-fw-1", { path: "arc", startSocket: 'left',endSocket: 'bottom' }],
    //prev
    ["pre-pub1-fw1-1", "pre-pub1-fw1-2", { path: "straight" }],
  ],
  "chk-fw1-pub1": [
    ["top3-fw-1", "top3-pub-1", { path: "arc", color: "orange" }],
    //prev
    ["pre-fw1-pub1-1", "pre-fw1-pub1-2", { path: "straight", color: "orange" }],
  ],

  // Group 5
  "chk-priv1-inet1-bypass-fw": [
    ["top3-priv-1", "top3-gateway-2", { path: "arc", startSocket: 'top',endSocket: 'top' }],
    ["top3-gateway-2", "top3-inet-1", { path: "arc" }],
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
    ["top3-priv-1", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-gateway-2", { path: "arc", startSocket: 'top',endSocket: 'top' }],
    ["top3-gateway-2", "top3-inet-1", { path: "arc" }],
    //prev
    ["pre-priv1-inet1-fw-1", "pre-priv1-inet1-fw-2", { path: "straight" }],
    ["pre-priv1-inet1-fw-2", "gtw-priv1-inet1-fw-3", { path: "straight" }],
    ["gtw-priv1-inet1-fw-3", "pre-priv1-inet1-fw-4", { path: "straight" }],
  ],

  // Group 7
  "chk-pub1-priv1": [
    ["top3-pub-1", "top3-priv-1", { path: "arc" }],
    //prev
    ["pre-pub1-priv1-1", "pre-pub1-priv1-2", { path: "straight" }],
  ],
  "chk-priv1-pub1": [
    ["top3-priv-1", "top3-pub-1", { path: "arc", color: "orange" }],
    //prev
    [
      "pre-priv1-pub1-1",
      "pre-priv1-pub1-2",
      { path: "straight", color: "orange" },
    ],
  ],

  // Group 8
  "chk-pub1-priv2": [
    ["top3-pub-1", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-priv-2"],
    //prev
    ["pre-pub1-priv2-1", "pre-pub1-priv2-2", { path: "straight" }],
    ["pre-pub1-priv2-2", "pre-pub1-priv2-3", { path: "straight" }],
  ],
  "chk-priv2-pub1": [
    ["top3-priv-2", "top3-fw-1", { path: "arc", color: "orange" }],
    ["top3-fw-1", "top3-pub-1", { path: "arc", color: "orange" }],
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
    ["top3-priv-2", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-gateway-2", { path: "arc" , startSocket: 'top',endSocket: 'top' }],
    ["top3-gateway-2", "top3-inet-1", { path: "arc" }],
    //prev
    ["pre-priv2-inet1-1", "pre-priv2-inet1-2", { path: "straight" }],
    ["pre-priv2-inet1-2", "gtw-priv2-inet1-3", { path: "straight" }],
    ["gtw-priv2-inet1-3", "pre-priv2-inet1-4", { path: "straight" }],
  ],

  // Group 10
  "chk-priv1-priv2": [
    ["top3-priv-1", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-priv-2"],
    //prev
    ["pre-priv1-priv2-1", "pre-priv1-priv2-2", { path: "straight" }],
    ["pre-priv1-priv2-2", "pre-priv1-priv2-3", { path: "straight" }],
  ],
  "chk-priv2-priv1": [
    ["top3-priv-2", "top3-fw-1", { path: "arc", color: "orange" }],
    ["top3-fw-1", "top3-priv-1", { path: "arc", color: "orange" }],
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
    ["top3-pub-1", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-priv-3"],
    //prev
    ["pre-pub1-priv3-1", "pre-pub1-priv3-2", { path: "straight" }],
    ["pre-pub1-priv3-2", "pre-pub1-priv3-3", { path: "straight" }],
  ],
  "chk-priv3-pub1": [
    ["top3-priv-3", "top3-fw-1", { path: "arc", color: "orange" }],
    ["top3-fw-1", "top3-pub-1", { path: "arc", color: "orange" }],
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
    ["top3-priv-3", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-gateway-2", { path: "arc" }],
    ["top3-gateway-2", "top3-inet-1", { path: "arc" }],
    //prev
    ["pre-priv3-inet1-1", "pre-priv3-inet1-2", { path: "straight" }],
    ["pre-priv3-inet1-2", "gtw-priv3-inet1-3", { path: "straight" }],
    ["gtw-priv3-inet1-3", "pre-priv3-inet1-4", { path: "straight" }],
  ],

  // Group 13
  "chk-priv1-priv3": [
    ["top3-priv-1", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-priv-3"],
    //prev
    ["pre-priv1-priv3-1", "pre-priv1-priv3-2", { path: "straight" }],
    ["pre-priv1-priv3-2", "pre-priv1-priv3-3", { path: "straight" }],
  ],
  "chk-priv3-priv1": [
    ["top3-priv-3", "top3-fw-1", { path: "arc", color: "orange" }],
    ["top3-fw-1", "top3-priv-1", { path: "arc", color: "orange" }],
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
    ["top3-priv-2", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-priv-3"],
    //prev
    ["pre-priv2-priv3-1", "pre-priv2-priv3-2", { path: "straight" }],
    ["pre-priv2-priv3-2", "pre-priv2-priv3-3", { path: "straight" }],
  ],
  "chk-priv3-priv2": [
    ["top3-priv-3", "top3-fw-1", { path: "arc", color: "orange" }],
    ["top3-fw-1", "top3-priv-2", { path: "", color: "orange" }],
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

  // Group 15 (DB1)
  "chk-priv1-db1": [
    ["top3-priv-1", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-gateway-3", { path: "arc",startSocket: 'top',endSocket: 'top' }],
    ["top3-gateway-3", "top3-db1", { path: "arc" }],
    //prev
    ["pre-priv1-db1-1", "pre-priv1-db1-2", { path: "straight" }],
    ["pre-priv1-db1-2", "gtw-priv1-db1-3", { path: "straight" }],
    ["gtw-priv1-db1-3", "pre-priv1-db1-4", { path: "straight" }],
  ],

  // Group 16 (DB1)
  "chk-priv2-db1": [
    ["top3-priv-2", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-gateway-3", { path: "arc", startSocket: 'top',endSocket: 'top' }],
    ["top3-gateway-3", "top3-db1", { path: "arc" }],
    //prev
    ["pre-priv2-db1-1", "pre-priv2-db1-2", { path: "straight" }],
    ["pre-priv2-db1-2", "gtw-priv2-db1-3", { path: "straight" }],
    ["gtw-priv2-db1-3", "pre-priv2-db1-4", { path: "straight" }],
  ],
  // Group 17 (DB1)
  "chk-priv3-db1": [
    ["top3-priv-3", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-gateway-3", { path: "arc" }],
    ["top3-gateway-3", "top3-db1", { path: "arc" }],
    //prev
    ["pre-priv3-db1-1", "pre-priv3-db1-2", { path: "straight" }],
    ["pre-priv3-db1-2", "gtw-priv3-db1-3", { path: "straight" }],
    ["gtw-priv3-db1-3", "pre-priv3-db1-4", { path: "straight" }],
  ],
  // Group 18 (DB1)
  "chk-pub1-db1": [
    ["top3-pub-1", "top3-fw-1", { path: "arc" }],
    ["top3-fw-1", "top3-gateway-3", { path: "arc" }],
    ["top3-gateway-3", "top3-db1", { path: "arc" }],
    //prev
    ["pre-pub1-db1-1", "pre-pub1-db1-2", { path: "straight" }],
    ["pre-pub1-db1-2", "gtw-pub1-db1-3", { path: "straight" }],
    ["gtw-pub1-db1-3", "pre-pub1-db1-4", { path: "straight" }],
  ],
  "chk-op1-fw1-priv1": [
    ["top3-op", "top3-gateway-5", { path: "arc",startSocket: 'right',endSocket: 'right',color: "red" }],
    ["top3-gateway-5", "top3-gateway-4", { path: "arc", startSocket: 'bottom', endSocket: 'left', color: "red"}],
    ["top3-gateway-4", "top3-fw-1", { path: "arc", startSocket: 'top', endSocket: 'bottom', color: "red" }],
    ["top3-fw-1", "top3-priv-1", { path: "arc", startSocket: 'top', endSocket: 'top',color: "red" }],
    //prev
    ["fw-op1-fw1-priv1-step1-op1", "fw-op1-fw1-priv1-step2-gtw-op", { path: "straight",color: "red" }],
    ["fw-op1-fw1-priv1-step2-gtw-op", "fw-op1-fw1-priv1-step3-gtw-att", { path: "straight",color: "red" }],
    ["fw-op1-fw1-priv1-step3-gtw-att", "fw-op1-fw1-priv1-step4-fw1", { path: "straight",color: "red" }],
    ["fw-op1-fw1-priv1-step4-fw1", "fw-op1-fw1-priv1-step5-priv1", { path: "straight",color: "red" }],

  ],
  "chk-priv1-fw1-op1": [
    ["top3-priv-1", "top3-fw-1", { path: "arc", startSocket: 'top', endSocket: 'top' }],
    ["top3-fw-1", "top3-gateway-4", { path: "arc", startSocket: 'top', endSocket: 'top',}],
    ["top3-gateway-4", "top3-gateway-5", { path: "arc", startSocket: 'bottom', endSocket: 'left', }],
    ["top3-gateway-5", "top3-op", { path: "arc",startSocket: 'left', endSocket: 'bottom', }],
    //prev
    ["rev-priv1-fw1-op1-step1-priv1", "rev-priv1-fw1-op1-step2-fw1", { path: "straight" }],
    ["rev-priv1-fw1-op1-step2-fw1", "rev-priv1-fw1-op1-step3-gtw-att", { path: "straight" }],
    ["rev-priv1-fw1-op1-step3-gtw-att", "rev-priv1-fw1-op1-step4-gtw-op", { path: "straight" }],
    ["rev-priv1-fw1-op1-step4-gtw-op", "rev-priv1-fw1-op1-step5-op1", { path: "straight" }],
  ],
  "chk-op1-pub1": [
    ["top3-op", "top3-gateway-5", { path: "arc",startSocket: 'right',endSocket: 'right',color: "red" }],
    ["top3-gateway-5", "top3-gateway-4", { path: "arc", startSocket: 'bottom', endSocket: 'left',startSocketGravity: [0, 80], endSocketGravity: [0, 380],color: "red" }],
    ["top3-gateway-4", "top3-fw-1", { path: "arc", startSocket: 'top', endSocket: 'left',startSocketGravity: [0, -400], endSocketGravity: [-10, 0],color: "red" }],
    ["top3-fw-1", "top3-pub-1", { path: "arc", startSocket: 'left', endSocket: 'left',color: "red" }],
    //prev
    ["fw-op1-pub1-step1-op1", "fw-op1-pub1-step2-gtw-op", { path: "straight",color: "red" }],
    ["fw-op1-pub1-step2-gtw-op", "fw-op1-pub1-step3-gtw-att", { path: "straight",color: "red" }],
    ["fw-op1-pub1-step3-gtw-att", "fw-op1-pub1-step4-fw1", { path: "straight",color: "red" }],
    ["fw-op1-pub1-step4-fw1", "fw-op1-pub1-step5-pub1", { path: "straight", color: "red" }],
  ],
  "chk-pub1-op1": [
    ["top3-pub-1", "top3-fw-1", { path: "arc", startSocket: 'top', endSocket: 'top' }],
    ["top3-fw-1", "top3-gateway-4", { path: "arc", startSocket: 'top', endSocket: 'top', startSocketGravity: [0, -120], endSocketGravity: [15, 0] }],
    ["top3-gateway-4", "top3-gateway-5", { path: "arc", startSocket: 'bottom', endSocket: 'left',startSocketGravity: [25, 0], endSocketGravity: [0, 120] }],
    ["top3-gateway-5", "top3-op", { path: "arc",startSocket: 'left', endSocket: 'bottom',startSocketGravity: [-2, 0] }],
    //prev
    ["rev-pub1-op1-step1-pub1", "rev-pub1-op1-step2-fw1", { path: "straight" }],
    ["rev-pub1-op1-step2-fw1", "rev-pub1-op1-step3-gtw-att", { path: "straight" }],
    ["rev-pub1-op1-step3-gtw-att", "rev-pub1-op1-step4-gtw-op", { path: "straight" }],
    ["rev-pub1-op1-step4-gtw-op", "rev-pub1-op1-step5-op1", { path: "straight" }],
  ],
  "chk-op1-priv2": [
    ["top3-op", "top3-gateway-5", { path: "arc",startSocket: 'right',endSocket: 'right',color: "red" }],
    ["top3-gateway-5", "top3-gateway-4", { path: "arc", startSocket: 'top', endSocket: 'top',color: "red" }],
    ["top3-gateway-4", "top3-fw-1", { path: "arc", startSocket: 'right', endSocket: 'right',color: "red" }],
    ["top3-fw-1", "top3-priv-2", { path: "arc", startSocket: 'left', endSocket: 'left',color: "red" }],
    //prev
    ["fw-op1-priv2-step1-op1", "fw-op1-priv2-step2-gtw-op", { path: "straight", color: "red" }],
    ["fw-op1-priv2-step2-gtw-op", "fw-op1-priv2-step3-gtw-att", { path: "straight", color: "red" }],
    ["fw-op1-priv2-step3-gtw-att", "fw-op1-priv2-step4-fw1", { path: "straight", color: "red" }],
    ["fw-op1-priv2-step4-fw1", "fw-op1-priv2-step5-priv2", { path: "straight", color: "red" }],
  ],
  "chk-priv2-op1": [
    ["top3-priv-2", "top3-fw-1", { path: "arc", startSocket: 'top', endSocket: 'bottom' }],
    ["top3-fw-1", "top3-gateway-4", { path: "arc", startSocket: 'top', endSocket: 'top',  }],
    ["top3-gateway-4", "top3-gateway-5", { path: "arc", startSocket: 'bottom', endSocket: 'left', }],
    ["top3-gateway-5", "top3-op", { path: "arc",startSocket: 'left', endSocket: 'bottom', }],
    //prev
    ["rev-priv2-op1-step1-priv2", "rev-priv2-op1-step2-fw1", { path: "straight" }],
    ["rev-priv2-op1-step2-fw1", "rev-priv2-op1-step3-gtw-att", { path: "straight" }],
    ["rev-priv2-op1-step3-gtw-att", "rev-priv2-op1-step4-gtw-op", { path: "straight" }],
    ["rev-priv2-op1-step4-gtw-op", "rev-priv2-op1-step5-op1", { path: "straight" }],
  ],
  "chk-op1-priv3": [
    ["top3-op", "top3-gateway-5", { path: "arc",startSocket: 'right',endSocket: 'right',color: "red" }],
    ["top3-gateway-5", "top3-gateway-4", { path: "arc", startSocket: 'bottom', endSocket: 'left',startSocketGravity: [0, 80], endSocketGravity: [0, 380],color: "red" }],
    ["top3-gateway-4", "top3-fw-1", { path: "arc", startSocket: 'top', endSocket: 'left',startSocketGravity: [0, -400], endSocketGravity: [-10, 0],color: "red" }],
    ["top3-fw-1", "top3-priv-3", { path: "arc", startSocket: 'right', endSocket: 'right',color: "red" }],
    //prev
    ["fw-op1-priv3-step1-op1", "fw-op1-priv3-step2-gtw-op", { path: "straight", color: "red" }],
    ["fw-op1-priv3-step2-gtw-op", "fw-op1-priv3-step3-gtw-att", { path: "straight", color: "red" }],
    ["fw-op1-priv3-step3-gtw-att", "fw-op1-priv3-step4-fw1", { path: "straight", color: "red" }],
    ["fw-op1-priv3-step4-fw1", "fw-op1-priv3-step5-priv3", { path: "straight", color: "red" }]
  ],
  "chk-priv3-op1": [
    ["top3-priv-3", "top3-fw-1", { path: "arc", startSocket: 'top', endSocket: 'bottom' }],
    ["top3-fw-1", "top3-gateway-4", { path: "arc", startSocket: 'top', endSocket: 'top', startSocketGravity: [0, -120], endSocketGravity: [15, 0] }],
    ["top3-gateway-4", "top3-gateway-5", { path: "arc", startSocket: 'bottom', endSocket: 'left',startSocketGravity: [25, 0], endSocketGravity: [0, 120] }],
    ["top3-gateway-5", "top3-op", { path: "arc",startSocket: 'left', endSocket: 'bottom',startSocketGravity: [-2, 0] }],
    //prev
    ["rev-priv3-op1-step1-priv3", "rev-priv3-op1-step2-fw1", { path: "straight" }],
    ["rev-priv3-op1-step2-fw1", "rev-priv3-op1-step3-gtw-att", { path: "straight" }],
    ["rev-priv3-op1-step3-gtw-att", "rev-priv3-op1-step4-gtw-op", { path: "straight" }],
    ["rev-priv3-op1-step4-gtw-op", "rev-priv3-op1-step5-op1", { path: "straight" }]
  ],


};

export const endpointIds = [
  "top3-pub-1",
  "top3-priv-1",
  "top3-priv-2",
  "top3-priv-3",
  "top3-db1",
  "top3-inet-1",
  "fw1-grp",
  "top3-op",
];
