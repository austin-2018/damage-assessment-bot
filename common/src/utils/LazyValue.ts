export default class LazyValue<T> {
    constructor(private lazyDefinition: () => T) { }

    private _value: T|null = null;
    get value() {
        if (!this._value) {
            this._value = this.lazyDefinition()
        }
        return this._value;
    }
}