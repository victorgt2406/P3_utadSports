import { Lang } from "../langs/langs";
import User from "../models/User";
import { Page } from "../routes";
import Cookie from "js-cookie";
const COOKIE_NAME = "u-tadSports_cookie";

// Cookie Interface
interface CookieInterface {
    user: User | null;
    page: Page;
    token: string | null;
    language: Lang;
    cache: any;
}

class CookieContext {
    COOKIE_NAME = "u-tadSports_cookie";

    // get cookie
    getCookie(): CookieInterface {
        const jsonString = Cookie.get(COOKIE_NAME);
        if (jsonString) {
            const cookieContent: CookieInterface = JSON.parse(jsonString);
            return cookieContent;
        } else {
            console.log("Cookie not found.");
            return {
                user: null,
                token: "",
                page: "login",
                language: "es",
                cache: null,
            };
        }
    }

    // save
    setCookie(cookie: CookieInterface) {
        const jsonString = JSON.stringify(cookie);
        Cookie.set(COOKIE_NAME, jsonString, { expires: 7 });
    }
}
const cookieContext = new CookieContext();
export default cookieContext;
export { CookieContext };
export type { CookieInterface };
