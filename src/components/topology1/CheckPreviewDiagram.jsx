import React from "react";
import Gateway from "../../assets/icons/gateway.webp";

const CheckPreviewDiagram = ({ flowCheckboxes }) => {
  return (
    <div>
      <div className="check-preview-wrapper">
        {/* chk-pub-priv-db - Separate flows for each connection */}
        {flowCheckboxes["chk-pub-priv-db"] && (
          <>
            {/* PUB1 → Gateway */}
            <div className="check-preview">
              <div id="pre-pub1-gtw-1" className="flow-label endpoint">
                {"PUB1"}
              </div>
              <div id="gtw-pub1-db-2" className="pr-gateway">
                <img src={Gateway} alt="Gateway" className="gt-icon" />
                <span>Service Gateway</span>
              </div>
              <div id="pre-pub1-db-3" className="flow-label endpoint">
                {"DB1"}
              </div>
            </div>

            {/* PRIV1 → Gateway */}
            <div className="check-preview">
              <div id="pre-priv1-gtw-1" className="flow-label endpoint">
                {"PRIV1"}
              </div>
              <div id="gtw-priv1-db-2" className="pr-gateway">
                <img src={Gateway} alt="Gateway" className="gt-icon" />
                <span>Service Gateway</span>
              </div>
              <div id="pre-priv1-db-3" className="flow-label endpoint">
                {"DB1"}
              </div>
            </div>

            {/* PRIV2 → Gateway */}
            <div className="check-preview">
              <div id="pre-priv2-gtw-1" className="flow-label endpoint">
                {"PRIV2"}
              </div>
              <div id="gtw-priv2-db-2" className="pr-gateway">
                <img src={Gateway} alt="Gateway" className="gt-icon" />
                <span>Service Gateway</span>
              </div>
              <div id="pre-priv2-db-3" className="flow-label endpoint">
                {"DB1"}
              </div>
            </div>
          </>
        )}

        {/* chk-pub-inet - Separate flows */}
        {flowCheckboxes["chk-pub-inet"] && (
          <>
            {/* PUB1 → INET1 */}
            <div className="check-preview">
              <div id="pre-pub-inet-1" className="flow-label endpoint">
                {"PUB1"}
              </div>
              <div id="gtw-pub-inet-2" className="pr-gateway">
                <img src={Gateway} alt="Gateway" className="gt-icon" />
                <span>Internet Gateway</span>
              </div>
              <div id="pre-pub-inet-3" className="flow-label endpoint">
                {"INET1"}
              </div>
            </div>
          </>
        )}

        {/* chk-priv-inet - Separate flows */}
        {flowCheckboxes["chk-priv-inet"] && (
          <>
            {/* PRIV1 → INET1 */}
            <div className="check-preview">
              <div id="pre-priv1-inet-1" className="flow-label endpoint">
                {"PRIV1"}
              </div>
              <div id="gtw-priv1-inet-2" className="pr-gateway">
                <img src={Gateway} alt="Gateway" className="gt-icon" />
                <span>NAT Gateway</span>
              </div>
              <div id="pre-priv1-inet-3" className="flow-label endpoint">
                {"INET1"}
              </div>
            </div>

            {/* PRIV2 → INET1 */}
            <div className="check-preview">
              <div id="pre-priv2-inet-1" className="flow-label endpoint">
                {"PRIV2"}
              </div>
              <div id="gtw-priv2-inet-2" className="pr-gateway">
                <img src={Gateway} alt="Gateway" className="gt-icon" />
                <span>NAT Gateway</span>
              </div>
              <div id="pre-priv2-inet-3" className="flow-label endpoint">
                {"INET1"}
              </div>
            </div>
          </>
        )}

        {/* chk-pub-priv-bidirectional - Separate flows */}
        {flowCheckboxes["chk-pub-priv-bidirectional"] && (
          <>
            {/* PUB1 ↔ PRIV1 (straight) */}
            <div className="check-preview">
              <div id="pre-pub-priv1-1" className="flow-label endpoint">
                {"PUB1"}
              </div>
              <div id="pre-pub-priv1-2" className="flow-label endpoint">
                {"PRIV1"}
              </div>
            </div>
            
            {/* PUB1 ↔ PRIV2 (arc) */}
            <div className="check-preview">
              <div id="pre-pub-priv2-1" className="flow-label endpoint">
                {"PUB1"}
              </div>
              <div id="pre-pub-priv2-2" className="flow-label endpoint">
                {"PRIV2"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckPreviewDiagram;