class Dog<T extends string | number> {
  name: T;

  constructor(xxx: T) {
    this.name = xxx;
  }
}

new Dog("小张");
new Dog(18);
// new Dog(true);

// 上述 T 这个泛型参数，可以是任意类型不太合适。我们期望它只能是 string | number 这时可以对其做一个约束。
// 使用 extends

interface Lengthwise {
  length: number;
}

function func300<T extends Lengthwise>(value: T): T {
  console.log(value.length);
  return value;
}

func300([1, 2, 3, 4]);

/**
 * 实现一个 getProperty() 方法,
 *  function  getProperty(obj, key) {
 *    // ...
 *  }
 *
 *  1. getProperty({ name: '张三', age: 18 }, 'name')  => '张三'
 *  2. getProperty({ name: '张三', age: 18 }, 'age')   => 18
 */

// keyof 操作符时在 TypeScript 2.1 版本中引入的，该操作符可以用来获取某种类型的所有键，其返回类型是联合类型。

interface III3 {
  name: string;
  age: number;
}

type Type300 = keyof { name: string; age: number };

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const obj100 = { name: "张三", age: 18 };
getProperty(obj100, 'age')
getProperty(obj100, 'name')

getProperty({ a: 1, b: 2, c: 3 }, 'c')
