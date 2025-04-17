import React, { useEffect, useRef } from 'react';
import Topo1 from "../assets/images/topo-1.jpg";
import "../css/DiagramPreview.css";
import Popup from './Popup ';

// Flow lines configuration as provided
const connectionMap = {
  'chk-pub-priv-db': [
    ['top1-pub-1', 'top1-gateway-3'],
    ['top1-priv-1', 'top1-gateway-3'],
    ['top1-priv-2', 'top1-gateway-3'],
    ['top1-gateway-3', 'top1-db-1',{ path: 'straight'}]
  ],
  'chk-pub-inet': [
    ['top1-pub-1', 'top1-gateway-1'],
    ['top1-gateway-1', 'top1-inet-1']
  ],
  'chk-priv-inet': [
    ['top1-priv-1', 'top1-gateway-2'],
    ['top1-priv-2', 'top1-gateway-2'],
    ['top1-gateway-2', 'top1-inet-1']
  ],
  'chk-pub-priv-bidirectional': [
    ['top1-pub-1', 'top1-priv-1', { path: 'straight', startPlug: 'arrow1', endPlug: 'arrow' }],
    ['top1-pub-1', 'top1-priv-2', { path: 'arc', startPlug: 'arrow1', endPlug: 'arrow' }]
  ]
};

const endpointIds = ['top1-pub-1', 'top1-priv-1', 'top1-priv-2', 'top1-db-1', 'top1-inet-1'];

// Helper to create a LeaderLine instance
const createLeaderLine = (start, end, options = {}) => 
  new window.LeaderLine(
    document.getElementById(start),
    document.getElementById(end),
    { 
      color: options.color || '#2474ad',
      size: 3,
      path: options.path || 'fluid',
      startPlug: options.startPlug || 'behind',
      endPlug: options.endPlug || 'arrow',
      hide: true
    }
  ).show('draw', { duration: 800 });

