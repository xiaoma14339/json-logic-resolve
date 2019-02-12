##说明
用于判断对象中的属性是否符合json中的条件
##API
####resolveLogic(requirement, object, defaultValue)
返回true/false
- requirement 条件
- object 需要判断的对象
- defaultValue默认返回值（不包含条件对应的key或者格式错误）

###json的格式说明
原理是基于二叉树的遍历来解析一个复杂条件，所以json的结构也是一个二叉树

节点（nodeType）的类型分为两种
- 逻辑节点（logic）
对子节点做逻辑运算（&&， ||）
- 条件节点（requirement）
包含具体的条件

#####条件类型
目前支持的条件判断类型（requireType）有7种
- 正则 regex
- 枚举 enum
- 范围（两个数值之间） []
- 大于 >
- 大于等于 >=
- 小于 <
- 小于等于 <=

###示例
```
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
```