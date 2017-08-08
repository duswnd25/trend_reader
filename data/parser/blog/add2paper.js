// TODO 변경필요
const blogName = '애드투페이퍼';
const rootUrl = 'http://add2paper.github.io/';
const headerSrc = rootUrl + '/images/blog-cover.png'; // 게시글 표시 이미지 없음

// Module
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const rootPath = process.cwd();
const resultItem = require(rootPath + '/data/parser/result_item');

exports.getData = function (rootCallback) {
    requestPromise(rootUrl)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);

            // Article
            let articleItem = $('section.index').eq(0).children('div').eq(0);

            // Title
            let titleItem = articleItem.children('h2.title').eq(0);
            let parseTitle = titleItem.children('a').text();
            let parseLink = titleItem.children('a').attr('href');

            // Date
            let parseDate = articleItem.children('div.meta').eq(0).children('time').eq(0).attr('datetime'); // 메인화면에 표시되지 않음

            // Summary
            let parseSummary = articleItem.children('p').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = headerSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = parseLink;
            result.article_summary = parseSummary;

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
}