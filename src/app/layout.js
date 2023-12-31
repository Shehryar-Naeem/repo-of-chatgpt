import "./globals.css";

// import { Inter } from "next/font/google";
import NavBar from "@/Components/NavBar/NavBar";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { ChatContextProvider } from "@/Components/Contex/ChatContext";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGPT",
  name: "description",
  content: "Web site created using create-react-app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.png" />
        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
        <link
          rel="styleSheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        ></link>
        <title>ChatGPT</title>
      </head>
      <body>
      
        <ChatContextProvider >
         
          
          <NavBar/>
          
            {children}
            
        </ChatContextProvider>
        
      </body>
    </html>
  );
}
