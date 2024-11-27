import { useField } from "formik";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const PermissionTree = ({
  modules,
  values,
  setFieldValue,
  name = "features",
}) => {
  console.log(modules.map((module) => module));
  const [expandedModules, setExpandedModules] = useState([]);
  const [expandedFeatures, setExpandedFeatures] = useState({});
  const featureRefs = useRef([]);
  const [field, meta, helpers] = useField(name);

  const isAllPermissionsSelected = (permissions) => {
    return permissions.every((permission) =>
      values?.[name]?.includes(permission.id)
    );
  };

  const isSomePermissionsSelected = (permissions) => {
    return permissions.some((permission) =>
      values?.[name]?.includes(permission.id)
    );
  };

  const handleFeatureChange = (permissions, isChecked) => {
    const permissionIds = permissions.map((permission) => permission.id);

    if (isChecked) {
      setFieldValue(name, [
        ...new Set([...(values?.[name] || []), ...permissionIds]),
      ]);
    } else {
      setFieldValue(
        name,
        values?.[name]?.filter((id) => !permissionIds.includes(id))
      );
    }
  };

  const toggleModule = (moduleIndex) => {
    setExpandedModules((prevState) =>
      prevState.includes(moduleIndex)
        ? prevState.filter((index) => index !== moduleIndex)
        : [...prevState, moduleIndex]
    );
  };

  const toggleFeature = (moduleIndex, featureIndex) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [`${moduleIndex}-${featureIndex}`]:
        !prev[`${moduleIndex}-${featureIndex}`],
    }));
  };

  useEffect(() => {
    modules.forEach((module, moduleIndex) => {
      module.features.forEach((feature, featureIndex) => {
        const ref = featureRefs.current[`${moduleIndex}-${featureIndex}`];
        if (ref) {
          const allSelected = isAllPermissionsSelected(feature.permissions);
          const someSelected = isSomePermissionsSelected(feature.permissions);
          ref.indeterminate = someSelected && !allSelected;
        }
      });
    });
  }, [values?.[name], modules]);

  return (
    <>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
      <div className="flex gap-2">
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="my-4 w-[300px]">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleModule(moduleIndex)}
            >
              <span>
                {expandedModules.includes(moduleIndex) ? (
                  <FaAngleDown />
                ) : (
                  <FaAngleUp />
                )}
              </span>
              <h3 className="font-bold text-lg">{module.module}</h3>
            </div>

            {expandedModules.includes(moduleIndex) && (
              <div>
                {module.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="ml-4 my-2">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleFeature(moduleIndex, featureIndex)}
                    >
                      <span className="mr-2">
                        {expandedFeatures[`${moduleIndex}-${featureIndex}`] ? (
                          <FaAngleDown />
                        ) : (
                          <FaAngleUp />
                        )}
                      </span>

                      <input
                        type="checkbox"
                        ref={(el) =>
                          (featureRefs.current[
                            `${moduleIndex}-${featureIndex}`
                          ] = el)
                        }
                        id={`feature-${featureIndex}${moduleIndex}`}
                        checked={isAllPermissionsSelected(feature.permissions)}
                        onChange={(e) =>
                          handleFeatureChange(
                            feature.permissions,
                            e.target.checked
                          )
                        }
                        className="custom-checkbox h-4 w-4 border-gray-200"
                      />
                      <label
                        htmlFor={`feature-${featureIndex}${moduleIndex}`}
                        className="ml-2 font-semibold"
                      >
                        {feature.name}
                      </label>
                    </div>

                    {expandedFeatures[`${moduleIndex}-${featureIndex}`] && (
                      <div className="ml-12">
                        {feature.permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center mt-2"
                          >
                            <input
                              type="checkbox"
                              id={permission.id}
                              name={name}
                              value={permission.id}
                              checked={values?.[name]?.includes(permission.id)}
                              onChange={() => {
                                const isChecked = values?.[name]?.includes(
                                  permission.id
                                );
                                if (isChecked) {
                                  setFieldValue(
                                    name,
                                    values?.[name]?.filter(
                                      (id) => id !== permission.id
                                    )
                                  );
                                } else {
                                  setFieldValue(name, [
                                    ...(values?.[name] || []),
                                    permission.id,
                                  ]);
                                }
                              }}
                              className="custom-checkbox h-4 w-4 border-gray-200"
                            />
                            <label
                              htmlFor={permission.id}
                              className="ml-2 text-sm"
                            >
                              {permission.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PermissionTree;
