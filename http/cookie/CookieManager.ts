/// <reference path="Cookie.ts" />

import Cookie = toolsjs.http.cookie.Cookie;
    
namespace toolsjs.http.cookie 
{ 
    export class CookiesManager
    {
        private _cookies: Array<Cookie>;
        private _createdCookies: Array<Cookie>;
        
        /**
        * Initialize by splitting 
        * the array of Cookies
        */
        constructor()
        {                         
            for(let rawCookie of document.cookie.split('; '))  {
                let cookieInfos      = rawCookie.split('=');
                let cookieName       = cookieInfos[0].split(' ').join('');
                let cookieValue      = cookieInfos[1];
                let cookieExpiration = cookieInfos[2];
                
                this._cookies.push(new Cookie(cookieName, cookieValue, cookieExpiration));
            }
        }
        
        /**
         * 
         */
        public create(cookie: Cookie): void
        {
            document.cookie = cookie.name +'='+ cookie.value + cookie.expiration +'; path=/';
            
            this._createdCookies.push(Cookie);
            this._cookies.push(cookie);
        }
        
        /**
         * 
         */
        public get(cookieName: string): any
        {
            for(let cookie of this._cookies) {
                if(cookieName == cookie.name) {
                    return cookie;
                }    
            }
            
            return false;    
        }        
        
        /**
         * 
         */
        public getCookies(): Array<Cookie>
        {
            return this._cookies;
        }
        
        /** 
        * Simule a cookie update by creating a new
        * cookie with same name, new value and old expires
        *
        * @param   name    string  Name of cookie to update
        * @param   value   mixed   New value of cookie
        */
        public update(cookie: Cookie)
        {
            this.init();
            var cookie = this.read(name);
            
            var cookie = this.get()
            
            // Cookie doesn't exist
            if(cookie === false)
                return false;
                
            var oldExpires = new Date(cookie.expires);        
            var newExpires = new Date();
            newExpires.setTime( oldExpires - newExpires.getTime() );
            
            
            return this.create(name, value, newExpires.toGMTString());
        }
    }
        
}