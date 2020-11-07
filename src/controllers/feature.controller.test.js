const repository = require('../repositories/feature.repository')
const errors = require('../helpers/errors')
const tested = require('./feature.controller')

jest.mock('../repositories/feature.repository', () => ({
  findAll: jest.fn(),
  search: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}))

describe('feature controller', () => {
  test('findAll() should return all features', async done => {
    //given
    const expectedResponse = [{id: 1}, {id: 2}]
    repository.findAll.mockImplementation(() => new Promise(res => res(expectedResponse)));
    let mReq = {}
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    //when
    return tested.findAll(mReq, mRes)
      .then(() => {
        //then
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toBeCalledWith(expectedResponse);
        done();
      })

  })

  test('findOne() should return all matching features', async done => {
    //given
    const expectedResponse = {id: 1}
    repository.search.mockImplementation((feat) => new Promise(res => res(expectedResponse)));
    let mReq = {
      params: {id: 1}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    //when
    return tested.findOne(mReq, mRes)
      .then(() => {
        //then
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toBeCalledWith(expectedResponse);
        done();
      })

  })

  test('findOne() should return 404 when no feature is found', async done => {
    //given
    const expectedResponse = null
    repository.search.mockImplementation((feat) => new Promise(res => res(expectedResponse)));
    let mReq = {
      params: {id: 1}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    //when
    return tested.findOne(mReq, mRes)
      .then(() => {
        //then
        expect(mRes.status).toBeCalledWith(404);
        expect(mRes.send).toBeCalledWith(errors.FEATURE_NOT_FOUND);
        done();
      })
  })
  
  test('findOne() should return 500 when an error is returned', async done => {
    //given
    const expectedResponse = "An error has occured"
    repository.search.mockImplementation((feat) => new Promise((res, rej) => rej(expectedResponse)));
    let mReq = {
      params: {id: 1}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    //when
    expect.assertions(2)
    return tested.findOne(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.send).toBeCalledWith(expectedResponse);
      done();
    })

  })

  test('create() should return 201 when an element is created', async done => {
    //given
    const expectedResponse = {}
    repository.create.mockImplementation((feat) => new Promise(res => res({})));
    let mReq = {
      body: {name: "name"}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(1)
    return tested.create(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.sendStatus).toBeCalledWith(201);
      done();
    })

  })

  test('create() should return FEATURE_INCOMPLETE if essential data is missing', async done => {
    //given
    let mReq = {
      body: {}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(2)
    return tested.create(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.send).toBeCalledWith({message: errors.FEATURE_INCOMPLETE});
      done();
    })

  })

  test('create() should return 500 when an error occurs', async done => {
    //given
    const expectedResponse = "An error has occured"
    repository.create.mockImplementation((feat) => new Promise((res, rej) => rej(expectedResponse)));
    let mReq = {
      body: {name: "name"}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(2)
    return tested.create(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.send).toBeCalledWith(expectedResponse);
      done();
    })

  })

  test('update() should return 200 when an element is updated', async done => {
    //given
    const expectedResponse = {}
    repository.update.mockImplementation((feat) => new Promise(res => res(expectedResponse)));
    let mReq = {
      params: {id: 1},
      body: {name: "name"}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(1)
    return tested.update(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.sendStatus).toBeCalledWith(200);
      done();
    })

  })

  test('update() should return FEATURE_INCOMPLETE if name is missing', async done => {
    //given
    let mReq = {
      params: {id: 1},
      body: {}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(2)
    return tested.update(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.send).toBeCalledWith({message: errors.FEATURE_INCOMPLETE});
      done();
    })

  })

  test('update() should return PROVIDE_EXISTING_FEATURE_ID if id is missing', async done => {
    //given
    let mReq = {
      body: {}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(2)
    return tested.update(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.send).toBeCalledWith({message: errors.PROVIDE_EXISTING_FEATURE_ID});
      done();
    })

  })

  test('update() should return 500 when an error occurs', async done => {
    //given
    const expectedResponse = "An error has occured"
    repository.update.mockImplementation((feat) => new Promise((res, rej) => rej(expectedResponse)));
    let mReq = {
      params: {id: 1},
      body: {name: "name"}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(2)
    return tested.update(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.send).toBeCalledWith(expectedResponse);
      done();
    })

  })





  test('delete() should return 200 when an element is deleted correctly', async done => {
    //given
    const expectedResponse = {}
    repository.delete.mockImplementation((feat) => new Promise(res => res({})));
    let mReq = {
      params: {id: 1},
      body: {name: "name"}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(1)
    return tested.delete(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.sendStatus).toBeCalledWith(200);
      done();
    })

  })

  test('delete() should return PROVIDE_EXISTING_FEATURE_ID if id is missing', async done => {
    //given
    let mReq = {
      body: {}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(2)
    return tested.delete(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.send).toBeCalledWith({message: errors.PROVIDE_EXISTING_FEATURE_ID});
      done();
    })

  })

  test('delete() should return 500 if an error occurs', async done => {
    //given
    const expectedResponse = "An error has occured"
    repository.delete.mockImplementation((feat) => new Promise((res,rej) => rej(expectedResponse)));
    let mReq = {
      params: {id: 1},
      body: {name: "name"}
    }
    let mRes = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus:jest.fn() };

    //when
    expect.assertions(2)
    return tested.delete(mReq, mRes)
    .then(() => {
      //then
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.send).toBeCalledWith(expectedResponse);
      done();
    })

  })

})