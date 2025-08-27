import React from "react";

const FormInput = ({ label, placeholder, type = "text", id }) => {
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
        placeholder={placeholder}
        className="block border border-input-border rounded-lg w-full px-4 py-3 font-normal focus:border-primary outline-none focus:border-2 focus:ring-2 focus:ring-primary/40 font-primary shadow-sm bg-bg-main"
      />
      <span className="text-red-500 text-sm font-primary hidden">
        o erro vai aqui
      </span>
    </label>
  );
};

export default FormInput;
