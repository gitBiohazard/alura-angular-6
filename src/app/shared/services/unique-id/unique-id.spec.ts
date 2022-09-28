import { UniqueIdService } from './unique-id.service';


describe(UniqueIdService.name, () => {
  let service: UniqueIdService = null
  beforeEach(() => {
    service = new UniqueIdService()
  })

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  should generate id when called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app')
    expect(id.startsWith('app-')).toBeTrue()
  })

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  should not generate duplicated IDs when called multiple times`, () => {
    const ids = new Set()
    for (let i = 0; i < 1000; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'))
    }
    expect(ids.size).toBe(1000)
  })

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name}
  should return the number of generated Ids when called`, () => {
    for (let i = 0; i < 5914; i++) {
      service.generateUniqueIdWithPrefix('app')
    }
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(5914)
  })

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  should throw when called with empty`, () => {
    const emptyValues = [null, undefined, '', '0', '1']
    emptyValues.forEach(value => {
      expect(() => service.generateUniqueIdWithPrefix(value))
      .withContext(`Empty value: ${value}`)
      .toThrow()
    })
  })

})
