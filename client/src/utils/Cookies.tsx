import { addHours, isAfter } from "date-fns";
import { Lang } from "../langs/langs";
import User, { Token } from "../models/User";
import { Page } from "../routes";
import Cookie from "js-cookie";
const COOKIE_NAME = "u-tadSports_cookie";

// Cookie Interface
interface CookieInterface {
    user: User | null;
    page: Page;
    token: Token | null;
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
                token: null,
                page: "login",
                language: "es",
                cache: null,
            };
        }
    }

    // save
    setCookie(cookie: CookieInterface) {
        const jsonString = JSON.stringify(cookie);
        try{
            // const days = (cookie.token)?(cookie.token?.hoursExp)/24:0;
            // Cookie.set(COOKIE_NAME, jsonString, { expires: days });
            if(cookie.token){
                const tokenExpiryDate = addHours(new Date(cookie.token.date!), cookie.token.hoursExp);
                const diffInMilliseconds = tokenExpiryDate.getTime() - new Date().getTime();
                const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24); // convert from milliseconds to days
                Cookie.set(COOKIE_NAME, jsonString, { expires: diffInDays });
    
                if (this.checkToken()) {
                    this.deleteCookie();
                }
            }
            
        }
        catch(err){
            console.log(err);
        }
        
    }

    checkToken(): boolean {
        const cookie = this.getCookie();
        if (cookie.token) {
            const tokenExpiryDate = addHours(new Date(cookie.token.date!), cookie.token.hoursExp);
            if (isAfter(new Date(), tokenExpiryDate)) {
                // If the current time is after the token expiry date, delete the cookie.
                return true; // The token has expired.
            }
        }
        return false; // The token has not expired, or there is no token.
    }

    deleteCookie() {
        Cookie.remove(COOKIE_NAME);
    }
}
const cookieContext = new CookieContext();
export default cookieContext;
export { CookieContext };
export type { CookieInterface };
