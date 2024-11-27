import PermissionList from "./PermissionList";

const Module = ({ moduleData, checkedList, setFieldValue }) => {
  return (
    <div>
      {/* <h3 className="mt-4 mb-3">{moduleData.module}</h3> */}
      {moduleData.features.map((feature) => (
        <PermissionList
          key={feature.name}
          feature={feature}
          checkedList={checkedList}
          setFieldValue={setFieldValue}
        />
      ))}
    </div>
  );
};

export default Module;
