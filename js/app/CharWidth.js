// 字符宽度的类，用于管理和记录字符的宽度
define(['Zepto', 'base/klass', 'base/charTool'], function ($, klass, charTool) {

    var CharWidth = klass({
        init: function (style) {
            this.style = style;
            this.charMap = {};  // 加入字符字典，最大限度减少DOM操作
            this.$charWrap = this.createWrap();
        },

        createWrap: function () {
            var $charWrap = $('<span style="opacity: 0; position: absolute; left: -9999px; top: -9999px;"></span>');
            $charWrap.css($.extend({}, this.style));
            $('body').append($charWrap);
            return $charWrap;
        },

        get: function (character) {
            var key = character.charCodeAt();
            // 如果charMap中没有这个字符的数据，则需进行DOM操作来获取
            if (!this.charMap[key] || this.charMap[key].width == undefined)  {
                if (!this.$charWrap) {
                    this.$charWrap = this.createWrap();
                }
                this.$charWrap.html(charTool.encodeHTML(character));
                this.charMap[key] = {
                    character: character,
                    width: this.$charWrap.width()
                };
            }
            return this.charMap[key].width;
        },

        clear: function () {
            this.$charWrap.html('');
        },

        remove: function () {
            this.$charWrap && this.$charWrap.remove();
            this.$charWrap = null;
        }
    });

    return CharWidth;
});