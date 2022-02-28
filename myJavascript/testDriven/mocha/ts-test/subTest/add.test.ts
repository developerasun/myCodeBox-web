import chai from 'chai'
import { assert } from 'chai'

const two = 2
const four = 4

// using arrow function(lamda) is discouraged in
// mocha since it cannot access to mocha context 
describe('addition', function() {
    it('should be equal to 6', function() {
        assert(two + four === 6)
    })
})