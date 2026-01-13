let http = require('http'); // 모듈 호출 (feat,모듈호출방식)
let url = require('url');

function start(route, handle){
    function onRequest(request, response){
        let pathname = url.parse(request.url).pathname; // 문자열 캐치
        let queryData = url.parse(request.url, true).query;

        // console.log(queryData);

        route(pathname, handle, response, queryData.productId);
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start; // 모듈 내보내기