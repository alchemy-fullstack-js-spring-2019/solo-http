const { parse } = require('url');

module.exports = (req, res) => {
    console.log('Connected in app');
    const url = parse(req.url);
    let response;
    switch(url.pathname) {
        case '/': 
            res.setHeader('Content-Type', 'text/html');
            response = `
                <html>
                    <head><title>Hi</title></head>
                    <body><h1>Hello World</h1></body>
                </html>
            `;
            break;
        case '/birthday': 
            res.setHeader('Content-Type', 'text/html');
            response = 'Happy birthday';
            break;
        case '/tomorrow': 
            res.setHeader('Content-Type', 'text/html');
            response = `
                <html>
                    <head><title>Tomorrow</title></head>
                    <body><h1>Tomorrow, Tomorrow</h1></body>
                </html>
                `;
            break;
        case '/bonnie':
        //set status
            res.setHeader('Content-Type', 'application/json');
            response = JSON.stringify({ name: 'Bonnie' });
            break;
        default:
            res.setHeader('Content-Type', 'application/json');
            response = JSON.stringify({ name: 'boop' });
    }
    res.end(response);
};
