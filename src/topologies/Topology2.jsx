// src/pages/Topology2.js
import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/Toplogy.css';
import DiagramForm2 from '../components/DiagramForm2';
import DiagramPreview2 from '../components/DiagramPreview2';

const Topology2 = () => {
  // Form data state for Hub & Spoke topology
  const [formData, setFormData] = useState({
    hubVcnName: '', hubVcnCidr: '', hubFwIp: '',
    hubPrivSubnetName: '', hubPrivSubnetCidr: '', hubPrivSlName: '', hubPrivRtName: '',
    hubPubSubnetName: '', hubPubSubnetCidr: '', hubPubSlName: '', hubPubRtName: '',
    spokeAName: '', spokeACidr: '',
    spokeAPrivSubnetName: '', spokeAPrivSubnetCidr: '', spokeAPrivSlName: '', spokeAPrivRtName: '',
    spokeBName: '', spokeBCidr: '',
    spokeBPrivSubnetName: '', spokeBPrivSubnetCidr: '', spokeBPrivSlName: '', spokeBPrivRtName: '',
    internetGwRtName: '', natGwRtName: '', serviceGwRtName: '',
    drgRt1HubAttachment: '', vcnRt2HubAttachment: '', vcnRiHubAttachment: '', drgRtSpokeAttachmentB: ''
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
      hubVcnName: 'MyHubVCN', hubVcnCidr: '10.0.0.0/16', hubFwIp: '10.0.0.10',
      hubPrivSubnetName: 'Hub-Priv', hubPrivSubnetCidr: '10.0.1.0/24', hubPrivSlName: 'Hub-Priv-SL', hubPrivRtName: 'Hub-Priv-RT',
      hubPubSubnetName: 'Hub-Pub', hubPubSubnetCidr: '10.0.2.0/24', hubPubSlName: 'Hub-Pub-SL', hubPubRtName: 'Hub-Pub-RT',
      spokeAName: 'SpokeA', spokeACidr: '10.0.3.0/24',
      spokeAPrivSubnetName: 'VCN-A-Priv', spokeAPrivSubnetCidr: '10.0.3.0/24', spokeAPrivSlName: 'SpokeA-Priv-SL', spokeAPrivRtName: 'SpokeA-Priv-RT',
      spokeBName: 'SpokeB', spokeBCidr: '10.0.4.0/24',
      spokeBPrivSubnetName: 'VCN-B-Priv', spokeBPrivSubnetCidr: '10.0.4.0/24', spokeBPrivSlName: 'SpokeB-Priv-SL', spokeBPrivRtName: 'SpokeB-Priv-RT',
      internetGwRtName: 'IGW-RT', natGwRtName: 'NAT-RT', serviceGwRtName: 'SGW-RT',
      drgRt1HubAttachment: 'DRG-Hub-RT1', vcnRt2HubAttachment: 'VCN-Hub-RT2', vcnRiHubAttachment: 'VCN-Hub-RI', drgRtSpokeAttachmentB: 'DRG-SpokeB-RT'
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
      { key: 'hubFwIp', label: 'Firewall IP', id: 'hubFwIp1', value: formData.hubFwIp }
    ],
    'Hub Private Subnet': [
      { key: 'hubPrivSubnetName', label: 'Subnet Name', id: 'hubPrivSubnetName1', value: formData.hubPrivSubnetName, required: true },
      { key: 'hubPrivSubnetCidr', label: 'Subnet CIDR', id: 'hubPrivSubnetCidr1', value: formData.hubPrivSubnetCidr, required: true },
      { key: 'hubPrivSlName', label: 'Security List Name', id: 'hubPrivSlName1', value: formData.hubPrivSlName },
      { key: 'hubPrivRtName', label: 'VCN Route Table Name', id: 'hubPrivRtName1', value: formData.hubPrivRtName }
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
      { key: 'drgRt1HubAttachment', label: 'DRG RT1 Hub Attachment', id: 'drgRt1HubAttachment1', value: formData.drgRt1HubAttachment },
      { key: 'vcnRt2HubAttachment', label: 'VCN RT2 Hub Attachment', id: 'vcnRt2HubAttachment1', value: formData.vcnRt2HubAttachment },
      { key: 'vcnRiHubAttachment', label: 'VCN RI Hub Attachment', id: 'vcnRiHubAttachment1', value: formData.vcnRiHubAttachment },
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

  return (
    <main>
      <Header title="Topology 2 - Hub & Spokes" />
      <section className="topology-section">
        <div className="container">
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
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Topology2;