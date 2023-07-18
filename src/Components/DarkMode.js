"use client"
import useDarkMode from './hook/useDarkMode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

// import { MdOutlineNightlight, MdOutlineWbSunny } from 'react-icons/md';

/**
 * A toggle for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.open - Whether the sidebar is open or not.
 */
const DarkMode = (props) => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  /**
   * Toggles the dark mode.
   */
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <div className="nav">
      <span className="nav__item" onClick={handleMode}>
        {darkTheme ? (
          <>
            <div className="nav__icons">
            <FontAwesomeIcon style={{fontSize:"15px"}} icon={faMoon}></FontAwesomeIcon>
            </div>
            {/* <h1 className={`${!props.open && "hidden"}`}>Light mode</h1> */}
          </>
        ) : (
          <>
            <div className="nav__icons">
            <i className="fa-solid fa-brightness"></i>
            <FontAwesomeIcon style={{fontSize:"15px",paddingBottom:"5px"}} icon={faSun}></FontAwesomeIcon>
            </div>
            {/* <h1 className={`${!props.open && "hidden"}`}>Night mode</h1> */}
          </>
        )}

      </span>
    </div>
  )
}

export default DarkMode;