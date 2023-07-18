"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faBars } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import bot from '../assets/bot.ico';
import DarkMode from "../DarkMode";
// import Modal from './Modal';
// import Setting from './Setting';

import TopbarBtns from "../NewComponents/TopbarBtns/TopbarBtns";

const menyLinkStyle = {
  color: "rgb(85 26 139) ",
  textDecoration: "underline rgb(85 26 139)",
};

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const NavBar = () => {
  const [open, setOpen] = useState(false);
  //   const [modalOpen, setModalOpen] = useState(false);

  const [isOpenNew, setisOpenNew] = useState(false); //new top bar button
  const [isOpenTopic, setisOpenTopic] = useState(false); //topic top bar button
  const [isOpenChat, setisOpenChat] = useState(false); //Chat top bar button
  const [isOpenShare, setisOpenShare] = useState(false); //share top bar button

  const servicesMenus = () => {
    setOpen(!open);
    setisOpenNew(false);
    setisOpenTopic(false);

    setisOpenShare(false);
  };



function Listener(){
  if(open===false){
    return
  }
  setOpen(false)

}

function useOutsideNav(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) ) {
        
       setOpen(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const wrapperRef = useRef(null);
useOutsideNav(wrapperRef);


  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 

    
  

  const newLocal = (
    <div className={`nav__bottom `}>
      <DarkMode open={open} />
    </div>
  );
  return (
    <>
      <section
        className={` ${
          open ? " w-full" : "w-full h-[45px] sm:bg-black  sm:text-black"
        } sidebar  bg-black`}
      >
        <div className="sidebar__app-bar items-center">
          {/* <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'} sm-min:hidden`}>
            <span className='w-8 h-8'>
              <img src={bot} alt='' />
            </span>

          </div>  */}
          {/* <h1 className={`sidebar__app-title ${!open && 'scale-0 hidden'} object-none sm-min:hidden `}>
            AI42 Chat
          </h1>  */}
          <div className={`sidebar__btn-close`} onClick={servicesMenus}>
            {!open ? (
              <FontAwesomeIcon
                className="sidebar__btn-icon"
                style={{ fontSize: "25px" }}
                icon={faBars}
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                className="sidebar__btn-icon"
                style={{ fontSize: "25px" }}
                icon={faXmark}
              ></FontAwesomeIcon>
            )}
          </div>

          <TopbarBtns
            isOpenNew={isOpenNew}
            setisOpenNew={setisOpenNew}
            isOpenTopic={isOpenTopic}
            setisOpenTopic={setisOpenTopic}
            isOpenShow={isOpenChat}
            setisOpenShow={setisOpenChat}
            isOpenShare={isOpenShare}
            setisOpenShare={setisOpenShare}
            setOpen={setOpen}
          />
        </div>

        <div className="nav z-10" ref={wrapperRef}>
          <ul className="  dropdown-list ">
            <li>
              <Link onClick={() => setOpen(false)} href="/">
                <h1
                  className={` sm:underline ${
                    !open && "hidden"
                  } underline text-black `}
                  style={menyLinkStyle}
                >
                  main page
                </h1>
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen(false)} href="/Pay">
                <h1
                  className={` sm:underline ${
                    !open && "hidden "
                  } underline text-black`}
                  style={menyLinkStyle}
                >
                  payment page
                </h1>
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen(false)} href="/Agent-agi">
                <h1
                  className={` sm:underline ${
                    !open && "hidden"
                  } underline  text-black`}
                  style={menyLinkStyle}
                >
                  agent agi
                </h1>
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen(false)} href="/searchgpt">
                <h1
                  className={` sm:underline ${
                    !open && "hidden"
                  } underline text-black`}
                  style={menyLinkStyle}
                >
                  search gpt
                </h1>
              </Link>
            </li>
          </ul>
        </div>

        {/* {newLocal} */}
        {/* <Modal title='Setting' modalOpen={modalOpen} setModalOpen={setModalOpen}> */}
        {/* <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
        {/* </Modal> */}
      </section>
      {newLocal}
    </>
  );
};

export default NavBar;

//
// import React from 'react'
// import Link from 'next/link'
// export default function NavBar() {
//     // const [open, setOpen] = useState(false);
//   return (
//     <div className='nav z-10'>
//              <ul className='  dropdown-list '>
//             <li>
//                  <Link href="/">
//                  <h4>Home</h4>

//                    {/* <h1 className={` sm:underline ${!open && 'hidden'} underline text-black `} style={menyLinkStyle} >main page</h1> */}
//                </Link>
//             </li>
//             <li>
//                   <Link href="/Blog">
//                     {/* <h1 className={` sm:underline ${!open && 'hidden '} underline text-black`} style={menyLinkStyle}>payment page</h1> */}
//                     <h4>Blog</h4>
//                  </Link>
//              </li>
//                <li>
//                  <Link href="/About">
//                     {/* <h1 className={` sm:underline ${!open && 'hidden'} underline  text-black`} style={menyLinkStyle}>agent agi</h1> */}
//                     <h4>About</h4>
//                   </Link>
//              </li>
//                 <li>
//                   <Link href="/contact">
//                     {/* <h1 className={` sm:underline ${!open && 'hidden'} underline text-black`} style={menyLinkStyle}>search gpt</h1> */}
//                   </Link>
//              </li>
//              </ul>
//             </div>
//   )
// }
