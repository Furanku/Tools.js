namespace toolsjs.http.cookie
{
    
    export class Cookie
    {
        public name:       string;
        public value:      any;
        public expiration: int;
        
        private _expires: string;
        
        
        /**
        * Create a cookie
        *
        * @param  name        string  Name of cookie to create
        * @param  value       mixed   Value to stock
        * @param  expiration  int     Time life of cookie
        */
        constructor(name: string, value:any, expiration: int)
        {
            this.name  = name;
            this.value = value;
            this._setExpires(expiration);
        }
        
        
        private _setExpires(expiration: int): void
        {
            if(expiration > 0) {
                let date = new Date();
                date.setTime(date.getTime() + (hours*3600*1000));
			    
                this._expires = ';expires='+ date.toGMTString();
                this.expiration = expiration;
            }
            else {
                this._expires   = "";
                this.expiration = 0;
            }
        }
        
        
        set expiration(hours: int): void
        {
            this._setExpires(hours);            
        }    
    }
}