import { useState } from "react";
import { useLocalStorage } from "./utils/useLocalStorage";
import './App.css';

const sargam = `ਸ̣ ਰ॒̣ ਰ̣ ਗ॒̣ ਗ̣ ਮ̣ ਮ॑​̣ ਪ̣ ਧ॒̣ ਧ̣ ਨ॒̣ ਨ̣
                ਸ ਰ॒ ਰ ਗ॒ ਗ ਮ ਮ॑ ਪ ਧ॒ ਧ ਨ॒ ਨ ਸ̇
                ਰ॒̇ ਰ̇ ਗ॒̇ ਗ̇ ਮ̇ ਮ॑̇ ਪ̇ ਧ॒̇ ਧ̇ ਨ॒̇ ਨ̇ ਸ̈
              `.trim().split(/[\s\n]+/g)

const octaveMarkRegex = new RegExp(' ̣ ̇ ̈'.trim().split(' ').join('|'))
const accidentalMarkRegex = new RegExp(' ॒ ॑'.trim().split(' ').join('|'))

export const App = () => {
  const [swar, setSwar] = useState('ਸ')
  const [includeAllOctaves, setIncludeAllOctaves] = useLocalStorage('includeAllOctaves', false)
  const [includeAccidentals, setIncludeAccidentals] = useLocalStorage('includeAccidentals', false)

  const onClick = () => {
    const allowedSargam = sargam.filter((swar) => {
      if (!includeAllOctaves && swar !== "ਸ̇" && swar.match(octaveMarkRegex)) {
        return false;
      }
      if (!includeAccidentals && swar.match(accidentalMarkRegex)) {
        return false;
      }
      return true;
    });

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
        <label>
          <input
            type="checkbox"
            checked={includeAllOctaves}
            onChange={() => setIncludeAllOctaves(!includeAllOctaves)}
          />
          Include all octaves
        </label>
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