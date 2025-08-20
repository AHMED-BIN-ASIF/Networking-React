// components/FlowEndpoints.js
import React from "react";

const FlowEndpoints = ({ formData }) => (
  <>
    <div id="top2-priv-1" className="flow-label tp2-label-1">
      {"PRIV1"}
    </div>
    <div id="top2-pub-1" className="flow-label tp2-label-2">
      {"PUB1"}
    </div>
    <div id="top2-priv-2" className="flow-label tp2-label-3">
      {"PRIV2"}
    </div>
    <div id="top2-priv-3" className="flow-label tp2-label-4">
      {"PRIV3"}
    </div>
    <div id="top2-inet-1" className="flow-label tp2-label-5">
      {"INET1"}
    </div>
    <div id="top2-sbi" className="flow-label tp2-label-6">
      {"SB1"}
    </div>
    <div id="fw1-grp">
      <div id="top2-fw-1" className="flow-label tp2-label-7">
        {"FW1"}
      </div>
      <span className="flow-label-fw1 tp2-label-7-1">
        {formData.firewallIp}
      </span>
    </div>
  </>
);

export default FlowEndpoints;