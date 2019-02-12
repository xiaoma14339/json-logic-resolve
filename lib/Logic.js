module.exports = function resloveLogic (requirement = {}, object = {}, defaultValue) {
    var defaultResult = (defaultValue !== undefined && defaultValue !== null) ? defaultValue : true;
    const {
        nodeType
    } = requirement;
    if (nodeType === 'requirement') {
        const {
            requireType,
            key = ''
        } = requirement;
        var currentValue = object[key];
        switch (requireType) {
            case 'regex': {
                const {
                    regExp
                } = requirement;
                if (currentValue && regExp) {
                    var exp = new RegExp(regExp);
                    return exp.test(currentValue)
                } else {
                    return defaultResult
                }
            }
            case 'enum': {
                const {
                    range = []
                } = requirement;
                if (currentValue && range.length > 0) {
                    return range.includes(currentValue);
                } else {
                    return defaultResult;
                }
            }
            case '[]': {
                const {
                    range = []
                } = requirement;
                if (range.length >= 2 && currentValue) {
                    return parseFloat(currentValue) >= (range[0] || 0) && parseFloat(currentValue) <= (range[range.length - 1] || 0)
                } else {
                    return defaultResult
                }
            }
            case '>': {
                const {
                    compareValue
                } = requirement;
                if (!isNaN(currentValue) && !isNaN(compareValue)) {
                    return parseFloat(currentValue) > compareValue;
                } else {
                    return defaultResult;
                }
            }
            case '>=': {
                const {
                    compareValue
                } = requirement;
                if (!isNaN(currentValue) && !isNaN(compareValue)) {
                    return parseFloat(currentValue) >= compareValue
                } else {
                    return defaultResult;
                }
            }
            case '<': {
                const {
                    compareValue
                } = requirement;
                if (!isNaN(currentValue) && !isNaN(compareValue)) {
                    return parseFloat(currentValue) < compareValue;
                } else {
                    return defaultResult;
                }
            }
            case '<=': {
                const {
                    compareValue
                } = requirement;
                if (!isNaN(currentValue) && !isNaN(compareValue)) {
                    return parseFloat(currentValue) <= compareValue;
                } else {
                    return defaultResult;
                }
            }
            default:
                return defaultResult;
        }
    } else if (nodeType === 'logic') {
        const {
            logicType,
            left = {},
            right = {}
        } = requirement;
        if (logicType === '&&') {
            return resloveLogic(left, object, defaultValue) && resloveLogic(right, object, defaultValue);
        } else if (logicType === '||') {
            return resloveLogic(left, object, defaultValue) || resloveLogic(right, object, defaultValue);
        } else {
            return defaultResult;
        }
    } else {
        return defaultResult;
    }
};
