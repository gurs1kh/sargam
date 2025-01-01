import { useState } from "react";
import { useLocalStorage } from "./utils/useLocalStorage";
import { ToggleButtonGroup, ToggleButton } from "./components/ToggleButtonGroup";
import './App.css';

const allNotes = `ਸ̣ ਰ॒̣ ਰ̣ ਗ॒̣ ਗ̣ ਮ̣ ਮ॑​̣ ਪ̣ ਧ॒̣ ਧ̣ ਨ॒̣ ਨ̣
                ਸ ਰ॒ ਰ ਗ॒ ਗ ਮ ਮ॑ ਪ ਧ॒ ਧ ਨ॒ ਨ ਸ̇
                ਰ॒̇ ਰ̇ ਗ॒̇ ਗ̇ ਮ̇ ਮ॑̇ ਪ̇ ਧ॒̇ ਧ̇ ਨ॒̇ ਨ̇ ਸ̈
              `.trim().split(/[\s\n]+/g).join(' ')

const accidentalMarkRegex = new RegExp(' ॒ ॑'.trim().split(' ').join('|'))
const rangeOptions = ['ਸ↔ਸ̇', 'ਪ̣↔ਮ̇', 'ਸ̣↔ਸ̈']

export const App = () => {
  const [currentNote, setCurrentNote] = useState('ਸ')
  const [noteRange, setNoteRange] = useLocalStorage('noteRange', rangeOptions[0])
  const [includeAccidentals, setIncludeAccidentals] = useLocalStorage('includeAccidentals', false)

  const onClick = () => {
    const [startNote, endNote] = noteRange.split('↔');
    const notesInRange = allNotes
      .replace(new RegExp(`^.+?(?=${startNote})`), '')
      .replace(new RegExp(`(?<=${endNote}).+?$`), '')

    const allowedNotes = notesInRange
      .split(' ')
      .filter((note) => includeAccidentals || !note.match(accidentalMarkRegex))
      .filter((note) => note !== currentNote);

    const newNote = allowedNotes.sort(() => Math.random() - 0.5)[0]
    setCurrentNote(newNote)
  }

  return (
    <div className="container">
      <div className="current-note" onClick={onClick}>
        <span className="current-note-text">
          {currentNote}
        </span>
      </div>
      <div className="settings">
        <ToggleButtonGroup
          options={rangeOptions.map((value) => ({ value, text: value }))}
          selected={noteRange}
          onChange={(value) => setNoteRange(value)}
        />
        <ToggleButton
          text="ਰ॒ ਗ॒ ਮ॑ ਧ॒ ਨ॒"
          selected={includeAccidentals}
          onClick={() => setIncludeAccidentals(!includeAccidentals)}
        />
      </div>
    </div>
  );
}