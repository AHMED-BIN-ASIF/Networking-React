import React, { useEffect, useRef } from "react";
import Topo2 from "../assets/images/topo-2.jpg";
import "../css/DiagramPreview2.css";
import Popup from "./Popup ";
import FlowCheckbox from "./FlowCheckbox";
import RtIcon from "../assets/icons/rt-icon.webp";

// Flow lines configuration as provided
const connectionMap = {
  // Group 1
  "chk-priv1-pub": [
    ["top2-priv-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-pub-1", { path: "straight" }],
  ],
  "chk-pub1-priv1-fw1": [
    ["top2-pub-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-1", { path: "straight" }],
  ],

  // Group 2
  "chk-inet1-pub1": [
    ["top2-inet-1", "top2-gateway-1", { path: "straight" }],
    ["top2-gateway-1", "top2-pub-1", { path: "straight" }],
  ],
  "chk-pub1-inet1": [
    ["top2-pub-1", "top2-gateway-1", { path: "straight" }],
    ["top2-gateway-1", "top2-inet-1", { path: "straight" }],
  ],

  // Group 3
  "chk-fw1-inet1": [
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "straight" }],
  ],

  // Group 4
  "chk-pub1-fw1": [["top2-pub-1", "top2-fw-1", { path: "straight" }]],
  "chk-fw1-pub1": [["top2-fw-1", "top2-pub-1", { path: "straight" }]],

  // Group 5
  "chk-priv1-inet1-bypass-fw": [
    ["top2-priv-1", "top2-gateway-2", { path: "straight" }],
    ["top2-gateway-2", "top2-inet-1", { path: "straight" }],
  ],

  // Group 6
  "chk-priv1-inet1-fw": [
    ["top2-priv-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "straight" }],
  ],

  // Group 7
  "chk-pub1-priv1": [["top2-pub-1", "top2-priv-1", { path: "straight" }]],
  "chk-priv1-pub1": [["top2-priv-1", "top2-pub-1", { path: "straight" }]],
  // Group 8
  "chk-pub1-priv2": [
    ["top2-pub-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-2", { path: "straight" }],
  ],
  "chk-priv2-pub1": [
    ["top2-priv-2", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-pub-1", { path: "straight" }],
  ],

  // Group 9
  "chk-priv2-inet1": [
    ["top2-priv-2", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "straight" }],
  ],

  // Group 10
  "chk-priv1-priv2": [
    ["top2-priv-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-2", { path: "straight" }],
  ],
  "chk-priv2-priv1": [
    ["top2-priv-2", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-1", { path: "straight" }],
  ],

  // Group 11
  "chk-pub1-priv3": [
    ["top2-pub-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-3", { path: "straight" }],
  ],
  "chk-priv3-pub1": [
    ["top2-priv-3", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-pub-1", { path: "straight" }],
  ],

  // Group 12
  "chk-priv3-inet1": [
    ["top2-priv-3", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "straight" }],
  ],

  // Group 13
  "chk-priv1-priv3": [
    ["top2-priv-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-3", { path: "straight" }],
  ],
  "chk-priv3-priv1": [
    ["top2-priv-3", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-1", { path: "straight" }],
  ],

  // Group 14
  "chk-priv2-priv3": [
    ["top2-priv-2", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-3", { path: "straight" }],
  ],
  "chk-priv3-priv2": [
    ["top2-priv-3", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-priv-2", { path: "straight" }],
  ],

  // Group 15 (SBI)
  "chk-priv1-sbi": [
    ["top2-priv-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-sbi", { path: "straight" }],
  ],

  // Group 16 (SBI)
  "chk-priv2-sbi": [
    ["top2-priv-2", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-sbi", { path: "straight" }],
  ],
  // Group 17 (SBI)

  "chk-priv3-sbi": [
    ["top2-priv-3", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-sbi", { path: "straight" }],
  ],
  // Group 18 (SBI)

  "chk-pub1-sbi": [
    ["top2-pub-1", "top2-fw-1", { path: "straight" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-sbi", { path: "straight" }],
  ],
};

const endpointIds = [
  "top2-pub-1",
  "top2-priv-1",
  "top2-priv-2",
  "top2-priv-3",
  "top2-sbi",
  "top2-inet-1",
  // "top2-fw-1",
  "fw1-grp",
];
// Helper to create a LeaderLine instance
const createLeaderLine = (start, end, options = {}) =>
  new window.LeaderLine(
    document.getElementById(start),
    document.getElementById(end),
    {
      color: options.color || "#2474ad",
      size: 3,
      path: options.path || "fluid",
      startPlug: options.startPlug || "behind",
      endPlug: options.endPlug || "arrow",
      hide: true,
    }
  ).show("draw", { duration: 800 });

const DiagramPreview2 = ({
  formData,
  popups,
  setPopups,
  flowCheckboxes,
  setFlowCheckboxes,
  popupwrap,
  flowConfigGrouped,
}) => {
  const linesRef = useRef({});
  // Function to update LeaderLine instances based on the checked flow checkboxes.
  const updateFlowLines = () => {
    Object.keys(connectionMap).forEach((key) => {
      if (flowCheckboxes[key]) {
        if (!linesRef.current[key]) {
          linesRef.current[key] = connectionMap[key].map(([s, e, opts = {}]) =>
            createLeaderLine(s, e, opts)
          );
        }
      } else {
        if (linesRef.current[key]) {
          linesRef.current[key].forEach((line) =>
            line.hide("fade", { duration: 500 })
          );
          delete linesRef.current[key];
        }
      }
    });
  };
  // This function is a direct translation of your snippet:
  const handleShowEndpoints = () => {
    let show = document.getElementById("chk-show-endpoints").checked;
    // Set endpoint elements display to 'flex'
    endpointIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = show ? "flex" : "none";
    });
    // For each flow-checkbox, set the parent label display:
    document.querySelectorAll(".flow-checkbox").forEach((checkbox) => {
      const label = checkbox.closest("label");
      if (label) {
        // Ensure the show endpoints checkbox label stays visible:
        if (checkbox.id === "chk-show-endpoints") {
          label.style.display = "flex";
        } else {
          label.style.display = show ? "flex" : "none";
        }
      }
      if (!show) checkbox.checked = false;
    });
    updateFlowLines();
  };
  // Attach event listeners when component mounts:
  useEffect(() => {
    // Ensure the endpoints are updated on mount:
    handleShowEndpoints();
    // Add event listeners to checkboxes:
    const showEndpointsCheckbox = document.getElementById("chk-show-endpoints");
    if (showEndpointsCheckbox) {
      showEndpointsCheckbox.addEventListener("change", handleShowEndpoints);
    }
    const flowCheckboxesEls = document.querySelectorAll(".flow-checkbox");
    flowCheckboxesEls.forEach((checkbox) => {
      checkbox.addEventListener("change", updateFlowLines);
    });
    // Cleanup listeners on unmount.
    return () => {
      if (showEndpointsCheckbox) {
        showEndpointsCheckbox.removeEventListener(
          "change",
          handleShowEndpoints
        );
      }
      flowCheckboxesEls.forEach((checkbox) => {
        checkbox.removeEventListener("change", updateFlowLines);
      });
      // Remove any remaining LeaderLine instances.
      Object.values(linesRef.current).forEach((linesArray) => {
        linesArray.forEach((line) => line.remove());
      });
      linesRef.current = {};
    };
  }, [flowCheckboxes]);
  // Also, if flowCheckboxes state changes via React, call updateFlowLines.
  useEffect(() => {
    updateFlowLines();
  }, [flowCheckboxes]);
  const handleFlowCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFlowCheckboxes((prev) => ({ ...prev, [id]: checked }));
  };
  const downloadFiles = () => {
    const content = `
Create VCN Name: ${formData.vpcName}
Create VCN CIDR: ${formData.vpcCIDR}
Create Security List Name: ${formData.publicSLName}
Create Routing Table Name: ${formData.publicRTName}
    `.trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "terraform_code.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="diagram-topology-two">
      <h3>Topology 2</h3>
      <div className="topo-img-wrapper">
        <img src={Topo2} alt="topo2" />
        {/* Fixed endpoint elements with specific IDs */}
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
        {/* {flowCheckboxes['chk-show-endpoints'] && 
          (flowCheckboxes['chk-priv-inet'] || 
            flowCheckboxes['chk-pub-inet'] || 
            flowCheckboxes['chk-priv-pub'] || 
            flowCheckboxes['chk-pub-priv2/3'] || 
            flowCheckboxes['chk-priv1-priv2/3'] || 
            flowCheckboxes['chk-priv2/3-priv1']) && */}
        <div id="fw1-grp">
          <div id="top2-fw-1" className="flow-label tp2-label-7">
            {"FW1"}
          </div>
          <span className="flow-label-fw1 tp2-label-7-1">
            {formData.firewallIp}
          </span>
        </div>
        {/* } */}
        {/* gateways points */}
        <>
          <div id="top2-gateway-1" className="gateway tp2-gtw-1"></div>
          <div id="top2-gateway-2" className="gateway tp2-gtw-2"></div>
          <div id="top2-gateway-3" className="gateway tp2-gtw-3"></div>
          <div id="top2-gateway-4" className="gateway tp2-gtw-4"></div>
        </>
        {/* Popup buttons */}
        <div
          className="popup-btn top1-btn-1"
          onClick={() => setPopups((prev) => ({ ...prev, popup1: true }))}
        >
          <span id="public-sl-name-1">{formData.hubPrivSlName}</span>
        </div>
        <div
          className="popup-btn top1-btn-2"
          onClick={() => setPopups((prev) => ({ ...prev, popup2: true }))}
        >
          <span id="private-sl-name-1">{formData.hubPubSlName}</span>
        </div>
        <div
          className="popup-btn top1-btn-3"
          onClick={() => setPopups((prev) => ({ ...prev, popup3: true }))}
        >
          <span id="sl-label-1">{formData.spokeAPrivSlName}</span>
        </div>
        <div
          className="popup-btn top1-btn-4"
          onClick={() => setPopups((prev) => ({ ...prev, popup4: true }))}
        >
          <span id="spokeb-sl-name-1">{formData.spokeBPrivSlName}</span>
        </div>
        <div
          className="popup-btn top1-btn-5"
          onClick={() => setPopups((prev) => ({ ...prev, popup5: true }))}
        >
          <span id="private-rt-name-1">{formData.hubPrivRtName}</span>
        </div>
        <div
          className="popup-btn top1-btn-6"
          onClick={() => setPopups((prev) => ({ ...prev, popup6: true }))}
        >
          <span>{formData.hubPubRtName}</span>
        </div>
        <div
          className="popup-btn top1-btn-7"
          onClick={() => setPopups((prev) => ({ ...prev, popup7: true }))}
        >
          <span>{formData.spokeAPrivRtName}</span>
        </div>
        <div
          className="popup-btn top1-btn-8"
          onClick={() => setPopups((prev) => ({ ...prev, popup8: true }))}
        >
          <span>{formData.spokeBPrivRtName}</span>
        </div>
        <div
          className="popup-btn top1-btn-9"
          onClick={() => setPopups((prev) => ({ ...prev, popup9: true }))}
        >
          <span>{formData.internetGwRtName}</span>
        </div>
        <div
          className="popup-btn top1-btn-10"
          onClick={() => setPopups((prev) => ({ ...prev, popup10: true }))}
        >
          <span>{formData.natGwRtName}</span>
        </div>
        <div
          className="popup-btn top1-btn-11"
          onClick={() => setPopups((prev) => ({ ...prev, popup11: true }))}
        >
          <span>{formData.serviceGwRtName}</span>
        </div>
        <div
          className="popup-btn top1-btn-12"
          onClick={() => setPopups((prev) => ({ ...prev, popup12: true }))}
        >
          <span>{formData.drgRtSpokeAttachmentA}</span>
        </div>
        <div
          className="popup-btn top1-btn-13"
          onClick={() => setPopups((prev) => ({ ...prev, popup13: true }))}
        >
          <span>{formData.drgRtSpokeAttachmentB}</span>
        </div>
        <div
          className="popup-btn top1-btn-14"
          onClick={() => setPopups((prev) => ({ ...prev, popup14: true }))}
        >
          <span>{formData.drgRt1HubAttachment}</span>
        </div>
        <div
          className="popup-btn top1-btn-15"
          onClick={() => setPopups((prev) => ({ ...prev, popup15: true }))}
        >
          <span>{formData.vcnRt1HubAttachment}</span>
        </div>
        <div
          className="popup-btn top1-btn-16"
          onClick={() => setPopups((prev) => ({ ...prev, popup16: true }))}
        >
          <span>{formData.vcnRt2HubAttachment}</span>
        </div>
        {flowCheckboxes["chk-priv1-inet1-fw"] && (
          <div
            className="popup-btn top1-priv-rt-btn"
            onClick={() => setPopups((prev) => ({ ...prev, popup17: true }))}
          >
            <img src={RtIcon} alt="rticon" />
            <span>RT-Priv</span>
          </div>
        )}

        {/* Network label groupsriv */}
        <>
          <div className="network-label-grp nlg-1">
            <span className="network-label-name" id="vpc-name-2">
              {formData.hubVcnName}
            </span>
            <span className="network-label-domain" id="vcn-cidr-2">
              {formData.hubVcnCidr}
            </span>
          </div>
          <div className="network-label-grp nlg-2">
            <span className="network-label-name" id="public-name-">
              {formData.hubPrivSubnetName}
            </span>
            <span className="network-label-domain" id="public-cidr-1">
              {formData.hubPrivSubnetCidr}
            </span>
          </div>
          <div className="network-label-grp nlg-3">
            <span className="network-label-name" id="private-name-1">
              {formData.hubPubSubnetName}
            </span>
            <span className="network-label-domain" id="private-cidr-1">
              {formData.hubPubSubnetCidr}
            </span>
          </div>
          <div className="network-label-grp nlg-4">
            <span className="network-label-name" id="subnet-label-1">
              {formData.spokeAName}
            </span>
            <span className="network-label-domain" id="subnet-no-1">
              {formData.spokeACidr}
            </span>
          </div>
          <div className="network-label-grp nlg-5">
            <span className="network-label-name" id="subnet-label1">
              {formData.spokeAPrivSubnetName}
            </span>
            <span className="network-label-domain" id="subnet-no1">
              {formData.spokeAPrivSubnetCidr}
            </span>
          </div>
          <div className="network-label-grp nlg-6">
            <span className="network-label-name" id="subnet-label1">
              {formData.spokeBName}
            </span>
            <span className="network-label-domain" id="subnet-no1">
              {formData.spokeBCidr}
            </span>
          </div>
          <div className="network-label-grp nlg-7">
            <span className="network-label-name" id="subnet-label1">
              {formData.spokeBPrivSubnetName}
            </span>
            <span className="network-label-domain" id="subnet-no1">
              {formData.spokeBPrivSubnetCidr}
            </span>
          </div>
        </>
      </div>

      <div className="diagram-btm">
        {/* Flow Checkboxes */}
        <div className="form-checkouts column">
          {flowConfigGrouped.map((group, groupIndex) => (
            <div className="flow-checkbox-group" key={`group-${groupIndex}`}>
              {group.map(({ id, label }) => (
                <FlowCheckbox
                  key={id}
                  id={id}
                  label={label}
                  checked={flowCheckboxes[id] ?? false}
                  onChange={handleFlowCheckboxChange}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="generate-btn">
          <div>
            <button
              className="network-btn"
              onClick={() =>
                setPopups({
                  popup1: true,
                  popup2: true,
                  popup3: true,
                  popup4: true,
                  popup5: true,
                  popup6: true,
                  popup7: true,
                  popup8: true,
                  popup9: true,
                  popup10: true,
                  popup11: true,
                  popup12: true,
                  popup13: true,
                  popup14: true,
                  popup15: true,
                  popup16: true,
                  popup17: true,
                  generateTF: true,
                })
              }
            >
              Open All
            </button>
          </div>
          <div className="open-close-btn">
            <button
              className="network-btn"
              onClick={() =>
                setPopups({
                  popup1: false,
                  popup2: false,
                  popup3: false,
                  popup4: false,
                  popup5: false,
                  popup6: false,
                  popup7: false,
                  popup8: false,
                  popup9: false,
                  popup10: false,
                  popup11: false,
                  popup12: false,
                  popup13: false,
                  popup14: false,
                  popup15: false,
                  popup16: false,
                  popup17: false,
                  generateTF: false,
                })
              }
            >
              Close All
            </button>
          </div>
        </div>
      </div>

      {/* Generate TF Popup */}
      {popups.generateTF && (
        <div id="generate-TF-popup" className="generateTFPopup">
          {/* <span className="generateCloseBtn" onClick={() =>
            setPopups(prev => ({ ...prev, generateTF: false }))
          }>&times;</span>
          <h3>CODE FIELD</h3>
          <div className="code-block">
            <p>
              <span id="code-vpc-name-1">{formData.vpcName}</span> : <span id="code-vcn-cidr-1">{formData.vpcCIDR}</span>
            </p>
            <p>
              <span id="code-public-name-1">{formData.publicSubnetName}</span> : <span id="code-public-cidr-1">{formData.publicSubnetCIDR}</span>
            </p>
            <p>
              <span id="code-private-name-1">{formData.privateSubnetRange}</span> : <span id="code-private-cidr-1">{formData.privateSubnetCIDR}</span>
            </p>
            <p>
              <span id="code-subnet-label-1">{formData.SubnetName}</span> : <span id="code-subnet-no-1">{formData.SubnetRange}</span>
            </p>
          </div>
          <a href="#" className="download-button" onClick={downloadFiles}>Download Files</a> */}
        </div>
      )}
      {popupwrap && (
        <div className="popup-wrapper">
          <Popup
            id="popup1"
            title={formData.hubPrivSlName}
            isVisible={popups.popup1}
            onClose={() => setPopups((prev) => ({ ...prev, popup1: false }))}
          >
            <h5>Ingress</h5>
            <table>
              <thead>
                <tr>
                  <th>Stateless</th>
                  <th>Source</th>
                  <th>IP Protocol</th>
                  <th>SRC Port Range</th>
                  <th>DST Port Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No</td>
                  <td>CIDR + 0.0.0.0/0</td>
                  <td>All Protocols</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>No</td>
                  <td>Services + All regional services</td>
                  <td>All Protocols</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup2"
            title={formData.hubPubSlName}
            isVisible={popups.popup2}
            onClose={() => setPopups((prev) => ({ ...prev, popup2: false }))}
          >
            <h5>Ingress</h5>
            <table>
              <thead>
                <tr>
                  <th>Stateless</th>
                  <th>Source</th>
                  <th>IP Protocol</th>
                  <th>SRC Port Range</th>
                  <th>DST Port Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No</td>
                  <td>CIDR + 0.0.0.0/0</td>
                  <td>All Protocols</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>No</td>
                  <td>Services + All regional services</td>
                  <td>All Protocols</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup3"
            title={formData.spokeAPrivSlName}
            isVisible={popups.popup3}
            onClose={() => setPopups((prev) => ({ ...prev, popup3: false }))}
          >
            <h5>Ingress</h5>
            <table>
              <thead>
                <tr>
                  <th>Stateless</th>
                  <th>Source</th>
                  <th>IP Protocol</th>
                  <th>SRC Port Range</th>
                  <th>DST Port Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No</td>
                  <td>CIDR + 0.0.0.0/0</td>
                  <td>All Protocols</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>No</td>
                  <td>Services + All regional services</td>
                  <td>All Protocols</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup4"
            title={formData.spokeBPrivSlName}
            isVisible={popups.popup4}
            onClose={() => setPopups((prev) => ({ ...prev, popup4: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0.0.0.0/0</td>
                  <td>Internet Gateway</td>
                  <td>IGW</td>
                  <td>Static</td>
                </tr>
                <tr>
                  <td>
                    All &lt;REGION&gt; Services In Oracle Services Network
                  </td>
                  <td>Service Gateway</td>
                  <td>SGW</td>
                  <td>Static</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup5"
            title={formData.hubPrivRtName}
            isVisible={popups.popup5}
            onClose={() => setPopups((prev) => ({ ...prev, popup5: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                {(flowCheckboxes["chk-fw1-inet1"] ||
                  flowCheckboxes["chk-fw1-inet1"] ||
                  flowCheckboxes["chk-priv1-inet1-fw"]) && (
                  <tr>
                    <td>0.0.0.0/0</td>
                    <td>NAT Gateway</td>
                    <td>NGW</td>
                    <td>Static</td>
                  </tr>
                )}
                {(flowCheckboxes["chk-pub1-priv2"] ||
                  flowCheckboxes["chk-priv2-pub1"]) && (
                  <tr>
                    <td>172.16.1.0/24</td>
                    <td>Dynamic Routing Gateway</td>
                    <td>DRG</td>
                    <td>Static</td>
                  </tr>
                )}
                {flowCheckboxes["chk-priv2-inet1"] && (
                  <tr>
                    <td>0.0.0.0/0</td>
                    <td>NAT Gateway</td>
                    <td>DRG</td>
                    <td>Static</td>
                  </tr>
                )}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup6"
            title={formData.hubPubRtName}
            isVisible={popups.popup6}
            onClose={() => setPopups((prev) => ({ ...prev, popup6: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                {(flowCheckboxes["chk-inet1-pub1"] ||
                  flowCheckboxes["chk-pub1-inet1"]) && (
                  <tr>
                    <td>0.0.0.0/0</td>
                    <td>Internet Gateway</td>
                    <td>IGW</td>
                    <td>Static</td>
                  </tr>
                )}
                {(flowCheckboxes["chk-pub1-priv2"] ||
                  flowCheckboxes["chk-priv2-pub1"]) && (
                  <tr>
                    <td>172.16.1.0/24</td>
                    <td>Private IP</td>
                    <td>192.168.0.100</td>
                    <td>Static</td>
                  </tr>
                )}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup7"
            title={formData.spokeAPrivRtName}
            isVisible={popups.popup7}
            onClose={() => setPopups((prev) => ({ ...prev, popup7: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                {flowCheckboxes["chk-priv2-inet1"] && (
                  <tr>
                    <td>0.0.0.0/0</td>
                    <td>Dynamic Routing Gateway</td>
                    <td>DRG</td>
                    <td>Static</td>
                  </tr>
                )}
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup8"
            title={formData.spokeBPrivRtName}
            isVisible={popups.popup8}
            onClose={() => setPopups((prev) => ({ ...prev, popup8: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0.0.0.0/0</td>
                  <td>NAT Gateway</td>
                  <td>NGW</td>
                  <td>Static</td>
                </tr>
                <tr>
                  <td>
                    All &lt;REGION&gt; Services In Oracle Services Network
                  </td>
                  <td>Service Gateway</td>
                  <td>SGW</td>
                  <td>Static</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup9"
            title={formData.internetGwRtName}
            isVisible={popups.popup9}
            onClose={() => setPopups((prev) => ({ ...prev, popup9: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0.0.0.0/0</td>
                  <td>NAT Gateway</td>
                  <td>NGW</td>
                  <td>Static</td>
                </tr>
                <tr>
                  <td>
                    All &lt;REGION&gt; Services In Oracle Services Network
                  </td>
                  <td>Service Gateway</td>
                  <td>SGW</td>
                  <td>Static</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup10"
            title={formData.natGwRtName}
            isVisible={popups.popup10}
            onClose={() => setPopups((prev) => ({ ...prev, popup10: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                {flowCheckboxes["chk-priv2-inet1"] && (
                  <tr>
                    <td>172.16.1.0/24</td>
                    <td>Private IP</td>
                    <td>192.168.0.100</td>
                    <td>Static</td>
                  </tr>
                )}
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup11"
            title={formData.serviceGwRtName}
            isVisible={popups.popup11}
            onClose={() => setPopups((prev) => ({ ...prev, popup11: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0.0.0.0/0</td>
                  <td>NAT Gateway</td>
                  <td>NGW</td>
                  <td>Static</td>
                </tr>
                <tr>
                  <td>
                    All &lt;REGION&gt; Services In Oracle Services Network
                  </td>
                  <td>Service Gateway</td>
                  <td>SGW</td>
                  <td>Static</td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup12"
            title={formData.drgRtSpokeAttachmentA}
            isVisible={popups.popup12}
            onClose={() => setPopups((prev) => ({ ...prev, popup12: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination CIDR block</th>
                  <th>Next hop attachment type</th>
                  <th>Next hop attachment name</th>
                </tr>
              </thead>
              <tbody>
                {(flowCheckboxes["chk-pub1-priv2"] ||
                  flowCheckboxes["chk-priv2-pub1"]) && (
                  <tr>
                    <td>192.168.0.0/24</td>
                    <td>Virtual Cloud Network</td>
                    <td>HUB-VCN-ATTACHMENT</td>
                  </tr>
                )}
                {flowCheckboxes["chk-priv2-inet1"] && (
                  <tr>
                    <td>0.0.0.0/0</td>
                    <td>Virtual Cloud Network</td>
                    <td>HUB-VCN-ATTACHMENT</td>
                  </tr>
                )}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup13"
            title={formData.drgRtSpokeAttachmentB}
            isVisible={popups.popup13}
            onClose={() => setPopups((prev) => ({ ...prev, popup13: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                {(flowCheckboxes["chk-pub1-priv2"] ||
                  flowCheckboxes["chk-priv2-pub1"]) && (
                  <tr>
                    <td>192.168.0.0/24</td>
                    <td>Dynamic Routing Gateway</td>
                    <td>DRG</td>
                    <td>Static</td>
                  </tr>
                )}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup14"
            title={formData.drgRt1HubAttachment}
            isVisible={popups.popup14}
            onClose={() => setPopups((prev) => ({ ...prev, popup14: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Match type</th>
                  <th>Match criteria</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(flowCheckboxes["chk-pub1-priv2"] ||
                  flowCheckboxes["chk-priv2-pub1"] ||
                  flowCheckboxes["chk-priv2-inet1"]) && (
                  <tr>
                    <td>10</td>
                    <td>Attachment</td>
                    <td>SPOKE-VCN-A-ATTACHMENT</td>
                    <td>Accept</td>
                  </tr>
                )}

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup15"
            title={formData.vcnRt2HubAttachment}
            isVisible={popups.popup15}
            onClose={() => setPopups((prev) => ({ ...prev, popup15: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination CIDR block</th>
                  <th>Next hop attachment type</th>
                  <th>Next hop attachment name</th>
                </tr>
              </thead>
              <tbody>
                {(flowCheckboxes["chk-pub1-priv2"] ||
                  flowCheckboxes["chk-priv2-pub1"] ||
                  flowCheckboxes["chk-priv2-inet1"]) && (
                  <tr>
                    <td>172.16.1.0/24</td>
                    <td>Virtual Cloud Network</td>
                    <td>SPOKE-VCN-A-ATTACHMENT</td>
                  </tr>
                )}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup16"
            title={formData.vcnRt2HubAttachment}
            isVisible={popups.popup16}
            onClose={() => setPopups((prev) => ({ ...prev, popup16: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                {(flowCheckboxes["chk-pub1-priv2"] ||
                  flowCheckboxes["chk-priv2-pub1"]) && (
                  <>
                    <tr>
                      <td>172.16.1.0/24</td>
                      <td>Private IP</td>
                      <td>192.168.0.100</td>
                      <td>Static</td>
                    </tr>
                    <tr>
                      <td>192.168.0.128/25</td>
                      <td>Private IP</td>
                      <td>192.168.0.100</td>
                      <td>Static</td>
                    </tr>
                  </>
                )}
                {flowCheckboxes["chk-priv2-inet1"] && (
                  <tr>
                    <td>0.0.0.0/0</td>
                    <td>Private IP</td>
                    <td>192.168.0.100</td>
                    <td>Static</td>
                  </tr>
                )}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Popup>
          <Popup
            id="popup17"
            title={"RT-Priv1"}
            isVisible={popups.popup17}
            onClose={() => setPopups((prev) => ({ ...prev, popup17: false }))}
          >
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </tr>
              </thead>
              <tbody>
                {flowCheckboxes["chk-priv1-inet1-fw"] && (
                  <tr>
                    <td>0.0.0.0/0</td>
                    <td>Private IP</td>
                    <td>192.168.0.100</td>
                    <td>Static</td>
                  </tr>
                )}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Popup>
        </div>
      )}

      {/* Popups */}
    </div>
  );
};

export default DiagramPreview2;
