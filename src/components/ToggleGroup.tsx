import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface ToggleGroupProps {
  options: { value: string, text: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export const ToggleGroup = ({ selected, options, onChange }: ToggleGroupProps) => {
  return (
    <ToggleButtonGroup>
      {options.map(({ value, text }) => (
        <ToggleButton value={value} selected={value === selected} onClick={() => onChange(value)}>
          <span className="toggle-button-text">{text}</span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}