
import {expect, test} from "vitest"
import getRandomTask from "../../utils/utils"

test("getRandomTask() returns a string", () => {
    expect(typeof getRandomTask()).toBe("string")
})

