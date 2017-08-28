// TODO 변경필요
const rootUrl = 'http://luckyyowu.tistory.com/';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {

        if (error) {
            console.error(error);
        }

        let $ = cheerio.load(body);

        // Title
        let blogName = $('title').eq(0).text().substring(0, 20);

        // Article
        let articleItem = $('div.list_content').eq(0);

        // Title
        let titleItem = articleItem.children('a.link_post').eq(0);
        let parseTitle = titleItem.children('strong.tit_post').eq(0).text();
        let parseLink = titleItem.attr('href');

        // Summary
        let parseSummary = titleItem.children('p.txt_post').eq(0).text(); // 표시 없음

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.title = parseTitle;
        result.link = rootUrl + parseLink;
        result.summary = parseSummary;
        result.type = 'P';

        rootCallback(result);
    });
};