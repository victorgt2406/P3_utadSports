import React, { createContext, useEffect, useState } from "react";
import { Lang, LANGS } from "../langs/langs";
import User, { Token } from "../models/User";
import { Page } from "../routes";
import Texts from "../langs/Texts";
import cookieContext from "./Cookies";

// ContextInterface
interface ContextInterface {
    user: User | null;
    setUser: (user: User) => void;
    token: Token | null;
    setToken: (token: Token) => void;
    setPage: (page: Page) => void;
    page: Page;
    getText: () => Texts;
    language: Lang;
    setLanguage: (lang: Lang) => void;
    apiUrl: string;
    cache: any;
    setCache: (cache: any) => void;
    isMobile: () => boolean;
}

// Context
const CONTEXT = createContext<ContextInterface>({
    user: null,
    setUser: (user: User) => {},
    token: null,
    setToken: (token: Token) => {},
    page: "activities",
    getText: () => LANGS.es,
    language: "en",
    setLanguage: (lang: Lang) => {},
    apiUrl: "",
    setPage: () => {},
    cache: null,
    setCache: () => {},
    isMobile: () => false,
});

// Provider
function ContextProvider({ children }: { children: JSX.Element }) {
    const cookie = cookieContext.getCookie();
    const [user, setUser] = useState<User | null>(cookie.user);
    const [token, setToken] = useState<Token | null>(cookie.token);
    const [language, setLanguage] = useState<Lang>(cookie.language);
    const [page, setPage] = useState<Page>(cookie.page);
    const [cache, setCache] = useState<any>(cookie.cache);
    const getText = () => LANGS[language];

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

    function handleToken(token: Token){
        token.date = new Date();
        setToken(token);
    }

    useEffect(() => {
        // if(!cookieLoaded){
        //     const cookie = cookieContext.getCookie();
        //     setToken(cookie.token);
        //     setUser(cookie.user);
        //     setLanguage(cookie.language);
        //     setPage(cookie.page);
        //     setCache(cookie.cache);
        //     setCookieLoaded(true);
        // }
        // else{
        cookieContext.setCookie({ user, language, page, cache, token });
        // }
    }, [user, page, language, cache, token]);

    return (
        <CONTEXT.Provider
            value={{
                user,
                setUser,
                token,
                setToken: handleToken,
                getText,
                language,
                setLanguage,
                apiUrl: "http://localhost:3000/api",
                setPage,
                page,
                cache,
                setCache,
                isMobile,
            }}
        >
            {children}
        </CONTEXT.Provider>
    );
}

// Exports
export default ContextProvider;
export { CONTEXT };
export type { ContextInterface };
