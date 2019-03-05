class CachedHandler {

    constructor(context, defaultHandler) {
        this.defaultHandler = defaultHandler
        this.context = context
        this.handlers = {};
    }

    handler(key,  ...args) {

        let customHandler = args[args.length-1];
        
        if (typeof customHandler !== "function") {
            customHandler = undefined;
        } else {
            args.pop(); // remove the last argument
        }

        const theHandler =  customHandler || this.defaultHandler;

        if (!this.handlers[key]) {
            this.handlers[key] = theHandler.bind(this.context, key, ...args)
        }

        return this.handlers[key];
    }

    cleanup() {
        this.context = null
        this.handlers = null
    }
}


module.exports = function (context, defaultHandler) {
    var cachedHandler = new CachedHandler(context, defaultHandler);
    return cachedHandler.handler.bind(cachedHandler);
}