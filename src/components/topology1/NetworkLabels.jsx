import React from "react";

const NetworkLabels = ({ formData }) => {
  return (
    <>
      <div className="network-label-grp vcn-name-label">
        <span className="network-label-name" id="vpc-name-1">
          {formData.vpcName}
        </span>
        <span className="network-label-domain" id="vcn-cidr-1">
          {formData.vpcCIDR}
        </span>
      </div>
      <div className="network-label-grp public-name-label">
        <span className="network-label-name" id="public-name-1">
          {formData.publicSubnetName}
        </span>
        <span className="network-label-domain" id="public-cidr-1">
          {formData.publicSubnetCIDR}
        </span>
      </div>
      <div className="network-label-grp private-name-label">
        <span className="network-label-name" id="private-name-1">
          {formData.privateSubnetRange}
        </span>
        <span className="network-label-domain" id="private-cidr-1">
          {formData.privateSubnetCIDR}
        </span>
      </div>
      <div className="network-label-grp rt-name-label">
        <span className="network-label-name" id="subnet-label-1">
          {formData.SubnetName}
        </span>
        <span className="network-label-domain" id="subnet-no-1">
          {formData.SubnetRange}
        </span>
      </div>
    </>
  );
};

export default NetworkLabels;