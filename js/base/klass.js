/**
 * JavaScript类工厂
 */

define(function () {
    var klass = function () {
        function isObject(o) {
            return typeof o === 'object';
        }

        function isFunction(f) {
            return typeof f === 'function';
        }

        var createObject = !Object.create || function (proto) {
            function Class() {}
            Class.prototype = proto;
            return new Class();
        };

        function extend(target, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }

            return target;
        }

        function klass(Parent, classDefinition) {
            var _Parent = Parent,
                _classDefinition = classDefinition;

            if (isObject(_Parent)) {
                _classDefinition = _Parent;
                _Parent = undefined;
            }

            if (!isObject(_classDefinition)) {
                return function () {};
            }

            var init = _classDefinition.init;

            function Class() {
                if (_Parent && isFunction(_Parent)) {
                    _Parent.apply(this, arguments);
                }
                if (isFunction(init)) {
                    var initReturn = init.apply(this, arguments);
                }
                if (initReturn) {
                    return initReturn;
                }
            }

            if (_Parent) {
                //Class.prototype = new _Parent();
                Class.prototype = createObject(_Parent.prototype);
                //Class.prototype = extend(Class.prototype, _Parent.prototype);
            }

            Class.prototype = extend(Class.prototype, _classDefinition);
            Class.prototype.constructor = Class;

            return Class;
        }

        return klass
    }();
    return klass;
});