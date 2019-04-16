const app = require('./lib/app');
const { rickNMorty } = require('./lib/services/rickAndMorty');

app.listen(3000);
rickNMorty.listen(4000);
