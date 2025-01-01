import './ToggleButtonGroup.css'

interface ToggleButtonGroupProps {
  options: { value: string; text: string }[]
  selected: string
  onChange: (value: string) => void
}

export const ToggleButtonGroup = ({ selected, options, onChange }: ToggleButtonGroupProps) => {
  return (
    <div className="toggle-button-group">
      {options.map(({ value, text }) => (
        <ToggleButton
          key={value}
          text={text}
          value={value}
          onClick={() => onChange(value)}
          selected={value === selected}
        />
      ))}
    </div>
  )
}

interface ToggleButtonProps {
  text: string
  onClick: () => void
  selected?: boolean
  value?: string
}

export const ToggleButton = ({ text, onClick, selected, value }: ToggleButtonProps) => {
  return (
    <button
      className={`toggle-button ${selected ? 'toggle-button-selected' : ''}`}
      value={value}
      onClick={onClick}
      onTouchEnd={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <span className="toggle-button-text">{text}</span>
    </button>
  )
}
