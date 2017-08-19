// TODO 변경필요
const rootUrl = 'https://blogs.unity3d.com/kr/';

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
        let articleItem = $('div.lg-post-group').eq(0).children('div.g7.pb30').eq(0);

        // Title
        let titleItem = articleItem.children('h4.mb10.post-heading').eq(0).children('a');
        let parseTitle = titleItem.text();
        let parseLink = titleItem.attr('href');

        // Header Image
        let parseHeaderSrc = articleItem.parent().children('div.g5.p0').eq(0)
            .children('a').eq(0)
            .children('div').eq(0)
            .css('background-image');
        parseHeaderSrc = parseHeaderSrc.replace('url(', '').replace(')', '').replace(/\"/gi, "");

        if (parseHeaderSrc === undefined) {
            parseHeaderSrc = ' https://blogs.unity3d.com/wp-content/themes/unity/images/large.jpg';
        }

        // Summary
        let parseSummary = articleItem.children('p.mb0.clear.d-excerpt').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.header_src = parseHeaderSrc;
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.type = 'C';

        rootCallback(result);
    });
};