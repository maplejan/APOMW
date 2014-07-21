// 页面渲染
define(['Zepto', 'base/charTool', 'app/ArticleModel'], function ($, charTool, ArticleModel) {
    function wrapPage(content, pageClass) {
        return '<div ' + (pageClass ? 'class=' + pageClass : '') + '>' + content + '</div>';
    }

    function wrapChar(content, key) {
        return '<span data-key="'+ key +'">' + content + '</span>';
    }

    function renderPage(config) {
        var blank = config.blank || [30, 30, 30, 30];   // 上,右,下,左
        var article = config.article;
        var pageClass = config.pageClass;
        var fontStyleStatus = config.fontStyleStatus;


        var articleModel = new ArticleModel(fontStyleStatus, article);
        var style = fontStyleStatus.style;
        var letterSpacing = style.letterSpacing ? +style.letterSpacing.replace(/px$/, '') : 0;
        var $window = $(window);
        var pageW = $window.width() - blank[1] - blank[3];
        var pageH = $window.height() - blank[0] - blank[2];
        var maxLineOfPage = Math.floor(pageH / +style.lineHeight.replace(/px$/, ''));
        var pageLength = 0;         // 页面长度计数器，单位：行
        var lineWidth = 0;          // 单行长度计数器，单位：像素
        var articleStr = '';        // 文章内容存储
        var pageStr = '';           // 页面内容存储
        var lineStr = '';           // 单行内容存储
        var lineCharCounter = 0;    // 每行字数计数器
        var spaceWidth = 0;         // 剩余空白区域宽度
        var curChar = '';           // 当前检索的字符
        var wordNum = 0;            // 文字编号

        for (var i = 0, l1 = articleModel.length; i < l1; i++) {
            var j = 0,
                l2 = articleModel[i].length;

            while (j < l2) {
                curChar = articleModel[i][j].character;
                if (pageLength < maxLineOfPage) {
                    lineWidth += articleModel[i][j].width;
                    if (lineWidth <= pageW) {   // 每行未满
                        //lineStr += '<span data-key="'+ j +'">' + curChar + '</span>';
                        lineStr += wrapChar(curChar, wordNum++);
                        lineCharCounter += curChar.length;
                        j++;
                    } else {    // 每行已满
                        // 获取所剩空白区域
                        spaceWidth = pageW - lineWidth + articleModel[i][j].width;
                        if (charTool.isEndChar(curChar)) {
                            //lineStr += '<span data-key="'+ j +'">' + curChar + '</span>';
                            lineStr += wrapChar(curChar, wordNum++);
                            spaceWidth = spaceWidth - articleModel[i][j].width;
                            lineCharCounter += curChar.length;
                            j++;
                        }

                        if (Math.abs(spaceWidth) > 1) {
                            pageStr += '<p style="letter-spacing: ' + (letterSpacing + spaceWidth / lineCharCounter) + 'px;">' + lineStr + '</p>';
                        } else {
                            pageStr += '<p>' + lineStr + '</p>';
                        }
                        pageLength++;
                        // 初始化
                        lineStr = '';
                        lineWidth = 0;
                        lineCharCounter = 0;
                    }
                } else {    // 每页已满
                    pageStr = wrapPage(pageStr, pageClass);
                    articleStr += pageStr;
                    // 初始化
                    pageStr = '';
                    pageLength = 0;
                }
            }
            // 每段结束
            if (lineStr.length > 0) {   // 内容还没有被存储
                pageStr += '<p>' + lineStr + '</p>';
                pageLength++;
                // 初始化
                lineStr = '';
                lineWidth = 0;
                lineCharCounter = 0;
            }
        }
        // 全部文章结束
        pageStr = wrapPage(pageStr, pageClass);
        articleStr += pageStr;
        // 初始化
        pageStr = '';
        pageLength = 0;

        return articleStr;
    }

    return renderPage;
});