// call（thisArg）
// 将thisArg作为func 的this对象
// Object.prototype.toString.call([])

// thisArg
// 无参时 函数的this指向window
// 参数为函数名时 this指向这个函数的引用
// 传递原始值(String Number Boolean)指向其对象
// 对象 this指向这个对象

function a(){
  console.log(this);
}
function b(){}
var obj = {name:"obj"};

a.call();  // 无参时 函数的this指向window
a.call(null);  // 无参时 函数的this指向window
a.call(undefined); // 无参时 函数的this指向window
a.call(1); // 传递原始值(String Number Boolean)指向其对象
a.call(""); // 传递原始值(String Number Boolean)指向其对象
a.call(true); // 传递原始值(String Number Boolean)指向其对象
a.call(b); // 参数为函数名时 this指向这个函数的引用
a.call(obj); // 对象 this指向这个对象
