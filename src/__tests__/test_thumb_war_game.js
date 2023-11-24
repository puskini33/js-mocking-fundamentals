const thumbWar = require('../thumb-war')
const utils = require('../utils')

function fn(impl) {
    const mockFn = (...args) => {
        mockFn.mock.calls.push(args)
        return impl(...args)
    }


    mockFn.mock = {calls: []}
    return mockFn
}

describe("test thumbWar game", () => {

    test("correct player wins the thumbWar game", () => {
        // setup
        const originalWinner = utils.getWinner

        // modify behavior, but do not modify signature
        utils.getWinner = fn((player1, player2) => player1)

        //act
        const winner = thumbWar("Elena", "Kent C. Dodds")

        //assert
        expect(winner).toBe("Elena")

        // expect(utils.getWinner).toHaveBeenCalledTimes(2)
        //expect(utils.getWinner).toHaveBeenCalledWith("Elena", "Kent C. Dodds")
        expect(utils.getWinner.mock.calls).toEqual([ ["Elena", "Kent C. Dodds"], ["Elena", "Kent C. Dodds"] ])


        // cleanup
        utils.getWinner = originalWinner
    })

})