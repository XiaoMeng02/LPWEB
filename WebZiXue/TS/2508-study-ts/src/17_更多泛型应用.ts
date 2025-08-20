/**
 * 泛型不光可以使用在 函数上，也可以使用在 interface 、type 、 class
 */

interface III1<T> {
  name: string;
  age: T;
}

const x1: III1<string> = {
  name: "张三",
  age: "18",
};

// 泛型参数，默认值
interface III2<T = number> {
  name: string;
  age: T;
}

const x2: III2 = {
  name: "111",
  age: 19,
};

type Type100<T> = () => T;
type Type200<T, R> = T | R;

const func200: Type100<string> = () => "";
const aaaa: Type200<number, string> = "";
const bbbb: Type200<string[], number[]> = [11, 22];

class Animal<T> {
  name: T;

  constructor(xxx: T) {
    this.name = xxx
  }
}

new Animal('小张')
new Animal(18)
new Animal(true)