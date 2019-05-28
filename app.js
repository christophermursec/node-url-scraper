const fs = require('fs');
const cheerio = require('cheerio');
const unirest = require('unirest');

getLinks = (url) => {

    const req = unirest('GET', url);

    req.end((res) => {
        if (res.error) throw new Error(res.error);

        const html = res.body;
        const $ = cheerio.load(html);
        const links = [];

        $('a').each(function (i) {
            if (!$(this).prop('href') == '' || !$(this).prop('href') == undefined || !$(this).prop('href') === '#') {
                if ($(this).prop('href').toString().substring(0,4) === 'http') {
                    links[i] = $(this).prop('href');
                }
            }
        });

        const fileName = 'result.txt';
        fs.writeFileSync(fileName, links.join('\n'));
    });
}