
var canvas;
var gl;

var program;

var texSize = 64;

// used for sending model-view matrix to the shaders
var cameraMvMatrixLocation;
var objectMvMatrixLocation;
var noShadingLocation;
var specularVec4MultiplierLocation;
var LightVerticesLocation;
var	LightIntensityLocation; 
var	LightTransformLocation ;
var	FlashlightOnLoc;
var FlashlightActuallyOn = 0.0;
var	ShadowRunLoc;
var JumpTimer =0;
var youLose = 0;
var youWin = 0;
var keysCollected = 0;

 // integer storing the first index into the vertex buffer where the first wall is.
var bufferWallPointsStart = 0;
// stores where in the buffer the text points are.
var bufferTextPointsStart = 0;
var bufferTextPointsEnd = 0;
var whichText = -1; // -1 means no text is being drawn right now.
var text1Index; // stores where in the textureArray the text1 texture is.
					
// keeps track of the camera's location, used in the render function.
// Actual starting points:
var cameraX	= 15;
var cameraY = 10;
var cameraZ = 0;
var cameraHorzAngle = 90;
var cameraVertAngle = 0;
var FOV = 60;
var pMatrixLocation;
var pLightMatrixLocation;

// stores the most recent projection matrix used
var pmatrix;


// Each relevant key is assigned to an index into these two arrays.
// Index is true if the key is down, false otherwise
var keystates = []; // array of booleans
// True if the key has JUST been pressed, false otherwise
var keypresses = []; // array of booleans
var numkeys = 11;

var footsteps = new Audio('Sounds/footsteps.m4a');
var creak = new Audio('Sounds/creak.mp3');
var scream = new Audio('Sounds/scream.wav');
var creepersound = new Audio('Sounds/creeper.mp3');

var doorJustRotated = -1; // stores the index of the door that just finished rotating (to prevent getting stuck in a door)
// -1 if no door just rotated.

//shadow Variables
var colorTexture;
var depthTexture;
var ShadowFrameBuffer;
var colorTexture2;
var depthTexture2;
var ShadowFrameBuffer2;

var fright = 25; // range of 0-100, at 100 you lose.
var flashlightbattery = 75; // range of 0-100.

// Stores all vertices, texcoords, and normals from all ObjectTypes and all Walls into these arrays to load into GPU's buffers.
var GPUpoints = [];
var GPUtexcoords = [];
var GPUnormals = [];

var flashlightPoints = [];

