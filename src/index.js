var objects = {}
var boomflag = false;
var vl = 1000;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
var renderer = new THREE.WebGLRenderer();
var PI2 = Math.PI * 2;
var clock = new THREE.Clock();
var t1 = new Date().getTime();
var speed = 2;

var bindCanvas = (renderer) => {
	renderer.setSize(window.innerWidth, window.innerHeight); //设置渲染区域尺寸
	document.body.appendChild(renderer.domElement);
	console.log("winheight" + window.innerHeight);
}

function fsin(x) { //正弦函数
	return 10 * Math.sin(x);
}

var addPoints = () => {
	//画点
	var pointsgroup = new THREE.Group();
	for (var k = 0; k < vl; k++) {
		var geometry = new THREE.BoxGeometry(0.03, 0.03, 0.03); //创建一个立方体几何对象Geometry
		var material = new THREE.MeshBasicMaterial({
			color: Math.random() * 0x808008 + 0x808080
		});
		var particle = new THREE.Mesh(geometry, material);; //点模型对象
		particle.position.x = 0;
		particle.position.y = -10;
		pointsgroup.add(particle);
	}
	scene.add(pointsgroup);
	objects['pointsgroup'] = pointsgroup;


}

var song = () => {
	var listener = new THREE.AudioListener(); //创建一个收听器并加入到摄像机中，声音的效果会随着摄像机的改变而改变
	camera.add(listener);

	var sound = new THREE.Audio(listener); //创建声音并绑定对应的收听器
	sound.load('/fireworksforshimu/sound/boom.mp3'); //一些配置
	sound.setLoop(true);
	return sound;
}
var fallText = () => {
	var loader = new THREE.FontLoader();

	loader.load('fonts/helvetiker_regular.typeface.json', function(font) {

		var geometry = new THREE.TextGeometry('Hello three.js!', {
			font: font,
			size: 80,
			height: 5,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 8,
			bevelSegments: 5
		});
	});



}

var pointAnimate = (vertices) => {
	try {
		var gi = 0;
		objects['pointsgroup'].traverse(function(child) {
			var timerandom = 1 * Math.random();
			var i = gi % vertices.length;
			if (i <= vertices.length) {
				TweenMax.to(
					child.position,
					timerandom, {
						x: vertices[i][x] + (0.5 - Math.random()) * 100,
						y: vertices[i][y] + (0.5 - Math.random()) * 100,
						z: vertices[i][z] + Math.random() * 100,
						delay: 1
					}
				);
				gi++;
			}

		});
	} catch (error) {
		//console.log(error);
		//发生错误执行的代码 
	}
}


var sceneAdd = () => {
	//fallText();
	addPoints();
	//pointAnimate(geometry.vertices);

}
var animate = () => {
	requestAnimationFrame(animate);
	pointUpdate();
	renderer.render(scene, camera);
}

var pointUpdate = () => {
	var delta = 10 * clock.getDelta();
	delta = delta < 2 ? delta : 2;
	var dur = new Date().getTime() - t1;
	if (boomflag)
		boom();
	else
		objects['pointsgroup'].traverse(function(child) {
			if (child.position.y < 7) {
				child.position.y += speed * Math.random() * 0.08;

			} else {
				boomflag = true;
				console.log("boomflag" + boomflag);
				return;
			}
		});


}

var boom = () => {
	var sound = song();
	objects['pointsgroup'].add(sound);
	objects['pointsgroup'].traverse(function(child) {
		child.position.y -= fsin(child.position.y) * Math.random() * 0.1;
		child.position.x = fsin(child.position.y) * 0.1 * Math.random();
		child.position.z = fsin(child.position.y) * 0.1 * Math.random();
	});
}
bindCanvas(renderer);
sceneAdd();
animate();
