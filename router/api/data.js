const DbManager = require('../../data/db/db_manager');
const parseManager = require('../../data/parser/parse_manager');

module.exports = function (app) {
    app.get('/api/data/read/:blogId', (req, res) => {
        DbManager.getRecentData(req.params.blogId, function (result) {
            if (result.name === 'NODATA') {
                return res.status(404).json({error: '종류를 입력해주세요.', value: req.params.blogId});
            } else {
                return res.json(result);
            }
        });
    });

    app.get('/api/data/parse/:blogId', (req, res) => {
        parseManager.parseData(req.params.blogId);
        return res.status(200).json({success: req.params.blogId + ' 파싱'});
    });

    app.get('/api/data/remove/:blogId', (req, res) => {
        DbManager.removeData(req.params.blogId);
        return res.status(200).json({success: req.params.blogId + ' 삭제'});
    });
};