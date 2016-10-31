



普通函数，与柯里化函数对比：



curried function has two unsual capabilities（不寻常的能力）.
1>  首先，它的参数不需要一次提供（在参数没有全部传齐全的情况下，curried　function 返回的永远是一个函数，从而此函数可以接收后面的 参数，以此类推，任意传参，不齐全是返回的是一个函数，OK，齐全时返回的是一个最终的值）
｛而普通函数就做不到，比如一个函数，有3个参数，如果参数都 有用到，则必须一次性传齐全了，否则，就会报错。而curried 之后就可以不用一次性传齐全了，还可以任意组合的传递参数，非常灵活｝
2> 可以用R.__占位符 , 从而任意组合参数
例如：
普通函数

curried function  （体现，传参的不一次性与自由性）

curried function (体现，传参的占位符，与灵活性)























































//map操作数组，数组对象
//---------------------------ramda.js-------------------//

实现一函数(reamda类似功能的函数repeat)
要求
1 只能使用常量（意思是不能改变变量的值)
2 可以使用ramda中的函数
function replicate(n,item){
.....
}

使用如下(箭头代表函数返回值)
replicate(0,2)->[]
replicate(3,2)->[2,2,2]
replicate(4,2)->[2,2,2,2]

操作参数 需求拆分
1》要得到一个数组
2》参数x y ,重复参数y x次的一个数组

要得到第二个参数，


________________________________________________
假设x=5 ,y =2 
结果应该是[2,2,2,2,2] 



1>首先把参数转换成了数组
var takesTwoArgs = function(x,y){
	return [x,y];
}

2>把x直接变成一个数组  R.range(0,x)  



function replicate(n,item){
	var y = item;//获取第二个参数
	var f = R.range(0,n);
	return f;
	//return item
}
replicate(5,2);//[0, 1, 2, 3, 4]

3>把得到数组的每一个值改变为Y
  3.1>得到数组的length  ,！！！没必要走第二步 直接就知道数组的length是 n（第一个参数）

4>
//获取第二个参数
var get2Arg = function(x,y){
	return y;
}


function replicate(n,item){
	return function f1(){
		return function fn(x){
			var y =item; //y是第二个参数
			return x = y;
		}
	}
};
replicate(5,2);


R.map(fn, [0, 1, 2, 3, 4])



________________________________________________


function replicate(n,item){
	var f = R.range(0,n);//[0, 1, 2, 3, 4]
	function fn(n){
		var y =item; //y是第二个参数
		return n = y;
	};
	var z = R.map(fn(), f);
	return z;
}
replicate(5,2);
















//---------------------------动态作用域，函数的重复，反复，条件迭代-------------------//

<!-- JS的动态作用域  -->

<script type="text/javascript">
  //underscore 提供了 _.bind函数，锁定this不被修改	
	//_.bindAll 锁定 this 引用到对应的命名函数
	//锁定this引用的值
	function globalThis(){
		return this;
	}
	//传入的第一个参数，就是被引用的对象
	//globalThis();
	//globalThis.call('apple');
	//globalThis.apply("orange",[]);

	var nopeThis = _.bind(globalThis,'nope');
	nopeThis.call('wat');


	var target = { 
		name : "right value",
		aux :  function(){return this.name;},
		act :  function(){return this.aux();}
	}

	_.bindAll(target,'aux','act');
	target.act.call('wat');

	//target.act.call('wat'); // typeError 

</script>

<!-- JS的动态作用域  -->


<!-- JS的函数作用域  -->

<!-- JS的函数作用域  -->


<!--               高阶函数                     -->


<!-- 关于传递函数的更多思考，重复，反复，和条件迭代 start -->

<script type="text/javascript">
// 0> 关于传递函数的思考 max(提供了比较任意对象的方法，不只是数字) [此函数仍是受限制的，不是真正的函数式，对_.max而言，比较总是需要大于运算符来完成 ]
// !!! finder, best 比较任意值，找到不同类型的最佳值...  

_.max([1,2,3,4,5,5.75]);  //_.max接收一个可选的第二参数(从被比较对象中获得一个数值的函数)

var people = [{name:'fred',age:85},{name:"lily",95},{name:"lucy",age:105}];
_.max(people,function(p){ return p.age });


// 1> 使用函数而不是值  使用静态值的函数
	function repeat(times, VALUE){
		return _.map(_.range(times),function(){ return VALUE });
	}
	repeat(4,"major");
// 2> 将repeat实现隔离出来， 将值——》运算   重复多次
	function repeatedly(times,fun) {
		return _.map(_.range(times),fun);
	}
	
	repeatedly(3,function(){
		return Math.floor((Math.random()*10)+1);
	});

// 2.1> 生成已知数量的DOM节点

	repeatedly(10,function(n){
		var id = 'id' + n;
		var body;
		//body.append('<b>box</b>').attr('id',id);
		return id;
	});

// 3> repeat 与 repeatedly 的进化 升级 使用函数而不是值  接收函数的函数
function iterateUntil(fun,check,init){
	var ret = [];
	var result = fun(init);

	while (check(result)) {
		ret.push(result);
		result = fun(result);
	}

	return ret;
}

iterateUntil( function(n) {return n + n },
			  function(n) {return n <= 1024 },
1)

//-> [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
// 3.1> 老办法取大于2小于1024的2的倍数

repeatedly(10,function(exp) { return Math.pow(2,exp+1) });

//-> [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
</script>
<!-- 关于传递函数的更多思考，重复，反复，和条件迭代 end -->



<script>