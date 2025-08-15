//string
let firstName: string = "张三";
//number
let age: number = 25;
let message: string = `hello, ${firstName},age is ${age}`;
//boolean
let flag: boolean = true;
//bigint
let oneHundred: bigint = BigInt(100);
//symbol
let s: symbol = Symbol();

//以上是 TS 中的五种基础类型
//  1.描述类型的写法：string 就叫做类型的标注
//  2.ts能直接根据赋给变量的值来完成，类型推导，这样的话，我们定义变量时可以无需标注类型
let msg = "张三"
// msg = 1 // 类型推导，msg的类型是string