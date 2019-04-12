module.exports = req => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {

    });
};
