import { Swiper } from 'Swiper'

new Swiper(document.getElementById('app') as HTMLElement);
const el = document.getElementById("app") as HTMLElement;
el.innerHTML;

// <> 语法
let someValue1: any = "this is a string";
let strLength1: number = (<string>someValue1).length

// as 语法
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;

// 非空断言
//      !
function myFunc(maybeString: string | null | undefined) {
  // const str: string = maybeString; // 不能将类型“string | null | undefined”分配给类型“string”。不能将类型“undefined”分配给类型“string”
  const str1: string = maybeString!; // OK

  // console.log(str);
  console.log(str1);
}

type CallbackType = () => number;

function myFunc1(callback: CallbackType | undefined) {
  // const num1 = callback(); // Error 不能调用可能是“未定义”的对象。
  const num2 = callback!(); // Ok
}

myFunc1(undefined)
myFunc1(() => {
  return 100
})