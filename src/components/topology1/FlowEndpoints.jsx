import React from "react";

const FlowEndpoints = ({ formData }) => {
  return (
    <>
      <div id="top1-pub-1" className="flow-label label-1">
        {"PUB1"}
      </div>
      <div id="top1-priv-1" className="flow-label label-2">
        {"PRIV1"}
      </div>
      <div id="top1-priv-2" className="flow-label label-3">
        {"PRIV2"}
      </div>
      <div id="top1-inet-1" className="flow-label label-4">
        {"INET1"}
      </div>
      <div id="top1-db-1" className="flow-label label-5">
        {"DB1"}
      </div>
    </>
  );
};

export default FlowEndpoints;