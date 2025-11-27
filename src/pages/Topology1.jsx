// src/pages/Topology1.js
import React, { useState } from 'react';
import Header from '../components/common/Header';
import DiagramForm from '../components/topology1/DiagramForm';
import DiagramPreview from '../components/topology1/DiagramPreview';
import "../css/Toplogy.css";

const Topology1 = () => {
  // Form state.
  const [formData, setFormData] = useState({
    vpcName: "",
    vpcCIDR: "",
    publicSubnetName: "",
    publicSubnetCIDR: "",
    publicSLName: "",
    publicRTName: "",
    privateSubnetRange: "",
    privateSubnetCIDR: "",
    privateSLName: "",
    privateRTName: "",
    SubnetName: "",
    SubnetRange: "",
    SLName: "",
    RTName: ""
  });

  // Preview data.
  const [previewData, setPreviewData] = useState(null);

  // Popup state.
  const [popups, setPopups] = useState({
    popup1: false,
    popup2: false,
    popup3: false,
    popup4: false,
    popup5: false,
    popup6: false,
    generateTF: false,
  });
  const popupwrap = Object.values(popups).some(flag => flag);
  
  // Flow checkbox state.
  const [flowCheckboxes, setFlowCheckboxes] = useState({
    'chk-show-endpoints': false,
  });

  const handleUpdateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handlePopulateFields = () => {
    const sampleData = {
      vpcName: "ONFAVCN",
      vpcCIDR: "10.0.0.0/16",
      publicSubnetName: "PUBSUBNET",
      publicSubnetCIDR: "10.0.1.0/24",
      publicSLName: "PUBSL",
      publicRTName: "PUBRT",
      privateSubnetRange: "WEBSUBNET",
      privateSubnetCIDR: "10.0.2.0/24",
      privateSLName: "WEBSL",
      privateRTName: "WEBRT",
      SubnetName: "APPSUBNET",
      SubnetRange: "10.0.3.0/24",
      SLName: "APPSL",
      RTName: "APPRT"
    };
    setFormData(sampleData);
  };

  // Convert form data to JSON structure
  const convertToJSON = () => {
    return {
      "VCN": {
        "VCN_Name": formData.vpcName,
        "VPC_CIDR": formData.vpcCIDR,
        "Subnets": {
          "Public_Subnet": {
            "Subnet_Name": formData.publicSubnetName,
            "Subnet_CIDR": formData.publicSubnetCIDR,
            "Security_List_Name": formData.publicSLName,
            "Route_Table_Name": formData.publicRTName
          },
          "Private_Subnet_1": {
            "Subnet_Name": formData.privateSubnetRange,
            "Subnet_CIDR": formData.privateSubnetCIDR,
            "Security_List_Name": formData.privateSLName,
            "Route_Table_Name": formData.privateRTName
          },
          "Private_Subnet_2": {
            "Subnet_Name": formData.SubnetName,
            "Subnet_CIDR": formData.SubnetRange,
            "Security_List_Name": formData.SLName,
            "Route_Table_Name": formData.RTName
          }
        }
      }
    };
  };

  // Export JSON to file
  const handleExportJSON = () => {
    const jsonData = convertToJSON();
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.vpcName || 'topology1'}-config.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Send data to webhook
  const handleSendToWebhook = async () => {
    const jsonData = convertToJSON();
    
    // Replace with your actual webhook URL
    const webhookUrl = 'https://n8n.i1h.nl/webhook/d8e35ed9-40cd-48b9-ab10-8635b9fc50ff';
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log('Data successfully sent to webhook!');
      } else {
        console.log('Failed to send data to webhook. Please try again.');
      }
    } catch (error) {
      console.error('Error sending to webhook:', error);
      console.log('Error sending data to webhook. Please check the console for details.');
    }
  };

  const handleGenerateNetwork = (e) => {
    e.preventDefault();
    setPreviewData(formData);
    
  };

  const fieldGroups = {
    "VCN": [
      { key: "vpcName", label: "VCN Name", id: "vpcName1", value: formData.vpcName, required: true },
      { key: "vpcCIDR", label: "VPC CIDR", id: "vpcCIDR1", value: formData.vpcCIDR, required: true }
    ],
    "Public Subnet": [
      { key: "publicSubnetName", label: "Public Subnet Name", id: "publicSubnetName1", value: formData.publicSubnetName, required: true },
      { key: "publicSubnetCIDR", label: "Public Subnet CIDR", id: "publicSubnetCIDR1", value: formData.publicSubnetCIDR, required: true },
      { key: "publicSLName", label: "Public SL Name", id: "publicSLName1", value: formData.publicSLName, required: true },
      { key: "publicRTName", label: "Public RT Name", id: "publicRTName1", value: formData.publicRTName, required: true }
    ],
    "Private Subnet 1": [
      { key: "privateSubnetRange", label: "Private Subnet Name", id: "privateSubnetRange1", value: formData.privateSubnetRange, required: true },
      { key: "privateSubnetCIDR", label: "Private Subnet CIDR", id: "privateSubnetCIDR1", value: formData.privateSubnetCIDR, required: true },
      { key: "privateSLName", label: "Private SL Name", id: "privateSLName1", value: formData.privateSLName, required: true },
      { key: "privateRTName", label: "Private RT Name", id: "privateRTName1", value: formData.privateRTName, required: true }
    ],
    "Private Subnet 2": [
      { key: "SubnetName", label: "Private Subnet Name", id: "SubnetName1", value: formData.SubnetName, required: true },
      { key: "SubnetRange", label: "Private Subnet CIDR", id: "SubnetRange1", value: formData.SubnetRange, required: true },
      { key: "SLName", label: "Private SL Name", id: "SLName1", value: formData.SLName, required: true },
      { key: "RTName", label: "Private RT Name", id: "RTName1", value: formData.RTName, required: true }
    ]
  };

  const flowConfigGrouped = [
    [{ id: 'chk-show-endpoints', label: 'Show Endpoints' }],
    // Group 1: PUB1/PRIV1/PRIV2 → DB1
    [
      { id: 'chk-pub-priv-db', label: 'Flow from PUB1 / PRIV1 / PRIV2 → DB1' },
    ],
    // Group 2: PUB1 → INET1
    [
      { id: 'chk-pub-inet', label: 'Flow from PUB1 → INET1' },
    ],
    // Group 3: PRIV1/PRIV2 → INET1
    [
      { id: 'chk-priv-inet', label: 'Flow from PRIV1 / PRIV2 → INET1' },
    ],
    // Group 4: PUB1 ↔ PRIV1/PRIV2
    [
      { id: 'chk-pub-priv-bidirectional', label: 'Flow from PUB1 ↔ PRIV1 / PRIV2' },
    ],
  ];

  return (
    <main>
      <Header title='Single VCN Architecture' />
      <section className='topology-section'>
        <div className={`container ${(flowCheckboxes["chk-show-endpoints"]) ? "left" : '' } `}>
          <DiagramForm 
            fieldGroups={fieldGroups}
            onFieldChange={handleUpdateFormData}
            onPopulate={handlePopulateFields}
            onSubmit={handleGenerateNetwork}
          />
          {previewData && (
            <div className="preview-container">
              <DiagramPreview 
                formData={previewData}
                popups={popups}
                setPopups={setPopups}
                flowCheckboxes={flowCheckboxes}
                setFlowCheckboxes={setFlowCheckboxes}
                popupwrap={popupwrap}
                flowConfigGrouped={flowConfigGrouped}
            onExportJSON={handleExportJSON}
            onSendToWebhook={handleSendToWebhook}

              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Topology1;
