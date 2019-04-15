const app = require('../lib/app.js');
const request = require('supertest');
const People = require('../lib/models/People');
const Cars = require('../lib/models/Cars');

jest.mock('../lib/service/getCharacter.js');

describe('app routes', () => {
  it('responds to a path', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual({ testing: 123 });
      });
  });

  it('responds with an object based on query string', () => {
    return request(app)
      .get('/you?name=tommy')
      .then(res => {
        expect(res.body).toEqual({ text: 'hi there tommy' });
      });
  });

  it('gets Rick object from api', () => {
    return request(app)
      .get('/character/1')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Tommy Tran',
          status: 'Alive',
          species: 'Human'
        });
      });
  });

  it('gets Morty object from api', () => {
    return request(app)
      .get('/character/2')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human'
        });
      });
  });
});

describe('People database', () => {
  afterAll(() => People.drop());
  
  it('with POST, it parses the body and adds new person to People database', () => {
    const toSend = { 
      name: 'Tommy',
      age: 24,
      color: 'orange',
      extra: 'extra'
    };

    return request(app)
      .post('/people').send(toSend)
      .then(res => {
        expect(res.body).toEqual({ 
          name: 'Tommy',
          age: 24,
          color: 'orange',
          _id: expect.any(String)
        });
      });
  });

  it('sends back all the people in the database', () => {
    return request(app)
      .get('/people')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toContainEqual({ 
          name: 'Tommy',
          age: 24,
          color: 'orange',
          _id: expect.any(String)
        });
      });
  });

  it('sends back a person based on id', () => {
    const toSend = { 
      name: 'Tommy',
      age: 24,
      color: 'orange',
      extra: 'extra'
    };

    return request(app)
      .post('/people').send(toSend)
      .then(res => res.body._id)
      .then(id => request(app).get(`/people/${id}`))
      .then(res => {
        expect(res.body).toEqual({ 
          name: 'Tommy',
          age: 24,
          color: 'orange',
          _id: expect.any(String)
        });
      });
  });

  it('updates a person', () => {
    const toSend = { 
      name: 'Tommy',
      age: 24,
      color: 'orange',
      extra: 'extra'
    };

    const toPut = {
      name: 'Not Tommy',
      age: 42,
      color: 'green'
    };

    return request(app)
      .post('/people').send(toSend)
      .then(res => res.body._id)
      .then(id => request(app).put(`/people/${id}`).send(toPut))
      .then(res => {
        expect(res.body).toEqual({ 
          name: 'Not Tommy',
          age: 42,
          color: 'green',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a person based on id', () => {
    const toSend = { 
      name: 'Tommy',
      age: 24,
      color: 'orange',
      extra: 'extra'
    };

    return request(app)
      .post('/people').send(toSend)
      .then(res => res.body._id)
      .then(id => request(app).delete(`/people/${id}`))
      .then(res => {
        expect(res.body).toEqual({ 
          deleted: 1
        });
      });
  });
});

describe('Cars database', () => {
  afterAll(() => Cars.drop());
  
  it('with POST, it parses the body and adds new car to Cars database', () => {
    const toSend = { 
      brand: 'Tommy',
      model: 'orange',
      year: 24,
      extra: 'extra'
    };

    return request(app)
      .post('/cars').send(toSend)
      .then(res => {
        expect(res.body).toEqual({ 
          brand: 'Tommy',
          model: 'orange',
          year: 24,
          _id: expect.any(String)
        });
      });
  });

  it('sends back all the cars in the database', () => {
    return request(app)
      .get('/cars')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toContainEqual({ 
          brand: 'Tommy',
          model: 'orange',
          year: 24,
          _id: expect.any(String)
        });
      });
  });

  it('sends back a car based on id', () => {
    const toSend = { 
      brand: 'Tommy',
      model: 'orange',
      year: 24,
      extra: 'extra'
    };

    return request(app)
      .post('/cars').send(toSend)
      .then(res => res.body._id)
      .then(id => request(app).get(`/cars/${id}`))
      .then(res => {
        expect(res.body).toEqual({ 
          brand: 'Tommy',
          model: 'orange',
          year: 24,
          _id: expect.any(String)
        });
      });
  });

  it('updates a car', () => {
    const toSend = { 
      brand: 'Tommy',
      model: 'orange',
      year: 24,
      extra: 'extra'
    };

    const toPut = {
      brand: 'Not Tommy',
      model: 'green',
      year: 42
    };

    return request(app)
      .post('/cars').send(toSend)
      .then(res => res.body._id)
      .then(id => request(app).put(`/cars/${id}`).send(toPut))
      .then(res => {
        expect(res.body).toEqual({ 
          brand: 'Not Tommy',
          model: 'green',
          year: 42,
          _id: expect.any(String)
        });
      });
  });

  it('deletes a car based on id', () => {
    const toSend = { 
      brand: 'Tommy',
      model: 'orange',
      year: 24,
      extra: 'extra'
    };

    return request(app)
      .post('/cars').send(toSend)
      .then(res => res.body._id)
      .then(id => request(app).delete(`/cars/${id}`))
      .then(res => {
        expect(res.body).toEqual({ 
          deleted: 1
        });
      });
  });
});
