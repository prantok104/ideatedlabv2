import { Checkbox, Divider } from "antd";

const PermissionList = ({ feature, checkedList, setFieldValue }) => {
  const featurePermissions = feature.permissions;
  const featureCheckedList = checkedList.filter((id) =>
    featurePermissions.some((permission) => permission.id === id)
  );

  const checkAll = featurePermissions.length === featureCheckedList.length;
  const indeterminate =
    featureCheckedList.length > 0 &&
    featureCheckedList.length < featurePermissions.length;

  const handlePermissionChange = (list) => {
    const uniqueList = Array.from(new Set(list));
    console.log(uniqueList);
    setFieldValue("permissions", uniqueList);
  };

  const handleSelectAllChange = (e) => {
    console.log(e.target);

    if (e.target.checked) {
      handlePermissionChange([
        ...checkedList,
        ...featurePermissions.map((permission) => permission.id),
      ]);
    } else {
      handlePermissionChange(
        checkedList.filter(
          (id) => !featurePermissions.some((permission) => permission.id === id)
        )
      );
    }
  };

  const handleSingleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the selected permission to the checked list
      handlePermissionChange([...checkedList, value]);
    } else {
      // Remove the deselected permission from the checked list
      handlePermissionChange(checkedList?.filter((id) => id !== value));
    }
  };

  return (
    <div className="mb-5 mt-4">
      <Checkbox
        indeterminate={indeterminate}
        onChange={handleSelectAllChange}
        checked={checkAll}
      >
        <h4 className="font-semibold">{feature.name}</h4>
      </Checkbox>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-x-4 mt-2">
        {featurePermissions?.map((permission) => (
          <div
            className="ml-5 mb-4 p-4 rounded-lg bg-[#ebe7e782]"
            // style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.07)" }}
          >
            <Checkbox
              key={permission?.id}
              value={permission?.id}
              checked={featureCheckedList.includes(permission?.id)}
              onChange={handleSingleCheckboxChange}
            >
              <span className="font-semibold">{permission?.title}</span>
            </Checkbox>
            <div>
              <p className="text-xs ml-6 text-[#667085]">
                {permission?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionList;
