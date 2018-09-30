
// Produces a new object instantiated by the constructor 'type' and
// applies only the set of properties from 'value' that are natural properties of 'type'
export default function makeModel<T>(type: new () => T, value: Partial<T>): T {
    if (!type || !value) {
        throw new Error("Insufficient arguments were provided.");
    }

    let result = new type();
    let allowedKeys = Object.keys(result);

    for (let key of allowedKeys) {
        //@ts-ignore
        let propValue = value[key];
        if (propValue !== undefined) {
            //@ts-ignore
            result[key] = propValue;
        }
    }

    return result;
}