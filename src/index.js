var objects = {}
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var PI2 = Math.PI * 2;
var clock = new THREE.Clock();
var t1 = new Date().getTime();
var bindCanvas = (renderer) => {
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement);
}

function fsin(x) { //正弦函数
	return 20 * Math.sin(0.8 * x * Math.PI / 180);
}

var sceneAdd = () => {
	//画点
	var pointsgroup = new THREE.Group();
	scene.add(pointsgroup);
	var geometry = new THREE.SphereGeometry(50, 500, 500);
	var vl = geometry.vertices.length;
	for (var k = 0; k < vl; k++) {
		//为每个点附上材质
		var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
		// 点渲染模式
		var material = new THREE.PointsMaterial({
			color: Math.random() * 0x808008 + 0x808080,
			size: 0.4 //点对象像素尺寸
		}); //材质对象
		var particle = new THREE.Points(geometry, material); //点模型对象
		particle.position.x = 0;
		particle.position.y = -5;
		particle.position.z = 0;
		pointsgroup.add(particle);
	}

	var i = 0
	try{
	pointsgroup.traverse(function(child) {
		var timerandom = 1 * Math.random();
		if(i<=geometry.vertices.length){
		TweenMax.to(
			child.position,
			timerandom, {
				x: geometry.vertices[i]['x'] + (0.5 - Math.random()) * 100,
				y: geometry.vertices[i]['y'] + (0.5 - Math.random()) * 100,
				z: geometry.vertices[i]['z'] + Math.random() * 100,
				delay: 3
			}
		);
		i++;
		}

	});
	}catch(error){ 
		//console.log(error);
		//发生错误执行的代码 
	}


	objects['pointsgroup'] = pointsgroup;
	objects['geometry'] = geometry;
}
var animate = () => {
	requestAnimationFrame(animate);
	var delta = 10 * clock.getDelta();
	var speed = 2;
	delta = delta < 2 ? delta : 2;
	var dur = new Date().getTime() - t1;
	if (dur < 5125) { //控制飞线动画时间
		objects['pointsgroup'].traverse(function(child) {
			if (child.position.y < window.innerHeight) {
				child.position.y += speed * Math.random()*0.5;
				//child.position.x = fsin(child.position.y);
			}
			else
				console.log("dur"+dur);
		});
	}

	renderer.render(scene, camera);
}

bindCanvas(renderer);
sceneAdd();
animate();
