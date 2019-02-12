var resolveLogic = require('../lib/Logic.js');
var requirement = {
    nodeType: "logic",
    logicType: "&&",
    left: {
        nodeType: "logic",
        logicType: "||",
        left: {
            nodeType: "requirement",
            requireType: "enum",
            key: "month",
            range: [0, 45]
        },
        right: {
            nodeType: "requirement",
            requireType: ">",
            key: "day",
            compareValue: 4
        }
    },
    right: {
        nodeType: "logic",
        logicType: "||",
        left: {
            nodeType: "requirement",
            requireType: "regex",
            regExp: "^\\S{1,30}$",
            key: "year"
        },
        right: {
            nodeType: "requirement",
            requireType: "[]",
            key: "hour",
            range: [0, 10]
        }

    }
};
var person = {
    year: "fdafdffdafdffdafdffdafdf",
    month: 45,
    day: 3,
    hour: 6
};
var result  = resolveLogic(requirement, person, false);
console.log('result:  '+ result);
