import React from "react";
import FlowCheckbox from "../common/FlowCheckbox";

const FlowCheckboxGroups = ({
  flowConfigGrouped, 
  flowCheckboxes,
  activeGroupIndex,
  handleFlowCheckboxChange,
}) => {
  return (
    <div className="form-checkouts column">
      {flowConfigGrouped.slice(1, 22).map((group, groupIndex) => {
        const isDisabled =
          activeGroupIndex !== null && activeGroupIndex !== groupIndex;

        return (
          <div
            className={`flow-checkbox-group ${isDisabled ? "disabled-group" : ""}`}
            key={`group-${groupIndex}`}
            style={{
              opacity: isDisabled ? 0.5 : 1,
              cursor: isDisabled ? "not-allowed" : "auto",
            }}
            title={isDisabled ? "Uncheck the active group first" : ""}
          >
            {group.map(({ id, label }) => (
              <FlowCheckbox
                key={id}
                id={id}
                label={label}
                checked={flowCheckboxes[id] ?? false}
                onChange={(e) => handleFlowCheckboxChange(e, groupIndex)}
                disabled={isDisabled}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default FlowCheckboxGroups;
