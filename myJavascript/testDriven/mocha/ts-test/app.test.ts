import chai from 'chai'
const assert = chai.assert

const two = 2
const three = 3
const addAsync =  async() => {
    return two + three
}

describe('async mocha', function() {
    it('should be equal to 5', async function() {
        const result = await addAsync()
        assert.equal(result, 5)
    })
    // it.skip will not be run
    it.skip('should be number', function() {
        const result = -1
        assert.isNumber(result)
    })
})