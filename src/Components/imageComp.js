"use client"
import React from "react";



/**
 * A component that displays an image.
 *
 * @param {string} text - The source of the image to display.
 * @returns {JSX.Element} - A JSX element representing the image.
 */
const imageComp = (props) => {



  return (
    <div className="message__wrapper " >
      <div className={`"pr-[10px]"`}>
      <img
      
        className={`" sm:h-[220px] message__img object-bottom object-cover h-[325px]"`}
        src={props.url}
        alt="dalle generated"
        loading="lazy"
      />
      </div>
 
    
    </div>
  );
};

export default imageComp;
