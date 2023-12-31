"use client";
import { useState,useEffect } from "react";
import ChatView from "@/Components/ChatView";
import Login from "@/Components/Login/Login";
// import {SessionProvider} from "next-auth/react"
export default function Home(props) {
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    if(typeof window !== 'undefined'){
    try {
      const data = JSON.parse(window.sessionStorage.getItem("userData"));
      if (!data.hasOwnProperty("email")) setModalOpen(true);
    } catch (e) {
      setModalOpen(true);
      console.log("Check email err : ", e);
    }
  }
  }, []);
  return (
    <div>
      {typeof window !== 'undefined' && (
        <>
          <Login modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <ChatView {...props} />
        </>
      )}
    </div>
  );
}
