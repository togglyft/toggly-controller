const tested = require('./volatile.feature.repository')
const errors = require('../../helpers/errors')

const features = [
  { id: 1, name: "Feature1", enabled: true },
  { id: 2, name: "Feature2", enabled: false },
  { id: 3, name: "Feature3", enabled: true }
]

/* beforeAll(() => {
  setup();
}); */

setup = (feats) => {
  tested.init({})
  feats && feats.forEach(f => tested.create(f))
}

describe('volatile repository', () => {
  test('should return all toggles', () => {
    //given
    setup(features);

    //when
    expect.assertions(2)
    return tested.findAll()
      .then((res) => {
        //then
        expect(res).toHaveLength(3);
        expect(res).toEqual(features);
      });
  });

  test('should search toggles by id', () => {
    //given
    setup(features);

    //when
    expect.assertions(2)
    return tested.search({id: 1})
      .then((res) => {
        //then
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(features[0])
      });
  });

  test('should search toggles by name', () => {
    //given
    setup(features);

    //when
    expect.assertions(2)
    return tested.search({name: "Feature2"})
      .then((res) => {
        //then
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(features[1])
      });
  });

  test('should return error if no id or name provided', () => {
    //given
    setup(features);

    //when
    expect.assertions(1)
    return tested.search({enabled: true})
      .catch(rej => {
        expect(rej).toBe(errors.NO_ATTTRIBUTE_SPECIFIED)
      });
  });


  test('should create toggle', () => {
    //given
    setup([]);
    const feature = { name: "Feature1", enabled: true }

    //when
    expect.assertions(2)
    return tested.create(feature)
      .then((res) => {
        //then
        expect(res).toBe(feature);
        expect(res.id).toEqual(1);
      });
  });

  test('should NOT create toggle when feature with same name already exists', () => {
    //given
    const feature = { name: "Feature1", enabled: true }
    setup([feature]);

    //when
    expect.assertions(1)
    return tested.create(feature)
      .catch((rej) => {
        //then
        expect(rej).toBe(errors.FEATURE_ALREADY_EXISTS);
      });
  });

  test('should NOT create toggle when feature when it is incomplete', () => {
    //given
    const feature = { enabled: true }
    setup();

    //when
    expect.assertions(1)
    return tested.create(feature)
      .catch((rej) => {
        //then
        expect(rej).toBe(errors.FEATURE_INCOMPLETE);
      });
  });

  test('should delete toggle', () => {
    //given
    setup(features);

    //when
    expect.assertions(3)
    return tested.delete(features[0])
      .then((res) => {
        //then
        expect(res).toEqual({})
        return tested.findAll().then(all => {
          expect(all).toHaveLength(2);
          expect(all).toEqual([features[1], features[2]])
        })
      });
  });

  test('should NOT delete toggle when id is not provided', () => {
    //given
    setup(features);

    //when
    expect.assertions(1)
    return tested.delete({name:features[0].name})
      .catch(rej => {
        //then
        expect(rej).toBe(errors.PROVIDE_FEATURE_ID)
      });
  });

  test('should update toggle', () => {
    //given
    setup(features);
    const feature = {...features[0]}
    feature.name="Another name"

    //when
    expect.assertions(3)
    return tested.update(feature)
      .then(res => {
        //then
        expect(res).toEqual(feature)
        return tested.findAll().then(all => {
          expect(all).toHaveLength(3);
          expect(all).toEqual([feature, features[1], features[2]])
        })
      });
  });

  test('should NOT update toggle when a feature with same name but different id already exists', () => {
    //given
    setup(features);
    const feature = {...features[0]}
    feature.name=features[1].name

    //when
    expect.assertions(1)
    return tested.update(feature)
      .catch(rej => {
        //then
        expect(rej).toBe(errors.FEATURE_ALREADY_EXISTS)
      });
  });

  test('should NOT update toggle when feature id is not provided', () => {
    //given
    setup(features);
    const feature = {...features[0]}
    feature.id = null;

    //when
    expect.assertions(1)
    return tested.update(feature)
      .catch(rej => {
        //then
        expect(rej).toBe(errors.PROVIDE_EXISTING_FEATURE_ID)
      });
  });

  test('should NOT update toggle when feature name is not provided', () => {
    //given
    setup(features);
    const feature = {...features[0]}
    feature.name = null;

    //when
    expect.assertions(1)
    return tested.update(feature)
      .catch(rej => {
        //then
        expect(rej).toBe(errors.FEATURE_INCOMPLETE)
      });
  });
});