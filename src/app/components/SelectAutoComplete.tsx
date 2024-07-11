import React from "react";
import Select from "react-select";

const SelectAutocomplete = (props: any) => {
  return (
    <>
      {" "}
      <Select
        {...props}
        isClearable={props?.isClearable}
        value={props.value}
        menuPlacement="auto"
        options={props.options}
        placeholder={props.label}
        maxMenuHeight={props?.maxMenuHeight || 250}
        defaultValue={props.defaultValue || "Select"}
        isMulti={props?.isMulti}
        className={` w-full rounded-lg text-sm bg-gray-600  ${props?.className}`}
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "white",
            borderRadius: "4px",
            textAlign: "left",
          }),
          menu: (provided) => ({
            ...provided,
            border: "none",
            backgroundColor: "white",
          }),
          input: (provided, state) => ({
            ...provided,
            border: "none !important",
            outline: "none",
            "[type='text']:focus": {
              border: "none !important",
              outline: "none",
              "--tw-ring-shadow": "0",
              textAlign: "left",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            border: "none !important",
            backgroundColor: state.isSelected ? "#007BFF" : "white",
            color: state.isSelected ? "white" : "black",
            textAlign: "left",
          }),
          multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "black",
            ":hover": {
              backgroundColor: "gray",
              color: "white",
            },
          }),
        }}
      />
    </>
  );
};
export default SelectAutocomplete;
