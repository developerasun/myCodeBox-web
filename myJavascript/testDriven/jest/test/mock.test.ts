const mockCallback = jest.fn(x => 42 + x)

describe('mockting test', () => {
    test('mock should not be called', () => {
        expect(mockCallback.mock.calls.length).toBe(0)
    })
})
