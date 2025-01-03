import classNames from 'classnames'
import './ToggleButtonGroup.scss'

interface ToggleButtonGroupProps<T> {
  options: { value: T; text: string }[]
  selected: T
  onChange: (value: T) => void
}

export const ToggleButtonGroup = <T,>({
  selected,
  options,
  onChange,
}: ToggleButtonGroupProps<T>) => {
  return (
    <div className="toggle-button-group">
      {options.map(({ value, text }) => (
        <ToggleButton
          key={String(value)}
          text={text}
          value={value}
          onClick={() => onChange(value)}
          selected={value === selected}
        />
      ))}
    </div>
  )
}

interface ToggleButtonProps<T> {
  text: string
  onClick: () => void
  selected?: boolean
  value?: T
}

export const ToggleButton = <T,>({ text, onClick, selected, value }: ToggleButtonProps<T>) => {
  return (
    <button
      className={classNames(['toggle-button', { 'toggle-button--selected': selected }])}
      value={String(value)}
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
