import React from "react";

const FormInput = ({
  label,
  placeholder,
  type = "text",
  id,
  onChange,
  value,
  error,
  autoComplete,
}) => {
  return (
    <label
      htmlFor={id}
      className="text-text-main font-semibold font-secondary block"
    >
      {label}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="block border border-input-border rounded-lg w-full px-4 py-3 font-normal focus:border-primary outline-none focus:border-2 focus:ring-2 focus:ring-primary/40 font-primary shadow-sm bg-bg-main my-1"
      />
      <span
        className={`text-red-500 text-sm font-primary ${
          error ? "block" : "hidden"
        }`}
      >
        {error && error}
      </span>
    </label>
  );
};

export default FormInput;
