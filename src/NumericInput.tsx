import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import "./NumericInput.css";
/**
 * Defines the props for the `NumericInput` component.
 *
 * @property {number} value - The current value of the input.
 * @property {(newValue: number) => void} onChange - A callback function that is called when the input value changes, with the new value as a parameter.
 * @property {(value: number) => void} [onBlur] - An optional callback function that is called when the input loses focus, with the final value as a parameter.
 * @property {string} [placeholder] - An optional placeholder text to display in the input.
 * @property {string} [className] - An optional CSS class name to apply to the input.
 */
interface NumericInputProps {
  value: number;
  onChange: (newValue: number) => void;
  onBlur?: (value: number) => void;
  placeholder?: string;
  className?: string;
}

/**
 * A numeric input component that allows the user to enter a number and calls an `onChange` callback with the new value.
 *
 * @param value - The current value of the input.
 * @param onChange - A callback function that is called when the input value changes, with the new value as a parameter.
 * @param onBlur - An optional callback function that is called when the input loses focus, with the final value as a parameter.
 * @param placeholder - An optional placeholder text to display in the input.
 * @param className - An optional CSS class name to apply to the input.
 */
const NumericInput: FunctionComponent<NumericInputProps> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInputChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    const newValue = e.currentTarget.value;
    setInputValue(newValue);
    if (!isNaN(parseFloat(newValue))) {
      onChange(parseFloat(newValue));
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(parseFloat(inputValue));
    }
  };

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  return (
    <input
      type="number"
      value={inputValue}
      onInput={handleInputChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={`numeric-input ${className || ""}`}
    />
  );
};

export default NumericInput;
