import React, { useState } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div>
      <input
        className="mx-3"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        style={{
          appearance: "none",
          border: "none",
          outline: "none",
          backgroundColor: "rgba(0, 101, 243, 0.06)",
          cursor: "pointer",
          width: "16px",
          height: "16px",
          boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05) inset",
          borderRadius: "2px",
          marginLeft: "-20px"
        }}
      />
      <label style={{ marginLeft: "-1.2%", fontSize: "16px", color: "#505050" }}>La actividad tiene participacion abierta</label>
      <style>
        {`
          input[type=checkbox]:checked {
            background-color: rgba(0, 101, 243, 0.8);
            background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Crect width="10" height="10" x="3" y="3" fill="%230d6efd" rx="2" /%3E%3C/svg%3E');
            background-repeat: no-repeat;
            background-position: center;
          }
        `}
      </style>
    </div>
  );
};

export default Checkbox;
