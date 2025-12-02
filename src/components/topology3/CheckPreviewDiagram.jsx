import React from "react";
import Gateway from "../../assets/icons/gateway.webp";
import GatewayOp from "../../assets/icons/op-gateway.webp";
import GatewayAtt from "../../assets/icons/att-gateway.webp";

const CheckPreviewDiagram = ({ flowCheckboxes }) => {
  return (
    <div>
      <div className="check-preview-wrapper">
        {flowCheckboxes["chk-priv1-pub"] && (
          <div className="check-preview">
            <div id="pre-priv1-pub-1" className="flow-label endpoint">
              {"PRIV1"}
            </div>
            <div id="pre-priv1-pub-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv1-pub-3" className="flow-label endpoint">
              {"PUB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-priv1-fw1"] && (
          <div className="check-preview">
            <div id="pre-pub1-priv1-fw1-1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="pre-pub1-priv1-fw1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-pub1-priv1-fw1-3" className="flow-label endpoint">
              {"PRIV1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-inet1-pub1"] && (
          <div className="check-preview">
            <div id="pre-inet1-pub1-1" className="flow-label endpoint">
              {"INET1"}
            </div>
            <div id="gtw-inet1-pub1-2" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Internet Gateway</span>
            </div>
            <div id="pre-inet1-pub1-3" className="flow-label endpoint">
              {"PUB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-inet1"] && (
          <div className="check-preview">
            <div id="pre-pub1-inet1-1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="gtw-pub1-inet1-2" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Internet Gateway</span>
            </div>
            <div id="pre-pub1-inet1-3" className="flow-label endpoint">
              {"INET1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-fw1-inet1"] && (
          <div className="check-preview">
            <div id="pre-fw1-inet1-1" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-fw1-inet1-2" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>NAT Gateway</span>
            </div>
            <div id="pre-fw1-inet1-3" className="flow-label endpoint">
              {"INET1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-fw1"] && (
          <div className="check-preview">
            <div id="pre-pub1-fw1-1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="pre-pub1-fw1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-fw1-pub1"] && (
          <div className="check-preview">
            <div id="pre-fw1-pub1-1" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-fw1-pub1-2" className="flow-label endpoint">
              {"PUB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv1-inet1-bypass-fw"] && (
          <div className="check-preview">
            <div
              id="pre-priv1-inet1-bypass-fw-1"
              className="flow-label endpoint"
            >
              {"PRIV1"}
            </div>
            <div id="gtw-priv1-inet1-bypass-fw-2" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>NAT Gateway</span>
            </div>
            <div
              id="pre-priv1-inet1-bypass-fw-3"
              className="flow-label endpoint"
            >
              {"INET1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv1-inet1-fw"] && (
          <div className="check-preview">
            <div id="pre-priv1-inet1-fw-1" className="flow-label endpoint">
              {"PRIV1"}
            </div>
            <div id="pre-priv1-inet1-fw-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv1-inet1-fw-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>NAT Gateway</span>
            </div>
            <div id="pre-priv1-inet1-fw-4" className="flow-label endpoint">
              {"INET1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-priv1"] && (
          <div className="check-preview">
            <div id="pre-pub1-priv1-1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="pre-pub1-priv1-2" className="flow-label endpoint">
              {"PRIV1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv1-pub1"] && (
          <div className="check-preview">
            <div id="pre-priv1-pub1-1" className="flow-label endpoint">
              {"PRIV1"}
            </div>
            <div id="pre-priv1-pub1-2" className="flow-label endpoint">
              {"PUB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-priv2"] && (
          <div className="check-preview">
            <div id="pre-pub1-priv2-1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="pre-pub1-priv2-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-pub1-priv2-3" className="flow-label endpoint">
              {"PRIV2"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv2-pub1"] && (
          <div className="check-preview">
            <div id="pre-priv2-pub1-1" className="flow-label endpoint">
              {"PRIV2"}
            </div>
            <div id="pre-priv2-pub1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv2-pub1-3" className="flow-label endpoint">
              {"PUB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv2-inet1"] && (
          <div className="check-preview">
            <div id="pre-priv2-inet1-1" className="flow-label endpoint">
              {"PRIV2"}
            </div>
            <div id="pre-priv2-inet1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv2-inet1-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>NAT Gateway</span>
            </div>
            <div id="pre-priv2-inet1-4" className="flow-label endpoint">
              {"INET1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv1-priv2"] && (
          <div className="check-preview">
            <div id="pre-priv1-priv2-1" className="flow-label endpoint">
              {"PRIV1"}
            </div>
            <div id="pre-priv1-priv2-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv1-priv2-3" className="flow-label endpoint">
              {"PRIV2"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv2-priv1"] && (
          <div className="check-preview">
            <div id="pre-priv2-priv1-1" className="flow-label endpoint">
              {"PRIV2"}
            </div>
            <div id="pre-priv2-priv1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv2-priv1-3" className="flow-label endpoint">
              {"PRIV1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-priv3"] && (
          <div className="check-preview">
            <div id="pre-pub1-priv3-1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="pre-pub1-priv3-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-pub1-priv3-3" className="flow-label endpoint">
              {"PRIV3"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv3-pub1"] && (
          <div className="check-preview">
            <div id="pre-priv3-pub1-1" className="flow-label endpoint">
              {"PRIV3"}
            </div>
            <div id="pre-priv3-pub1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv3-pub1-3" className="flow-label endpoint">
              {"PUB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv3-inet1"] && (
          <div className="check-preview">
            <div id="pre-priv3-inet1-1" className="flow-label endpoint">
              {"PRIV3"}
            </div>
            <div id="pre-priv3-inet1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv3-inet1-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>NAT Gateway</span>
            </div>
            <div id="pre-priv3-inet1-4" className="flow-label endpoint">
              {"INET1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv1-priv3"] && (
          <div className="check-preview">
            <div id="pre-priv1-priv3-1" className="flow-label endpoint">
              {"PRIV1"}
            </div>
            <div id="pre-priv1-priv3-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv1-priv3-3" className="flow-label endpoint">
              {"PRIV3"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv3-priv1"] && (
          <div className="check-preview">
            <div id="pre-priv3-priv1-1" className="flow-label endpoint">
              {"PRIV3"}
            </div>
            <div id="pre-priv3-priv1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv3-priv1-3" className="flow-label endpoint">
              {"PRIV1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv2-priv3"] && (
          <div className="check-preview">
            <div id="pre-priv2-priv3-1" className="flow-label endpoint">
              {"PRIV2"}
            </div>
            <div id="pre-priv2-priv3-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv2-priv3-3" className="flow-label endpoint">
              {"PRIV3"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv3-priv2"] && (
          <div className="check-preview">
            <div id="pre-priv3-priv2-1" className="flow-label endpoint">
              {"PRIV3"}
            </div>
            <div id="pre-priv3-priv2-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="pre-priv3-priv2-3" className="flow-label endpoint">
              {"PRIV2"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv1-db1"] && (
          <div className="check-preview">
            <div id="pre-priv1-db1-1" className="flow-label endpoint">
              {"PRIV1"}
            </div>
            <div id="pre-priv1-db1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv1-db1-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Service Gateway</span>
            </div>
            <div id="pre-priv1-db1-4" className="flow-label endpoint">
              {"SB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv2-db1"] && (
          <div className="check-preview">
            <div id="pre-priv2-db1-1" className="flow-label endpoint">
              {"PRIV2"}
            </div>
            <div id="pre-priv2-db1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv2-db1-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Service Gateway</span>
            </div>
            <div id="pre-priv2-db1-4" className="flow-label endpoint">
              {"SB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv3-db1"] && (
          <div className="check-preview">
            <div id="pre-priv3-db1-1" className="flow-label endpoint">
              {"PRIV3"}
            </div>
            <div id="pre-priv3-db1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv3-db1-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Service Gateway</span>
            </div>
            <div id="pre-priv3-db1-4" className="flow-label endpoint">
              {"SB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-db1"] && (
          <div className="check-preview">
            <div id="pre-pub1-db1-1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="pre-pub1-db1-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-pub1-db1-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Service Gateway</span>
            </div>
            <div id="pre-pub1-db1-4" className="flow-label endpoint">
              {"SB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-op1-fw1-priv1"] && (
          <div className="check-preview">
            <div
              id="fw-op1-fw1-priv1-step1-op1"
              className="flow-label endpoint"
            >
              {"OP1"}
            </div>
            <div id="fw-op1-fw1-priv1-step2-gtw-op" className="pr-gateway op">
              <img src={GatewayOp} alt="Gateway OP" className="gt-icon op" />
            </div>
            <div id="fw-op1-fw1-priv1-step3-gtw-att" className="pr-gateway att">
              <img src={GatewayAtt} alt="Gateway OP" className="gt-icon att" />
            </div>
            <div
              id="fw-op1-fw1-priv1-step4-fw1"
              className="flow-label endpoint"
            >
              {"FW1"}
            </div>
            <div
              id="fw-op1-fw1-priv1-step5-priv1"
              className="flow-label endpoint"
            >
              {"PRIV1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv1-fw1-op1"] && (
          <div className="check-preview">
            <div
              id="rev-priv1-fw1-op1-step1-priv1"
              className="flow-label endpoint"
            >
              {"PRIV1"}
            </div>
            <div
              id="rev-priv1-fw1-op1-step2-fw1"
              className="flow-label endpoint"
            >
              {"FW1"}
            </div>
            <div
              id="rev-priv1-fw1-op1-step3-gtw-att"
              className="pr-gateway att"
            >
              <img src={GatewayAtt} alt="Gateway OP" className="gt-icon att" />
            </div>
            <div id="rev-priv1-fw1-op1-step4-gtw-op" className="pr-gateway op">
              <img src={GatewayOp} alt="Gateway OP" className="gt-icon op" />
            </div>
            <div
              id="rev-priv1-fw1-op1-step5-op1"
              className="flow-label endpoint"
            >
              {"OP1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-op1-pub1"] && (
          <div className="check-preview">
            <div id="fw-op1-pub1-step1-op1" className="flow-label endpoint">
              {"OP1"}
            </div>
            <div id="fw-op1-pub1-step2-gtw-op" className="pr-gateway op">
              <img src={GatewayOp} alt="Gateway OP" className="gt-icon op" />
            </div>
            <div id="fw-op1-pub1-step3-gtw-att" className="pr-gateway att">
              <img src={GatewayAtt} alt="Gateway OP" className="gt-icon att" />
            </div>
            <div id="fw-op1-pub1-step4-fw1" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="fw-op1-pub1-step5-pub1" className="flow-label endpoint">
              {"PUB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-op1"] && (
          <div className="check-preview">
            <div id="rev-pub1-op1-step1-pub1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="rev-pub1-op1-step2-fw1" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="rev-pub1-op1-step3-gtw-att" className="pr-gateway att">
              <img src={GatewayAtt} alt="Gateway OP" className="gt-icon att" />
            </div>
            <div id="rev-pub1-op1-step4-gtw-op" className="pr-gateway op">
              <img src={GatewayOp} alt="Gateway OP" className="gt-icon op" />
            </div>
            <div id="rev-pub1-op1-step5-op1" className="flow-label endpoint">
              {"OP1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-op1-priv2"] && (
          <div className="check-preview">
            <div id="fw-op1-priv2-step1-op1" className="flow-label endpoint">
              {"OP1"}
            </div>
            <div id="fw-op1-priv2-step2-gtw-op" className="pr-gateway op">
              <img src={GatewayOp} alt="Gateway OP" className="gt-icon op" />
            </div>
            <div id="fw-op1-priv2-step3-gtw-att" className="pr-gateway att">
              <img src={GatewayAtt} alt="Gateway OP" className="gt-icon att" />
            </div>
            <div id="fw-op1-priv2-step4-fw1" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="fw-op1-priv2-step5-priv2" className="flow-label endpoint">
              {"PRIV2"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv2-op1"] && (
          <div className="check-preview">
            <div id="rev-priv2-op1-step1-priv2" className="flow-label endpoint">
              {"PRIV2"}
            </div>
            <div id="rev-priv2-op1-step2-fw1" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="rev-priv2-op1-step3-gtw-att" className="pr-gateway att">
              <img src={GatewayAtt} alt="Gateway OP" className="gt-icon att" />
            </div>
            <div id="rev-priv2-op1-step4-gtw-op" className="pr-gateway op">
              <img src={GatewayOp} alt="Gateway OP" className="gt-icon op" />
            </div>
            <div id="rev-priv2-op1-step5-op1" className="flow-label endpoint">
              {"OP1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-op1-priv3"] && (
          <div className="check-preview">
            <div id="fw-op1-priv3-step1-op1" className="flow-label endpoint">
              {"OP1"}
            </div>
            <div id="fw-op1-priv3-step2-gtw-op" className="pr-gateway op">
              <img src={GatewayOp} alt="Gateway OP" className="gt-icon op" />
            </div>
            <div id="fw-op1-priv3-step3-gtw-att" className="pr-gateway att">
              <img src={GatewayAtt} alt="Gateway OP" className="gt-icon att" />
            </div>
            <div id="fw-op1-priv3-step4-fw1" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="fw-op1-priv3-step5-priv3" className="flow-label endpoint">
              {"PRIV3"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv3-op1"] && (
          <div className="check-preview">
            <div id="rev-priv3-op1-step1-priv3" className="flow-label endpoint">
              {"PRIV3"}
            </div>
            <div id="rev-priv3-op1-step2-fw1" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="rev-priv3-op1-step3-gtw-att" className="pr-gateway att">
              <img src={GatewayAtt} alt="Gateway OP" className="gt-icon att" />
            </div>
            <div id="rev-priv3-op1-step4-gtw-op" className="pr-gateway op">
              <img src={GatewayOp} alt="Gateway OP" className="gt-icon op" />
            </div>
            <div id="rev-priv3-op1-step5-op1" className="flow-label endpoint">
              {"OP1"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckPreviewDiagram;
