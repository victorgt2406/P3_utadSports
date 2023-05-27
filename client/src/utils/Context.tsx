import React, { createContext, useEffect, useState } from 'react';
import { Lang, LANGS } from '../langs/langs';
import User from '../models/User';
import { Page } from '../routes';
import Texts from '../langs/Texts';
import cookieContext from './Cookies';

// ContextInterface
interface ContextInterface {
    user: User | null;
    setUser: (user: User) => void,
    token: string;
    setToken: (token: string) => void;
    setPage: (page:Page)=>void,
    page: Page,
    getText: ()=>Texts,
    language: Lang,
    setLanguage: (lang: Lang) => void,
    apiUrl: string;
    cache: any;
    setCache: (cache:any)=>void,
    isMobile: ()=>boolean
}

// Context
const CONTEXT = createContext<ContextInterface>({
    user: null,
    setUser: (user: User) => { },
    token: "null",
    setToken: (token: string) => { },
    page: "activities",
    getText: ()=>LANGS.es,
    language: "en",
    setLanguage: (lang: Lang) => { },
    apiUrl: "",
    setPage: ()=>{},
    cache: null,
    setCache: ()=>{},
    isMobile: ()=>false
});


// Provider
function ContextProvider({ children }: { children: JSX.Element}) {
    const [cookieLoaded, setCookieLoaded] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");
    const [language, setLanguage] = useState<Lang>("es");
    const [page, setPage] = useState<Page>("activities");
    const [cache, setCache] =  useState<any>(null);
    const getText = ()=>LANGS[language];

    function isMobile() {
        const userAgent = window.navigator.userAgent;
      
        // Regular expressions to identify mobile devices
        const mobileDevices = [
          /Android/i,
          /iPhone/i,
          /iPad/i,
          /iPod/i,
          /BlackBerry/i,
          /Windows Phone/i,
        ];
      
        return mobileDevices.some((device) => device.test(userAgent));
      }

    useEffect(()=>{
        if(!cookieLoaded){
            const cookie = cookieContext.getCookie();
            setUser(cookie.user);
            setLanguage(cookie.language);
            setPage(cookie.page);
            setCache(cookie.cache);
            setCookieLoaded(true);
        }
        else{
            cookieContext.setCookie({user, language, page, cache, token});
        }
    },[user, page, language, cache]);

    return (
        <CONTEXT.Provider value={{
            user,
            setUser,
            token,
            setToken,
            getText,
            language,
            setLanguage,
            apiUrl: "http://localhost:3000/api",
            setPage,
            page,
            cache,
            setCache,
            isMobile
        }}>
            {children}
        </CONTEXT.Provider>
    );
};

// Exports
export default ContextProvider;
export { CONTEXT };
export type {ContextInterface};