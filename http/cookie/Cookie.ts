namespace toolsjs.http.cookie
{
    
    export class Cookie
    {
        public name:  string;
        public value: any;
        
        private _expiration: Date;
        
        
        /**
        * Create a cookie
        *
        * @param  name        string  Name of cookie to create
        * @param  value       mixed   Value to stock
        * @param  expiration  Date    Time life of cookie
        */
        constructor(name: string, value:any, expiresAt: Date)
        {
            this.name  = name;
            this.value = value;
            this._setExpiration(expiresAt);
        }
        
        
        private _setExpiration(expiresAt: Date): void
        {
            let currentDate = new Date();
            
            if(expiresAt.getTime() > currentDate.getTime()) {    
                //this._expiration = ';expires='+ expiresAt.toUTCString();
                this._expiration = expiresAt;
            }
            else {
                //this._expiration   = "";
                this.expiration = null;
            }
        }
        
        
        get expiration(): Date
        {
            return this._expiration;
        }
        
        set expiration(expiresAt: Date)
        {
            this._setExpiration(expiresAt);            
        }    
    }
}