function makeHallways()
{
	// This function makes the basic walls and floors of the house
	// and is called in the main "window.onload = function init()" function.
	// makeWall is from Briley.js
	
	// north hallway ( -z )
	//makeWall( vec3(-10,20,-40), vec3(10,20,-40), vec3(10,0,-40), vec3(-10,0,-40), "woodwall" );
	makeWall( vec3(-10,20,-10), vec3(-10,20,-40), vec3(-10,0,-40), vec3(-10,0,-10), "woodwall" );
	makeWall( vec3(10,20,-18), vec3(10,20,-10), vec3(10,0,-10), vec3(10,0,-18), "woodwall" );
	WallArray[ WallArray.length-1 ].texcoords[0][0] = 0.75;
	WallArray[ WallArray.length-1 ].texcoords[2][0] = 0.75;
	WallArray[ WallArray.length-1 ].texcoords[5][0] = 0.75;
	makeWall( vec3(10,20,-40), vec3(10,20,-32), vec3(10,0,-32), vec3(10,0,-40), "woodwall" );
	WallArray[ WallArray.length-1 ].texcoords[1][0] = 0.25;
	WallArray[ WallArray.length-1 ].texcoords[3][0] = 0.25;
	WallArray[ WallArray.length-1 ].texcoords[4][0] = 0.25;
	
	// triple lock doorway ( +x )
	makeWall( vec3(10,20,-32), vec3(30,20,-32), vec3(30,0,-32), vec3(10,0,-32), "woodwall" );
	makeWall( vec3(30,20,-18), vec3(10,20,-18), vec3(10,0,-18), vec3(30,0,-18), "woodwall" );
	makeWall( vec3(30,20,-32), vec3(30,20,-18), vec3(30,0,-18), vec3(30,0,-32), "doubledoors" );
	
	// east hallway ( +x )
	makeWall( vec3(40,20,-10), vec3(40,20,10), vec3(40,0,10), vec3(40,0,-10), "woodwall" );
	makeWall( vec3(10,20,-10), vec3(40,20,-10), vec3(40,0,-10), vec3(10,0,-10), "woodwall" );
	makeWall( vec3(40,20,10), vec3(10,20,10), vec3(10,0,10), vec3(40,0,10), "woodwall" );
	
	// south hallway ( +z )
	makeWall( vec3(10,20,60), vec3(-10,20,60), vec3(-10,0,60), vec3(10,0,60), "woodwall" );
	makeWall( vec3(-10,20,60), vec3(-10,20,10), vec3(-10,0,10), vec3(-10,0,60), "woodwall" );
	makeWall( vec3(10,20,10), vec3(10,20,60), vec3(10,0,60), vec3(10,0,10), "woodwall" );
    makeWallDoorFrame( vec3(10,20,30), vec3(-10,20,30), vec3(-10,0,30), vec3(10,0,30), "woodwall", "woodwall");
	
	// west hallway ( -x )
	makeWall( vec3(-10,20,10), vec3(-40,20,10), vec3(-40,0,10), vec3(-10,0,10), "woodwall" );
	makeWall( vec3(-40,20,-10), vec3(-10,20,-10), vec3(-10,0,-10), vec3(-40,0,-10), "bloodywall" );
	
	// floor pieces
	makeWall( vec3(-10,0,-40), vec3(10,0,-40), vec3(10,0,60), vec3(-10,0,60), "woodfloor" );
	makeWall( vec3(10,0,-10), vec3(40,0,-10), vec3(40,0,10), vec3(10,0,10), "woodfloor" );
	makeWall( vec3(-40,0,10), vec3(-40,0,-10), vec3(-10,0,-10), vec3(-10,0,10), "bloodywoodfloor" );
	makeWall( vec3(10,0,-32), vec3(30,0,-32), vec3(30,0,-18), vec3(10,0,-18), "woodfloor" );
	
	// ceiling pieces
	makeWall( vec3(10,20,-40), vec3(-10,20,-40), vec3(-10,20,60), vec3(10,20,60), "woodfloor" );
	makeWall( vec3(40,20,-32), vec3(10,20,-32), vec3(10,20,10), vec3(40,20,10), "woodfloor" );
	makeWall( vec3(-10,20,10), vec3(-10,20,-10), vec3(-40,20,-10), vec3(-40,20,10), "woodfloor" );
	
}


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    canvas.width = document.body.clientWidth-50;
	canvas.height = document.body.clientHeight-50;
	
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	
	// Make all textures:
	// makeTexture is from Briley.js.
	// It places the textures into an array, associating the strings as names for them.
	makeTexture( "woodwall", document.getElementById("woodwall") );
	makeTexture( "woodfloor", document.getElementById("woodfloor") );
	makeTexture( "wooddoor", document.getElementById("wooddoor") );
	makeTexture( "stones", document.getElementById("stones") );
	makeTexture( "marble", document.getElementById("marble") );
	makeTexture( "frame", document.getElementById("frame") );
	makeTexture( "frame2", document.getElementById("frame2") );
	makeTexture( "clown", document.getElementById("clown") );
	makeTexture( "skull", document.getElementById("skull") );
	makeTexture( "zombie", document.getElementById("zombie") );
	makeTexture( "fire1", document.getElementById("fire1") );
	makeTexture( "fire2", document.getElementById("fire2") );
	makeTexture( "fireplace", document.getElementById("fireplace") );
	makeTexture( "scaryface", document.getElementById("scaryface") );
	makeTexture( "bloodywall", document.getElementById("bloodywall") );
	makeTexture( "bloodywoodfloor", document.getElementById("bloodywoodfloor") );
	makeTexture( "bloodystonefloor", document.getElementById("bloodystonefloor") );
	makeTexture( "rug", document.getElementById("rug") );
	makeTexture( "colorstones", document.getElementById("colorstones") );
	makeTexture( "battery1", document.getElementById("battery1") );
	makeTexture( "battery2", document.getElementById("battery2") );
	makeTexture( "gold", document.getElementById("gold") );
	makeTexture( "textover1", document.getElementById("textover1") );
	text1Index = textureArray.length-1;
	makeTexture( "eye", document.getElementById("eye") );
	makeTexture( "lightwood", document.getElementById("lightwood") );
	makeTexture( "metal", document.getElementById("metal") );
	makeTexture( "gray", document.getElementById("gray") );
	makeTexture( "yellow", document.getElementById("yellow") );
	makeTexture( "red", document.getElementById("red") );
	makeTexture( "plate", document.getElementById("plate") );
	makeTexture( "bookshelf", document.getElementById("bookshelf") );
	makeTexture( "metalWithEye", document.getElementById("metalWithEye") );
	makeTexture( "jump", document.getElementById("jump") );
	makeTexture( "creeperface", document.getElementById("creeperface") );
    makeTexture( "creeperskin", document.getElementById("creeperskin") );
    makeTexture( "lightning1", document.getElementById("lightning1") );
    makeTexture( "nightstand", document.getElementById("nightstand") );
	makeTexture( "drawers", document.getElementById("drawers") );
	makeTexture( "mattress", document.getElementById("mattress") );
	makeTexture( "cloth", document.getElementById("cloth") );
	makeTexture( "bloodywoodwall", document.getElementById("bloodywoodwall") );
    makeTexture( "rope", document.getElementById("rope") );
	makeTexture( "doubledoors", document.getElementById("doubledoors") );
	makeTexture( "darkgray", document.getElementById("darkgray") );
	makeTexture( "smiley", document.getElementById("smiley") );
	makeTexture( "youwin", document.getElementById("youwin") );
	makeTexture( "youlose", document.getElementById("youlose") );

	
	
	// Make the initial hallways: defined above
	makeHallways();
	
	// Defined in BrileyWestWing.js
	makeBrileysDoor();
	
	
	//add table. first run the function makeTable() to generate all the necessary arrays
	makeTable();
	makeObjectType("table", getTableVertices(), getTableTexCoords(), getTableNormals(), getTableTexStrings("marble"));
	makeObjectInstance("table", getTableTransformation() );
	
	//add chair.
	makeChair();
	makeObjectType("chair", getChairVertices(), getChairTexCoords(), getChairNormals(), getChairTexStrings("marble"));
	makeObjectInstance("chair", getChairTransformation() );
	makeObjectInstance("chair", getChair2Transformation() );
	makeObjectInstance("chair",mult(translate(25.0,0.0,4.0,1.0),rotate(180,0,1,0))) ; //FirePlace Chairs
	makeObjectInstance("chair",mult(translate(25.0,0.0,-4.0,1.0),rotate(180,0,1,0))) ;
	
	//add the frame of the painting makeFrame(height, thickness, width)
	makeFrame(10,1,3);
	makeObjectType("clown_painting", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("frame","clown"));
	makeObjectInstance("clown_painting", getFrameTransformation("clown_painting") );
	
	makeFrame(10,1,7);
	makeObjectType("skull_painting", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("frame2","skull"));
	makeObjectInstance("skull_painting", getFrameTransformation("skull_painting") );
	
	makeFrame(10,1,7);
	makeObjectType("zombie_painting", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("frame2","zombie"));
	makeObjectInstance("zombie_painting", getFrameTransformation("zombie_painting") );
	
	makeFrame(6,1,4);
	makeObjectType("scary_face", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("frame","scaryface"));
	makeObjectInstance("scary_face", getFrameTransformation("scary_face") );
	
	makeFrame(10,4,7);
	makeObjectType("fireplace", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("fireplace","fire1"));
	makeInteractableObjectInstance("fireplace", getFrameTransformation("fireplace"), false, true, [0, 0] );
	
	makeFrame(40,1,5);
	makeObjectType("rug", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("rug","rug"));
	makeObjectInstance("rug", getFrameTransformation("rug") );
	
	// Defined in BrileyWestWing.js
	makeBrileysLongTable();
	makeBrileysBattery();
	makeBrileysKey();
	
    makeLightning();
    
	//add spheres.
    sphere(3,false);
    makeSpecularObjectType("sphere", getSphereVertices(), getSphereTexCoords(),getSphereNormals(), [ "gray" ]);
    makeObjectInstance("sphere", getSphereTransformation() );
    makeObjectInstance("sphere", getSphereTransformation2() );
	
    
	
	// South wing closet
    makeInteractableObjectInstance( "door", mult(translate(-3.5,0,30), rotate(180,0,1,0)), true, false,
			[ translate(-3.5,0,30), rotate(180, 0, 1, 0), false, 0 ] );
    makeJoesCreeper();
    makeObjectInstance("creeper", getCreeperTransformation() );
	
	makeBrileysGuillotineFrameAndBlade(); // makes 2 objects
	makeBrileysPlate();
	makePriscillasFan();
	makeInteractableObjectInstance( "ceiling fan", translate(0, 18, 0), false, true, [ translate(0,18,0), 0 ] );
	makeBrileysBookshelf();
	makeBrileysStatue();
	makeBrileysGuillotineRoomLight();
    makeNoose();
	
	// Defined in BrileyWestWing.js
	makeWestWing();
	makeNorthRoom();
	
	// put battery on dresser
	makeInteractableObjectInstance( "battery", translate(-10,4,-58),
								true, false, 0 );
	// put key behind creeper
	makeInteractableObjectInstance( "key", translate(0,0,58),
								true, false, 0 );
	
	////////////////////////////////////////////////////////////////////////////
	//add flashlight
	//flashlight is composed of 2 cylinders, one translated in front of the first
	//each cylinder is subdivided 12 times
	
	
	//lashlightLocation = gl.getUniformLocation(program, "flashlight");
	var flashlightHead = makeFlashlightHead();
	var flashlightBody = makeFlashlightBody();
	for (var i=0; i < flashlightHead.length; i++)
	{
		flashlightPoints.push(flashlightHead[i]);
	}
	for (var i=0; i < flashlightBody.length; i++)
	{
		flashlightPoints.push(flashlightBody[i]);
	}
	
	
	/*
	var vertices = [vec4(1.0,1.0,-1.0,1.0), vec4(-1.0,1.0,-1.0,1.0), vec4(0.0,-1.0,-1.0,1.0)];
	for (var i=0; i < vertices.length; i++)
	{
		flashlightPoints.push(vertices[i]);
	}
	
	colorLocation = gl.getUniformLocation(program, "vColor");
	gl.uniform4fv(colorLocation, [0.5,0.5,0.5,1.0]);
	*/
	
	////////////////////////////////////////////////////////////////////////////
			
		
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    // Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	// from Briley.js
	OptimizeWallOrdering();
    
	// Store all vertices, texcoords, and normals from all ObjectTypes and all Walls into these arrays to load into GPU's buffers.
	for( var i = 0; i < ObjectTypeArray.length; i++ )
	{	
		for( var k = 0; k < ObjectTypeArray[i].vertices.length; k++ )
			GPUpoints.push( ObjectTypeArray[i].vertices[k] );
		for( var k = 0; k < ObjectTypeArray[i].texcoords.length; k++ )
			GPUtexcoords.push( ObjectTypeArray[i].texcoords[k] );
		for( var k = 0; k < ObjectTypeArray[i].normals.length; k++ )
			GPUnormals.push( ObjectTypeArray[i].normals[k] );
		//ObjectTypeArray[i].vertices = [];
		ObjectTypeArray[i].texcoords = [];
		ObjectTypeArray[i].normals = [];
	}
	bufferWallPointsStart = GPUpoints.length; // bufferWallPointsStart is the starting index of the first Wall's vertices
	for( var i = 0; i < WallArray.length; i++ )
	{
		if ( WallArray[i].vertices.length != WallArray[i].normals.length )
			gdfsgfjdkl;
		for( var k = 0; k < WallArray[i].vertices.length; k++ )
			GPUpoints.push( WallArray[i].vertices[k] );
		for( var k = 0; k < WallArray[i].texcoords.length; k++ )
			GPUtexcoords.push( WallArray[i].texcoords[k] );
		for( var k = 0; k < WallArray[i].normals.length; k++ )
			GPUnormals.push( WallArray[i].normals[k] );
		//WallArray[i].vertices = [];
		WallArray[i].texcoords = [];
		WallArray[i].normals = [];
	}
	
	
	bufferTextPointsStart = GPUpoints.length;
	makeOrthoPoints(); // adds points to GPUpoints, texcoords, and normals.
	MakeJumpScare();
	bufferTextPointsEnd = GPUpoints.length;
	
	////////////////////////////////////////////////////////////
	//console.log(GPUpoints.length);
	for (var i = 0; i<flashlightPoints.length; i++)
	{
		GPUpoints.push(flashlightPoints[i]);
		GPUnormals.push(vec4(0.0,0.0,0.0,1.0));
		GPUtexcoords.push(vec4(0.0,0.0,0.0,1.0));
	}
	//console.log(GPUpoints.length);
	////////////////////////////////////////////////////////////
	
	// set up position buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(GPUpoints), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
	// set up texture coordinate buffer
	var tBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(GPUtexcoords), gl.STATIC_DRAW );
    
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );
	
	// set up normals buffer
	var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(GPUnormals), gl.STATIC_DRAW );
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );
	
	// set up the perspective matrix
	pMatrixLocation = gl.getUniformLocation(program, "uPMatrix");
	pLightMatrixLocation = gl.getUniformLocation(program, "LightPerspective");
	pmatrix = perspective( FOV, canvas.width/canvas.height, 0.05, 140 );
	gl.uniformMatrix4fv(pMatrixLocation, false, flatten(pmatrix) );
	
	// get location for the model view matrix for setting in the render function
	cameraMvMatrixLocation = gl.getUniformLocation(program, "uCameraMVMatrix");
	objectMvMatrixLocation = gl.getUniformLocation(program, "uObjectMVMatrix");
	noShadingLocation = gl.getUniformLocation(program, "noShading");
	gl.uniform1i( noShadingLocation, 0 );
	specularVec4MultiplierLocation = gl.getUniformLocation(program, "specularVec4Multiplier");
	gl.uniform4fv( specularVec4MultiplierLocation, [ 0.0, 0.0, 0.0, 1.0 ] );
	
	//Light uniform
	FlashlightOnLoc = gl.getUniformLocation(program, "FlashlightOn");
	gl.uniform1f(FlashlightOnLoc, 0.0 );
	
	//Passes data for Light Sources
	LightVerticesLocation = gl.getUniformLocation(program, "LightSourceVertices");
	LightIntensityLocation = gl.getUniformLocation(program, "LightSourceIntensity");
	LightTransformLocation = gl.getUniformLocation(program, "LightSourceTransform");
	ShadowRunLoc = gl.getUniformLocation(program, "uShadowRun");
	
	MakeLightSource(translate(155.0,5.0,-36.0,1.0), 100.0, vec4(-155.0,-5.0,36.0,1.0),20);
	MakeLightSource(translate(-35.0,-8.0,0.0,1.0), 200.0, vec4(35.0,3.0,0.0,1.0),4);
	gl.uniform1f(LightIntensityLocation, LightSources[0].intensity );
	gl.uniform4fv(LightVerticesLocation, flatten(LightSources[0].position) );
	gl.uniformMatrix4fv(LightTransformLocation,false, flatten(LightSources[0].transformation) );
	var depthTextureExt = gl.getExtension("WEBGL_depth_texture"); // Or browser-appropriate prefix
	
	initShadowMap();
	
	// set up key tracking, all keys are initially not pressed and not down
	for( var i = 0; i < numkeys; i++ )
	{
		keystates.push( false );
		keypresses.push( false );
	}
		
	gl.uniform1f(ShadowRunLoc, 1.0 );
	ShadowRender(0.0);//first run of ShadowRender
	
	gl.uniform1f(LightIntensityLocation, LightSources[1].intensity );
	gl.uniform4fv(LightVerticesLocation, flatten(LightSources[1].position) );
	gl.uniformMatrix4fv(LightTransformLocation,false, flatten(LightSources[1].transformation) );
	ShadowRender(1.0); //second run of Shadow Render
	
	gl.uniform1f(ShadowRunLoc, 0.0 );
	render();
}

