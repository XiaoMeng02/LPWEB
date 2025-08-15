"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let arr = [1, 2, 3, 4, 5];
arr.push(6);
// arr.push("2")//类型String不能赋值给类型number
//标注为数组类型的两种方式
// 1.中括号表示
// 2.Array泛型表示
let arr1 = ["1", "2", "3"];
let arr2 = [1, 2, 3];
let arr3 = [{ name: "西游记" }, { name: "红楼梦" }];
arr3.push({
    name: "三国演义",
});
// let filmList:{ filmId: number, filmName: string }
//  像对象，但是value为类型的，叫做对象字面量类型
let filmList;
filmList = [{ filmId: 1, filmName: "西游记", poster: "ssss" }];
const cinemaList = ['1', '2'];
cinemaList.push('3');
// cinemaList = ['3','4']//类型string[]不能赋值给类型string[]
//Tuple 元组类型
//   长度固定且每一项的类型都明确的特殊数组类型
let tuple = ["hello", 123];
