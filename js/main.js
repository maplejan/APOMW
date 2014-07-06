define(function (require) {
    var $ = require('Zepto');
    var klass = require('base/klass');
    var FontStyleController = require('app/FontStyleController');
    var renderPage = require('app/renderPage');

    function main () {
        var $article = $('#article');
        var fontStyleController = new FontStyleController();

        $.ajax({
            url: 'data/' + Math.floor(Math.random() * 6),
            type: 'get',
            dataType: 'text',
            success: function (data) {
                fontStyleController.set('normal');
                var htmlStr = renderPage({
                    article: data,
                    pageClass: 'article_page',
                    fontStyleStatus: fontStyleController.getStatus()
                });
                $article.css(fontStyleController.getStatus().style);
                $article.html(htmlStr);
            }
        });
    }

    return function () {
        $(function ($) {
            main();
        });
    };
});