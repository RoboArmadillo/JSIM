(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
     texture = THREE.ImageUtils.loadTexture('marker.png'),

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
    var light = new THREE.PointLight( 0xffffff, 100,1 );
    light.position.x = 0;
    light.position.y = 100;
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
       ARENA_WIDTH = 8; //x
       ARENA_LENGTH = 8; //y
       ARENA_HEIGHT = 0.5;
       JSIM.TPWX = 7; //TPWX = tokens per wall on the x wall
       JSIM.TPWY = 7; //TPWY = tokens per wall on the y wall
       NUMBER_OF_TOKENS = 4000;


       JSIM.robot = new Robot(0, 0.151, 0, 0.5, 0.3, 0.3, 0, 0, 0); 

       black = 0x231f20

       orange = 0xFF9900

       //Creates Arena Objects
       JSIM.plane = new Plane(ARENA_WIDTH, ARENA_LENGTH, 1, 1, 0, 0, 0, Math.PI/2, 0, 0, black ); //orange
       JSIM.wall1 = new Plane(ARENA_WIDTH, ARENA_HEIGHT, 1, 1, 0, ARENA_HEIGHT/2, ARENA_LENGTH/2, 0, 0, 0, orange); //blue 
       JSIM.wall2 = new Plane(ARENA_WIDTH, ARENA_HEIGHT, 1, 1, 0, ARENA_HEIGHT/2, -ARENA_LENGTH/2, 0, 0, 0, orange); //green
       JSIM.wall3 = new Plane(ARENA_LENGTH, ARENA_HEIGHT, 1, 1, ARENA_WIDTH/2, ARENA_HEIGHT/2, 0, 0, Math.PI/2, 0, orange); //red
       JSIM.wall4 = new Plane(ARENA_LENGTH, ARENA_HEIGHT, 1, 1, -ARENA_WIDTH/2, ARENA_HEIGHT/2, 0, 0, Math.PI/2, 0, orange); //yellow

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


       /*
       for (var i = 0 ; i < NUMBER_OF_TOKENS; i++) {
        JSIM.boxtest = new Token((-1 + Math.random() + Math.random()) * ARENA_LENGTH/2,(-1+Math.random() + Math.random()) *ARENA_WIDTH/2);
        JSIM.boxtest.init();
        JSIM.elements[JSIM.elements.length] = JSIM.boxtest.mesh;
      };
      */
      




      
      /*
      #############
      OLLIE!!!!! Now I've got your attention, this algorithm should ensure that there is no overlap of the cubes when they load but it seems to crash my
      web browser whenever I try and run it even with like 5 cubes. Fuck knows whats going on, could you peruse it at some point and try and work out what
      is going on.
      #############
      */
       xlist = [1,2];
       zlist = [1,2];

       for (var i = 0 ; i < NUMBER_OF_TOKENS; i++) {
          generate = 1
          x = (-1 + Math.random() + Math.random()) * ARENA_LENGTH/2;
          z = (-1+Math.random() + Math.random()) *ARENA_WIDTH/2;
          for (var a = xlist.length - 1; a >= 0; a--) {
             if ((xlist[a]-0.283 <x && xlist[a]+0.283 >x)&&(zlist[a]-0.283 <z && zlist[a]+0.283 >z)) {
                 generate = 0
             };

           };

          if (generate === 1) {
              JSIM.boxtest = new Token(x,z);
              JSIM.boxtest.init();
              JSIM.elements[JSIM.elements.length] = JSIM.boxtest.mesh;
              xlist[xlist.length] = x
              zlist[zlist.length] = z
          };

        };
        
        



       //for loops for populating the walls-yes I know its inelegant but its as good as I can get it for now.
       var a = JSIM.TPWX;
       var b=ARENA_WIDTH * 1/(JSIM.TPWX+1);

       
       //blue
       for (var i = a-1; i >= 0; i--) {
        JSIM.marker = new Marker( -(ARENA_WIDTH/2) + (i+1) * b, ARENA_HEIGHT/2, (ARENA_LENGTH/2)-0.0001, 0, 0, 0, "Arena");
        JSIM.marker.init();
        JSIM.elements[JSIM.elements.length] = JSIM.marker.mesh;
        };
    
       //green
        a = JSIM.TPWX;
        b=ARENA_WIDTH * 1/(JSIM.TPWX+1);

       for (var i = a-1; i >= 0; i--) {
        JSIM.marker = new Marker(-(ARENA_WIDTH/2) + (i+1) * b, ARENA_HEIGHT/2, -(ARENA_LENGTH/2)+0.0001, 0, 0, 0, "Arena");
        JSIM.marker.init();
        JSIM.elements[JSIM.elements.length] = JSIM.marker.mesh;
        };
        
      //yellow
        a = JSIM.TPWY;
        b=ARENA_LENGTH * 1/(JSIM.TPWY+1);

       for (var i = a-1; i >= 0; i--) {
        JSIM.marker = new Marker( -(ARENA_WIDTH/2)+0.0001, ARENA_HEIGHT/2, -(ARENA_LENGTH/2)+ (i+1) * b, 0, Math.PI/2, 0, "Arena");
        JSIM.marker.init();
        JSIM.elements[JSIM.elements.length] = JSIM.marker.mesh;
        };
        

      //red
        a = JSIM.TPWY;
        b=ARENA_LENGTH * 1/(JSIM.TPWY+1);

       for (var i = a-1; i >= 0; i--) {
        JSIM.marker = new Marker( (ARENA_WIDTH/2)-0.0001, ARENA_HEIGHT/2, -(ARENA_LENGTH/2)+ (i+1) * b, 0, Math.PI/2, 0, "Arena");
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
    this.castShadow = true;
    this.recieveShadow = true;

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




  function Marker(x, y, z, rX, rY, rZ, marker_type) {
    this.marker_type = "Arena";

    if (this.marker_type === "Arena"){
      this.w = this.h = 0.4;
    }
    this.sW = 1;
    this.sH = 1;
    this.x = x;
    this.y = y;
    this.z = z;
    this.rX = rX;
    this.rY = rY;
    this.rZ = rZ;
    this.material = texture;
    this.geometry = null;
    this.mesh = null;
    this.color = 0xFFFFFF;
    this.codey = 10;

  }

  Marker.prototype.init = function() {
    var colour = this.color;
    this.material = new THREE.MeshBasicMaterial( { map: this.material, side: THREE.DoubleSide} );
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
    this.color = 0xFF9933;


  }

  Robot.prototype.init = function() {

    this.material = new THREE.MeshNormalMaterial({ color: 0xFFFFFF });
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
  }


  //Robot constructor
  function Token(x,z) {
    this.x = x;
    if (this.x<0){
      this.x +=0.06
    }
    else{
      this.x -=0.06
    }
    this.y = 0.051;
    this.z = z;

    this.w = 0.1;
    this.h = 0.1;
    this.d = 0.1;

    this.rX = 0;
    this.rY = Math.random()*Math.PI;
    this.rZ = 0;

    this.material = null;
    this.geometry = null;
    this.mesh = null;
    this.color = 0xFF9933;


  }

  Token.prototype.init = function() {

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





init();

  //Methods


 
},{}]},{},[1]);
