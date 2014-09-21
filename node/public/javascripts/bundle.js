(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
    JSIM.camera = new THREE.PerspectiveCamera(  45, window.innerWidth / window.innerHeight, 0.1, 20000 );
    JSIM.camera.position.z = 10;
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
       JSIM.robot = new Robot(0, 0, 0, 1, 1, 1, 0, 0, 0);
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

    JSIM.elements[0].rotation.z += 0.005;
    JSIM.elements[1].rotation.y -= Math.sin(a * 0.01) * 0.01;
    JSIM.camera.position.y += Math.sin(a * 0.01) * 0.01;

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
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
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
