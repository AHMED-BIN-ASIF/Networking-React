// PopupTables.jsx
import React from 'react';
import Popup from '../common/Popup ';

const PopupTables = ({ formData, popups, setPopups, flowCheckboxes }) => {
  return (
    <div className="popup-wrapper">
      {/* Popup 1 - Hub Private Security List */}
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
            <tr className="green-row">
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Popup>

      {/* Popup 2 - Hub Public Security List */}
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
            <tr className="green-row">
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Popup>

      {/* Popup 3 - Spoke A Private Security List */}
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
            <tr className="green-row">
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Popup>

      {/* Popup 4 - Spoke B Private Security List */}
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
            <tr className="green-row">
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Popup>

      {/* Popup 5 - Hub Private Route Table */}
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
              flowCheckboxes["chk-priv1-inet1-bypass-fw"] ||
              flowCheckboxes["chk-priv1-inet1-fw"]) && (
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>NAT Gateway</td>
                <td>NGW</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-priv2"] ||
              flowCheckboxes["chk-priv2-pub1"] ||
              flowCheckboxes["chk-priv1-priv2"] ||
              flowCheckboxes["chk-priv2-priv1"]) && (
              <tr className="blue-row">
                <td>{formData.spokeACidr}</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv2-inet1"] && (
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>NAT Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-priv3-pub1"] ||
              flowCheckboxes["chk-priv1-priv3"] ||
              flowCheckboxes["chk-priv3-priv1"]) && (
              <tr className="blue-row">
                <td>{formData.spokeBCidr}</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv3-inet1"] && (
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>NAT Gateway</td>
                <td>NGW</td>
                <td>Static</td>
              </tr>
            )}

            {(flowCheckboxes["chk-priv2-priv3"] ||
              flowCheckboxes["chk-priv3-priv2"]) && (
              <>
                <tr className="blue-row">
                  <td>{formData.spokeACidr}</td>
                  <td>Dynamic Routing Gateway</td>
                  <td>DRG</td>
                  <td>Static</td>
                </tr>
                <tr className="blue-row">
                  <td>{formData.spokeBCidr}</td>
                  <td>Dynamic Routing Gateway</td>
                  <td>DRG</td>
                  <td>Static</td>
                </tr>
              </>
            )}
            {(flowCheckboxes["chk-pub1-sbi"]) && (
              <tr>
                <td>All CDG Services In Oracle Services...</td>
                <td>Service Gateway</td>
                <td>SGW</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv1-sbi"]) && (
              <tr className='orange-row'>
                <td>All CDG Services In Oracle Services...</td>
                <td>Service Gateway</td>
                <td>SGW</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-sbi"]) && (
              <tr>
                <td>All CDG Services In Oracle Services...</td>
                <td>Service Gateway</td>
                <td>SGW</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv3-sbi"]) && (
              <tr className='orange-row'>
                <td>All CDG Services In Oracle Services...</td>
                <td>Service Gateway</td>
                <td>SGW</td>
                <td>Static</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 6 - Hub Public Route Table */}
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
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>Internet Gateway</td>
                <td>IGW</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-priv2"] ||
              flowCheckboxes["chk-priv2-pub1"]) && (
              <tr className="red-row">
                <td className='blue-row'>{formData.spokeACidr}</td>
                <td>Private IP</td>
                {/* <td>192.168.0.100</td> */}
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-priv3-pub1"]) && (
              <tr className="blue-row">
                <td>{formData.spokeBCidr}</td>
                <td>Private IP</td>
                {/* <td className='red-row'>192.168.0.100</td> */}
                <td className='red-row'>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-sbi"]) && (
              <tr className='orange-row'>
                <td>All CDG Services In Oracle Services...</td>
                <td>Service Gateway</td>
                <td>SGW</td>
                <td>Static</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 7 - Spoke A Private Route Table */}
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
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv1-priv2"] ||
              flowCheckboxes["chk-pub1-priv2"] ||
              flowCheckboxes["chk-priv2-pub1"] ||
              flowCheckboxes["chk-priv2-priv1"]) && (
              <tr className="orange-row">
                <td>{formData.hubVcnCidr}</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-priv3"] ||
              flowCheckboxes["chk-priv3-priv2"]) && (
              <tr className="blue-row">
                <td>{formData.spokeBCidr}</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-sbi"]) && (
              <tr>
                <td>All CDG Services In Oracle Services...</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 8 - Spoke B Private Route Table */}
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
            {(flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-pub1-priv3"]) && (
              <tr className="orange-row">
                <td>{formData.hubVcnCidr}</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv3-inet1"] && (
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv1-priv3"] ||
              flowCheckboxes["chk-priv3-priv1"]) && (
              <tr className="orange-row">
                <td>{formData.hubVcnCidr}</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-priv3"] ||
              flowCheckboxes["chk-priv3-priv2"]) && (
              <tr className="blue-row">
                <td>{formData.spokeACidr}</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv3-sbi"]) && (
              <tr>
                <td className='blue-row'>All CDG Services In Oracle Services...</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 9 - Internet Gateway Route Table */}
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
            <tr className="green-row">
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Popup>

      {/* Popup 10 - NAT Gateway Route Table */}
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
              <tr className="red-row">
                <td className='blue-row'>{formData.spokeACidr}</td>
                <td>Private IP</td>
                {/* <td>192.168.0.100</td> */}
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv3-inet1"] && (
              <tr className="blue-row">
                <td>{formData.spokeBCidr}</td>
                <td>Private IP</td>
                {/* <td className="red-row">192.168.0.100</td> */}
                <td className="red-row">{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 11 - Service Gateway Route Table */}
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
            {(flowCheckboxes["chk-priv2-sbi"]) && (
              <tr className="blue-row">
                <td>{formData.spokeACidr}</td>
                <td>Private IP</td>
                {/* <td className="red-row">192.168.0.100</td> */}
                <td className="red-row">{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv3-sbi"]) && (
              <tr className="blue-row">
                {/* <td>{formData.spokeBCidr}</td> */}
                <td>{formData.spokeBCidr}</td>
                <td>Private IP</td>
                {/* <td className="red-row">192.168.0.100</td> */}
                <td className="red-row">{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 12 - DRG Route Table Spoke Attachment A */}
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
              flowCheckboxes["chk-priv2-pub1"] ||
              flowCheckboxes["chk-priv1-priv2"] ||
              flowCheckboxes["chk-priv2-priv1"]) && (
              <tr className="orange-row">
                <td>{formData.hubVcnCidr}</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv2-inet1"] && (
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-priv3"] ||
              flowCheckboxes["chk-priv3-priv2"]) && (
              <tr className="blue-row">
                <td>{formData.spokeBCidr}</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-sbi"]) && (
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 13 - DRG Route Table Spoke Attachment B */}
      <Popup
        id="popup13"
        title={formData.drgRtSpokeAttachmentB}
        isVisible={popups.popup13}
        onClose={() => setPopups((prev) => ({ ...prev, popup13: false }))}
      >
        <table>
          <thead>
            <tr>
              {flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-priv3-inet1"] ? (
                <>
                  <th>Destination CIDR block</th>
                  <th>Next hop attachment type</th>
                  <th>Next hop attachment name</th>
                </>
              ) : (
                <>
                  <th>Destination</th>
                  <th>Target Type</th>
                  <th>Target</th>
                  <th>Route Type</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(flowCheckboxes["chk-pub1-priv2"] ||
              flowCheckboxes["chk-priv2-pub1"]) && (
              <tr className="orange-row">
                <td>{formData.hubVcnCidr}</td>
                <td>Dynamic Routing Gateway</td>
                <td>DRG</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-pub1-priv3"]) && (
              <tr className="orange-row">
                <td>{formData.hubVcnCidr}</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv3-inet1"] && (
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv1-priv3"] ||
              flowCheckboxes["chk-priv3-priv1"]) && (
              <tr className="orange-row">
                <td>{formData.hubVcnCidr}</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-priv3"] ||
              flowCheckboxes["chk-priv3-priv2"]) && (
              <tr className="blue-row">
                <td>{formData.spokeACidr}</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv3-sbi"] && (
              <tr className="green-row">
                <td>0.0.0.0/0</td>
                <td>Virtual Cloud Network</td>
                <td>HUB-VCN-ATTACHMENT</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 14 - DRG Route Table Hub Attachment */}
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
              flowCheckboxes["chk-priv2-inet1"] ||
              flowCheckboxes["chk-priv1-priv2"] ||
              flowCheckboxes["chk-priv2-priv1"]) && (
              <tr>
                <td>10</td>
                <td>Attachment</td>
                <td>SPOKE-VCN-A-ATTACHMENT</td>
                <td>Accept</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-priv3-pub1"] ||
              flowCheckboxes["chk-priv1-priv3"] ||
              flowCheckboxes["chk-priv3-priv1"]) && (
              <tr>
                <td>20</td>
                <td>Attachment</td>
                <td>SPOKE-VCN-B-ATTACHMENT</td>
                <td>Accept</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv3-inet1"] && (
              <tr>
                <td>20</td>
                <td>Attachment</td>
                <td>SPOKE-VCN-B-ATTACHMENT</td>
                <td>Accept</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-priv3"] ||
              flowCheckboxes["chk-priv3-priv2"]) && (
              <>
                <tr>
                  <td>10</td>
                  <td>Attachment</td>
                  <td>SPOKE-VCN-A-ATTACHMENT</td>
                  <td>Accept</td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>Attachment</td>
                  <td>SPOKE-VCN-B-ATTACHMENT</td>
                  <td>Accept</td>
                </tr>
              </>
            )}
            {(flowCheckboxes["chk-priv2-sbi"]) && (
              <tr>
                <td>10</td>
                <td>Attachment</td>
                <td>SPOKE-VCN-A-ATTACHMENT</td>
                <td>-</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv3-sbi"]) && (
              <tr className='red-row'>
                <td>20</td>
                <td>Attachment</td>
                <td>SPOKE-VCN-B-ATTACHMENT</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 15 - VCN Route Table 1 Hub Attachment */}
      <Popup
        id="popup15"
        title={formData.vcnRt1HubAttachment}
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
              flowCheckboxes["chk-priv2-inet1"] ||
              flowCheckboxes["chk-priv1-priv2"] ||
              flowCheckboxes["chk-priv2-priv1"]) && (
              <tr className="blue-row">
                <td>{formData.spokeACidr}</td>
                <td>Virtual Cloud Network</td>
                <td>SPOKE-VCN-A-ATTACHMENT</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-priv3-pub1"] ||
              flowCheckboxes["chk-priv1-priv3"] ||
              flowCheckboxes["chk-priv3-priv1"]) && (
              <tr className="blue-row">
                <td>{formData.spokeBCidr}</td>
                <td>Virtual Cloud Network</td>
                <td>SPOKE-VCN-B-ATTACHMENT</td>
              </tr>
            )}
            {flowCheckboxes["chk-priv3-inet1"] && (
              <tr className="blue-row">
                <td>{formData.spokeBCidr}</td>
                <td>Virtual Cloud Network</td>
                <td>SPOKE-VCN-B-ATTACHMENT</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv2-priv3"] ||
              flowCheckboxes["chk-priv3-priv2"]) && (
              <>
                <tr className="blue-row">
                  <td>{formData.spokeACidr}</td>
                  <td>Virtual Cloud Network</td>
                  <td>SPOKE-VCN-A-ATTACHMENT</td>
                </tr>
                <tr className="blue-row">
                  <td>{formData.spokeBCidr}</td>
                  <td>Virtual Cloud Network</td>
                  <td>SPOKE-VCN-B-ATTACHMENT</td>
                </tr>
              </>
            )}
            {(flowCheckboxes["chk-priv2-sbi"]) && (
              <tr className="blue-row">
                <td>{formData.spokeACidr}</td>
                <td>Virtual Cloud Network</td>
                <td>SPOKE-VCN-A-ATTACHMENT</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv3-sbi"]) && (
              <tr className="blue-row">
                <td>{formData.spokeBCidr}</td>
                <td>Virtual Cloud Network</td>
                <td>SPOKE-VCN-B-ATTACHMENT</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 16 - VCN Route Table 2 Hub Attachment */}
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
              flowCheckboxes["chk-priv2-pub1"] ||
              flowCheckboxes["chk-priv1-priv2"] ||
              flowCheckboxes["chk-priv2-priv1"]) && (
              <>
                <tr className='blue-row'>
                  <td>{formData.spokeACidr}</td>
                  <td>Private IP</td>
                  {/* <td className="red-row">192.168.0.100</td> */}
                  <td className="red-row">{formData.firewallIp}</td>
                  <td>Static</td>
                </tr>
                <tr className='orange-row'>
                  <td>{formData.hubPubSubnetCidr}</td>
                  <td>Private IP</td>
                  {/* <td className="red-row">192.168.0.100</td> */}
                  <td className="red-row">{formData.firewallIp}</td>
                  <td>Static</td>
                </tr>
              </>
            )}
            {flowCheckboxes["chk-priv2-inet1"] && (
              <tr className="red-row">
                <td>0.0.0.0/0</td>
                <td>Private IP</td>
                {/* <td>192.168.0.100</td> */}
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-pub1-priv3"] ||
              flowCheckboxes["chk-priv3-pub1"]) && (
              <>
                <tr className="red-row">
                  <td>{formData.spokeBCidr}</td>
                  <td>Private IP</td>
                  {/* <td>192.168.0.100</td> */}
                  <td>{formData.firewallIp}</td>
                  <td>Static</td>
                </tr>
                <tr className="red-row">
                  <td>{formData.hubPubSubnetCidr}</td>
                  <td>Private IP</td>
                  {/* <td>192.168.0.100</td> */}
                  <td>{formData.firewallIp}</td>
                  <td>Static</td>
                </tr>
              </>
            )}
            {flowCheckboxes["chk-priv3-inet1"] && (
              <tr className="red-row">
                <td>0.0.0.0/0</td>
                <td>Private IP</td>
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv1-priv3"] ||
              flowCheckboxes["chk-priv3-priv1"]) && (
              <>
                <tr className="blue-row">
                  <td>{formData.spokeBCidr}</td>
                  <td>Private IP</td>
                  <td className="red-row">{formData.firewallIp}</td>
                  <td>Static</td>
                </tr>
                <tr className="orange-row">
                  <td>{formData.hubPrivSubnetCidr}</td>
                  <td>Private IP</td>
                  <td className="red-row">{formData.firewallIp}</td>
                  <td>Static</td>
                </tr>
              </>
            )}
            {(flowCheckboxes["chk-priv2-priv3"] ||
              flowCheckboxes["chk-priv3-priv2"]) && (
              <>
                <tr className="blue-row">
                  <td>{formData.spokeACidr}</td>
                  <td>Private IP</td>
                  {/* <td className="red-row">192.168.0.100</td> */}
                  <td className="red-row">{formData.firewallIp}</td>
                  <td>Static</td>
                </tr>
                <tr className="blue-row">
                  <td>{formData.spokeBCidr}</td>
                  <td>Private IP</td>
                  {/* <td className="red-row">192.168.0.100</td> */}
                  <td className="red-row">{formData.firewallIp}</td>
                  <td>Static</td>
                </tr>
              </>
            )}
            {(flowCheckboxes["chk-priv2-sbi"]) && (
              <tr className="red-row">
                <td>All CDG Services In Oracle Services...</td>
                <td>Private IP</td>
                {/* <td>192.168.0.100</td> */}
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv3-sbi"]) && (
              <tr className="red-row">
                <td>All CDG Services In Oracle Services...</td>
                <td>Private IP</td>
                {/* <td>192.168.0.100</td> */}
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>

      {/* Popup 17 - RT-Priv1 */}
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
              <tr className="red-row">
                <td>0.0.0.0/0</td>
                <td>Private IP</td>
                {/* <td>192.168.0.100</td> */}
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv1-priv2"] ||
              flowCheckboxes["chk-priv2-priv1"]) && (
              <tr className="red-row">
                {/* <td>{formData.spokeACidr}</td> */}
                <td>{formData.spokeAName}</td>
                <td>Private IP</td>
                {/* <td>192.168.0.100</td> */}
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv1-priv3"] ||
              flowCheckboxes["chk-priv3-priv1"]) && (
              <tr className='blue-row'>
                {/* <td>{formData.spokeBCidr}</td> */}
                <td>{formData.spokeBCidr}</td>
                <td>Private IP</td>
                {/* <td className="red-row">192.168.0.100</td> */}
                <td className="red-row">{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
            {(flowCheckboxes["chk-priv1-sbi"]) && (
              <tr className="red-row">
                <td>All CDG Services In Oracle Services...</td>
                <td>Private IP</td>
                {/* <td>192.168.0.100</td> */}
                <td>{formData.firewallIp}</td>
                <td>Static</td>
              </tr>
            )}
          </tbody>
        </table>
      </Popup>
    </div>
  );
};

export default PopupTables;