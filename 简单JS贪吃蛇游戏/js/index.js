window.onload = function() {
	var container = $id("container");
	var uls = $id("uls");
	var btn = $id('btn');
	var person = $id("person");
	var timer = null;
	var personDiv = $tagName(person, "div");
	var lis = $tagName(uls, "li");
	var food = null;
	var score = $id("score");
	var index = 0;
	var flag = 0;
	datas = {
		size: 20,
		x: 10,
		y: 10
	};
	perDate = {
		speed: 200,
		code: 39
	};

	function $id(id) {
		return document.getElementById(id);
	}

	function $tagName(parend, child) {
		return parend.getElementsByTagName(child);
	}

	function start() {
		btn.onclick = function() {
			if(flag === 0) {
				createPerson();
				movePerson();
				bindPerson();
				createFood();
				flag = 1;
			}
		}
	}

	function init() {
		//初始化游戏
		createMap();

	}

	function createFood() {
		var hrr = [];
		for(var i = 0; i < lis.length; i++) {
			if(isFilter(lis[i])){
				hrr.push(lis[i]);
			}
		}

		function isFilter(li) {
			for(var i = 0; i < personDiv.length; i++) {
				if(li.index == personDiv[i].index)
					return false;
			}
			return true;
		}
		var random = Math.floor(Math.random() * hrr.length - 1);
		food = document.createElement("div");
		food.className = "food";
		food.style.width = food.style.height = datas.size + 1 + "px";
		food.style.left = hrr[random].offsetLeft + "px";
		food.style.top = hrr[random].offsetTop + "px";
		container.appendChild(food);
	}

	function createPerson() {
		var oPerson = document.createElement("div");
		oPerson.style.width = oPerson.style.height = datas.size + 1 + "px";
		oPerson.index = 0;
		person.appendChild(oPerson);
	}

	function movePerson() {
		timer = setInterval(function() {
			if(isOut() || isSelf()) {
				clearInterval(timer);
				alert("GameOver");
				location.reload();
			}
			if(knock(personDiv[0], food)) {
				person.appendChild(food);
				
				createFood();
				Num();

			}
			for(var i = personDiv.length - 1; i > 0; i--) {
				personDiv[i].style.left = personDiv[i - 1].offsetLeft + "px";
				personDiv[i].style.top = personDiv[i - 1].offsetTop + "px";
				personDiv[i].index = personDiv[i - 1].index;
			}
			switch(perDate.code) {
				case 37:
					//左
					personDiv[0].style.left = personDiv[0].offsetLeft - (datas.size + 1) + "px";
					personDiv[0].index -= 1;
					break;
				case 38:
					//上
					personDiv[0].style.top = personDiv[0].offsetTop - (datas.size + 1) + "px";
					personDiv[0].index -= datas.x;
					break;
				case 39:
					//右
					personDiv[0].style.left = personDiv[0].offsetLeft + (datas.size + 1) + "px";
					personDiv[0].index += 1;
					break;
				case 40:
					//下
					personDiv[0].style.top = personDiv[0].offsetTop + (datas.size + 1) + "px";
					personDiv[0].index += datas.x;
					break;
			}
		}, perDate.speed);
	}

	function bindPerson() {
		//贪吃蛇运动
		document.onkeydown = function(e) {
			var e = window.event || e;
			switch(e.keyCode) {
				case 37:
					//左
					perDate.code = 37;
					break;
				case 38:
					//上
					perDate.code = 38;
					break;
				case 39:
					//右
					perDate.code = 39;
					break;
				case 40:
					//下
					perDate.code = 40;
					break;
			}
		}
	}

	function createMap() {
		//		创建地图
		container.style.width = (datas.size + 1) * datas.x + "px";
		for(var i = 0; i < datas.x * datas.y; i++) {
			var li = document.createElement("li");
			li.style.width = li.style.height = datas.size + "px";
			li.index = i;
			uls.appendChild(li);
			
		}
		start();

	}

	function knock(el1, el2) {
		var r1 = el1.offsetLeft + el1.offsetWidth;
		var l2 = el2.offsetLeft;
		var l1 = el1.offsetLeft;
		var r2 = el2.offsetLeft + el2.offsetWidth;
		var b1 = el1.offsetTop + el1.offsetHeight;
		var t2 = el2.offsetTop;
		var t1 = el1.offsetTop;
		var b2 = el2.offsetTop + el2.offsetHeight;
		if(r1 <= l2 || l1 >= r2 || b1 <= t2 || t1 >= b2) {
			return false;
		} else {
			return true;
		}
	}

	function Num() {
		index += 1;
		score.innerHTML = "积分 ：" + index;
	}

	function isOut() {
		for(var i = 0; i < lis.length; i++) {
			if(knock(personDiv[0], lis[i]))
				return false;
		}
		return true;
	}

	function isSelf() {
		for(var i = 1; i < personDiv.length; i++) {
			if(knock(personDiv[0], personDiv[i]))
				return true;
		}
		return false;
	}
	init();
	

}