// components/NetworkLabels.js
import React from "react";

const NetworkLabels = ({ formData }) => {
  const labelGroups = [
    {
      className: "nlg-1",
      name: formData.hubVcnName,
      domain: formData.hubVcnCidr,
      textClass: "text-orange"
    },
    {
      className: "nlg-2",
      name: formData.hubPrivSubnetName,
      domain: formData.hubPrivSubnetCidr,
      textClass: "text-orange"
    },
    {
      className: "nlg-3",
      name: formData.hubPubSubnetName,
      domain: formData.hubPubSubnetCidr,
      textClass: "text-orange"
    },
    {
      className: "nlg-4",
      name: formData.spokeAName,
      domain: formData.spokeACidr,
      textClass: "text-blue"
    },
    {
      className: "nlg-5",
      name: formData.spokeAPrivSubnetName,
      domain: formData.spokeAPrivSubnetCidr,
      textClass: "text-blue"
    },
    {
      className: "nlg-6",
      name: formData.spokeBName,
      domain: formData.spokeBCidr,
      textClass: "text-blue"
    },
    {
      className: "nlg-7",
      name: formData.spokeBPrivSubnetName,
      domain: formData.spokeBPrivSubnetCidr,
      textClass: "text-blue"
    }
  ];

  return (
    <>
      {labelGroups.map((group, index) => (
        <div key={index} className={`network-label-grp ${group.className}`}>
          <span className={`network-label-name ${group.textClass}`}>
            {group.name}
          </span>
          <span className={`network-label-domain ${group.textClass}`}>
            {group.domain}
          </span>
        </div>
      ))}
    </>
  );
};

export default NetworkLabels;