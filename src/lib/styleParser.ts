/*
Сепаратор для парса - ";"
*/
export const styleParser = (input:string):boolean|object => {
    if (input.charAt(input.length - 1) !== ';') {
        return false
    }
    const split = input.split(';')
    const result:object = {}
    for (const v of split) {
        if (!v) {
            continue
        }
        const match = v.match(/[?:A-Za-z-]*:/g)
        const value = v.match(/:[\D\w]*/g)
        if (match === null || value === null) {
            throw new Error(`Ошибка парсинга свойства стиля:\nkey:${match}, value: ${value}`)
        }
        const key = match[0].slice(0, -1)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[key] = value[0].slice(2)
    }
    return result
}
