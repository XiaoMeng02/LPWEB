/**
 * Any类型，是TS中顶层类型，
 *     1.所有类型都可以分配给它
 *     2.它可以赋值给任意变量
 * 
 *   使用 any 类型，能让我们编写在TS下不报错的代码，但是不保证JS下不报错
 */

//声明一个any类型的变量
let notSure: any = 4;
//可以给它赋值为其他任何类型
notSure ="maybe it is a string";// OK
notSure=true;//OK
//调用它不存在的属性or方法
notSure.myName;// Ok
notSure.getName();//OK
//将它赋值给任意类型的
let num:number =notSure;//OK

/**
 * 使用any类型，能够编写出 TS 不报错，但是运行时可能报错的代码，这是不安全的。完全绕过了 Ts 的类型检查。
 * 为了让 TS 能够检查类型，且希望保留Any类型的一些特点。在Ts3.0 版本时，添加了一个 unknown 类型。
 * 
 * 可以将 unknown 类型理解为类型安全的 Any 类型。
 *  
 *      1、Any 类型可以分配给 unknown 类型
 *      2、unknown类型，只能分配给 unknown 或 Any 类型
 *      3、它表示未知类型，所以不能访问它的属性或方法
 */

//声明一个any类型的变量
let notSureOne: unknown = 4;
//可以给它赋值为其他任何类型
notSureOne = "maybe it is a string";// OK
notSureOne=true;//OK
//调用它不存在的属性or方法
// notSureOne.myName;
// notSureOne.getName();
// //将它赋值给任意类型的
// let numOne:number = notSureOne;
/**
 * 类型推导：没有标注类型，但是 TS 能够根据赋的值来推断出类型。
 * 如果一个参数或变量没有标注类型，且也无法通过类型推导判断出它的类型。那么它的类型则为隐式的Any类型。
 * 
 *      可以配置
            1."strict"：false，来关闭严格模式。（不推荐）
            2.单独配置"noImplicitAny"：false，来关闭隐式Any类型的校验，这个类型是推荐的
 */
function fn1(name){
    console.log(name);
}


/**
 * Any 与 unknown 的区别：
 *      1.两者都是顶层类型，任何类型都可以分配给他们
        2.Any可以分配给任意类型，但unknown只能分配给Any或unknown。
 *      3、使用Any 的话完全不支持 TS 的类型检查，所以不安全的。
        4、使用unknown 的话，TypeScript3.0 版本中才新增的，后续有需要用到Any的地方都推荐使用unknown
 */

