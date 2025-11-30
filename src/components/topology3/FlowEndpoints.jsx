// components/FlowEndpoints.js
import React from "react";

const FlowEndpoints = ({ formData }) => (
  <>
    <div id="top3-priv-1" className="flow-label tp3-label-1">
      {"PRIV1"}
    </div>
    <div id="top3-pub-1" className="flow-label tp3-label-2">
      {"PUB1"}
    </div>
    <div id="top3-priv-2" className="flow-label tp3-label-3">
      {"PRIV2"}
    </div>
    <div id="top3-priv-3" className="flow-label tp3-label-4">
      {"PRIV3"}
    </div>
    <div id="top3-inet-1" className="flow-label tp3-label-5">
      {"INET1"}
    </div>
    <div id="top3-db1" className="flow-label tp3-label-6">
      {"DB1"}
    </div>
    <div id="fw1-grp">
      <div id="top3-fw-1" className="flow-label tp3-label-7">
        {"FW1"}
      </div>
      <span className="flow-label-fw1 tp3-label-7-1">
        {formData.firewallIp}
      </span>
    </div>
    <div id="top3-op" className="flow-label tp3-label-8">
      {"OP1"}
    </div>
  </>
);

export default FlowEndpoints;