/**
 * interface 接口
 *    语法：
 *      interface XXX {
 *
 *      }
 */

// 1. 描述对象类型
interface IType {
  name: string;
  age: number;
}
const p1: IType = {
  name: "张三",
  age: 18,
};

// 2. 描述数组类型
//    string[]
interface ITypeArr1 {
  [key: number]: string;
}
const a1: ITypeArr1 = ["1", "2"];
//    number[]
interface ITypeArr2 {
  [aaa: number]: number;
}
const a2: ITypeArr2 = [1, 2];

// 3. 描述任意元素的对象
interface ITypeAny {
  // name 与 age 表示该对象已确认的元素
  name: string;
  age: number;
  // 索引类型 表示该对象不确认的元素，不确认元素的类型必须与已确认元素的内容对上
  [aaa: string]: string | number;
}
const p2: ITypeAny = {
  name: "",
  age: 10,
  sex: 10,
  address: "1--",
};

// 4. 描述函数类型
interface ITypeFun {
  (a: string, b: number): void
}

const f1: ITypeFun = (aa: string, bb: number) => {

}

// 5. 描述联合类型？？？？ 描述不了