const express = require('express')
const featuresController = require('../controllers/feature.controller');
const tested = require('./feature.routes')
const supertest = require('supertest')

const app = express();
const request = supertest(app)
app.use("/api", tested);

jest.mock('../controllers/feature.controller', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}))

const OP_FINDALL_RESP = {response: "findAll"}
const OP_FINDALL_URL = "/api/features"
const OP_CREATE_RESP = {response: "create"}
const OP_CREATE_URL = "/api/features"
const OP_FINDONE_RESP = {response: "findOne"}
const OP_FINDONE_URL = "/api/features/1"
const OP_UPDATE_RESP = {response: "update"}
const OP_UPDATE_URL = "/api/features/1"
const OP_DELETE_RESP = {response: "delete"}
const OP_DELETE_URL = "/api/features/1"

describe('feature router', () => {
  test('should call findAll', async done => {
    //given
    featuresController.findAll.mockImplementation((req, res) => res.status(200).send(OP_FINDALL_RESP))

    //when
    const response = await request.get(OP_FINDALL_URL)

    //then
    expect(response.body).toEqual(OP_FINDALL_RESP)
    expect(response.status).toEqual(200)
    done()
  })

  test('should call create', async done => {
    //given
    featuresController.create.mockImplementation((req, res) => res.status(200).send(OP_CREATE_RESP))

    //when
    const response = await request.post(OP_CREATE_URL)

    //then
    expect(response.body).toEqual(OP_CREATE_RESP)
    expect(response.status).toEqual(200)
    done()
  })

  test('should call findOne', async done => {
    //given
    featuresController.findOne.mockImplementation((req, res) => res.status(200).send(OP_FINDONE_RESP))

    //when
    const response = await request.get(OP_FINDONE_URL)

    //then
    expect(response.body).toEqual(OP_FINDONE_RESP)
    expect(response.status).toEqual(200)
    done()
  })

  test('should call delete', async done => {
    //given
    featuresController.delete.mockImplementation((req, res) => res.status(200).send(OP_DELETE_RESP))

    //when
    const response = await request.delete(OP_DELETE_URL)

    //then
    expect(response.body).toEqual(OP_DELETE_RESP)
    expect(response.status).toEqual(200)
    done()
  })

  test('should call update', async done => {
    //given
    featuresController.update.mockImplementation((req, res) => res.status(200).send(OP_UPDATE_RESP))

    //when
    const response = await request.put(OP_UPDATE_URL)

    //then
    expect(response.body).toEqual(OP_UPDATE_RESP)
    expect(response.status).toEqual(200)
    done()
  })
})