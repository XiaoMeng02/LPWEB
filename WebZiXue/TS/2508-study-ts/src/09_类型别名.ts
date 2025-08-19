/**
 * 类型别名：
 *   通过type关键字创建的 类型别名
 * 
 * 语法： 
 *     type 别名 = 类型
 */
//1.将现有的类型别名
type myString = string
// let str10:myString = 10

//2.将联合类型取个别名
type Type1 = undefined | string
let str11:Type1 = undefined
str11 = 'hello'
// str11 = 10 // 报错，类型“10”不能赋值给类型“Type1”

//3.给对象字面量类型取个别名
type Type2 = {
    filmId : number,
    filmName : string,
    poster :string,
} 

//4.给函数类型取个别名
type Type3 = (a:string, b:string) => string
const fn30 :Type3 = function(name:string, address:string) {
    return ""
}
const fn31 :Type3 = (q:string, w:string) => "100"
 
