import React from "react";
import Gateway from "../../assets/icons/gateway.webp";

const CheckPreviewDiagram = ({flowCheckboxes}) => {
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
            <div id="pre-priv1-inet1-bypass-fw-1" className="flow-label endpoint">
              {"PRIV1"}
            </div>
            <div id="gtw-priv1-inet1-bypass-fw-2" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>NAT Gateway</span>
            </div>
            <div id="pre-priv1-inet1-bypass-fw-3" className="flow-label endpoint">
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
        {flowCheckboxes["chk-priv1-sbi"] && (
          <div className="check-preview">
            <div id="pre-priv1-sbi-1" className="flow-label endpoint">
              {"PRIV1"}
            </div>
            <div id="pre-priv1-sbi-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv1-sbi-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Service Gateway</span>
            </div>
            <div id="pre-priv1-sbi-4" className="flow-label endpoint">
              {"SB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv2-sbi"] && (
          <div className="check-preview">
            <div id="pre-priv2-sbi-1" className="flow-label endpoint">
              {"PRIV2"}
            </div>
            <div id="pre-priv2-sbi-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv2-sbi-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Service Gateway</span>
            </div>
            <div id="pre-priv2-sbi-4" className="flow-label endpoint">
              {"SB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-priv3-sbi"] && (
          <div className="check-preview">
            <div id="pre-priv3-sbi-1" className="flow-label endpoint">
              {"PRIV3"}
            </div>
            <div id="pre-priv3-sbi-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-priv3-sbi-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Service Gateway</span>
            </div>
            <div id="pre-priv3-sbi-4" className="flow-label endpoint">
              {"SB1"}
            </div>
          </div>
        )}
        {flowCheckboxes["chk-pub1-sbi"] && (
          <div className="check-preview">
            <div id="pre-pub1-sbi-1" className="flow-label endpoint">
              {"PUB1"}
            </div>
            <div id="pre-pub1-sbi-2" className="flow-label endpoint">
              {"FW1"}
            </div>
            <div id="gtw-pub1-sbi-3" className="pr-gateway">
              <img src={Gateway} alt="Gateway" className="gt-icon" />
              <span>Service Gateway</span>
            </div>
            <div id="pre-pub1-sbi-4" className="flow-label endpoint">
              {"SB1"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckPreviewDiagram;
