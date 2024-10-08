class Calculator {
    #value = 0

    constructor(value = 0) {
        this.#value = value
    }

    get calculate() {
        return this.#value
    }

    subtract(value) {
        this.#value = this.#value - value
    }

    add(value) {
        this.#value = this.#value + value
    }

    multiply(value) {
        this.#value = this.#value * value
    }
}

module.exports = { Calculator }