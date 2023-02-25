// => 123.321
export const numberMask = (value:string):boolean|string => {
    const regExp = /^(\d)*(\.?)(\d)*$/g
    if (!value) {
        return value
    }
    if (!regExp.test(value)) {
        return false
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return +value.match(regExp)[0]
}
