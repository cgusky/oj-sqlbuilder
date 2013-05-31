/*global OJ:true*/
(function(){

    /***
     * Method to create a Class with optional inheritance.
     * Generally, I oppose this semantic in JS:
     * partly because of the ineffability of the 'this' operator,
     * and partly because of the difficulty in grokking this.
     * What we're really saying here (through the wonders of functional programming) is this:
     *
     *      var MyClass1 = function(param1) {
     *          var ret = this;
     *          ret.id = param1;
     *          return ret;
     *      };
     *
     *      var MyClass2 = function(param1, param2) {
     *          var ret = this;
     *          MyClass1.apply(this, Array.prototype.slice.call(arguments, 0));
     *          ret.name = param2;
     *          return ret;
     *      };
     *
     *      MyClass2.prototype = new MyClass1;
     *      MyClass2.prototype.constructor = MyClass1;
     *      MyClass2.prototype.parent = MyClass1.prototype;
     *
     * I find this whole mode of operation as dull as it is stupid.
     * Nonetheless, there are occassions when the convention is suitable for type checking,
     * as you'll come to see in metadata.
     *
     * Obviously, this method has very little utility if you are not using protypical inheritance
    */
    OJ.lift('Class', function(name, inheritsFrom, callBack) {
        var obj = Object.create(null);
        obj[name] = function() {
            try {
                if(inheritsFrom ) {
                    inheritsFrom.apply(this, Array.prototype.slice.call(arguments, 0));
                }
                callBack.apply(this, Array.prototype.slice.call(arguments, 0));
            } catch(e) {
                OJ.errors.ClassInheritanceError('OJ failed to execute all or part of its callback routine for Class: ' + name);
            }
        };
        if(inheritsFrom) {
            obj[name].inheritsFrom(inheritsFrom);
        }
        return obj[name];
    });


}());