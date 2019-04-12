function getCharacter() {
    return Promise.resolve({
        name: 'Alexander',
        species: 'Human',
        status: 'Alive'
    });
}

module.exports = getCharacter;