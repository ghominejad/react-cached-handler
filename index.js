class CachedHandler {

    constructor(context, defaultHandler) {
        this.defaultHandler = defaultHandler
        this.context = context
        this.handlers = {};
    }

    handler(key, ...args) {

        let customHandler = args[args.length-1];
        
        if (typeof customHandler !== "function") {
            customHandler = undefined;
            
            if (args.length === 0 && (typeof key === "function" || key === undefined)) {
                customHandler = key;
                key = "default";
            }

        } else {
            args.pop(); // remove the last argument
        }

        if(key !== 'default') {
            args = [key, ...args];
        }
        const theHandler =  customHandler || this.defaultHandler;

        if (!this.handlers[key]) {
            this.handlers[key] = theHandler.bind(this.context, ...args)
        }

        return this.handlers[key];
    }

    cleanup() {
        this.context = null
        this.handlers = null
    }
}


module.exports = function (context, defaultHandler) {
    if (typeof context === "function" && !defaultHandler) {
        defaultHandler = context;
        context = undefined;
    }
    
    var cachedHandler = new CachedHandler(context, defaultHandler);
    return cachedHandler.handler.bind(cachedHandler);
}