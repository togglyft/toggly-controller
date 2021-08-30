var mysql = require('mysql');
const tested = require('./mysql.feature.repository')

jest.mock('mysql')
var pool = {
  query: () => null
}

beforeAll(() => {
  mysql.createPool = jest.fn().mockImplementation(() => pool)
  tested.init({})
});

describe('mysql repository', () => {
  test('should initialize repository with all params', () => {
    //given
    let configParams = {
      connections: 10,
      host: "host",
      port: 1234,
      user: "user",
      password: "password",
      database: "database"
    }

    let expectedConfig = {
      connectionLimit: configParams.connections,
      host: configParams.host,
      port: configParams.port,
      user: configParams.user,
      password: configParams.password,
      database: configParams.database
    }

    //when
    tested.init(configParams)

    //then
    expect(mysql.createPool).toHaveBeenCalledWith(expectedConfig)
  });

  test('should initialize repository with default params', () => {
    //given
    let configParams = {
      user: "user",
      password: "password"
    }

    let expectedConfig = {
      connectionLimit: 10,
      host: "localhost",
      port: 3306,
      user: configParams.user,
      password: configParams.password,
      database: "toggly"
    }

    //when
    tested.init(configParams)

    //then
    expect(mysql.createPool).toHaveBeenCalledWith(expectedConfig)
  });

  test('should return all toggles', () => {
    //given
    const features = [
      { id: 1, name: "Feature1", enabled: true, lastModified: "2021-08-25 09:01:29.0", relatedTask: "FLX-123" },
      { id: 2, name: "Feature2", enabled: false, lastModified: "2021-08-25 09:01:29.0", relatedTask: "FLX-123" },
      { id: 3, name: "Feature3", enabled: true, lastModified: "2021-08-25 09:01:29.0", relatedTask: "FLX-123" }
    ]
    const query = jest.fn()
    query.mockImplementation((sql, cb) => cb(null, features, null))

    pool.query = query

    //when
    return tested.findAll()
      .then((res) => {
        //then
        expect(query).toHaveBeenCalledWith(expect.stringMatching(/^SELECT \* FROM/), expect.anything());
        expect(res).toHaveLength(3);
      });
  });

  test('should search toggles', () => {
    //given
    const features = [
      { id: 1, name: "Feature1", enabled: true, lastModified: "2021-08-25 09:01:29.0", relatedTask: "FLX-123" },
    ]
    const query = jest.fn()
    query.mockImplementation((sql, cb) => cb(null, features, null))

    pool.query = query

    //when
    return tested.search({id: 1, name: "name"})
      .then((res) => {
        //then
        expect(query).toHaveBeenCalledWith(expect.stringMatching(/SELECT \* FROM(.|\n)*WHERE(.|\n)*id=1(.|\n)*name='name'/), expect.anything());
        expect(res).toHaveLength(1);
      });
  });

  test('should create toggle', () => {
    //given
    const feature = { id: 1, name: "Feature1", enabled: true, lastModified: "2021-08-25 09:01:29.0", relatedTask: "FLX-123" }
    const query = jest.fn()
    query.mockImplementation((sql, values, cb) => cb(null, null, null))

    pool.query = query

    //when
    return tested.create(feature)
      .then((res) => {
        //then
        expect(query).toHaveBeenCalledWith(expect.stringMatching(/INSERT INTO(.|\n)*SET/), feature, expect.anything());
        expect(res).toEqual({});
      });
  });

  test('should delete toggle', () => {
    //given
    const feature = { id: 1, name: "Feature1", enabled: true }
    const query = jest.fn()
    query.mockImplementation((sql, values, cb) => cb(null, null, null))

    pool.query = query

    //when
    return tested.delete(feature)
      .then((res) => {
        //then
        expect(query).toHaveBeenCalledWith(expect.stringMatching(/DELETE FROM(.|\n)*WHERE id=/), [feature.id], expect.anything());
        expect(res).toEqual({});
      });
  });

  test('should update toggle', () => {
    //given
    const feature = { id: 1, name: "Feature1", enabled: true, lastModified: "2021-08-25 09:01:29.0", relatedTask: "FLX-123" }
    const query = jest.fn()
    query.mockImplementation((sql, values, cb) => cb(null, null, null))

    pool.query = query

    //when
    return tested.update(feature)
      .then((res) => {
        //then
        expect(query).toHaveBeenCalledWith(expect.stringMatching(/UPDATE(.|\n)*SET(.|\n)*WHERE id=/), [feature,feature.id], expect.anything());
        expect(res).toEqual({});
      });
  });
});