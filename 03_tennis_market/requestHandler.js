const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main 정애리');

    mariadb.query('SELECT * FROM product', function(err, rows){
        console.log(rows)
    });
    
    response.writeHead(200, {'content-Type':'text/html'});
    response.write(main_view);
    response.end();
}

function orderlist(response) {
    console.log('orderlist 정애리');
    response.writeHead(200, {'content-Type':'text/html'});

    mariadb.query('SELECT * FROM orderlist', function(err, rows){
        response.write(orderlist_view);

        rows.forEach(ele => {
            console.log(ele.product_id, ele.order_date);
            response.write(
                "<tr>"
                + "<td>"+ele.product_id+"</td>"
                + "<td>"+ele.order_date+"</td>"
                + "</tr>"
            );
        })
        response.write("</table>")
        response.end();

    });
}


function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'content-Type':'text/html'});
        response.write(data);
        response.end();
    })
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'content-Type':'text/html'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'content-Type':'text/html'});
        response.write(data);
        response.end();
    })
}

function order(response, productId){
    console.log('order', productId, new Date());
    response.writeHead(200, {'content-Type':'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (?, ?)", 
        [productId, new Date()], 
        function(err, rows){
            console.log(rows)
    })
    response.write('order');
    response.end();
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist.html'] = orderlist;
handle['/orderlist'] = orderlist;

/* 이미지 경로 */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;