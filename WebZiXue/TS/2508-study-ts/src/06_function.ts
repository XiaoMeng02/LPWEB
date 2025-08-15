/**
 * 函数主要是标注，输入与输出的类型
 * 
 */
//标注参数类型
function fn10(name:string,age:number){
    console.log("name:",name,"age:",age);
}
fn10("张三",25);

//可选参数类型
//    添加一个 ？ 即可
//    可选的参数，在函数体内它的类型为一个联合类型，联合undefined
//         string | undefined
function fn11(name:string,age?:string){
    console.log("name:",name,"age:",age);
    age?.charAt(0); //报错，age可能为undefined
    if(typeof age === "string"){
        //这个打括号内.age的类型已经被收窄为string
        age.charAt(0); //正确
    }
}
fn11("张三");
fn11("张三",'25');

/**
 * 函数声明，小括号后面标注的类型,是函数的返回值类型
 */
function fn12():string{
    return '10';
}
fn12().charAt(0); //报错，charAt()方法不存在于number类型上

function fn13(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('ok');
        },1000)
    })
}
fn13().then((resp)=>{
    console.log(resp);//值是'ok',类型为unknown
}); 

function fn14():Promise<string>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('ok');
        },1000)
    })
}
fn14().then((resp)=>{
    console.log(resp);//值是'ok',类型为string
}) //类型为Promise<string>

/**
 * void 类型，
 *      当一个函数没有返回值时，它的返回值类型就是void
 */

function fn15():void{
    console.log('void');
}

/**
 * 匿名函数，Ts能自动推断出类型
 */
const names = ['张三','李四','王五']
names.forEach(function(s){
    console.log(s.toUpperCase());//Error 属性“toUppercase"在类型”string“上不存在。你是否真的是“toUpperCase”？
})
names.forEach((s)=>{
    console.log(s.toUpperCase());
    
})