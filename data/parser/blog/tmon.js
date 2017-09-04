// TODO 변경필요
const rootUrl = 'http://tmondev.blog.me/rss/atom';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');
exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {

        if (error) {
            console.error(error);
        }

        let $ = cheerio.load(body, {
            normalizeWhitespace: true,
            xmlMode: true
        });

        // Title
        let blogName = $('title').eq(0).text();

        let articleItem = $('entry').eq(0);
        let parseTitle = articleItem.children('title').eq(0).text();
        let parseLink = articleItem.children('link').eq(0).attr('href');
        let parseSummary = articleItem.children('summary').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl.replace('/rss/atom', '');
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 300) : parseSummary;
        result.category = ['company', 'tech'];

        rootCallback(result);
    });
};