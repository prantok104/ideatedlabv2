import React from "react";
import { BiChevronDown } from "react-icons/bi";
import Checkbox from "@/components/form/Checkbox";

const FeatureSection = ({
  values,
  setFieldValue,
  isAccordion,
  toggleAccordion,
  isfeaturesModule,
  expandedFeatures,
}) => {
  const handleFeatureSelect = (featureName, featurePermissions) => {
    const isSelected = featurePermissions.every((id) =>
      values.features.includes(id)
    );

    if (isSelected) {
      // Deselect all permissions under this feature
      setFieldValue(
        "features",
        values.features.filter((id) => !featurePermissions.includes(id))
      );
      // Collapse the tree if the feature is deselected
      expandedFeatures = expandedFeatures.filter(
        (name) => name !== featureName
      );
    } else {
      // Select all permissions under this feature
      setFieldValue("features", [
        ...values.features,
        ...featurePermissions.filter((id) => !values.features.includes(id)),
      ]);
      // Ensure the tree is expanded
      expandedFeatures = [...expandedFeatures, featureName];
    }
  };

  return (
    <div>
      <h2 className="text-[#1c252e] text-2xl font-semibold font-['Public Sans'] leading-loose mt-6">
        Features
      </h2>

      <h2
        className="text-[#454f5b] text-base font-semibold font-['Public Sans'] inline-flex items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <BiChevronDown
          size={24}
          className={`transform transition-transform duration-300 mr-3 ${
            isAccordion ? "rotate-180" : ""
          }`}
        />
        {values.module}
      </h2>

      {/* Accordion Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
        style={{
          maxHeight: isAccordion ? "100%" : "0", // Animate max height
        }}
      >
        {isfeaturesModule?.features.map((feature) => {
          const featurePermissions = feature.permissions.map((p) => p.id);

          // Check if at least one permission is selected to expand the feature tree
          const isExpanded =
            expandedFeatures.includes(feature.name) ||
            featurePermissions.some((id) => values.features.includes(id));

          return (
            <div key={feature.name} className="ml-9">
              {/* Feature Checkbox */}
              <Checkbox
                label={feature.name}
                name={`features`}
                value={feature.name}
                checked={featurePermissions.every((id) =>
                  values.features.includes(id)
                )}
                onChange={() =>
                  handleFeatureSelect(feature.name, featurePermissions)
                }
              />

              {/* Expand permissions if at least one permission is selected or the feature is manually expanded */}
              {isExpanded &&
                feature.permissions.map((permission) => {
                  const permissionId = permission.id;
                  const isChecked = values.features.includes(permissionId);
                  return (
                    <div key={permissionId} className="ml-4">
                      <Checkbox
                        label={permission.title}
                        name={`features`}
                        value={permissionId}
                        checked={isChecked}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const currentPermissions = values.features;

                          if (isChecked) {
                            // Add permission ID to features
                            setFieldValue("features", [
                              ...currentPermissions,
                              permissionId,
                            ]);
                          } else {
                            // Remove permission ID if unchecked
                            const updatedPermissions =
                              currentPermissions.filter(
                                (id) => id !== permissionId
                              );
                            setFieldValue("features", [...updatedPermissions]);

                            // If all permissions under the feature are unchecked, uncheck the feature checkbox
                            if (
                              featurePermissions.every(
                                (id) => !updatedPermissions.includes(id)
                              )
                            ) {
                              // Remove feature from expandedFeatures
                              expandedFeatures = expandedFeatures.filter(
                                (name) => name !== feature.name
                              );
                            }
                          }
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
