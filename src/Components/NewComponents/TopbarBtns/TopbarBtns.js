"use client";
import React from "react";
import { useEffect, useRef } from "react";
import Chatbtn from "../ChatBtnTopbar/Chatbtn";
import Link from "next/link";
import { faL } from "@fortawesome/free-solid-svg-icons";

// import Sharebtn from "../TopbarShare/Share";

const TopbarBtns = (propsChild) => {
  
  const Chatbutton = (e) => {
    e.preventDefault()
   propsChild.setisOpenTopic(!propsChild.isOpenTopic)
    propsChild.setisOpenNew(false);
    propsChild.setisOpenShow(false);
    propsChild.setisOpenShare(false);
  };

  function useOutsideNav(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) ) {  
          propsChild.setisOpenTopic(false)
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
  
  

  return (
    <>
      <div className="new-topic relative">
        <Link
          type="button"
         onClick={Chatbutton}
          className="sm:pl-[1.5rem] sm:text-[15px] sm:pr-0 px-[3rem] text-white"
          href="/"
        >
          Chat
        </Link>
        <Link
          className="sm:pl-[1.5rem] sm:text-[15px] sm:pr-0 px-[3rem] text-white"
          href="/findpage"
        >
          Find
        </Link>
        <Link
          className="sm:pl-[1.5rem] sm:pr-0 sm:text-[15px] px-[3rem] text-white"
          href="/Browser"
        >
          Browser
        </Link>
      </div>
      <div className="topic-main absolute  " ref={wrapperRef}>
        <div
          className="sm:left-[35px] topic absolute  rounded-[12px] top-[20px]  left-[30px] z-10 bg-white  "
          style={{
            height: !propsChild.isOpenTopic ? "0" : "300px",
            overflowX: "scroll",
            transitionDuration: "200ms",
          }}
        >
          <Chatbtn
            setopenchat={propsChild.setisOpenTopic}
            isopenchat={propsChild.isOpenTopic}
          />
        </div>
      </div>
    </>
  );
};
export default TopbarBtns;