window.addEventListener("keydown", function (event) {

	  if ( event.keyCode == 87 ) // w - associated with index 0
	  {
			if ( !keystates[0] )
				keypresses[0] = true;
			keystates[0] = true;
	  }
	  else if ( event.keyCode == 65 ) // a - 1
	  {
			if ( !keystates[1] )
				keypresses[1] = true;
			keystates[1] = true;
	  }
	  else if ( event.keyCode == 83 ) // s - 2
	  {
			if ( !keystates[2] )
				keypresses[2] = true;
			keystates[2] = true;
	  }
	  else if ( event.keyCode == 68 ) // d - 3
	  {
			if ( !keystates[3] )
				keypresses[3] = true;
			keystates[3] = true;
	  }
	  else if ( event.keyCode == 37 ) // left arrow - 4
	  {
			if ( !keystates[4] )
				keypresses[4] = true;
			keystates[4] = true;
	  }
	  else if ( event.keyCode == 39 ) // right arrow - 5
	  {
			if ( !keystates[5] )
				keypresses[5] = true;
			keystates[5] = true;
	  }
	  else if ( event.keyCode == 38 ) // up arrow - 6
	  {
			if ( !keystates[6] )
				keypresses[6] = true;
			keystates[6] = true;
	  }
	  else if ( event.keyCode == 40 ) // down arrow - 7
	  {
			if ( !keystates[7] )
				keypresses[7] = true;
			keystates[7] = true;
	  }
	  else if ( event.keyCode == 32 ) // space - 8
	  {
			if ( !keystates[8] )
				keypresses[8] = true;
			keystates[8] = true;
	  }
	  else if ( event.keyCode == 69 ) // e - 9
	  {
			if ( !keystates[9] )
				keypresses[9] = true;
			keystates[9] = true;
	  }
	  else if ( event.keyCode == 69 ) // e - 9
	  {
			if ( !keystates[9] )
				keypresses[9] = true;
			keystates[9] = true;
	  }
	  else if ( event.keyCode == 70 ) // f - 10
	  {
			if ( !keystates[10] )
				keypresses[10] = true;
			keystates[10] = true;
	  }
	   else if ( event.keyCode == 77 ) // m - cheatily refill meters: only use if you already admit defeat.
	  {
			fright = 0;
			flashlightbattery = 100;
	  }
	
}, true);

