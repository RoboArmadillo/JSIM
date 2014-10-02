
  //Namespace
  var JSIM = {
    elements: []
  };


  //Globals
  var WIDTH = 500, HEIGHT = 500;
  var REFRESH_COLOUR = "black";

  //Functions
  function init() {
    //Set up rendering instance
    JSIM.renderer = new THREE.WebGLRenderer();
    JSIM.renderer.setClearColor( 0x000000, 1);
    JSIM.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(JSIM.renderer.domElement);
    //Set up camera instance
    JSIM.camera = new THREE.PerspectiveCamera(  70, window.innerWidth / window.innerHeight, 0.1, 20000 );
    JSIM.camera.position.z = 0;
    JSIM.camera.position.y = 5;
    JSIM.camera.rotation.x -=Math.PI/2
    //Init three.js scene
    JSIM.scene = new THREE.Scene();

     // light
    var light = new THREE.PointLight( 0xffffff, 1 );
    light.position.x = 1;
    light.position.y = 1;
    light.position.z = 1;
    JSIM.scene.add( light );
    
    populateEntities();

    //Add all of da elements
    for(var i = 0; i < JSIM.elements.length; i++) {
      JSIM.scene.add(JSIM.elements[i]);
    }

    begin();

  }

  function populateEntities() {
       JSIM.plane = new Plane(10, 10, 10, 10, 0, -0.5, 0, Math.PI / 2, 0, 0, 0x00ff00);
       JSIM.plane.init();
       JSIM.robot = new Robot(0, 0, 0, 0.3, 0.3, 0.5, 0, 0, 0); //this doesnt appear to change the size of the robot form 1,1,1 and i dont know why.
       JSIM.robot.init();
       JSIM.elements[JSIM.elements.length] = JSIM.plane.mesh;
       JSIM.elements[JSIM.elements.length] = JSIM.robot.mesh;

  }


  function begin() {
    update();
    render();
  }

  function render() {
    JSIM.renderer.render(JSIM.scene, JSIM.camera);

    requestAnimationFrame(function() {
      render();
    });

  
  }

  var a = 0;
  function update() {
    a++;
    setTimeout(update, 1);

    JSIM.robot.movement(70,20)
    //JSIM.elements[1].translateX(0.005) //<< THIS WORKS BUT DOESNT USE MY ROBOT MOVEMENT METHOD
    //JSIM.robot.movement(100,100)

  }


  function Plane(w, h, sW, sH, x, y, z, rX, rY, rZ, colour) {
    this.w = w;
    this.h = h;
    this.sW = sW;
    this.sH = sH;
    this.x = x;
    this.y = y;
    this.z = z;
    this.rX = rX;
    this.rY = rY;
    this.rZ = rZ;
    this.material = null;
    this.geometry = null;
    this.mesh = null;
    this.color = 0x00ff00
  }

  Plane.prototype.init = function() {
    var colour = this.colour;
    this.material = new THREE.MeshBasicMaterial( { /*map: floorTexture,*/ side: THREE.DoubleSide, color: 0x00ff00 } );
    this.geometry = new THREE.PlaneGeometry(this.w, this.h, this.sW, this.sH);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
     this.mesh.position.y = this.y;
     this.mesh.position.x = this.x;
     this.mesh.position.z = this.z;
    this.mesh.rotation.x = this.rX;
    this.mesh.rotation.y = this.rY;
    this.mesh.rotation.z = this.rZ;
  }





  //Robot constructor
  function Robot(x, y, z, w, h, d, rX, rY, rZ) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.w = w;
    this.h = h;
    this.d = d;

    this.rX = rX;
    this.rY = rY;
    this.rZ = rZ;

    this.material = null;
    this.geometry = null;
    this.mesh = null;
    this.color = 0xff0000

  }

  Robot.prototype.init = function() {

    this.material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
    this.geometry = new THREE.BoxGeometry(0.5, 0.3, 0.3); //fucking hard coding ollie ;) BIG THUMBS UP :P
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.overdraw = true;
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
    this.mesh.rotation.x = this.rX;
    this.mesh.rotation.z = this.rZ;
    this.mesh.rotation.y = this.rY;

  }


  Robot.prototype.movement = function(left_speed,right_speed){ //speeds from web socket stuff when we do it later
    this.averagespeed = (left_speed+right_speed)/2;
    this.mesh.translateX(this.averagespeed/8000);
    this.moment1 = left_speed/100;
    this.moment2 = -right_speed/100;
    this.totalmoment = (this.moment1 +this.moment2);
    this.mesh.rotation.y += this.totalmoment/200;

    //this.speedDifferenceConstant = (left_speed -right_speed)/2000;
    //this.mesh.rotation.y += this.speedDifferenceConstant;
  }



init();

  //Methods


 