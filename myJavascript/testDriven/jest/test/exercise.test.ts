describe('first test', () => {
    test('should equal to 4', () => {
        expect(1+2).toBe(3)
    })
    test('should not be null', () => {
        const notNull = !null
        expect(notNull).not.toBeNull()
    })
    test('should be greater than A', () => {
        const A = 3
        const B = 5
        expect(B).toBeGreaterThan(A)
    })
    test('should contain a cat in list', () => {
        const myList = ['dog', 'cat', 'bat', 'hamster']
        expect(myList).toContain('cat')
    })
})