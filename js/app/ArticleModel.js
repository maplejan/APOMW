// 文章模型对象
define(['Zepto', 'base/charTool'], function ($, charTool) {
    /**
     * 根据换行符来拆分为数组
     * @param article
     * @returns {Array}
     */
    function splitArticle(article) {
        return article.split('\n');
    }

    /**
     * 按字符来拆分为数组
     * @param section
     * @returns {Array}
     */
    function splitSection(section) {
        return section.split('');
    }

    /**
     * @param fontStyleStatus
     * @param article
     * @returns {Array}
     * @constructor
     */
    function ArticleModel(fontStyleStatus, article) {
        var charWidth = fontStyleStatus.charWidth;

        var sectionArr = splitArticle(article); //数组，文章的每个段落
        var charArr;                            // 数组，段落的每个字符
        var articleModel = [];                  // 存储整个文章的数组模型

        var chars = '';         // 存储字符
        var curChar = '';       // 当前字符，用于遍历
        var width = 0;          // chars的宽度
        var isFullWord = true; // 是否为完整的单词/字

        for (var i = 0, sLen = sectionArr.length; i < sLen; i++) {
            charArr = splitSection(sectionArr[i]);
            articleModel.push([]);

            var j = 0;
            var wLen = charArr.length;
            while (j < wLen) {
                curChar = charArr[j];

                // 对英文单词会进行封装处理
                if (charTool.isEnglishAlphabet(curChar)) {  // 如果当前字符为英文字母
                    isFullWord = false;
                    chars += curChar;
                    width += charWidth.get(curChar);
                    j++;
                } else {
                    isFullWord = true;
                }

                // 当被判断为一个完整的单词时，才会添加到 articleModel 中
                if (isFullWord) {
                    // 如果chars为空，则需重新处理字符
                    if (!chars.length) {
                        chars += curChar;
                        width += charWidth.get(curChar);
                        j++;
                    }
                    articleModel[i].push({
                        width: width,
                        character: chars
                    });
                    curChar = chars = '';
                    width = 0;
                }
            }
        }

        charWidth.remove();
        return articleModel;
    }

    return ArticleModel;
});