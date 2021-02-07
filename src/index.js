var objects = {}
var vl = 1000;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
var renderer = new THREE.WebGLRenderer();
var PI2 = Math.PI * 2;
var clock = new THREE.Clock();
var t1 = new Date().getTime();
var bindCanvas = (renderer) => {
    renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
	document.body.appendChild(renderer.domElement);
}

function fsin(x) { //正弦函数
	return 10 * Math.sin(x);
}

var addPoints = () =>{
    //画点
	var pointsgroup = new THREE.Group();
    for (var k = 0; k < vl; k++) {
		var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01); //创建一个立方体几何对象Geometry
		var material = new THREE.MeshBasicMaterial( { color: Math.random() * 0x808008 + 0x808080 } );
		var particle = new THREE.Mesh( geometry, material );; //点模型对象
        particle.position.x=0;
        particle.position.y=-10;
		pointsgroup.add(particle);
	}
    scene.add(pointsgroup);
    objects['pointsgroup']=pointsgroup;
    console.log(pointsgroup);

    
}

var fallText = ()=>{
    var loader = new THREE.FontLoader();

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	var geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelSegments: 5
	} );
} );



}

var pointAnimate = (vertices) =>{
    try{
	var gi = 0;
	objects['pointsgroup'].traverse(function(child) {
		var timerandom = 1 * Math.random();
		var i=gi%vertices.length;
		if(i<=vertices.length){
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
	}catch(error){ 
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

var pointUpdate = () =>{
    var delta = 10 * clock.getDelta();
	var speed = 2;
	delta = delta < 2 ? delta : 2;
	var dur = new Date().getTime() - t1;
	if (dur < 2500) { //控制飞线动画时间
		objects['pointsgroup'].traverse(function(child) {
			if (child.position.y < window.innerHeight) {
				child.position.y += speed * Math.random()*0.06;
                
			}
			else
				console.log("dur"+dur);
		});
	}
    if(dur >2500 && dur <3500){
        objects['pointsgroup'].traverse(function(child) {
				child.position.y -= fsin(child.position.y) * Math.random()*0.6;
				child.position.x = fsin(child.position.y)*0.3*Math.random();
                 child.position.z = fsin(child.position.x)*0.3*Math.random();
			
		});
    }
    
}

bindCanvas(renderer);
sceneAdd();
animate();
