// @ts-nocheck
import React from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css'

import SoundfontProvider from './SoundfontProvider'

const audioContext = new window.AudioContext()
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net'

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('e5'),
}

export const PianoDemo = () => {
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: MidiNumbers.fromNote('f3'),
    lastNote: MidiNumbers.fromNote('e5'),
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  })

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <SoundfontProvider
        audioContext={audioContext}
        instrumentName="acoustic_grand_piano"
        hostname={soundfontHostname}
        render={({ isLoading, playNote, stopNote }) => (
          <Piano
            noteRange={noteRange}
            keyboardShortcuts={keyboardShortcuts}
            playNote={playNote}
            stopNote={stopNote}
            disabled={isLoading}
            height={100}
            // width={containerWidth}
          />
        )}
      />
    </div>
  )
}