const DiagramPreview = ({
  formData,
  popups,
  setPopups,
  flowCheckboxes,
  setFlowCheckboxes
}) => {
  const linesRef = useRef({});

  // Function to update LeaderLine instances based on the checked flow checkboxes.
  const updateFlowLines = () => {
    Object.keys(connectionMap).forEach((key) => {
      if (flowCheckboxes[key]) {
        if (!linesRef.current[key]) {
          linesRef.current[key] = connectionMap[key].map(([s, e, opts = {}]) => createLeaderLine(s, e, opts));
        }
      } else {
        if (linesRef.current[key]) {
          linesRef.current[key].forEach(line => line.hide('fade', { duration: 500 }));
          delete linesRef.current[key];
        }
      }
    });
  };

  // This function is a direct translation of your snippet:
  const handleShowEndpoints = () => {
    let show = document.getElementById('chk-show-endpoints').checked;
    // Set endpoint elements display to 'flex'
    endpointIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = show ? 'flex' : 'none';
    });
    // For each flow-checkbox, set the parent label display:
    document.querySelectorAll('.flow-checkbox').forEach(checkbox => {
      const label = checkbox.closest('label');
      if (label) {
        // Ensure the show endpoints checkbox label stays visible:
        if (checkbox.id === 'chk-show-endpoints') {
          label.style.display = 'flex';
        } else {
          label.style.display = show ? 'flex' : 'none';
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
    const showEndpointsCheckbox = document.getElementById('chk-show-endpoints');
    if (showEndpointsCheckbox) {
      showEndpointsCheckbox.addEventListener('change', handleShowEndpoints);
    }
    const flowCheckboxesEls = document.querySelectorAll('.flow-checkbox');
    flowCheckboxesEls.forEach(checkbox => {
      checkbox.addEventListener('change', updateFlowLines);
    });
    // Cleanup listeners on unmount.
    return () => {
      if (showEndpointsCheckbox) {
        showEndpointsCheckbox.removeEventListener('change', handleShowEndpoints);
      }
      flowCheckboxesEls.forEach(checkbox => {
        checkbox.removeEventListener('change', updateFlowLines);
      });
      // Remove any remaining LeaderLine instances.
      Object.values(linesRef.current).forEach(linesArray => {
        linesArray.forEach(line => line.remove());
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
    setFlowCheckboxes(prev => ({ ...prev, [id]: checked }));
  };

  const downloadFiles = () => {
    const content = `
Create VCN Name: ${formData.vpcName}
Create VCN CIDR: ${formData.vpcCIDR}
Create Security List Name: ${formData.publicSLName}
Create Routing Table Name: ${formData.publicRTName}
    `.trim();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'terraform_code.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="diagram-topology diagram-topology-one">
      <h3>Topology 1</h3>
      <div className="topo-img-wrapper">
        <img src={Topo1} alt="topo1" />
        {/* Fixed endpoint elements with specific IDs */}
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
        <div id="top1-gateway-1" className="gateway gtw-1"></div>
        <div id="top1-gateway-2" className="gateway gtw-2"></div>
        <div id="top1-gateway-3" className="gateway gtw-3"></div>

        {/* Popup buttons */}
        <div className="popup-btn btn-1" onClick={() => setPopups(prev => ({ ...prev, popup1: true }))}>
          <span id="public-sl-name-1">{formData.publicSLName}</span>
        </div>
        <div className="popup-btn btn-2" onClick={() => setPopups(prev => ({ ...prev, popup2: true }))}>
          <span id="private-sl-name-1">{formData.privateSLName}</span>
        </div>
        <div className="popup-btn btn-3" onClick={() => setPopups(prev => ({ ...prev, popup3: true }))}>
          <span id="sl-label-1">{formData.SLName}</span>
        </div>
        <div className="popup-btn btn-4" onClick={() => setPopups(prev => ({ ...prev, popup4: true }))}>
          <span id="public-rt-name-1">{formData.publicRTName}</span>
        </div>
        <div className="popup-btn btn-5" onClick={() => setPopups(prev => ({ ...prev, popup5: true }))}>
          <span id="private-rt-name-1">{formData.privateRTName}</span>
        </div>
        <div className="popup-btn btn-6" onClick={() => setPopups(prev => ({ ...prev, popup6: true }))}>
          <span id="priv-rt-name-1">{formData.RTName}</span>
        </div>

        {/* Network label groups */}
        <div className="network-label-grp vcn-name-label">
          <span className="network-label-name" id="vpc-name-1">{formData.vpcName}</span>
          <span className="network-label-domain" id="vcn-cidr-1">{formData.vpcCIDR}</span>
        </div>
        <div className="network-label-grp public-name-label">
          <span className="network-label-name" id="public-name-1">{formData.publicSubnetName}</span>
          <span className="network-label-domain" id="public-cidr-1">{formData.publicSubnetCIDR}</span>
        </div>
        <div className="network-label-grp private-name-label">
          <span className="network-label-name" id="private-name-1">{formData.privateSubnetRange}</span>
          <span className="network-label-domain" id="private-cidr-1">{formData.privateSubnetCIDR}</span>
        </div>
        <div className="network-label-grp rt-name-label">
          <span className="network-label-name" id="subnet-label-1">{formData.SubnetName}</span>
          <span className="network-label-domain" id="subnet-no-1">{formData.SubnetRange}</span>
        </div>
      </div>

      <div className="diagram-btm">
        {/* Flow Checkboxes */}
      <div className="form-checkouts">
        <label>
          <input
            type="checkbox"
            id="chk-show-endpoints"
            className="flow-checkbox"
            checked={flowCheckboxes['chk-show-endpoints']}
            onChange={handleFlowCheckboxChange}
          /> Show Endpoints
        </label>
        <label>
          <input
            type="checkbox"
            id="chk-pub-priv-db"
            className="flow-checkbox"
            checked={flowCheckboxes['chk-pub-priv-db']}
            onChange={handleFlowCheckboxChange}
          /> Flow from PUB1/PRIV1/PRIV2 → DB1
        </label>
        <label>
          <input
            type="checkbox"
            id="chk-pub-inet"
            className="flow-checkbox"
            checked={flowCheckboxes['chk-pub-inet']}
            onChange={handleFlowCheckboxChange}
          /> Flow from PUB1 → INET1
        </label>
        <label>
          <input
            type="checkbox"
            id="chk-priv-inet"
            className="flow-checkbox"
            checked={flowCheckboxes['chk-priv-inet']}
            onChange={handleFlowCheckboxChange}
          /> Flow from PRIV1/PRIV2 → INET1
        </label>
        <label>
          <input
            type="checkbox"
            id="chk-pub-priv-bidirectional"
            className="flow-checkbox"
            checked={flowCheckboxes['chk-pub-priv-bidirectional']}
            onChange={handleFlowCheckboxChange}
          /> Flow from PUB1 ↔ PRIV1/PRIV2
        </label>
      </div>

      <div className="generate-btn">
        <div>
          <button className="network-btn" onClick={() =>
            setPopups({
              popup1: true,
              popup2: true,
              popup3: true,
              popup4: true,
              popup5: true,
              popup6: true,
              generateTF: true,
            })
          }>Open All</button>
        </div>
        <div className="open-close-btn">
          <button className="network-btn" onClick={() =>
            setPopups({
              popup1: false,
              popup2: false,
              popup3: false,
              popup4: false,
              popup5: false,
              popup6: false,
              generateTF: false,
            })
          }>Close All</button>
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

      {/* Popups */}
      <Popup id="popup1" title={formData.publicSLName} isVisible={popups.popup1} onClose={() =>
        setPopups(prev => ({ ...prev, popup1: false }))
      }>
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
      <Popup id="popup2" title={formData.privateSLName} isVisible={popups.popup2} onClose={() =>
        setPopups(prev => ({ ...prev, popup2: false }))
      }>
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
      <Popup id="popup3" title={formData.SLName} isVisible={popups.popup3} onClose={() =>
        setPopups(prev => ({ ...prev, popup3: false }))
      }>
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
      <Popup id="popup4" title={formData.publicRTName} isVisible={popups.popup4} onClose={() =>
        setPopups(prev => ({ ...prev, popup4: false }))
      }>
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
              <td>All &lt;REGION&gt; Services In Oracle Services Network</td>
              <td>Service Gateway</td>
              <td>SGW</td>
              <td>Static</td>
            </tr>
          </tbody>
        </table>
      </Popup>
      <Popup id="popup5" title={formData.privateRTName} isVisible={popups.popup5} onClose={() =>
        setPopups(prev => ({ ...prev, popup5: false }))
      }>
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
              <td>All &lt;REGION&gt; Services In Oracle Services Network</td>
              <td>Service Gateway</td>
              <td>SGW</td>
              <td>Static</td>
            </tr>
          </tbody>
        </table>
      </Popup>
      <Popup id="popup6" title={formData.RTName} isVisible={popups.popup6} onClose={() =>
        setPopups(prev => ({ ...prev, popup6: false }))
      }>
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
              <td>All &lt;REGION&gt; Services In Oracle Services Network</td>
              <td>Service Gateway</td>
              <td>SGW</td>
              <td>Static</td>
            </tr>
          </tbody>
        </table>
      </Popup>
    </div>
  );
};

export default DiagramPreview;
