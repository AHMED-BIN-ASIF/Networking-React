import React, { useEffect, useRef, useState } from "react";
import Topo2 from "../assets/images/topo-2.jpg";
import "../css/DiagramPreview2.css";
// import Popup from "./Popup";
import FlowCheckbox from "./FlowCheckbox";
import RtIcon from "../assets/icons/rt-icon.webp";
import PopupTables from "./PopupTables";

const connectionMap = {
  // Group 1
  "chk-priv1-pub": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-pub-1", { path: "arc" }],
  ],
  "chk-pub1-priv1-fw1": [
    ["top2-pub-1", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-priv-1", { path: "arc", color: "orange" }],
  ],

  // Group 2
  "chk-inet1-pub1": [
    ["top2-inet-1", "top2-gateway-1", { path: "arc" }],
    ["top2-gateway-1", "top2-pub-1", { path: "arc" }],
  ],
  "chk-pub1-inet1": [
    ["top2-pub-1", "top2-gateway-1", { path: "arc", color: "orange" }],
    ["top2-gateway-1", "top2-inet-1", { path: "arc", color: "orange" }],
  ],

  // Group 3
  "chk-fw1-inet1": [
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
  ],

  // Group 4
  "chk-pub1-fw1": [["top2-pub-1", "top2-fw-1", { path: "arc" }]],
  "chk-fw1-pub1": [
    ["top2-fw-1", "top2-pub-1", { path: "arc", color: "orange" }],
  ],

  // Group 5
  "chk-priv1-inet1-bypass-fw": [
    ["top2-priv-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
  ],

  // Group 6
  "chk-priv1-inet1-fw": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
  ],

  // Group 7
  "chk-pub1-priv1": [["top2-pub-1", "top2-priv-1", { path: "arc" }]],
  "chk-priv1-pub1": [
    ["top2-priv-1", "top2-pub-1", { path: "arc", color: "orange" }],
  ],

  // Group 8
  "chk-pub1-priv2": [
    ["top2-pub-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-2", { path: "arc" }],
  ],
  "chk-priv2-pub1": [
    ["top2-priv-2", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-pub-1", { path: "arc", color: "orange" }],
  ],

  // Group 9
  "chk-priv2-inet1": [
    ["top2-priv-2", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
  ],

  // Group 10
  "chk-priv1-priv2": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-2", { path: "arc" }],
  ],
  "chk-priv2-priv1": [
    ["top2-priv-2", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-priv-1", { path: "arc", color: "orange" }],
  ],

  // Group 11
  "chk-pub1-priv3": [
    ["top2-pub-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-3"],
  ],
  "chk-priv3-pub1": [
    ["top2-priv-3", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-pub-1", { path: "arc", color: "orange" }],
  ],

  // Group 12
  "chk-priv3-inet1": [
    ["top2-priv-3", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-2", { path: "arc" }],
    ["top2-gateway-2", "top2-inet-1", { path: "arc" }],
  ],

  // Group 13
  "chk-priv1-priv3": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-priv-3"],
  ],
  "chk-priv3-priv1": [
    ["top2-priv-3", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-priv-1", { path: "arc", color: "orange" }],
  ],

  // Group 14
  "chk-priv2-priv3": [
    ["top2-priv-2", "top2-fw-1"],
    ["top2-fw-1", "top2-priv-3", { path: "arc" }],
  ],
  "chk-priv3-priv2": [
    ["top2-priv-3", "top2-fw-1", { path: "arc", color: "orange" }],
    ["top2-fw-1", "top2-priv-2", { path: "arc", color: "orange" }],
  ],

  // Group 15 (SBI)
  "chk-priv1-sbi": [
    ["top2-priv-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-sbi", { path: "arc" }],
  ],

  // Group 16 (SBI)
  "chk-priv2-sbi": [
    ["top2-priv-2", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-sbi", { path: "arc" }],
  ],
  // Group 17 (SBI)
  "chk-priv3-sbi": [
    ["top2-priv-3", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-sbi", { path: "arc" }],
  ],
  // Group 18 (SBI)
  "chk-pub1-sbi": [
    ["top2-pub-1", "top2-fw-1", { path: "arc" }],
    ["top2-fw-1", "top2-gateway-3", { path: "arc" }],
    ["top2-gateway-3", "top2-sbi", { path: "arc" }],
  ],
};

const endpointIds = [
  "top2-pub-1",
  "top2-priv-1",
  "top2-priv-2",
  "top2-priv-3",
  "top2-sbi",
  "top2-inet-1",
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
  const [updatedPopups, setUpdatedPopups] = useState({});

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

    // Determine which popups need to show "updated" badge
    const affectedPopups = {};

    // Map checkbox changes to affected popups
    if (
      flowCheckboxes["chk-fw1-inet1"] ||
      flowCheckboxes["chk-priv1-inet1-fw"]
    ) {
      affectedPopups.popup5 = true;
      affectedPopups.popup17 = true;
    }

    if (
      flowCheckboxes["chk-pub1-priv2"] ||
      flowCheckboxes["chk-priv2-pub1"] ||
      flowCheckboxes["chk-priv1-priv2"] ||
      flowCheckboxes["chk-priv2-priv1"]
    ) {
      affectedPopups.popup5 = true;
      affectedPopups.popup6 = true;
      affectedPopups.popup7 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }

    if (
      flowCheckboxes["chk-pub1-priv3"] ||
      flowCheckboxes["chk-priv3-pub1"] ||
      flowCheckboxes["chk-priv1-priv3"] ||
      flowCheckboxes["chk-priv3-priv1"]
    ) {
      affectedPopups.popup5 = true;
      affectedPopups.popup6 = true;
      affectedPopups.popup8 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }

    if (
      flowCheckboxes["chk-priv2-priv3"] ||
      flowCheckboxes["chk-priv3-priv2"]
    ) {
      affectedPopups.popup5 = true;
      affectedPopups.popup7 = true;
      affectedPopups.popup8 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }

    if (
      flowCheckboxes["chk-priv1-sbi"] ||
      flowCheckboxes["chk-priv2-sbi"] ||
      flowCheckboxes["chk-priv3-sbi"] ||
      flowCheckboxes["chk-pub1-sbi"]
    ) {
      affectedPopups.popup5 = true;
      affectedPopups.popup6 = true;
      affectedPopups.popup11 = true;
      affectedPopups.popup16 = true;
      if (flowCheckboxes["chk-priv1-sbi"]) affectedPopups.popup17 = true;
      if (flowCheckboxes["chk-priv2-sbi"]) affectedPopups.popup7 = true;
    }

    setUpdatedPopups(affectedPopups);
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
  }, []);

  // Also, if flowCheckboxes state changes via React, call updateFlowLines.
  useEffect(() => {
    updateFlowLines();
  }, [flowCheckboxes]);

  const handleFlowCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFlowCheckboxes((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="diagram-topology-two">
      <div>
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
          <div id="fw1-grp">
            <div id="top2-fw-1" className="flow-label tp2-label-7">
              {"FW1"}
            </div>
            <span className="flow-label-fw1 tp2-label-7-1">
              {formData.firewallIp}
            </span>
          </div>
          {/* gateways points */}
          <>
            <div id="top2-gateway-1" className="gateway tp2-gtw-1"></div>
            <div id="top2-gateway-2" className="gateway tp2-gtw-2"></div>
            <div id="top2-gateway-3" className="gateway tp2-gtw-3"></div>
            <div id="top2-gateway-4" className="gateway tp2-gtw-4"></div>
          </>

          {/* Popup buttons */}
          {[
            {
              id: "popup1",
              className: "orange top1-btn-1",
              label: formData.hubPrivSlName,
            },
            {
              id: "popup2",
              className: "orange top1-btn-2",
              label: formData.hubPubSlName,
            },
            {
              id: "popup3",
              className: "blue top1-btn-3",
              label: formData.spokeAPrivSlName,
            },
            {
              id: "popup4",
              className: "blue top1-btn-4",
              label: formData.spokeBPrivSlName,
            },
            {
              id: "popup5",
              className: "orange top1-btn-5",
              label: formData.hubPrivRtName,
            },
            {
              id: "popup6",
              className: "orange top1-btn-6",
              label: formData.hubPubRtName,
            },
            {
              id: "popup7",
              className: "blue top1-btn-7",
              label: formData.spokeAPrivRtName,
            },
            {
              id: "popup8",
              className: "blue top1-btn-8",
              label: formData.spokeBPrivRtName,
            },
            {
              id: "popup9",
              className: "green top1-btn-9",
              label: formData.internetGwRtName,
            },
            {
              id: "popup10",
              className: "green top1-btn-10",
              label: formData.natGwRtName,
            },
            {
              id: "popup11",
              className: "green top1-btn-11",
              label: formData.serviceGwRtName,
            },
            {
              id: "popup12",
              className: "green top1-btn-12",
              label: formData.drgRtSpokeAttachmentA,
            },
            {
              id: "popup13",
              className: "green top1-btn-13",
              label: formData.drgRtSpokeAttachmentB,
            },
            {
              id: "popup14",
              className: "green top1-btn-14",
              label: formData.drgRt1HubAttachment,
            },
            {
              id: "popup15",
              className: "green top1-btn-15",
              label: formData.vcnRt1HubAttachment,
            },
            {
              id: "popup16",
              className: "green top1-btn-16",
              label: formData.vcnRt2HubAttachment,
            },
          ].map(({ id, className, label }) => (
            <div
              key={id}
              className={`popup-btn ${className}`}
              onClick={() => setPopups((prev) => ({ ...prev, [id]: true }))}
            >
              <span>{label}</span>
              {updatedPopups[id] && (
                <span className="updated-badge">Updated</span>
              )}
            </div>
          ))}

          {/* Conditional RT-Priv1 button */}
          {(flowCheckboxes["chk-priv1-inet1-fw"] ||
            flowCheckboxes["chk-priv1-priv2"] ||
            flowCheckboxes["chk-priv2-priv1"] ||
            flowCheckboxes["chk-priv1-priv3"] ||
            flowCheckboxes["chk-priv3-priv1"] ||
            flowCheckboxes["chk-priv1-sbi"]) && (
            <div
              className="popup-btn top1-priv-rt-btn"
              onClick={() => setPopups((prev) => ({ ...prev, popup17: true }))}
            >
              <img src={RtIcon} alt="rticon" />
              <span>RT-Priv1</span>
              {updatedPopups.popup17 && (
                <span className="updated-badge">Updated</span>
              )}
            </div>
          )}

          {/* Network label groups */}
          <>
            <div className="network-label-grp nlg-1">
              <span className="network-label-name text-orange" id="vpc-name-2">
                {formData.hubVcnName}
              </span>
              <span
                className="network-label-domain text-orange"
                id="vcn-cidr-2"
              >
                {formData.hubVcnCidr}
              </span>
            </div>
            <div className="network-label-grp nlg-2">
              <span
                className="network-label-name text-orange"
                id="public-name-"
              >
                {formData.hubPrivSubnetName}
              </span>
              <span
                className="network-label-domain text-orange"
                id="public-cidr-1"
              >
                {formData.hubPrivSubnetCidr}
              </span>
            </div>
            <div className="network-label-grp nlg-3">
              <span
                className="network-label-name text-orange"
                id="private-name-1"
              >
                {formData.hubPubSubnetName}
              </span>
              <span
                className="network-label-domain text-orange"
                id="private-cidr-1"
              >
                {formData.hubPubSubnetCidr}
              </span>
            </div>
            <div className="network-label-grp nlg-4">
              <span
                className="network-label-name text-blue"
                id="subnet-label-1"
              >
                {formData.spokeAName}
              </span>
              <span className="network-label-domain text-blue" id="subnet-no-1">
                {formData.spokeACidr}
              </span>
            </div>
            <div className="network-label-grp nlg-5">
              <span className="network-label-name text-blue" id="subnet-label1">
                {formData.spokeAPrivSubnetName}
              </span>
              <span className="network-label-domain text-blue" id="subnet-no1">
                {formData.spokeAPrivSubnetCidr}
              </span>
            </div>
            <div className="network-label-grp nlg-6">
              <span className="network-label-name text-blue" id="subnet-label1">
                {formData.spokeBName}
              </span>
              <span className="network-label-domain text-blue" id="subnet-no1">
                {formData.spokeBCidr}
              </span>
            </div>
            <div className="network-label-grp nlg-7">
              <span className="network-label-name text-blue" id="subnet-label1">
                {formData.spokeBPrivSubnetName}
              </span>
              <span className="network-label-domain text-blue" id="subnet-no1">
                {formData.spokeBPrivSubnetCidr}
              </span>
            </div>
          </>
        </div>
      </div>

      {/* Flow checkboxes */}
      {flowCheckboxes["chk-show-endpoints"] && (
        <div className="form-checkouts column">
          {flowConfigGrouped.slice(1, 99).map((group, groupIndex) => (
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
      )}

      <div className="diagram-btm">
        {/* Flow Checkboxes */}
        <div className="form-checkouts">
          {flowConfigGrouped
            .flat()
            .slice(0, 1)
            .map(({ id, label }) => (
              <div className="flow-checkbox-group" key={id}>
                <FlowCheckbox
                  key={id}
                  id={id}
                  label={label}
                  checked={flowCheckboxes[id] ?? false}
                  onChange={handleFlowCheckboxChange}
                />
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
      {/* {popups.generateTF && (
        <div id="generate-TF-popup" className="generateTFPopup">
          <span
            className="generateCloseBtn"
            onClick={() =>
              setPopups((prev) => ({ ...prev, generateTF: false }))
            }
          >
            &times;
          </span>
          <h3>CODE FIELD</h3>
          <div className="code-block">
            <p>
              <span id="code-vpc-name-1">{formData.vpcName}</span> :{" "}
              <span id="code-vcn-cidr-1">{formData.vpcCIDR}</span>
            </p>
            <p>
              <span id="code-public-name-1">{formData.publicSubnetName}</span> :{" "}
              <span id="code-public-cidr-1">{formData.publicSubnetCIDR}</span>
            </p>
            <p>
              <span id="code-private-name-1">
                {formData.privateSubnetRange}
              </span>{" "}
              :{" "}
              <span id="code-private-cidr-1">{formData.privateSubnetCIDR}</span>
            </p>
            <p>
              <span id="code-subnet-label-1">{formData.SubnetName}</span> :{" "}
              <span id="code-subnet-no-1">{formData.SubnetRange}</span>
            </p>
          </div>
          <a
            href="#"
            className="download-button"
            onClick={() => {
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
            }}
          >
            Download Files
          </a>
        </div>
      )} */}

      {/* Render PopupTables component */}
      {popupwrap && (
        <PopupTables
          formData={formData}
          popups={popups}
          setPopups={setPopups}
          flowCheckboxes={flowCheckboxes}
        />

      )}
    </div>
  );
};

export default DiagramPreview2;
