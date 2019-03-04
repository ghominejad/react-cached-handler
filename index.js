class FastHandler {

    constructor(context, defaultHandler) {
        this.defaultHandler = defaultHandler
        this.context = context
        this.handlers = {};
    }

    handler(key, customHandler) {

        let skipParams = 1;
        let handler = this.defaultHandler;

        if (typeof customHandler === "function") { 
            // it's not using `defaultHandler`, we need to ignore the `func` param
            skipParams++;
            handler = customHandler;
        } else {
            handler = this.defaultHandler;
        }

        if (!this.handlers[key]) {
            this.handlers[key] = handler.bind(this.context, key, 
                ...(Array.prototype.splice.call(arguments, skipParams)))
        }

        return this.handlers[key];
    }

    cleanup() {
        this.context = null
        this.handlers = null
    }
}



module.exports = function (context, defaultHandler) {
    var fastHandler = new FastHandler(context, defaultHandler);
    return fastHandler.handler.bind(fastHandler);
}