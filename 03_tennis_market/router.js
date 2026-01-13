function route(pathname, handle, response, productId){
    console.log('pathname : ' + pathname);
    // console.log('pathname : ' + productId);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, productId); // 핸들이 함수로 작동하는 이유

    } else {
        console.log('No request handler found for ' + pathname);
        response.writeHead(404, {'content-Type':'text/html'});
        response.write('Not found');
        response.end();
    }

}

exports.route = route;