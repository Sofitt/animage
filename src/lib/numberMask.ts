// => 123.321
export const numberMask = (value:string):boolean|string => {
    const regExp = /^(\d)*(\.?)(\d)*$/g
    if (!value) {
        return value
    }
    if (!regExp.test(value) || value === '.') {
        return false
    }
    // @ts-ignore
    return value?.match(regExp)[0]
}
