import React from "react";
import CreatableSelect from "react-select/creatable";
import { components, Props as SelectProps, GroupBase, StylesConfig } from "react-select";
import { Badge } from "@tremor/react";

type OptionType = { value: string; label: string };

const customStyles: StylesConfig<OptionType, true> = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? '#1670A6' : '#ccc',
    '&:hover': {
      borderColor: '#1670A6',
    },
    boxShadow: state.isFocused ? '0 0 0 1px #1670A6' : null,
    backgroundColor: 'transparent',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1670A6' : state.isFocused ? 'rgba(22, 112, 166, 0.1)' : 'transparent',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: 'rgba(22, 112, 166, 0.3)',
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: 'default',  // Default background color for multi-value selections
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'black',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#1670A6',
    '&:hover': {
      backgroundColor: '#1670A6',
      color: 'white',
    },
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999, // Ensure the menu appears on top of the modal
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999, // Ensure the menu appears on top of the modal
  }),
};

type CustomSelectProps = SelectProps<OptionType, true, GroupBase<OptionType>> & {
  components?: {
    Option?: typeof components.Option;
    MultiValue?: typeof components.MultiValue;
  };
};

const customComponents: CustomSelectProps['components'] = {
  Option: ({ children, ...props }) => (
    <components.Option {...props}>
      <Badge color="blue" size="sm">
        {children}
      </Badge>
    </components.Option>
  ),
  MultiValue: ({ children, ...props }) => (
    <components.MultiValue {...props}>
      <Badge color="blue" size="sm">
        {children}
      </Badge>
    </components.MultiValue>
  ),
};

type CreatableMultiSelectProps = SelectProps<OptionType, true, GroupBase<OptionType>> & {
  onCreateOption?: (inputValue: string) => void;
};

const CreatableMultiSelect: React.FC<CreatableMultiSelectProps> = ({ value, onChange, onCreateOption, options, placeholder }) => (
  <CreatableSelect
    isMulti
    value={value}
    onChange={onChange}
    onCreateOption={onCreateOption}
    options={options}
    placeholder={placeholder}
    styles={customStyles}
    components={customComponents}
    menuPortalTarget={document.body} // Render the menu in a portal
    menuPosition="fixed"
  />
);

export default CreatableMultiSelect;
