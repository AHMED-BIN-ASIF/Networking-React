// src/pages/Topology2.js
import React, { useState } from 'react';
import Header from '../components/common/Header';
import '../css/Toplogy.css';
import DiagramForm2 from '../components/topology2/DiagramForm2';
import DiagramPreview2 from '../components/topology2/DiagramPreview2';

const Topology2 = () => {
  // Form data state for Hub & Spoke topology
  const [formData, setFormData] = useState({
    hubVcnName: '', hubVcnCidr: '',
    hubPrivSubnetName: '', hubPrivSubnetCidr: '', hubPrivSlName: '', hubPrivRtName: '', firewallIp: '',
    hubPubSubnetName: '', hubPubSubnetCidr: '', hubPubSlName: '', hubPubRtName: '',
    spokeAName: '', spokeACidr: '',
    spokeAPrivSubnetName: '', spokeAPrivSubnetCidr: '', spokeAPrivSlName: '', spokeAPrivRtName: '',
    spokeBName: '', spokeBCidr: '',
    spokeBPrivSubnetName: '', spokeBPrivSubnetCidr: '', spokeBPrivSlName: '', spokeBPrivRtName: '',
    internetGwRtName: '', natGwRtName: '', serviceGwRtName: '',
    drgRiHubAtt: '', vcnRt1HubAttachment:'', vcnRt2HubAttachment: '', drgRtSpokeAatt: '', drgRtSpokeAttachmentB: ''
  });

  // Preview data & popup state
  const [previewData, setPreviewData] = useState(null);
  const [popups, setPopups] = useState({
    popup1: false, popup2: false, popup3: false, popup4: false,
    popup5: false, popup6: false, popup7: false, popup8: false,
    popup9: false, popup10: false, popup11: false, popup12: false,
    popup13: false, popup14: false, popup15: false,
    popup21: false, generateTF: false
  });
  const popupwrap = Object.values(popups).some(flag => flag);

  // Flow checkbox state
  const [flowCheckboxes, setFlowCheckboxes] = useState({
    'chk-show-endpoints': false,
    'chk-pub-priv-db': false,
    'chk-pub-inet': false,
    'chk-priv-inet': false,
    'chk-pub-priv-bidirectional': false
  });

  // Handlers
  const handleUpdateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handlePopulateFields = () => {
    setFormData({
      hubVcnName: 'VCN-Hub', hubVcnCidr: '192.168.0.0/24',
      hubPrivSubnetName: 'Sub-Hub-Priv', hubPrivSubnetCidr: '192.168.0.0/25xxx', hubPrivSlName: 'SL-Hub-Priv', hubPrivRtName: 'RT-Hub-Priv', firewallIp: '192.168.0.100',
      hubPubSubnetName: 'Sub-Hub-Pub', hubPubSubnetCidr: '192.168.0.128/25', hubPubSlName: 'SL-Hub-Pub', hubPubRtName: 'RT-Hub-Pub',
      spokeAName: 'VCN-Spoke-A', spokeACidr: '172.16.1.0/24',
      spokeAPrivSubnetName: 'Sub-Spoke-A-Priv', spokeAPrivSubnetCidr: '172.16.1.0/25', spokeAPrivSlName: 'SL-Spoke-A-Priv', spokeAPrivRtName: 'RT-Spoke-A-Priv',
      spokeBName: 'VCN-Spoke-B', spokeBCidr: '172.16.2.0/24',
      spokeBPrivSubnetName: 'Sub-Spoke-B-Priv', spokeBPrivSubnetCidr: '172.16.2.0/25', spokeBPrivSlName: 'SL-Spoke-B-Priv', spokeBPrivRtName: 'RT-Spoke-B-Priv',
      internetGwRtName: 'RT-IGW', natGwRtName: 'RT-NGW', serviceGwRtName: 'RT-SGW',
      drgRiHubAtt: 'RI-DRG-Hub-Att', vcnRt1HubAttachment: "RT-DRG-Hub-Att", vcnRt2HubAttachment: 'RT-VCN-Hub-Att', drgRtSpokeAatt: 'RT-DRG-Spoke-A-Att', drgRtSpokeAttachmentB: 'RT-DRG-Spoke-B-Att'
    });
  };

  const handleGenerateNetwork = e => {
    e.preventDefault();
    setPreviewData(formData);
  };

  // Grouped fields for DiagramForm2
  const fieldGroups = {
    'Hub VCN': [
      { key: 'hubVcnName', label: 'VCN Name', id: 'hubVcnName1', value: formData.hubVcnName, required: true },
      { key: 'hubVcnCidr', label: 'VCN CIDR', id: 'hubVcnCidr1', value: formData.hubVcnCidr, required: true },
    ],
    'Hub Private Subnet': [
      { key: 'hubPrivSubnetName', label: 'Subnet Name', id: 'hubPrivSubnetName1', value: formData.hubPrivSubnetName, required: true },
      { key: 'hubPrivSubnetCidr', label: 'Subnet CIDR', id: 'hubPrivSubnetCidr1', value: formData.hubPrivSubnetCidr, required: true },
      { key: 'hubPrivSlName', label: 'Security List Name', id: 'hubPrivSlName1', value: formData.hubPrivSlName },
      { key: 'hubPrivRtName', label: 'VCN Route Table Name', id: 'hubPrivRtName1', value: formData.hubPrivRtName },
      { key: 'firewallIp', label: 'Firewall Ip', id: 'firewallIp1', value: formData.firewallIp }
    ],
    'Hub Public Subnet': [
      { key: 'hubPubSubnetName', label: 'Subnet Name', id: 'hubPubSubnetName1', value: formData.hubPubSubnetName, required: true },
      { key: 'hubPubSubnetCidr', label: 'Subnet CIDR', id: 'hubPubSubnetCidr1', value: formData.hubPubSubnetCidr, required: true },
      { key: 'hubPubSlName', label: 'Security List Name', id: 'hubPubSlName1', value: formData.hubPubSlName },
      { key: 'hubPubRtName', label: 'VCN Route Table Name', id: 'hubPubRtName1', value: formData.hubPubRtName }
    ],
    'Spoke VCN A': [
      { key: 'spokeAName', label: 'VCN A Name', id: 'spokeAName1', value: formData.spokeAName, required: true },
      { key: 'spokeACidr', label: 'VCN A CIDR', id: 'spokeACidr1', value: formData.spokeACidr, required: true }
    ],
    'Spoke VCN A – Private Subnet': [
      { key: 'spokeAPrivSubnetName', label: 'Subnet Name', id: 'spokeAPrivSubnetName1', value: formData.spokeAPrivSubnetName, required: true },
      { key: 'spokeAPrivSubnetCidr', label: 'Subnet CIDR', id: 'spokeAPrivSubnetCidr1', value: formData.spokeAPrivSubnetCidr, required: true },
      { key: 'spokeAPrivSlName', label: 'Security List Name', id: 'spokeAPrivSlName1', value: formData.spokeAPrivSlName },
      { key: 'spokeAPrivRtName', label: 'VCN Route Table Name', id: 'spokeAPrivRtName1', value: formData.spokeAPrivRtName }
    ],
    'Spoke VCN B': [
      { key: 'spokeBName', label: 'Subnet Name', id: 'spokeBName1', value: formData.spokeBName, required: true },
      { key: 'spokeBCidr', label: 'Subnet CIDR', id: 'spokeBCidr1', value: formData.spokeBCidr, required: true },
     ],
    'Spoke VCN B – Private Subnet': [
      { key: 'spokeBPrivSubnetName', label: 'Subnet Name', id: 'spokeBPrivSubnetName1', value: formData.spokeBPrivSubnetName, required: true },
      { key: 'spokeBPrivSubnetCidr', label: 'Subnet CIDR', id: 'spokeBPrivSubnetCidr1', value: formData.spokeBPrivSubnetCidr, required: true },
      { key: 'spokeBPrivSlName', label: 'Security List Name', id: 'spokeBPrivSlName1', value: formData.spokeBPrivSlName },
      { key: 'spokeBPrivRtName', label: 'VCN Route Table Name', id: 'spokeBPrivRtName1', value: formData.spokeBPrivRtName }
    ],
    'Internet Gateway': [
      { key: 'internetGwRtName', label: 'VCN IGW Route Table', id: 'internetGwRtName1', value: formData.internetGwRtName }
    ],
    'NAT Gateway': [
      { key: 'natGwRtName', label: 'VCN NAT Route Table', id: 'natGwRtName1', value: formData.natGwRtName }
    ],
    'Service Gateway': [
      { key: 'serviceGwRtName', label: 'VCN Service GW Route Table', id: 'serviceGwRtName1', value: formData.serviceGwRtName }
    ],
    'DRG Attachments / Imports': [
      { key: 'drgRiHubAtt', label: 'DRG RI Hub Attachment', id: 'drgRiHubAtt1', value: formData.drgRiHubAtt },
      { key: 'vcnRt1HubAttachment', label: 'DRG RT Hub Attachment', id: 'vcnRt1HubAttachment1', value: formData.vcnRt1HubAttachment },
      { key: 'vcnRt2HubAttachment', label: 'VCN RT Hub Attachment', id: 'vcnRt2HubAttachment1', value: formData.vcnRt2HubAttachment },
      { key: 'drgRtSpokeAatt', label: 'DRG RT Spoke A Attachment', id: 'drgRtSpokeAatt1', value: formData.drgRtSpokeAatt },
      { key: 'drgRtSpokeAttachmentB', label: 'DRG RT Spoke B Attachment', id: 'drgRtSpokeAttachmentB1', value: formData.drgRtSpokeAttachmentB }
    ]
  };

  const subGroups = [
    {
      groupName: 'Hub VCN',
      fields: fieldGroups['Hub VCN'],
      subGroups: [
        { groupName: 'Private Subnet', fields: fieldGroups['Hub Private Subnet'] },
        { groupName: 'Public Subnet',  fields: fieldGroups['Hub Public Subnet']  }
      ],
      spanClass: "2"
    },
    {
      groupName: 'Spoke VCN A', 
      fields: fieldGroups['Spoke VCN A'],
      subGroups: [
        { groupName: 'Subnet VCN A', fields: fieldGroups['Spoke VCN A – Private Subnet'] },
      ]
    },
    {
      groupName: 'Spoke VCN B', 
      fields: fieldGroups['Spoke VCN B'],
      subGroups: [
        { groupName: 'Spoke VCN B', fields: fieldGroups['Spoke VCN B – Private Subnet']  },
      ]
    }, 
    { groupName: 'DRG Attachments / Imports', fields: fieldGroups['DRG Attachments / Imports'],spanClass:"1" },
    {
      groupName: 'Gateways', subGroups: [
        { groupName: 'Internet Gateway', fields: fieldGroups['Internet Gateway'] },
        { groupName: 'NAT Gateway', fields: fieldGroups['NAT Gateway'] },
        { groupName: 'Service Gateway', fields: fieldGroups['Service Gateway'] }
      ],
      spanClass: "3"
    },
  ];
  const flowConfigGrouped = [
    [{ id: 'chk-show-endpoints', label: 'Show Endpoints' }],
    // Group 1: PRIV1 <-> PUB1 (THROUGH FW1)
    // [
    //   { id: 'chk-priv1-pub', label: 'PRIV1 → PUB1 (THROUGH FW1)' },
    //   { id: 'chk-pub1-priv1-fw1', label: 'PUB1 → PRIV1 (THROUGH FW1)' },
    // ],
    // Group 2: INET1 <-> PUB1
    [
      { id: 'chk-inet1-pub1', label: 'INET1 → PUB1' },
      { id: 'chk-pub1-inet1', label: 'PUB1 → INET1' },
    ],
    // Group 3: FW1 INET1 + PRIV1 FW1 + FW1 PUB1
    [
      { id: 'chk-fw1-inet1', label: 'FW1 → INET1' },
    ],
    // Group 4: FW1 INET1 + PRIV1 FW1 + FW1 PUB1
    [
      { id: 'chk-pub1-fw1', label: 'PUB1 → FW1' },
      { id: 'chk-fw1-pub1', label: 'FW1 → PUB1' },
    ],
    // Group 5: FW1 INET1 + PRIV1 FW1 + FW1 PUB1
    [
      { id: 'chk-priv1-inet1-bypass-fw', label: 'PRIV1 → INET1 (Bypass FW)' },
    ],
    // Group 6: PRIV1 → INET1 (normal and through FW)
    [
      { id: 'chk-priv1-inet1-fw', label: 'PRIV1 → INET1 (Through FW)' }
    ],
    // Group 7: PRIV1 → INET1 (normal and through FW)
    [
      { id: 'chk-pub1-priv1', label: 'PUB1 → PRIV1' },
      { id: 'chk-priv1-pub1', label: 'PRIV1 → PUB1' },
    ],
    // Group 8: PUB1 <-> PRIV2
    [
      { id: 'chk-pub1-priv2', label: 'PUB1 → PRIV2' },
      { id: 'chk-priv2-pub1', label: 'PRIV2 → PUB1' },
    ],
    // Group 9: PRIV2 <-> INET1
    [
      { id: 'chk-priv2-inet1', label: 'PRIV2 → INET1' },
    ],
    // Group 10: PRIV1 <-> PRIV2
    [
      { id: 'chk-priv1-priv2', label: 'PRIV1 → PRIV2' },
      { id: 'chk-priv2-priv1', label: 'PRIV2 → PRIV1' },
    ],
    // Group 11: PRIV3 <-> PUB1 & INET1
    [
      { id: 'chk-pub1-priv3', label: 'PUB1 → PRIV3' },
      { id: 'chk-priv3-pub1', label: 'PRIV3 → PUB1' },
    ],
    // Group 12: PRIV3 <-> INET1
    [
      { id: 'chk-priv3-inet1', label: 'PRIV3 → INET1' },
    ],
    // Group 13: PRIV1 <-> PRIV3
    [
      { id: 'chk-priv1-priv3', label: 'PRIV1 → PRIV3' },
      { id: 'chk-priv3-priv1', label: 'PRIV3 → PRIV1' },
    ],
    // Group 14: PRIV2 <-> PRIV3
    [
      { id: 'chk-priv2-priv3', label: 'PRIV2 → PRIV3' },
      { id: 'chk-priv3-priv2', label: 'PRIV3 → PRIV2' },
    ],
    // Group 15: SBI Access
    [
      { id: 'chk-priv1-sbi', label: 'PRIV1 → SBI' },
    ],
    // Group 16: SBI Access
    [
      { id: 'chk-priv2-sbi', label: 'PRIV2 → SBI' },
    ],
    // Group 16: SBI Access
    [
      { id: 'chk-priv3-sbi', label: 'PRIV3 → SBI' },
    ],
    // Group 16: SBI Access
    [
      { id: 'chk-pub1-sbi', label: 'PUB1 → SBI' },
    ]
  ];
  
  return (
    <main>
      <Header title="Hub and Spoke VCN Architecture" />
      <section id='topo2-sec' className="topology-section">
        <div className={`container ${(flowCheckboxes["chk-show-endpoints"]) ? "left" : '' } `}>
          <form className="network-form" onSubmit={handleGenerateNetwork}>
            <DiagramForm2
              subGroups={subGroups}
              onFieldChange={handleUpdateFormData}
              onPopulate={handlePopulateFields}
            />
          </form>
          {previewData && (
            <div className="preview-container">
              <DiagramPreview2
                formData={previewData}
                popups={popups}
                setPopups={setPopups}
                flowCheckboxes={flowCheckboxes}
                setFlowCheckboxes={setFlowCheckboxes}
                popupwrap={popupwrap}
                flowConfigGrouped={flowConfigGrouped}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Topology2;