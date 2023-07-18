/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    experimental:{
appDir:true,
    },
    env:{
        NEXTAUTHID:"MYNEXT@786",
        REACT_APP_GOOGLE_OATH_CLIENT_ID:'328032227340-gnhdpd21pc82ghc0cpgqovukrqq25n92.apps.googleusercontent.com'
    }
}

module.exports = nextConfig
