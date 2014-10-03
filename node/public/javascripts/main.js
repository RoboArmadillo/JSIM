
  //Namespace
  var JSIM = {
    elements: []
  };


  //Globals
  var WIDTH = 500, HEIGHT = 500;
  var REFRESH_COLOUR = "black";
  var wallmarkers = [];

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
    JSIM.camera.position.y = 7;
    JSIM.camera.rotation.x -=Math.PI/2
    controls = new THREE.OrbitControls( JSIM.camera, JSIM.renderer.domElement ); //allows us to pan the camera around.

    //Init three.js scene
    JSIM.scene = new THREE.Scene();

     // light
    var light = new THREE.PointLight( 0xffffff, 100,0 );
    light.position.x = 4;
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



       //Arena variables
       ARENA_WIDTH = 8 //x
       ARENA_LENGTH = 8 //y
       ARENA_HEIGHT = 0.5
       JSIM.TPWX = 7 //TPWX = tokens per wall on the x wall
       JSIM.TWPY = 7 //TPW = tokens per wall on the y wall


       JSIM.robot = new Robot(0, 0.151, 0, 0.5, 0.3, 0.3, 0, 0, 0); 

       //Creates Arena Objects
       JSIM.plane = new Plane(ARENA_WIDTH, ARENA_LENGTH, 1, 1, 0, 0, 0, Math.PI/2, 0, 0, 0xFF9900); //orange
       JSIM.wall1 = new Plane(ARENA_WIDTH, ARENA_HEIGHT, 1, 1, 0, ARENA_HEIGHT/2, ARENA_LENGTH/2, 0, 0, 0, 0x3399FF); //blue 
       JSIM.wall2 = new Plane(ARENA_WIDTH, ARENA_HEIGHT, 1, 1, 0, ARENA_HEIGHT/2, -ARENA_LENGTH/2, 0, 0, 0, 0x00FF00); //green
       JSIM.wall3 = new Plane(ARENA_LENGTH, ARENA_HEIGHT, 1, 1, ARENA_WIDTH/2, ARENA_HEIGHT/2, 0, 0, Math.PI/2, 0, 0xFF0000); //red
       JSIM.wall4 = new Plane(ARENA_LENGTH, ARENA_HEIGHT, 1, 1, -ARENA_WIDTH/2, ARENA_HEIGHT/2, 0, 0, Math.PI/2, 0, 0xFFFF66); //yellow

       JSIM.robot.init();
       JSIM.plane.init();
       JSIM.wall1.init();
       JSIM.wall2.init();
       JSIM.wall3.init();
       JSIM.wall4.init();
       
       JSIM.elements[JSIM.elements.length] = JSIM.plane.mesh;
       JSIM.elements[JSIM.elements.length] = JSIM.wall1.mesh;
       JSIM.elements[JSIM.elements.length] = JSIM.wall2.mesh;
       JSIM.elements[JSIM.elements.length] = JSIM.wall3.mesh;
       JSIM.elements[JSIM.elements.length] = JSIM.wall4.mesh;
       JSIM.elements[JSIM.elements.length] = JSIM.robot.mesh;



       var a = JSIM.TPWX;
       var b=ARENA_LENGTH * 1/(JSIM.TPWX+1)

       for (var i = a; i >= 0; i--) {
        JSIM.marker = new Plane(0.4, 0.4, 1, 1, -(ARENA_WIDTH/2) + i * b, ARENA_HEIGHT/2, (ARENA_LENGTH/2)-0.0001, 0, 0, 0, 0x00FF00);
        JSIM.marker.init();
        JSIM.elements[JSIM.elements.length] = JSIM.marker.mesh;
        };

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

    JSIM.robot.movement(0,0)
    

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
    this.color = colour;

  }

  Plane.prototype.init = function() {
    var colour = this.color;
    this.material = new THREE.MeshBasicMaterial( { /*map: floorTexture,*/ side: THREE.DoubleSide, color: this.color} );
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
    this.color = 0xFF9933

  }

  Robot.prototype.init = function() {

    this.material = new THREE.MeshNormalMaterial({ color: 0xFF9933 });
    this.geometry = new THREE.BoxGeometry(this.w, this.h, this.d);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.overdraw = true;
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
    this.mesh.rotation.x = this.rX;
    this.mesh.rotation.z = this.rZ;
    this.mesh.rotation.y = this.rY;

  }


  Robot.prototype.movement = function(right_speed,left_speed){ //speeds from web socket stuff when we do it later
    this.averagespeed = (left_speed+right_speed)/2;
    this.mesh.translateX(this.averagespeed/8000);
    this.moment1 = -left_speed/100;
    this.moment2 = right_speed/100;
    this.totalmoment = (this.moment1 +this.moment2);
    this.mesh.rotation.y += this.totalmoment/20;

    //this.speedDifferenceConstant = (left_speed -right_speed)/2000;
    //this.mesh.rotation.y += this.speedDifferenceConstant;
  }



init();

  //Methods


 