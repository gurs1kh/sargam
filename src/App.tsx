import { useMemo, useState } from 'react'
import { useLocalStorage } from './utils/useLocalStorage'
import { ToggleButtonGroup, ToggleButton } from './components/ToggleButtonGroup'
import './App.scss'

const allNotes = `ਸ̣ ਰ॒̣ ਰ̣ ਗ॒̣ ਗ̣ ਮ̣ ਮ॑​̣ ਪ̣ ਧ॒̣ ਧ̣ ਨ॒̣ ਨ̣
                ਸ ਰ॒ ਰ ਗ॒ ਗ ਮ ਮ॑ ਪ ਧ॒ ਧ ਨ॒ ਨ ਸ̇
                ਰ॒̇ ਰ̇ ਗ॒̇ ਗ̇ ਮ̇ ਮ॑̇ ਪ̇ ਧ॒̇ ਧ̇ ਨ॒̇ ਨ̇ ਸ̈`
  .trim()
  .split(/[\s\n]+/g)
  .join(' ')

const accidentalMarkRegex = new RegExp(' ॒ ॑'.trim().split(' ').join('|'))
const rangeOptions = ['ਸ↔ਸ̇', 'ਪ̣↔ਮ̇', 'ਸ̣↔ਸ̈']
const patternLengthOptions = [
  { value: 1, text: 'ਸ' },
  { value: 2, text: 'ਸ ਰ' },
  { value: 3, text: 'ਸ ਰ ਗ' },
  { value: 4, text: 'ਸ ਰ ਗ ਮ' },
]
const patternDistanceOptions = [
  { value: 1, text: '±ਰ' },
  { value: 2, text: '±ਗ' },
  { value: 4, text: '±ਪ' },
  { value: 7, text: '±ਸ̇' },
  { value: Infinity, text: 'all' },
]

export const App = () => {
  const [currentNotes, setCurrentNotes] = useState('ਸ ਰ ਗ ਮ'.split(' '))
  const [patternLength, setPatternLength] = useLocalStorage('patternLength', 1)
  const [patternDistance, setPatternDistance] = useLocalStorage('patternDistance', 1)
  const [noteRange, setNoteRange] = useLocalStorage('noteRange', rangeOptions[0])
  const [includeAccidentals, setIncludeAccidentals] = useLocalStorage('includeAccidentals', false)

  const filteredNotes = useMemo(() => {
    const [startNote, endNote] = noteRange.split('↔')

    return allNotes
      .replace(new RegExp(`^.+?(?=${startNote})`), '')
      .replace(new RegExp(`(?<=${endNote}).+?$`), '')
      .split(' ')
      .filter((note) => includeAccidentals || !note.match(accidentalMarkRegex))
  }, [noteRange, includeAccidentals])

  const onClick = () => {
    const newNotes = [...new Array(patternLength)].reduce((array, _, i) => {
      if (i == 0)
        return filteredNotes
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, 1)

      const prevNote = array[i - 1]
      const prevIndex = filteredNotes.indexOf(prevNote)
      const notesInDistance = filteredNotes
        .slice(Math.max(prevIndex - patternDistance, 0), prevIndex + patternDistance + 1)
        .filter((note) => note != prevNote)

      return [...array, notesInDistance.sort(() => Math.random() - 0.5)[0]]
    }, [])

    setCurrentNotes(newNotes)
  }

  return (
    <div className="container">
      <div className="current-note" onClick={onClick}>
        <span className={`current-note-text current-note-text--length-${patternLength}`}>
          {currentNotes.slice(0, patternLength).join(' ')}
        </span>
      </div>
      <div className="settings">
        <ToggleButtonGroup
          options={patternLengthOptions}
          selected={patternLength}
          onChange={(value) => setPatternLength(value)}
        />
        <ToggleButtonGroup
          options={patternDistanceOptions}
          selected={patternDistance}
          onChange={(value) => setPatternDistance(value)}
        />
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
  )
}
