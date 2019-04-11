const { parse } = require('url');

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const url = parse(req.url);
    let response;
    switch(url.pathname) {
        case '/': 
            response = JSON.stringify({ name: 'Bonnie' });
            break;
        case '/tester':
            response = JSON.stringify({ testing: 123 });
            break;
        default:
            response = JSON.stringify({ default: true });
    }
    res.end(response);
};