window.addEventListener("keyup", function (event) {

	  if ( event.keyCode == 87 ) // w
			keystates[0] = false;
	  else if ( event.keyCode == 65 ) // a
			keystates[1] = false;
	  else if ( event.keyCode == 83 ) // s
			keystates[2] = false;
	  else if ( event.keyCode == 68 ) // d
			keystates[3] = false;
	  else if ( event.keyCode == 37 ) // left arrow
			keystates[4] = false;
	  else if ( event.keyCode == 39 ) // right arrow
			keystates[5] = false;
	  else if ( event.keyCode == 38 ) // up arrow
			keystates[6] = false;
	  else if ( event.keyCode == 40 ) // down arrow
			keystates[7] = false;
	  else if ( event.keyCode == 32 ) // space
			keystates[8] = false;
	  else if ( event.keyCode == 69 ) // e
			keystates[9] = false;
	  else if ( event.keyCode == 70 ) // f
			keystates[10] = false;

}, true);



// This function is called below in the render function.
// It updates any objects that have either updateMe or justActivated as true, like a door swinging open
function updateInteractableObjects()
{
	for( var i = 0; i < ObjectInstanceArray.length; i++ )
	{
		if ( ObjectInstanceArray[i].justActivated )
		{
			// What to do if this object has JUST been activated.
			ObjectInstanceArray[i].justActivated = false;
			if ( ObjectInstanceArray[i].whichType == 0 ) // If it's a door:
			{
				ObjectInstanceArray[i].updateMe = true; // start rotating the door.
				ObjectInstanceArray[i].interactWithMe = false; // cannot activate the door while it is swinging.
				var creak_playing = false;
				footsteps.addEventListener("playing", function (replayCreak) {
					creak_playing = true;
				});
				if (creak_playing==false)
					creak.play();
			}
			else if ( ObjectInstanceArray[i].whichType == 10 || ObjectInstanceArray[i].whichType == 11 ) // If it's a battery or key:
			{
				ObjectInstanceArray[i].updateMe = true; // start grabbing the battery/key.
				ObjectInstanceArray[i].interactWithMe = false; // cannot activate the battery/key anymore.
			}
			
		}
		if ( ObjectInstanceArray[i].updateMe ) // object must be updated
		{
			if ( ObjectInstanceArray[i].whichType == 0 ) // If it's a door
			{
				ObjectInstanceArray[i].updatableState[3]++; // increment counter for door swing
				if ( !ObjectInstanceArray[i].updatableState[2] ) // door is closed, swinging open
				{
					// rotate negative degrees
					ObjectInstanceArray[i].updatableState[1] = mult( ObjectInstanceArray[i].updatableState[1],
												rotate(-4.5, 0, 1, 0 ) );
				}
				else // door is open, swinging shut
				{
					// rotate positive degrees
					ObjectInstanceArray[i].updatableState[1] = mult( ObjectInstanceArray[i].updatableState[1],
												rotate(4.5, 0, 1, 0 ) );
				}
				// redo transformation matrix since it changed
				ObjectInstanceArray[i].transformation = mult( ObjectInstanceArray[i].updatableState[0],
											ObjectInstanceArray[i].updatableState[1] );
											
				if ( ObjectInstanceArray[i].updatableState[3] == 20 ) // door already swung 90 degrees
				{
					ObjectInstanceArray[i].updateMe = false; // door no longer needs updating.
					ObjectInstanceArray[i].interactWithMe = true; // door can be activated again.
					ObjectInstanceArray[i].updatableState[3] = 0; // reset counter for next door swing.
					createBoundingVolume( ObjectInstanceArray[i] ); // redo boundingVolume since position changed.
					ObjectInstanceArray[i].updatableState[2] = !ObjectInstanceArray[i].updatableState[2]; // swap open/shut
					doorJustRotated = i; // flag this door so BrileyColDetect.js can make sure the player is not stuck inside this door.
					if ( ObjectInstanceArray[i].transformation[1][3] > -1 && ObjectInstanceArray[i].transformation[2][3] > 29
							&& ObjectInstanceArray[i].updatableState[2] == true )
						creepersound.play();
				}
			}
			else if ( ObjectInstanceArray[i].whichType == 7 ) // If it's a fireplace:
			{
				ObjectInstanceArray[i].updatableState[0]++; // update counter
				if ( ObjectInstanceArray[i].updatableState[0] > 20 ) // if counter hits 20: switch fire textures
				{
					ObjectInstanceArray[i].updatableState[0] = 0; // reset counter
					ObjectInstanceArray[i].updatableState[1] = 1 - ObjectInstanceArray[i].updatableState[1]; // switch stored texture
					if ( ObjectInstanceArray[i].updatableState[1] == 0 )
					{
						ObjectTypeArray[7].triangleTextures[0] = 10; // change to "fire1" texture
						ObjectTypeArray[7].triangleTextures[0] = 10;
					}
					else
					{
						ObjectTypeArray[7].triangleTextures[0] = 11; // change to "fire2" texture
						ObjectTypeArray[7].triangleTextures[0] = 11;
					}
				}
			}
			else if ( ObjectInstanceArray[i].whichType == 10 ||
							ObjectInstanceArray[i].whichType == 11 ) // If it's a battery or key:
			{
				heading = vec3( cameraX-ObjectInstanceArray[i].transformation[0][3],
						cameraY-1-ObjectInstanceArray[i].transformation[1][3],
						cameraZ-ObjectInstanceArray[i].transformation[2][3] );
				if ( length( heading ) < 0.4 ) // essentially delete me: move me out of view.
				{
					ObjectInstanceArray[i].updateMe = false;
					ObjectInstanceArray[i].transformation = translate(0,-5000,0);
					createBoundingVolume( ObjectInstanceArray[i] ); // so we don't collide with the battery/key anymore.
					if ( ObjectInstanceArray[i].whichType == 10 ) // battery: give some flashlight battery.
					{
						flashlightbattery += 50.0;
						if ( flashlightbattery > 100.0 )
							flashlightbattery = 100.0;
					}
					else
					{	// key: add key to list
						keysCollected++;
					}
				}
				else
				{
					heading = normalize( heading, false );
					ObjectInstanceArray[i].transformation = mult( translate( 0.5*heading[0],
									0.5*heading[1], 0.5*heading[2] ), ObjectInstanceArray[i].transformation ); // update position
				}
			}
            
            else if ( ObjectInstanceArray[i].whichType == 12 ) // If it's the lightning:
            {
                ObjectInstanceArray[i].updatableState[0]++; // update counter
                if ( ObjectInstanceArray[i].updatableState[0] > 2 ) // if counter hits 10: switch transformations
                {
                    ObjectInstanceArray[i].updatableState[0] = 0; // reset counter
                    
                    ObjectInstanceArray[i].updatableState[1] = mult( ObjectInstanceArray[i].updatableState[1],
                                                                    scale(1, -1, 1) ); // apply vertical flip
                    ObjectInstanceArray[i].transformation = mult( ObjectInstanceArray[i].transformation,
                                                                 ObjectInstanceArray[i].updatableState[1] );
                    
                    
                }
            }
            
			else if ( ObjectInstanceArray[i].whichType == 17 ) // If it's a dining room plate:
			{
				if ( cameraX > -110 && cameraX < -50 && cameraZ < -10 && cameraZ > -40 ) // the player is in the dining room:
				{
					if ( ObjectInstanceArray[i].updatableState[2] == 0 ) // waiting
					{
						ObjectInstanceArray[i].updatableState[3]--; // run down counter
						if ( ObjectInstanceArray[i].updatableState[3] <= 0 )
						{
							if ( ObjectInstanceArray[i].transformation[1][3] <= ObjectInstanceArray[i].updatableState[1] )
								ObjectInstanceArray[i].updatableState[2] = 1; // plate should be rising.
							else
								ObjectInstanceArray[i].updatableState[2] = 2; // plate should be falling.
						}
					}
					else if ( ObjectInstanceArray[i].updatableState[2] == 1 ) // rising
					{
						ObjectInstanceArray[i].transformation[1][3] += ObjectInstanceArray[i].updatableState[4]; // move by plate's move speed
						if ( ObjectInstanceArray[i].transformation[1][3] >= ObjectInstanceArray[i].updatableState[0] )
						{
							ObjectInstanceArray[i].updatableState[2] = 0; // plate should be waiting now.
							ObjectInstanceArray[i].updatableState[3] = 8; // set the counter to 8.
							if ( Math.random() < 0.5 )
								ObjectInstanceArray[i].updatableState[3] = 13; // or randomly set the counter to 13.
						}
					}
					else // the plate is falling.
					{
						ObjectInstanceArray[i].transformation[1][3] -= ObjectInstanceArray[i].updatableState[4]; // move by plate's move speed
						if ( ObjectInstanceArray[i].transformation[1][3] <= ObjectInstanceArray[i].updatableState[1] )
						{
							ObjectInstanceArray[i].updatableState[2] = 0; // plate should be waiting now.
							ObjectInstanceArray[i].updatableState[3] = 20; // set the counter to 20.
							if ( Math.random() < 0.5 )
								ObjectInstanceArray[i].updatableState[3] = 43; // or randomly set the counter to 43.
						}
					}
				}
				else // the player is not in the dining room:
				{
					if ( ObjectInstanceArray[i].transformation[1][3] > 3.5 )
					{
						ObjectInstanceArray[i].transformation[1][3] -= ObjectInstanceArray[i].updatableState[4]; // plate should fall.
						ObjectInstanceArray[i].updatableState[2] = 0;
						ObjectInstanceArray[i].updatableState[3] = 0;
						if ( ObjectInstanceArray[i].transformation[1][3] < 3.5 )
							ObjectInstanceArray[i].transformation[1][3] = 3.5;
					}
				}
			}
			else if ( ObjectInstanceArray[i].whichType == 18 ) // If it's a ceiling fan:
			{
				ObjectInstanceArray[i].updatableState[1] += 4; // increment its rotation every frame, but reset values every cycle.
				if ( ObjectInstanceArray[i].updatableState[1] < 360 )
					ObjectInstanceArray[i].transformation = mult( ObjectInstanceArray[i].transformation, rotate( 4, 0, 1, 0 ) );
				else
				{
					ObjectInstanceArray[i].updatableState[1] = 0;
					ObjectInstanceArray[i].transformation = ObjectInstanceArray[i].updatableState[0];
				}
			}
			else if ( ObjectInstanceArray[i].whichType == 20 ) // If it's the metal statue:
			{
				if ( cameraX > -75 && cameraHorzAngle > 0 && cameraHorzAngle < 180 && ObjectInstanceArray[i].updatableState != 0 )
				{
					ObjectInstanceArray[i].transformation = mult( translate( -80, -16, 36 ), rotate( 90,0,1,0) );
					ObjectInstanceArray[i].updatableState = 0;
					createBoundingVolume( ObjectInstanceArray[i] );
					ObjectInstanceArray[i+1].updatableState = translate( -80, -6, 36 );
					createBoundingVolume( ObjectInstanceArray[i+1] );
				}
				else if ( cameraX < -120 && (cameraHorzAngle < 0 || cameraHorzAngle > 180) && ObjectInstanceArray[i].updatableState != 1 )
				{
					ObjectInstanceArray[i].transformation = mult( translate( -115, -16, 36 ), rotate( 90,0,1,0) );
					ObjectInstanceArray[i].updatableState = 1;
					createBoundingVolume( ObjectInstanceArray[i] );
					ObjectInstanceArray[i+1].updatableState = translate( -115, -6, 36 );
					createBoundingVolume( ObjectInstanceArray[i+1] );
				}
				else if ( cameraZ > 60 && cameraHorzAngle > 90 && cameraHorzAngle < 270 && ObjectInstanceArray[i].updatableState != 2 )
				{
					ObjectInstanceArray[i].transformation = translate( -100, -16, 55 );
					ObjectInstanceArray[i].updatableState = 2;
					createBoundingVolume( ObjectInstanceArray[i] );
					ObjectInstanceArray[i+1].updatableState = translate( -100, -6, 55 );
					createBoundingVolume( ObjectInstanceArray[i+1] );
				}
			}
			else if ( ObjectInstanceArray[i].whichType == 21 ) // If it's the statue head eyeball thing:
			{
				lookvec = [ cameraX - ObjectInstanceArray[i].transformation[0][3], cameraY - ObjectInstanceArray[i].transformation[1][3],
									cameraZ - ObjectInstanceArray[i].transformation[2][3] ];
				lookHorzAngle = Math.atan2( lookvec[0], lookvec[2] ) * 180.0/Math.PI;
				lookVertAngle = Math.atan2( -lookvec[1], Math.sqrt(lookvec[0]*lookvec[0]+lookvec[2]*lookvec[2]) ) * 180.0/Math.PI;
				ObjectInstanceArray[i].transformation = mult( ObjectInstanceArray[i].updatableState,
						mult( rotate(lookHorzAngle, 0, 1, 0), rotate(lookVertAngle, 1, 0, 0 ) ) );
			}
		}
		
	}
}

