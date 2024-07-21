import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import "!./Checkbox.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Renders a checkbox input with a label.
 *
 * @param label - The label text to display next to the checkbox.
 * @param checked - The initial checked state of the checkbox.
 * @param onChange - A callback function that is called when the checkbox is checked or unchecked. The function receives the new checked state as a parameter.
 * @returns A React element representing the checkbox and label.
 */
function Checkbox({ label, checked, onChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: h.JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.checked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="checkbox-input"
      />
      <span>{label}</span>
    </label>
  );
}

export default Checkbox;
