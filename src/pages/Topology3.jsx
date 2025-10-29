// src/pages/Topology3.js
import React, { useState } from "react";
import Header from "../components/common/Header";
import "../css/Toplogy.css";
import DiagramForm3 from "../components/topology3/DiagramForm3";
import DiagramPreview3 from "../components/topology3/DiagramPreview3";

const Topology3 = () => {
  // Form data state for Hub & Spoke topology
  const [formData, setFormData] = useState({
    hubVcnName: "",
    hubVcnCidr: "",
    hubPrivSubnetName: "",
    hubPrivSubnetCidr: "",
    hubPrivSlName: "",
    hubPrivRtName: "",
    firewallIp: "",
    hubPubSubnetName: "",
    hubPubSubnetCidr: "",
    hubPubSlName: "",
    hubPubRtName: "",
    spokeAName: "",
    spokeACidr: "",
    spokeAPrivSubnetName: "",
    spokeAPrivSubnetCidr: "",
    spokeAPrivSlName: "",
    spokeAPrivRtName: "",
    spokeBName: "",
    spokeBCidr: "",
    spokeBPrivSubnetName: "",
    spokeBPrivSubnetCidr: "",
    spokeBPrivSlName: "",
    spokeBPrivRtName: "",
    internetGwRtName: "",
    natGwRtName: "",
    serviceGwRtName: "",
    drgRiHubAtt: "",
    vcnRt1HubAttachment: "",
    vcnRt2HubAttachment: "",
    drgRtSpokeAatt: "",
    drgRtSpokeAttachmentB: "",
    onPremSubnetCidr: "",
    onPremRouteTable: "",
    tunnelRouteTable1: "",
    tunnelRouteTable2: "",
  });

  // Preview data & popup state
  const [previewData, setPreviewData] = useState(null);
  const [popups, setPopups] = useState({
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
    popup21: false,
    generateTF: false,
  });
  const popupwrap = Object.values(popups).some((flag) => flag);

  // Flow checkbox state
  const [flowCheckboxes, setFlowCheckboxes] = useState({
    "chk-show-endpoints": false,
    "chk-pub-priv-db": false,
    "chk-pub-inet": false,
    "chk-priv-inet": false,
    "chk-pub-priv-bidirectional": false,
  });

  // Handlers
  const handleUpdateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePopulateFields = () => {
    setFormData({
      hubVcnName: "VCN-Hub",
      hubVcnCidr: "192.168.0.0/24",
      hubPrivSubnetName: "Sub-Hub-Priv",
      hubPrivSubnetCidr: "192.168.0.0/25",
      hubPrivSlName: "SL-Hub-Priv",
      hubPrivRtName: "RT-Hub-Priv",
      firewallIp: "192.168.0.100",
      hubPubSubnetName: "Sub-Hub-Pub",
      hubPubSubnetCidr: "192.168.0.128/25",
      hubPubSlName: "SL-Hub-Pub",
      hubPubRtName: "RT-Hub-Pub",
      spokeAName: "VCN-Spoke-A",
      spokeACidr: "172.16.1.0/24",
      spokeAPrivSubnetName: "Sub-Spoke-A-Priv",
      spokeAPrivSubnetCidr: "172.16.1.0/25",
      spokeAPrivSlName: "SL-Spoke-A-Priv",
      spokeAPrivRtName: "RT-Spoke-A-Priv",
      spokeBName: "VCN-Spoke-B",
      spokeBCidr: "172.16.2.0/24",
      spokeBPrivSubnetName: "Sub-Spoke-B-Priv",
      spokeBPrivSubnetCidr: "172.16.2.0/25",
      spokeBPrivSlName: "SL-Spoke-B-Priv",
      spokeBPrivRtName: "RT-Spoke-B-Priv",
      internetGwRtName: "RT-IGW",
      natGwRtName: "RT-NGW",
      serviceGwRtName: "RT-SGW",
      drgRiHubAtt: "RI-DRG-Hub-Att",
      vcnRt1HubAttachment: "RT-DRG-Hub-Att",
      vcnRt2HubAttachment: "RT-VCN-Hub-Att",
      drgRtSpokeAatt: "RT-DRG-Spoke-A-Att",
      drgRtSpokeAttachmentB: "RT-DRG-Spoke-B-Att",
      onPremSubnetCidr: "10.10.10.0/24",
      onPremRouteTable: "RT-Op",
      tunnelRouteTable1: "RT-DRG-Tun-1",
      tunnelRouteTable2: "RT-DRG-Tun-2",
    });
  };
 // Convert form data to JSON structure
const convertToJSON = () => {
  return {
    HubVCN: {
      VCNName: formData.hubVcnName,
      VCNCIDR: formData.hubVcnCidr,
      PrivateSubnet: {
        SubnetName: formData.hubPrivSubnetName,
        SubnetCIDR: formData.hubPrivSubnetCidr,
        SecurityListName: formData.hubPrivSlName,
        VCNRouteTableName: formData.hubPrivRtName,
        FirewallIP: formData.firewallIp,
      },
      PublicSubnet: {
        SubnetName: formData.hubPubSubnetName,
        SubnetCIDR: formData.hubPubSubnetCidr,
        SecurityListName: formData.hubPubSlName,
        VCNRouteTableName: formData.hubPubRtName,
      },
    },
    SpokeVCNA: {
      VCNName: formData.spokeAName,
      VCNCIDR: formData.spokeACidr,
      Subnet: {
        SubnetName: formData.spokeAPrivSubnetName,
        SubnetCIDR: formData.spokeAPrivSubnetCidr,
        SecurityListName: formData.spokeAPrivSlName,
        VCNRouteTableName: formData.spokeAPrivRtName,
      },
    },
    SpokeVCNB: {
      VCNName: formData.spokeBName,
      VCNCIDR: formData.spokeBCidr,
      Subnet: {
        SubnetName: formData.spokeBPrivSubnetName,
        SubnetCIDR: formData.spokeBPrivSubnetCidr,
        SecurityListName: formData.spokeBPrivSlName,
        VCNRouteTableName: formData.spokeBPrivRtName,
      },
    },
    DRGAttachmentsImports: {
      DRGRIHubAttachment: formData.drgRiHubAtt,
      DRGRTHubAttachment: formData.vcnRt1HubAttachment,
      VCNRT_HubAttachment: formData.vcnRt2HubAttachment,
      DRGRT_SpokeAAttachment: formData.drgRtSpokeAatt,
      DRGRT_SpokeBAttachment: formData.drgRtSpokeAttachmentB,
    },
    Gateways: {
      InternetGateway: {
        VCNIGWRouteTable: formData.internetGwRtName,
      },
      NATGateway: {
        VCNNATRouteTable: formData.natGwRtName,
      },
      ServiceGateway: {
        VCNServiceGWRouteTable: formData.serviceGwRtName,
      },
    },
    OnPrem: {
      SubnetCIDR: formData.onPremSubnetCidr,
      OnPremRouteTable: formData.onPremRouteTable,
    },
    SiteToSiteVPN: {
      Tunnel1RouteTable: formData.tunnelRouteTable1,
      Tunnel2RouteTable: formData.tunnelRouteTable2,
    },
  };
};

  const handleExportJSON = () => {
    const jsonData = convertToJSON();
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formData.vpcName || "topology2"}-config.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  // Send data to webhook
  const handleSendToWebhook = async () => {
    const jsonData = convertToJSON();

    // Replace with your actual webhook URL
    const webhookUrl =
      "https://n8n.i1h.nl/webhook/d8e35ed9-40cd-48b9-ab10-8635b9fc50ff";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log("Data successfully sent to webhook!");
      } else {
        console.log("Failed to send data to webhook. Please try again.");
      }
    } catch (error) {
      console.error("Error sending to webhook:", error);
      console.log(
        "Error sending data to webhook. Please check the console for details."
      );
    }
  };
  const handleGenerateNetwork = (e) => {
    e.preventDefault();
    setPreviewData(formData);
  };

  // Grouped fields for DiagramForm3
  const fieldGroups = {
    "Hub VCN": [
      {
        key: "hubVcnName",
        label: "VCN Name",
        id: "hubVcnName1",
        value: formData.hubVcnName,
        required: true,
      },
      {
        key: "hubVcnCidr",
        label: "VCN CIDR",
        id: "hubVcnCidr1",
        value: formData.hubVcnCidr,
        required: true,
      },
    ],
    "Hub Private Subnet": [
      {
        key: "hubPrivSubnetName",
        label: "Subnet Name",
        id: "hubPrivSubnetName1",
        value: formData.hubPrivSubnetName,
        required: true,
      },
      {
        key: "hubPrivSubnetCidr",
        label: "Subnet CIDR",
        id: "hubPrivSubnetCidr1",
        value: formData.hubPrivSubnetCidr,
        required: true,
      },
      {
        key: "hubPrivSlName",
        label: "Security List Name",
        id: "hubPrivSlName1",
        value: formData.hubPrivSlName,
      },
      {
        key: "hubPrivRtName",
        label: "VCN Route Table Name",
        id: "hubPrivRtName1",
        value: formData.hubPrivRtName,
      },
      {
        key: "firewallIp",
        label: "Firewall Ip",
        id: "firewallIp1",
        value: formData.firewallIp,
      },
    ],
    "Hub Public Subnet": [
      {
        key: "hubPubSubnetName",
        label: "Subnet Name",
        id: "hubPubSubnetName1",
        value: formData.hubPubSubnetName,
        required: true,
      },
      {
        key: "hubPubSubnetCidr",
        label: "Subnet CIDR",
        id: "hubPubSubnetCidr1",
        value: formData.hubPubSubnetCidr,
        required: true,
      },
      {
        key: "hubPubSlName",
        label: "Security List Name",
        id: "hubPubSlName1",
        value: formData.hubPubSlName,
      },
      {
        key: "hubPubRtName",
        label: "VCN Route Table Name",
        id: "hubPubRtName1",
        value: formData.hubPubRtName,
      },
    ],
    "Spoke VCN A": [
      {
        key: "spokeAName",
        label: "VCN A Name",
        id: "spokeAName1",
        value: formData.spokeAName,
        required: true,
      },
      {
        key: "spokeACidr",
        label: "VCN A CIDR",
        id: "spokeACidr1",
        value: formData.spokeACidr,
        required: true,
      },
    ],
    "Spoke VCN A – Private Subnet": [
      {
        key: "spokeAPrivSubnetName",
        label: "Subnet Name",
        id: "spokeAPrivSubnetName1",
        value: formData.spokeAPrivSubnetName,
        required: true,
      },
      {
        key: "spokeAPrivSubnetCidr",
        label: "Subnet CIDR",
        id: "spokeAPrivSubnetCidr1",
        value: formData.spokeAPrivSubnetCidr,
        required: true,
      },
      {
        key: "spokeAPrivSlName",
        label: "Security List Name",
        id: "spokeAPrivSlName1",
        value: formData.spokeAPrivSlName,
      },
      {
        key: "spokeAPrivRtName",
        label: "VCN Route Table Name",
        id: "spokeAPrivRtName1",
        value: formData.spokeAPrivRtName,
      },
    ],
    "Spoke VCN B": [
      {
        key: "spokeBName",
        label: "Subnet Name",
        id: "spokeBName1",
        value: formData.spokeBName,
        required: true,
      },
      {
        key: "spokeBCidr",
        label: "Subnet CIDR",
        id: "spokeBCidr1",
        value: formData.spokeBCidr,
        required: true,
      },
    ],
    "Spoke VCN B – Private Subnet": [
      {
        key: "spokeBPrivSubnetName",
        label: "Subnet Name",
        id: "spokeBPrivSubnetName1",
        value: formData.spokeBPrivSubnetName,
        required: true,
      },
      {
        key: "spokeBPrivSubnetCidr",
        label: "Subnet CIDR",
        id: "spokeBPrivSubnetCidr1",
        value: formData.spokeBPrivSubnetCidr,
        required: true,
      },
      {
        key: "spokeBPrivSlName",
        label: "Security List Name",
        id: "spokeBPrivSlName1",
        value: formData.spokeBPrivSlName,
      },
      {
        key: "spokeBPrivRtName",
        label: "VCN Route Table Name",
        id: "spokeBPrivRtName1",
        value: formData.spokeBPrivRtName,
      },
    ],
    "Internet Gateway": [
      {
        key: "internetGwRtName",
        label: "VCN IGW Route Table",
        id: "internetGwRtName1",
        value: formData.internetGwRtName,
      },
    ],
    "NAT Gateway": [
      {
        key: "natGwRtName",
        label: "VCN NAT Route Table",
        id: "natGwRtName1",
        value: formData.natGwRtName,
      },
    ],
    "Service Gateway": [
      {
        key: "serviceGwRtName",
        label: "VCN Service GW Route Table",
        id: "serviceGwRtName1",
        value: formData.serviceGwRtName,
      },
    ],
    "DRG Attachments / Imports": [
      {
        key: "drgRiHubAtt",
        label: "DRG RI Hub Attachment",
        id: "drgRiHubAtt1",
        value: formData.drgRiHubAtt,
      },
      {
        key: "vcnRt1HubAttachment",
        label: "DRG RT Hub Attachment",
        id: "vcnRt1HubAttachment1",
        value: formData.vcnRt1HubAttachment,
      },
      {
        key: "vcnRt2HubAttachment",
        label: "VCN RT Hub Attachment",
        id: "vcnRt2HubAttachment1",
        value: formData.vcnRt2HubAttachment,
      },
      {
        key: "drgRtSpokeAatt",
        label: "DRG RT Spoke A Attachment",
        id: "drgRtSpokeAatt1",
        value: formData.drgRtSpokeAatt,
      },
      {
        key: "drgRtSpokeAttachmentB",
        label: "DRG RT Spoke B Attachment",
        id: "drgRtSpokeAttachmentB1",
        value: formData.drgRtSpokeAttachmentB,
      },
    ],
    "On-Prem": [
      {
        key: "onPremSubnetCidr",
        label: "Subnet CIDR",
        id: "onPremSubnetCidr",
        value: formData.onPremSubnetCidr,
      },
      {
        key: "onPremRouteTable",
        label: "On-Prem Route Table",
        id: "onPremRouteTable",
        value: formData.onPremRouteTable,
      },
    ],
    "Site-to-Site VPN": [
      {
        key: "tunnelRouteTable1",
        label: "Tunnel 1 Route Table",
        id: "tunnelRouteTable1",
        value: formData.tunnelRouteTable1,
      },
      {
        key: "tunnelRouteTable2",
        label: "Tunnel 2 Route Table",
        id: "tunnelRouteTable2",
        value: formData.tunnelRouteTable2,
      },
    ],
  };

  const subGroups = [
    {
      groupName: "Hub VCN",
      fields: fieldGroups["Hub VCN"],
      subGroups: [
        {
          groupName: "Private Subnet",
          fields: fieldGroups["Hub Private Subnet"],
        },
        {
          groupName: "Public Subnet",
          fields: fieldGroups["Hub Public Subnet"],
        },
      ],
      spanClass: "2",
    },
    {
      groupName: "Spoke VCN A",
      fields: fieldGroups["Spoke VCN A"],
      subGroups: [
        {
          groupName: "Subnet VCN A",
          fields: fieldGroups["Spoke VCN A – Private Subnet"],
        },
      ],
    },
    {
      groupName: "Spoke VCN B",
      fields: fieldGroups["Spoke VCN B"],
      subGroups: [
        {
          groupName: "Spoke VCN B",
          fields: fieldGroups["Spoke VCN B – Private Subnet"],
        },
      ],
    },
    {
      groupName: "DRG Attachments / Imports",
      fields: fieldGroups["DRG Attachments / Imports"],
      spanClass: "1",
      rowSpan: "2",
    },
    {
      groupName: "Gateways",
      subGroups: [
        {
          groupName: "Internet Gateway",
          fields: fieldGroups["Internet Gateway"],
        },
        { groupName: "NAT Gateway", fields: fieldGroups["NAT Gateway"] },
        {
          groupName: "Service Gateway",
          fields: fieldGroups["Service Gateway"],
        },
      ],
      spanClass: "3",
    },
    {
      groupName: "On-Prem",
      fields: fieldGroups["On-Prem"],
      spanClass: "1",
    },
    {
      groupName: "Site-to-Site VPN",
      fields: fieldGroups["Site-to-Site VPN"],
      spanClass: "1",
    },
  ];
  const flowConfigGrouped = [
    [{ id: "chk-show-endpoints", label: "Show Endpoints" }],
    // Group 1: PRIV1 <-> PUB1 (THROUGH FW1)
    // [
    //   { id: 'chk-priv1-pub', label: 'PRIV1 → PUB1 (THROUGH FW1)' },
    //   { id: 'chk-pub1-priv1-fw1', label: 'PUB1 → PRIV1 (THROUGH FW1)' },
    // ],
    // Group 2: INET1 <-> PUB1
    [
      { id: "chk-inet1-pub1", label: "INET1 → PUB1" },
      { id: "chk-pub1-inet1", label: "PUB1 → INET1" },
    ],
    // Group 3: FW1 INET1 + PRIV1 FW1 + FW1 PUB1
    [{ id: "chk-fw1-inet1", label: "FW1 → INET1" }],
    // Group 4: FW1 INET1 + PRIV1 FW1 + FW1 PUB1
    [
      { id: "chk-pub1-fw1", label: "PUB1 → FW1" },
      { id: "chk-fw1-pub1", label: "FW1 → PUB1" },
    ],
    // Group 5: FW1 INET1 + PRIV1 FW1 + FW1 PUB1
    [{ id: "chk-priv1-inet1-bypass-fw", label: "PRIV1 → INET1 (Bypass FW)" }],
    // Group 6: PRIV1 → INET1 (normal and through FW)
    [{ id: "chk-priv1-inet1-fw", label: "PRIV1 → INET1 (Through FW)" }],
    // Group 7: PRIV1 → INET1 (normal and through FW)
    [
      { id: "chk-pub1-priv1", label: "PUB1 → PRIV1" },
      { id: "chk-priv1-pub1", label: "PRIV1 → PUB1" },
    ],
    // Group 8: PUB1 <-> PRIV2
    [
      { id: "chk-pub1-priv2", label: "PUB1 → PRIV2" },
      { id: "chk-priv2-pub1", label: "PRIV2 → PUB1" },
    ],
    // Group 9: PRIV2 <-> INET1
    [{ id: "chk-priv2-inet1", label: "PRIV2 → INET1" }],
    // Group 10: PRIV1 <-> PRIV2
    [
      { id: "chk-priv1-priv2", label: "PRIV1 → PRIV2" },
      { id: "chk-priv2-priv1", label: "PRIV2 → PRIV1" },
    ],
    // Group 11: PRIV3 <-> PUB1 & INET1
    [
      { id: "chk-pub1-priv3", label: "PUB1 → PRIV3" },
      { id: "chk-priv3-pub1", label: "PRIV3 → PUB1" },
    ],
    // Group 12: PRIV3 <-> INET1
    [{ id: "chk-priv3-inet1", label: "PRIV3 → INET1" }],
    // Group 13: PRIV1 <-> PRIV3
    [
      { id: "chk-priv1-priv3", label: "PRIV1 → PRIV3" },
      { id: "chk-priv3-priv1", label: "PRIV3 → PRIV1" },
    ],
    // Group 14: PRIV2 <-> PRIV3
    [
      { id: "chk-priv2-priv3", label: "PRIV2 → PRIV3" },
      { id: "chk-priv3-priv2", label: "PRIV3 → PRIV2" },
    ],
    // Group 15: SBI Access
    [{ id: "chk-priv1-sbi", label: "PRIV1 → SBI" }],
    // Group 16: SBI Access
    [{ id: "chk-priv2-sbi", label: "PRIV2 → SBI" }],
    // Group 16: SBI Access
    [{ id: "chk-priv3-sbi", label: "PRIV3 → SBI" }],
    // Group 16: SBI Access
    [{ id: "chk-pub1-sbi", label: "PUB1 → SBI" }],
    // Group 18:
    [
      { id: "chk-op1-fw1-priv1", label: "OP1 → PRIV1 (Through FW)" },
      { id: "chk-priv1-fw1-op1", label: "PRIV1 → OP1 (Through FW)" }
    ],
    // Group 18:
    [
      { id: "chk-op1-pub1", label: "OP1 → PUB1" },
      { id: "chk-pub1-op1", label: "PUB1 → OP1" }
    ],
    // Group 19: 
    [
      { id: "chk-op1-priv2", label: "OP1 → PRIV2" },
      { id: "chk-priv2-op1", label: "PRIV2 → OP1" }
    ],
    // Group 20:
    [
      { id: "chk-op1-priv3", label: "OP1 → PRIV3" },
      { id: "chk-priv3-op1", label: "PRIV3 → OP1" }
    ],
  ];

  return (
    <main>
      <Header title='Hub and Spoke VCN with site-to-site VPN to on-premises Architecture' />
      <section id="topo2-sec" className="topology-section">
        <div
          className={`container ${
            flowCheckboxes["chk-show-endpoints"] ? "left" : ""
          } `}
        >
          <form className="network-form" onSubmit={handleGenerateNetwork}>
            <DiagramForm3
              subGroups={subGroups}
              onFieldChange={handleUpdateFormData}
              onPopulate={handlePopulateFields}
            />
          </form>
          {previewData && (
            <div className="preview-container">
              <DiagramPreview3
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

export default Topology3;
