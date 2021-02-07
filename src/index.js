var objects = {}
var vl = 3000;
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
	var geometry = new THREE.SphereGeometry(20, 100, 100);
	var gvl = geometry.vertices.length;
	console.log(geometry.vertices);
	var material2 = new THREE.MeshLambertMaterial({
	 color: 0xff00ff
	});
	var mesh2 = new THREE.Mesh(geometry, material2); //网格模型对象Mesh
	mesh2.translateY(120); //球体网格模型沿Y轴正方向平移120
	scene.add(mesh2);
	// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
	var axisHelper = new THREE.AxesHelper(250);
	scene.add(axisHelper);
	//geometry.position.y=10;
	for (var k = 0; k < vl; k++) {
		//为每个点附上材质
		var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
		// 点渲染模式
		var material = new THREE.PointsMaterial({
			color: Math.random() * 0x808008 + 0x808080,
			size: 0.2 //点对象像素尺寸
		}); //材质对象
		var particle = new THREE.Points(geometry, material); //点模型对象
		particle.position.x = 0;
		particle.position.y = -5;
		particle.position.z = 0;
		pointsgroup.add(particle);
	}

	try{
	var gi = 0;
	pointsgroup.traverse(function(child) {
		var timerandom = 1 * Math.random();
		var i=gi%gvl;
		if(i<=geometry.vertices.length){
		TweenMax.to(
			child.position,
			timerandom, {
				x: geometry.vertices[i]['x'] + (0.5 - Math.random()) * 100,
				y: geometry.vertices[i]['y'] + (0.5 - Math.random()) * 100,
				z: geometry.vertices[i]['z'] + Math.random() * 100,
				delay: 2.5
			}
		);
		gi++;
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