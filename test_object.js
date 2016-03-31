function Dog(name){
    this.name = name;
}

Dog.prototype.food = "meat";

var miaomiao = new Dog("miaomiao");
console.log("dog name is ",miaomiao.name);
console.log("dog eat ",miaomiao.food);

var wangwang = new Dog("wangwang");
console.log("dog name is ",wangwang.name);
console.log("dog eat ",wangwang.food);



