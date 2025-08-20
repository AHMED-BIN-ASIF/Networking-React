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
    'chk-pub-priv-db': false,
    'chk-pub-inet': false,
    'chk-priv-inet': false,
    'chk-pub-priv-bidirectional': false,
  });

  const handleUpdateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handlePopulateFields = () => {
    const sampleData = {
      vpcName: "OraStage-VCN",
      vpcCIDR: "10.0.0.0/16",
      publicSubnetName: "PUB-SUBNET",
      publicSubnetCIDR: "10.0.1.0/24",
      publicSLName: "PUB-SL",
      publicRTName: "PUB-RT",
      privateSubnetRange: "WEB-SUBNET",
      privateSubnetCIDR: "10.0.2.0/24",
      privateSLName: "WEB-SL",
      privateRTName: "WEB-RT",
      SubnetName: "APP-SUBNET",
      SubnetRange: "10.0.3.0/24",
      SLName: "APP-SL",
      RTName: "APP-RT"
    };
    setFormData(sampleData);
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

  return (
    <main>
      <Header title='Simple Topology 1' />
      <section className='topology-section'>
        <div className="container">
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
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Topology1;
