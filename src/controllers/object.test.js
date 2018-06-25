import controller from './object'
import * as mockData from '../../test/data'

jest.mock('../models/object', () => {
    const SequelizeMock = require('sequelize-mock')
    return new SequelizeMock().define('objects', {
        id: 2,
        key: 'key',
        createdAt: '2018-06-25T03:18:36.000Z',
        updatedAt: '2018-06-25T03:18:36.000Z',
        versions: [{
            id: 5,
            value: 'value5',
            createdAt: '2018-06-25T03:19:10.000Z',
            updatedAt: '2018-06-25T03:19:10.000Z',
            objectId: 2
        }]
    })
})

jest.mock('../models/version', () => {
    const SequelizeMock = require('sequelize-mock')
    return new SequelizeMock().define('versions', { value: 'value' })
})

let res

beforeEach(() => {
    res = {
        send: jest.fn(() => res)
    }

    controller.getVersion = jest.fn()
    controller.createObjectVersion = jest.fn()
    controller.createObject = jest.fn()
})

describe('get object', () => {
    it('json response should be correct', async() => {
        const response = await controller.getByKeyWithTimestampResponse(mockData.request, res)
        expect(response.key).toBe('key')
        expect(response.value).toBe('value5')
        expect(response.timestamp).toBe(1529896750)
    })

    it('by key only', async() => {
        await controller.getByKeyWithTimestampResponse(mockData.request, res)
        expect(controller.getVersion).toHaveBeenCalledWith(undefined)
    })

    it('by key with timestamp', async() => {
        await controller.getByKeyWithTimestampResponse(mockData.requestWithTimestamp, res)
        expect(controller.getVersion).toHaveBeenCalledWith(1529896750)
    })
})

describe('create or update object', () => {
    // pending implementation
})