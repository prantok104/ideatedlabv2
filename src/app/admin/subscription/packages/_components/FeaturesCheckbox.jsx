// components/FeatureCheckbox.js
import * as React from "react";

export default function FeatureCheckbox({ feature }) {
  const [checked, setChecked] = React.useState(
    feature.permissions.map((permission) => permission.checked || false)
  );

  const handleChange = (index) => (event) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = event.target.checked;
      return newChecked;
    });
  };

  const handleParentChange = (event) => {
    setChecked((prevChecked) => prevChecked.map(() => event.target.checked));
  };

  return (
    <div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={checked.every((checked) => checked)}
          indeterminate={
            checked.some((checked) => checked) &&
            !checked.every((checked) => checked)
          }
          onChange={handleParentChange}
          className="form-checkbox"
        />
        <span className="ml-2">{feature.name}</span>
      </div>
      {feature.permissions.map((permission, index) => (
        <div key={permission.id} className="flex items-center">
          <input
            type="checkbox"
            checked={checked[index]}
            onChange={handleChange(index)}
            className="form-checkbox"
          />
          <span className="ml-2">{permission.title}</span>
        </div>
      ))}
    </div>
  );
}
