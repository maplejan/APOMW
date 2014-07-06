// 文字样式类，提供定制和切换字体样式
define(['Zepto', 'base/klass', 'app/CharWidth'], function ($, klass, CharWidth) {
    var FontStyleController = klass({
        init: function (option) {
            this.option = option || {
                small: {
                    fontSize: '12px',
                    lineHeight: '20px',
                    letterSpacing: '0px'
                },
                normal: {
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '1px'
                },
                big: {
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '0px'
                }
            };
            this.currentOptionToken = undefined;
            this.charWidth = {};
        },

        set: function (optionToken) {
            var opt = this.option[optionToken];
            var charW = this.charWidth[optionToken];
            if (opt) {
                if (!charW) {
                    this.charWidth[optionToken] = new CharWidth(opt);
                }
                this.currentOptionToken = optionToken;
            }
        },

        getStatus: function () {
            var cur = this.currentOptionToken;
            if (!cur) {
                return {
                    error: 'Please set the "optionToken".'
                };
            }
            return {
                style: this.option[cur],
                charWidth: this.charWidth[cur]
            }
        }
    });

    return FontStyleController;
});