function render()
{
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);

	if(CloserToFire()) // decide which shadowMap we're going to use based on player proximity
	{
	gl.uniform1f(LightIntensityLocation, LightSources[1].intensity );
	gl.uniform4fv(LightVerticesLocation, flatten(LightSources[1].position) );
	gl.uniformMatrix4fv(LightTransformLocation,false, flatten(LightSources[1].transformation) );
	gl.uniform1f(gl.getUniformLocation(program, "CloseToFire"), 1.0 );
	}
	else
	{
	gl.uniform1f(LightIntensityLocation, LightSources[0].intensity );
	gl.uniform4fv(LightVerticesLocation, flatten(LightSources[0].position) );
	gl.uniformMatrix4fv(LightTransformLocation,false, flatten(LightSources[0].transformation) );
	gl.uniform1f(gl.getUniformLocation(program, "CloseToFire"), 0.0 );
	}
	
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
	
	if( !JumpTime(JumpTimer) && youLose == 0 && youWin == 0 )
	{	
		if ( keystates[0] || keystates[1] || keystates[2] || keystates[3] )
		{
			var footsteps_playing = false;
			footsteps.addEventListener("playing", function (replayFootsteps) {
				footsteps_playing = true;
			});
			if (footsteps_playing==false)
				footsteps.play();
		}
	
		// handlePlayerActions is defined in BrileyColDetect.js
		handlePlayerActions();
		if ( cameraX < 13 || cameraZ < -17 )
		{
			fright += 0.03; // away form fireplace: fright increases.
			if ( FlashlightActuallyOn != 1.0 )
				fright += 0.03; // fright increases more if flashlight is off.
			if ( fright >= 100.0 )
			{
				youLose = 1;
				JumpTimer = 0;
			}
		}
		else
		{	// near fireplace: calms you down.
			fright -= 0.07;
			if ( fright < 0.0 )
				fright = 0.0;
		}
		// set all keypresses to false every frame, so they will only be true once when the key is just pressed.
		for( var i = 0; i < numkeys; i++ )
			keypresses[i] = false;
			
		updateInteractableObjects();
			
			
		// apply the camera's translation and rotation
		var cameraMvMatrix = rotate(cameraVertAngle, 1, 0, 0);
		cameraMvMatrix = mult( cameraMvMatrix, rotate(cameraHorzAngle, 0, 1, 0) );
		cameraMvMatrix = mult( cameraMvMatrix, translate(-cameraX, -cameraY, -cameraZ) );
		gl.uniformMatrix4fv( cameraMvMatrixLocation, false, flatten(cameraMvMatrix) );
	
	}
	
	// draw all ObjectInstances:
	for( var i = 0; i < ObjectInstanceArray.length; i++ )
	{
		// apply the transformation for this instance and send it to the shader as the model-view matrix
		gl.uniformMatrix4fv( objectMvMatrixLocation, false, flatten( ObjectInstanceArray[i].transformation ) );
		
		// get the ObjectType of this instance
		var type = ObjectTypeArray[ ObjectInstanceArray[i].whichType ];
		
		if ( type.specularHighlight )
			gl.uniform4fv( specularVec4MultiplierLocation, [ 1.0, 1.0, 1.0, 1.0 ] );
		
		if ( type.triangleTextures.length == 1 )
		{
			// bind the single texture
			gl.bindTexture( gl.TEXTURE_2D, textureArray[ type.triangleTextures[0] ] );
			// draw all triangles
			gl.drawArrays( gl.TRIANGLES, type.vStart, type.vLength );
		}
		else
		{
			// draw each triangle of the instance's type
			for( var k = 0; k < type.triangleTextures.length; k++ )
			{
				// bind the texture for this particular triangle of the ObjectType
				gl.bindTexture( gl.TEXTURE_2D, textureArray[ type.triangleTextures[k] ] );
				// draw this triangle
				gl.drawArrays( gl.TRIANGLES, type.vStart+k*3, 3 );
			}
		}
		
		if ( type.specularHighlight )
			gl.uniform4fv( specularVec4MultiplierLocation, [ 0.0, 0.0, 0.0, 1.0 ] );
		
	}
	
	// draw all Walls:
	// Since walls have no transformations, the object's transformations is the identity matrix.
	gl.uniformMatrix4fv( objectMvMatrixLocation, false, flatten( mat4() ) );
	for( i = 0; i < WallOrderOptimizer.length; i++ )
	{
		// bind the texture for this set of walls
		gl.bindTexture( gl.TEXTURE_2D, textureArray[ WallOrderOptimizer[i][0] ] );
		
		// draw all walls that have this texture
		gl.drawArrays( gl.TRIANGLES, bufferWallPointsStart+WallOrderOptimizer[i][1]*6, WallOrderOptimizer[i][2]*6 );
	}
	/*for( var i = 0; i < WallArray.length; i++ )
	{
		// bind the texture for the wall
		gl.bindTexture( gl.TEXTURE_2D, textureArray[ WallArray[i].whichTexture ] );
		// draw the two triangles that make up the wall (so six vertices)
		gl.drawArrays( gl.TRIANGLES, bufferWallPointsStart+i*6, 6 );
	}*/
	
	/////////////////////////////////////////////////////////////////////////
	// draw flashlight:
	
	// no shading:
	gl.uniform1i( noShadingLocation, 1 );
		
	
	
	//draw the flashlight
	//flashlight is always at the POV of the user
	var flashlightMatrix = mult( translate(0,-2,-5.5), scale(.7,.7,.7) ); // get the flashlight in the right position.
	// camera matrix should be identity: so the flashlight is at the POV of user all the time.
	gl.uniformMatrix4fv( cameraMvMatrixLocation, false, flatten( flashlightMatrix ) );
	
	//if ( FlashlightActuallyOn == 1.0 )
	//	gl.bindTexture( gl.TEXTURE_2D, textureArray[ 27 ] );
	//else
		gl.bindTexture( gl.TEXTURE_2D, textureArray[ 26 ] );
	gl.drawArrays( gl.TRIANGLES, bufferTextPointsEnd, 72 );

	gl.bindTexture( gl.TEXTURE_2D, textureArray[ 43 ] );
	gl.drawArrays( gl.TRIANGLES, bufferTextPointsEnd+72, flashlightPoints.length-72 );
	
	///////////////////////////////////////////////////////////////////////
	
	// Orthographic Drawing:
	// set all matrices to identity:
	gl.uniformMatrix4fv(pMatrixLocation, false, flatten( mat4() ) );
	gl.uniformMatrix4fv( cameraMvMatrixLocation, false, flatten( mat4() ) );
	
	// no depth testing:
	gl.disable(gl.DEPTH_TEST);

	
	if(JumpTime(JumpTimer)) //defined in Erik.js
	{
		if ( youWin == 0 )
			gl.bindTexture( gl.TEXTURE_2D, textureArray[ 32 ] );
		else
			gl.bindTexture( gl.TEXTURE_2D, textureArray[ textureArray.length-3 ] );
		gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsEnd-4, 4 );
		JumpTimer+=1;
		if ( JumpTimer == 24 )
			fright += 25;
		FlashlightActuallyOn = 0.0;
		gl.uniform1f(FlashlightOnLoc, FlashlightActuallyOn );
		scream.play();
	}
	else if ( youLose == 1 )
	{
		gl.bindTexture( gl.TEXTURE_2D, textureArray[ textureArray.length-1 ] );
		gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsEnd-4, 4 );
	}
	else if ( youWin == 1 )
	{
		gl.bindTexture( gl.TEXTURE_2D, textureArray[ textureArray.length-2 ] );
		gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsEnd-4, 4 );
	}
	else
	{
	// draw a text, like "(E) Open Door":
	if ( whichText != -1 )
	{
		gl.bindTexture( gl.TEXTURE_2D, textureArray[ text1Index ] );
		gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsStart+whichText*4, 4 );
	}
	else if ( cameraX > 24 && cameraZ < -17 )
	{
		// near exit triple lock door
		gl.bindTexture( gl.TEXTURE_2D, textureArray[ text1Index ] );
		if ( keysCollected == 3 )
			gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsStart+5*4, 4 );
		else
			gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsStart+4*4, 4 );
	}
	
	// draw eye
	gl.bindTexture( gl.TEXTURE_2D, textureArray[ text1Index+1 ] );
	gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsStart+24, 4 );
	
	// draw battery indicator
	gl.bindTexture( gl.TEXTURE_2D, textureArray[ 20 ] );
	gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsStart+28, 4 );
	
	// draw gray outlines
	gl.bindTexture( gl.TEXTURE_2D, textureArray[ 26 ] );
	gl.drawArrays( gl.TRIANGLES, bufferTextPointsStart+32, 24 );
	
	// draw yellow fill for battery meter:
	gl.bindTexture( gl.TEXTURE_2D, textureArray[ 27 ] );
	gl.uniformMatrix4fv( objectMvMatrixLocation, false, flatten( mult( translate(-.7,0.67,0.0), scale( (flashlightbattery/200.0),1.0,1.0) ) ) );
	gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsStart+56, 4 );
	
	// draw red fill for fright meter:
	gl.bindTexture( gl.TEXTURE_2D, textureArray[ 28 ] );
	gl.uniformMatrix4fv( objectMvMatrixLocation, false, flatten( mult( translate(-.7,0.805,0.0), scale( (fright/200.0),1.0,1.0) ) ) );
	gl.drawArrays( gl.TRIANGLE_STRIP, bufferTextPointsStart+56, 4 );
	
	}
	
	
	// restore projection matrix
	gl.uniformMatrix4fv(pMatrixLocation, false, flatten(pmatrix) );
	gl.uniform1i( noShadingLocation, 0 );
	
	// depth test again:
	gl.enable(gl.DEPTH_TEST);
	
    requestAnimFrame( render );
}

