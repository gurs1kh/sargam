import { useState } from "react";
import { useLocalStorage } from "./utils/useLocalStorage";
import { ToggleGroup } from "./components/ToggleGroup";
import './App.css';

const sargam = `ਸ̣ ਰ॒̣ ਰ̣ ਗ॒̣ ਗ̣ ਮ̣ ਮ॑​̣ ਪ̣ ਧ॒̣ ਧ̣ ਨ॒̣ ਨ̣
                ਸ ਰ॒ ਰ ਗ॒ ਗ ਮ ਮ॑ ਪ ਧ॒ ਧ ਨ॒ ਨ ਸ̇
                ਰ॒̇ ਰ̇ ਗ॒̇ ਗ̇ ਮ̇ ਮ॑̇ ਪ̇ ਧ॒̇ ਧ̇ ਨ॒̇ ਨ̇ ਸ̈
              `.trim().split(/[\s\n]+/g).join(' ')

const accidentalMarkRegex = new RegExp(' ॒ ॑'.trim().split(' ').join('|'))
const rangeOptions = ['ਸ↔ਸ̇', 'ਪ̣↔ਮ̇', 'ਸ̣↔ਸ̈']

export const App = () => {
  const [swar, setSwar] = useState('ਸ')
  const [noteRange, setNoteRange] = useLocalStorage('noteRange', rangeOptions[0])
  const [includeAccidentals, setIncludeAccidentals] = useLocalStorage('includeAccidentals', false)

  const onClick = () => {
    const [startNote, endNote] = noteRange.split('↔');
    const sargamInRange = sargam
      .replace(new RegExp(`^.+?(?=${startNote})`), '')
      .replace(new RegExp(`(?<=${endNote}).+?$`), '')

    const allowedSargam = sargamInRange
      .split(' ')
      .filter((swar) => includeAccidentals || !swar.match(accidentalMarkRegex));

    const newSwar = allowedSargam.sort(() => Math.random() - 0.5)[0]
    setSwar(newSwar)
  }

  return (
    <div className="container">
      <div className="swar" onClick={onClick}>
        <span className="swar-text">
          {swar}
        </span>
      </div>
      <div className="settings">
        <ToggleGroup
          options={rangeOptions.map((value) => ({ value, text: value }))}
          selected={noteRange}
          onChange={(value) => setNoteRange(value)}
        />
        <label>
          <input
            type="checkbox"
            checked={includeAccidentals}
            onChange={() => setIncludeAccidentals(!includeAccidentals)}
          />
          Include komal/teevra notes
        </label>
      </div>
    </div>
  );
}