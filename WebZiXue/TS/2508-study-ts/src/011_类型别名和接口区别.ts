/**
 * interface 与 type 的区别：
 *    1. 两者都是可以对现有类型做抽象的一个工具。
 *    2. interface 不能描述 联合类型，而 type 可以。
 *    3. interface 可以重名，而 type 不可以。
 *    4. interface 通过 extends 来继承另一个 interface
 *       type 通过 & 来做继承的操作
 *    5. 一般都推荐使用 type , 如果需要有继承或重名的话就推荐使用 interface
 */

interface IP1 {
  name: string;
}

interface IP1 {
  age: number;
}

const pp1: IP1 = {
  name: "张三",
  age: 100,
};

type Tp1 = string;
type Tp1 = number;

interface IAnimal {
  name: string;
  age: number;
}

interface ITian {
  // 流口水
  lks: () => void;
}

// interface 继承 单个
interface IDog extends IAnimal {
  fun: () => void;
}

// interface 继承 多个
interface ITianDog extends IDog, ITian {}

const d1: IDog = {
  name: "小d1",
  age: 10,
  fun: () => {
    console.log("d1 在狂吠");
  },
};

const d2: ITianDog = {
  name: "小d2",
  age: 20,
  fun: () => {
    console.log("讲话");
  },
  lks: () => {
    console.log("流口水");
  },
};

// type 继承是通过 &&
type Tp3 = {
  name: string;
  age: number;
} & {
  fun: () => void;
};

const d3: Tp3 = {
  name: "张三",
  age: 18,
  fun: () => {},
};
