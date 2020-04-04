// const THREE = require('three');

var camera, scene, renderer, cube, cubeMat
var mouseX = 0, mouseY = 0

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.rotation.x -= 0.15;
    camera.position.y = 50;
    camera.position.z = 600;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.VSMShadowMap;
    document.body.appendChild( renderer.domElement );


    // die
    var geometry = new THREE.IcosahedronBufferGeometry(200, 0);
    cubeMat = new THREE.MeshLambertMaterial( { color: 0xa00000 } );
    cube = new THREE.Mesh(geometry, cubeMat);
    cube.castShadow = true;
    scene.add(cube);

    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: false } );
    var wf = new THREE.Mesh(geometry, wireframeMaterial);
    cube.add(wf);


    // ground
    var geometry = new THREE.PlaneBufferGeometry( 500, 500 );
    var material = new THREE.MeshPhongMaterial( {
        color: 0xffffff,
        shininess: 0,
    } );

    var ground = new THREE.Mesh( geometry, material );
    ground.position.y = -300;
    ground.rotation.x = -Math.PI/2;
    ground.scale.multiplyScalar( 3 );
    ground.receiveShadow = true;
    scene.add( ground );


    // light
    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.target = cube;
    dirLight.position.y = 800
    dirLight.position.z = 200;
    dirLight.castShadow = true;
    dirLight.shadow.radius = 75;
    dirLight.shadow.mapSize.width = 5000;
    dirLight.shadow.mapSize.height = 5000;
    dirLight.shadow.camera.left = -200;
    dirLight.shadow.camera.right = 200;
    dirLight.shadow.camera.top = 200;
    dirLight.shadow.camera.bottom = -200;
    dirLight.shadow.camera.near = 500;
    dirLight.shadow.camera.far = 1200;
    scene.add( dirLight );

    var camDirLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
    camDirLight.target = cube;
    camDirLight.position.y = -100;
    scene.add(camDirLight);

    var ambLight = new THREE.AmbientLight(0xffffff, 0.30);
    scene.add(ambLight);

    // listeners
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function onDocumentMouseMove( event ) {
    // mouseX = ( event.clientX - windowHalfX );
    // mouseY = ( event.clientY - windowHalfY );
}

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    render();
}

function render() {
    // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}