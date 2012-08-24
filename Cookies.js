var Cookies = {
    
    allCookies: [],
    createdCookies: [],
    isInitialized: false,
    
    
    /**
     * Initialize by splitting 
     * the array of Cookies
     */
	init: function() 
    {
		if(!this.isInitialized)
        {
            var rawCookies = document.cookie.split('; ');
                            console.log('Cookies:', rawCookies);
                            
            for (var i=0; i < rawCookies.length; i++) 
            {
                var cookie = rawCookies[i].split('=');
                
                this.allCookies.push({
                    key:        cookie[0].split(' ').join(''),
                    value:      cookie[1],
                    expires:    cookie[2]
                });
            }
            
            this.isInitialized = true;
        }
	},
    
    /**
     * Create a cookie
     *
     * @param   name    string  Name of cookie to create
     * @param   value   mixed   Value to stock
     * @param   hours   int     Time life of cookie
     */
	create: function(name, value, hours) 
    {
		this.init();
        
        if (hours) 
        {
			var date = new Date();
			date.setTime(date.getTime() + (hours*3600*1000));
			var expires = ';expires='+ date.toGMTString();
		}
		else 
            var expires = '';
            
		document.cookie = name +'='+ value + expires +'; path=/';
		
        this.createdCookies.push({
            key:        name.split(' ').join(''),
            value:      value,
            expires:    expires
        });
        
        this.allCookies.push({
            key:        name.split(' ').join(''),
            value:      value,
            expires:    expires
        });
        
        return true;
	},
    
    /** 
     * Read a cookie value
     * 
     * @param   name  string  Name of cookie to read
     */
    read: function(name) 
    {
        this.init();        

        for(var i=0; i < this.allCookies.length; i++) 
        {              
            // If cookie exists
            if (this.allCookies[i].key == name) 
                return this.allCookies[i];
        }       
        
        return false;
    },

    /** 
     * Simule a cookie update by creating a new
     * cookie with same name, new value and old expires
     *
     * @param   name    string  Name of cookie to update
     * @param   value   mixed   New value of cookie
     */
    update: function(name, value)
    {
        this.init();
        var cookie = this.read(name);
        
        // Cookie doesn't exist
        if(cookie === false)
            return false;
            
        
        var oldExpires = new Date(cookie.expires);        
        var newExpires = new Date();
        newExpires.setTime( oldExpires - newExpires.getTime() );
        
        return this.create(name, value, newExpires.toGMTString());
    },
    
    /** 
     * Erase cookie by its name
     *
     * @param   name  string  Name of cookie to delete
     */
	erase: function(name) 
    {
		this.init();
        this.create(name, '', -1);
        
        // Delete from class arrays
        for(var i=0; i < this.allCookies.length; i++)
        {
            if(this.createdCookies[i].key == name)
                delete this.createdCookies[i];
                
            if(this.allCookies[i].key == name)
                delete this.allCookies[i];
        }
	}
};