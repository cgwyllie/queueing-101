class Calculator {
    #value = 0

    constructor(value = 0) {
        this.#value = value
    }

    use_operation(operation, value) {
        switch (operation) {
            case "add":
                this.add(value)
                break
            case "subtract":
                this.subtract(value)
                break
            case "multiply":
                this.multiply(value)
                break
            default:
                console.error("invalid calculator operation")

        }
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