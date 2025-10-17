import React from "react";
import Popup from "../common/Popup ";

const PopupTables = ({ formData, popups, setPopups, flowCheckboxes }) => {
  return (
    <div className="popup-wrapper">
      <Popup
        id="popup1"
        title={formData.publicSLName}
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
        title={formData.privateSLName}
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
        title={formData.SLName}
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
        title={formData.publicRTName}
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
        title={formData.privateRTName}
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
        id="popup6"
        title={formData.RTName}
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
    </div>
  );
};

export default PopupTables;