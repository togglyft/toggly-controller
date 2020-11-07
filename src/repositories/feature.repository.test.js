const tested = require('./feature.repository')
var storageClient = {
  findAll: () => null,
  search: (feat) => null,
  create: (feat) => null,
  delete: (feat) => null,
  update: (feat) => null
}
const features = [
  { id: 1, name: "Feature1", enabled: true },
  { id: 2, name: "Feature2", enabled: false },
  { id: 3, name: "Feature3", enabled: true }
]

beforeAll(() => {
  storageClient.findAll = jest.fn()
  storageClient.search = jest.fn()
  storageClient.create = jest.fn()
  storageClient.delete = jest.fn()
  storageClient.update = jest.fn()

  tested.init(storageClient)
})

describe('feature repository', () => {
  test('should return promise when findAll is called', () => {
    //given
    storageClient.findAll.mockImplementation(() => new Promise(res => res(features)))

    //when
    expect.assertions(1)
    return tested.findAll()
      .then(res => expect(res).toEqual(features))
  })

  test('should return matching feature when search is called', () => {
    //given
    storageClient.search.mockImplementation(() => new Promise(res => res([features[2], features[1], features[0]])))

    //when
    expect.assertions(1)
    return tested.search(features[2])
      .then(res => expect(res).toEqual(features[2]))
  })

  test('should return error when storage client search returns errors', () => {
    //given
    const error = "ERROR"
    storageClient.search.mockImplementation(() => new Promise((res, rej) => rej(error)))

    //when
    expect.assertions(1)
    return tested.search(features[2])
      .catch(rej => expect(rej).toEqual(error))
  })

  test('should return promise when create is called', () => {
    //given
    const expected = new Promise(r => r(""));
    storageClient.create.mockImplementation(() => expected)

    //when
    const res = tested.create(features[2])

    //then
    expect(res).toEqual(expected)
  })

  test('should return promise when delete is called', () => {
    //given
    const expected = new Promise(r => r(""));
    storageClient.delete.mockImplementation(() => expected)

    //when
    const res = tested.delete(features[2])

    //then
    expect(res).toEqual(expected)
  })

  test('should return promise when update is called', () => {
    //given
    const expected = new Promise(r => r(""));
    storageClient.update.mockImplementation(() => expected)

    //when
    const res = tested.update(features[2])

    //then
    expect(res).toEqual(expected)
  })
});