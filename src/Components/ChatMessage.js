"use client" 
import React, { useEffect, useState } from "react";
import { MdComputer } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import moment from "moment";
import Image from "next/image";
import SharePopup from "./NewComponents/IconsPopup/ShareIcon";
import EditPopup from "./NewComponents/IconsPopup/EditIPrompt";
// import axios from "axios";
const imageModels = ["DALL·E", "OpenJourney"];
import ImageComp from "./imageComp";
import PersonImg from '../assets/person.Png'
/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false, selected } = props.message;
 
  // console.log("props.message",props.message)
  const [isopen, setIsopen] = useState(false); //popup share icon
  const [isopenEdit, setIsopenEdit] = useState(false); //popup Edit icon
  // const [singleImage, setSingleImage] = useState(false);

 

  const editIcon = (id) => {
    if (id == 1) {
      alert("please create image ");
    } else {
      setIsopenEdit(!isopenEdit);
    }
  };

  return (
    <>
      <div
        key={id}
        className={`${
          ai && "flex-row-reverse bg-light-white "
        } message  sm:flex`}
      >
        {imageModels.includes(selected) && ai ? (
          <section className="flex flex-col">
             <ImageComp url={text}/>
          </section>
        ) : (
          <div className="message__wrapper">
            <ReactMarkdown
              className={`message__markdown ${ai ? "text-left" : "text-right"}`}
              children={text}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(
                    className || "language-js"
                  );
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}{" "}
                    </code>
                  );
                },
              }}
            />
            <div className={`${ai ? "text-left" : "text-right"} `}>
              <i className=" services-icons fa-regular fa-thumbs-up  text-[15px] cursor-pointer "></i>
              <i className="services-icons fa-regular fa-thumbs-down pl-[15px] text-[15px] cursor-pointer "></i>
              <i
                onClick={editIcon}
                className=" services-icons fa-sharp fa-solid fa-pen-to-square text-[15px]  px-[15px] cursor-pointer"
              ></i>
              <i
                onClick={() => setIsopen(!isopen)}
                className=" services-icons fa-solid fa-share-from-square text-[12px] cursor-pointer"
              ></i>
            </div>

            <div
              className={`${
                ai ? "text-left" : "text-right"
              } message__createdAt`}
            >
              {moment(createdAt).calendar()}
            </div>
          </div>
        )}

        <div className="message__pic">
          {ai ? (
            <MdComputer />
          ) : (
            <Image
              className="rounded-full"
              loading="lazy"
              src={PersonImg}
              alt="profile pic"
            />
          )}
        </div>
      </div>
      <SharePopup setIsopen={setIsopen} isopen={isopen} />

      <EditPopup setIsopenEdit={setIsopenEdit} isopenEdit={isopenEdit} />
    </>
  );
};

export default ChatMessage;
