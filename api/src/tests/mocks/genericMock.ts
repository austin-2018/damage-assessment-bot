
export default function genericMock<T>(methods?: Partial<T>): T&{$calls: typeof $calls} {
    let $calls: {[i in keyof T]?: any[][]} = {};
    return <T&{$calls: typeof $calls}>new Proxy(methods || {}, {
        get: (obj, prop) => {
            if (prop === "$calls") {
                return $calls;
            }            
            return (...args: any[]) => {

                if (!$calls[prop]) {
                    $calls[prop] = [];
                }
                $calls[prop].push(args);

                if (typeof obj[prop] === "function") {
                    return obj[prop](args);
                }
            }
        }
    });
}