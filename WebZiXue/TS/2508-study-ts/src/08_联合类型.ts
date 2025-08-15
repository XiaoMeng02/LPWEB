function printId(id:number|string){
    console.log(id);
}

printId(123);//ok
printId("abc");//ok
// printId(true);//error 类型“boolean”不能赋值给类型“number”或“string”。

// let isOk: 0 | 1 = 2;//不能将类型“2”分配给类型“0 | 1”。

//字面量类型
// let isOk: 0 | 1 = 2;//不能将类型“2”分配给类型“0 | 1”。
// let msg30:'hello' = "world"
// let num30: 0 = 10

/**
 * 联合类型的使用，主要就是做类型判断
 */

function fn31(id:number|string){
    //类似收窄
    if(typeof id === "number"){
    id.toFixed(); //类型“number”上不存在toFixed方法，所以会报错。
    }
    //类型断言 1 as 断言法
    (id as number).toFixed(); 

    //类型断言2 <> 断言法
    (<number>id).toFixed();
}
fn31(100)
fn31("100")