function getCharacter() {
    return Promise.resolve({
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human'
    });
}

module.exports = { getCharacter };
