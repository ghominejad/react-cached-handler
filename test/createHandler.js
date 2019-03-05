var assert = require('assert');
var createHandler = require('../index');

describe('createHandler', function() {
    describe('handler function', function() {
      it('should be equal when is set with the same key', function() {
        var handler = createHandler(this);
        var h1 = handler('name', (name, a , b, e) => { /* console.log(name) */ });
        var h2 = handler('name', (name, a , b, e) => { /* console.log(name) */ });        
        
        assert.equal(h1, h2);

      });

      it('should not be equal when is set with the different key', function() {
        var cachedHandler = createHandler(this);
        var h1 = cachedHandler('firstName', (firstName, a , b, e) => { /* console.log(name) */ });
        var h2 = cachedHandler('lastName', (lastName, a , b, e) => { /* console.log(name) */ });        
        
        assert.notEqual(h1, h2);

      });

     
      it('should be contained the original event as the last argument', function() {
        var cachedHandler = createHandler(this);
        
        var eventHandler = cachedHandler('firstName', (firstName, originalEvent) => { 
            
            assert.equal(originalEvent.target.value, 'the value');
        });
        
        eventHandler({
            target : {value : 'the value'}
        });
        

      });


      it('should use default handler if we don\'t override it', function() {
        var defaultHandler = (firstName, originalEvent) => { 
            assert.equal(originalEvent.target.value, 'the value');
        };

        var cachedHandler = createHandler(this, defaultHandler);
        
        var eventHandler = cachedHandler('firstName', cachedHandler);
        
        eventHandler({
            target : {value : 'the value'}
        });
        

      });
     

      it('should access the member from specified context', function() {
        
        var context = {
            contextMember : 'the member'
        }

        var cachedHandler = createHandler(context);
        
        var eventHandler = cachedHandler('firstName', function () { 
            assert.equal(this.contextMember, 'the member');
        });
        
        eventHandler();

      });


    });



  });
