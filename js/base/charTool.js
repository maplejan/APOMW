define(function () {
    /**
     * 判断字符是否为英文字母
     * @param character
     * @returns {boolean}
     */
    function isEnglishAlphabet(character) {
        var result = false;
        var charCode = character.charCodeAt();
        if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
            result = true;
        }
        return result;
    }


    /**
     * 判断是否为结束符
     * @param character
     * @returns {boolean}
     */
    function isEndChar(character) {
        var endCharArr = [
            ',', '.', '?', '!', ';', ':', '\'', '\"', ']', '}', ')', '>',
            '，', '。', '？', '！', '；', '：', '、', '’', '”', '】', '）', '》'
        ];

        isEndChar = function (character) {
            var result = false;
            for (var i = 0, l = endCharArr.length; i < l; i++) {
                if (character === endCharArr[i]) {
                    result = true;
                    break;
                }
            }
            return result;
        };

        return isEndChar(character);
    }

    /**
     * HTML实体转码
     * @param content
     * @returns {XML}
     */
    function encodeHTML(content) {
        return content
            .replace(/&/g, '&amp;')
            .replace(/ /g, '&nbsp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }


    return {
        isEndChar: isEndChar,
        isEnglishAlphabet: isEnglishAlphabet,
        encodeHTML: encodeHTML
    };
});