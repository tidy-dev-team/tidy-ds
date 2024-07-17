import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import "!./Dropdown.css";

export interface DropdownOption {
  id: string | number;
  name: string;
  [key: string]: any;
}

interface DropdownProps {
  options: any[];
  selectedOption?: DropdownOption | null;
  onSelect: (option: DropdownOption | null) => void;
  placeholder?: string;
  renderOption?: (option: DropdownOption) => h.JSX.Element;
}

interface DropdownButtonProps {
  selectedOption?: DropdownOption | null;
  placeholder?: string;
  toggleDropdown: () => void;
  setIsOpen: (value: boolean) => void;
}

const DropdownButton: FunctionalComponent<DropdownButtonProps> = ({
  selectedOption,
  placeholder,
  toggleDropdown,
  setIsOpen,
}) => (
  <button
    className="dropdown-toggle"
    onClick={toggleDropdown}
    onBlur={() => setIsOpen(false)}
  >
    <div className="select-dropdown-title">
      <div id="dropdown-title">
        {selectedOption ? selectedOption.name : placeholder}
      </div>
    </div>
  </button>
);

interface DropdownMenuProps {
  options: DropdownOption[];
  handleSelect: (option: DropdownOption) => void;
  renderOption?: (option: DropdownOption) => h.JSX.Element;
}

const DropdownMenu: FunctionalComponent<DropdownMenuProps> = ({
  options,
  handleSelect,
  renderOption,
}) => (
  <div className="dropdown-menu">
    {options.map((option) => (
      <div
        key={option.id}
        className="dropdown-item"
        onMouseDown={(e) => {
          e.preventDefault();
          handleSelect(option);
        }}
      >
        {renderOption ? renderOption(option) : option.name}
      </div>
    ))}
  </div>
);

const Dropdown: FunctionalComponent<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  placeholder = "Select an option",
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-comp">
      <div className="dropdown-wrapper">
        <DropdownButton
          selectedOption={selectedOption}
          placeholder={placeholder}
          toggleDropdown={toggleDropdown}
          setIsOpen={setIsOpen}
        />
        {isOpen && (
          <DropdownMenu
            options={options}
            handleSelect={handleSelect}
            renderOption={renderOption}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
