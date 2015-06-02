// Briley.js

//////////////////////////////////////////////////////////////////////////////
//
//  OBJECT HIERARCHY
//
//  Relevant Library Functions:
//
//  makeTexture( nameAsString, image );
//  // stores the texture image and its name into the appropriate arrays.
//
//  makeWall( topleft, topright, bottomright, bottomleft, whichTextureAsString );
//  // The first four arguments are vec3's, representing the (x,y,z) values of the wall's world coordinates.
//  // whichTextureAsString is the name of the texture that we want drawn on this wall
//  // Normals are calculated for you.
//
//  makeObjectType( nameAsString, vertices, texcoords, normals, triangleTexturesAsStrings );
//  // nameAsString assigns an arbitrary name to this object, like "chair", "table", "chandelier", etc...
//  // vertices is an array of vec4's, texcoords is an array of vec2's, and triangleTexturesAsStrings
//  // is an array of strings, one for each triangle in the object: OR triangleTexturesAsString is an array of only 1 string
//  // if you want all triangles to have the same texture.
//
//  makeSpecularObjectType( nameAsString, vertices, texcoords, normals, triangleTexturesAsStrings );
//  // same arguments as the above object, just makes the object type shiny.
//
//  makeObjectInstance( whichTypeAsString, transformation );
//  // whichTypeAsString refers to which ObjectType this instance is, like "chair", "table", "chandelier", etc...
//  // transformation is a mat4 representing a series of rotations, translations, and scales to place this
//  // instance where we want it.
//
//  makeInteractableObjectInstance( whichTypeAsString, transformation, interactWithMe, updateMe, updatableState )
//  // First two arguments are the same as for makeObjectInstance.
//  // interactableWithMe is a boolean: true if the object can be interacted with right now, false otherwise.
//  // updateMe is a boolean: true if the object should update in the render function right now, false otherwise.
//  // updatableState can be anything that helps animate or update the object in the render function.
//
//////////////////////////////////////////////////////////////////////////////

// textureArray stores all the textures for the whole house
var textureArray = [];
// textureStringNameArray stores the name associated with each texture
var textureStringNameArray = [];

// makeTexture stores the texture and the name for it in the appropriate arrays.
// This function must be called for each texture in Main.js
function makeTexture( nameAsString, image )
{
    textureArray.push( gl.createTexture() );
    gl.bindTexture( gl.TEXTURE_2D, textureArray[textureArray.length-1] );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image );
	// nearest neighbor filtering (can change this later)
    //gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    //gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
	// mip-mapping and tri-linear filtering
	gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR_MIPMAP_LINEAR );
	// use repeating texture wrapping
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );	
    
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
	
	
	textureStringNameArray.push( nameAsString );
}


// Walls are any large 4-sided surface in the house.
// Floors, ceilings, and walls will all be implemented as "Wall"s.
function Wall( vertices, texcoords, normals, whichTexture )
{
	this.vertices = vertices; // an array of six vec4's, representing two triangles making the wall.
	this.texcoords = texcoords; // an array of six vec2's.
	this.normals = normals; // an array of six vec4's.
	this.whichTexture = whichTexture; // an integer: the index into the array of textures that this wall will show.
}

var WallArray = [];
var WallOrderOptimizer = []; // stores how many walls there are of each texture type,
							 // so we don't bind the same texture over and over again for each wall.

// Use this function to make a new wall
// The first four arguments are vec3's, and whichTextureAsString is a string
// Normals are calculated for you, pointing straight out from the wall.
function makeWall( topleft, topright, bottomright, bottomleft, whichTextureAsString )
{
	var wpoints = [];
	var wtexcoords = [];
	var wnormals = [];
	
	// make first triangle
	wpoints.push( vec4( topleft[0], topleft[1], topleft[2], 1.0 ) );
	wpoints.push( vec4( topright[0], topright[1], topright[2], 1.0 ) );
	wpoints.push( vec4( bottomleft[0], bottomleft[1], bottomleft[2], 1.0 ) );
	wtexcoords.push( vec2( 0, 0 ) );
	wtexcoords.push( vec2( 1, 0 ) );
	wtexcoords.push( vec2( 0, 1 ) );
	var nrmltemp = normalize( cross( subtract(topleft, topright), subtract(bottomright, topright) ), false );
	var nrml = vec4( nrmltemp[0], nrmltemp[1], nrmltemp[2], 1.0 );
	wnormals.push( nrml );
	wnormals.push( nrml );
	wnormals.push( nrml );
	
	// make second triangle
	wpoints.push( vec4( topright[0], topright[1], topright[2], 1.0 ) );
	wpoints.push( vec4( bottomright[0], bottomright[1], bottomright[2], 1.0 ) );
	wpoints.push( vec4( bottomleft[0], bottomleft[1], bottomleft[2], 1.0 ) );
	wtexcoords.push( vec2( 1, 0 ) );
	wtexcoords.push( vec2( 1, 1 ) );
	wtexcoords.push( vec2( 0, 1 ) );
	wnormals.push( nrml );
	wnormals.push( nrml );
	wnormals.push( nrml );
	
	// find the index of the texture from the string input
	var i;
	for( i = 0; i < textureStringNameArray.length; i++ )
	{
		if ( textureStringNameArray[i] == whichTextureAsString )
			break;
	}
	
	// add this wall to WallArray
	WallArray.push( new Wall( wpoints, wtexcoords, wnormals, i ) );
}




// An ObjectType stores the vertices and texture coordinates for an object like a chair, table, chandelier, etc...
// Each object type (chair,table,...) only has ONE ObjectType associated with it in the ObjectTypeArray below.
// For example, if we have 12 chairs in our house, we would NOT have 12 ObjectTypes, we would only have 1: for 1 chair.
function ObjectType( vertices, texcoords, normals, triangleTextures, vStart, vLength, specularHighlight )
{
	this.vertices = vertices; // array of vec4's (x, y, z, 1.0) representing the triangles of the object.
	this.texcoords = texcoords; // array of vec2's: the texture coordinates corresponding to each vertex.
	this.normals = normals; // array of vec4's, same length as vertices and texcoords
	// the vertices and texcoords arrays must have the same length
	this.triangleTextures = triangleTextures; // array of integers: one integer per triangle, representing the
										// index into textureArray for each triangle.
	// The length of the triangleTextures array must be exactly one-third the length of the vertices array.
	
	this.vStart = vStart; // an integer: the starting index of this ObjectType's vertices in the GPU's vertex buffer
	this.vLength = vLength; // an integer: how many vertices this ObjectType has.
	
	this.specularHighlight = specularHighlight; // boolean: true if the object should shine, false otherwise
}

// These arrays stores all of the possible ObjectTypes in our house.
var ObjectTypeArray = [];
var ObjectTypeStringNameArray = [];
// keeps track of how many vertices we've put into the GPU's vertex buffer.
var globalVertexNumber = 0;

// Use this function to make new ObjectTypes.
// This ensures that the vStart and vLength variables will accurately reflect the GPU's vertex buffer.
// All object types have specularHighlight as false as default
function makeObjectType( nameAsString, vertices, texcoords, normals, triangleTexturesAsStrings )
{
	// convert all texture strings to indexes into the textureArray
	var triangleTextures = [];
	for( var i = 0; i < triangleTexturesAsStrings.length; i++ )
	{
		for ( var k = 0; k < textureStringNameArray.length; k++ )
		{
			if ( textureStringNameArray[k] == triangleTexturesAsStrings[i] )
			{
				triangleTextures.push( k );
				break;
			}
		}
	}
	
	// normalize all normals
	for( var i = 0; i < normals.length; i++ )
		normals[i] = normalize( normals[i], true );

	// adds these vertices, texcoords, and normals to the ObjectTypeArray.
	ObjectTypeArray.push( new ObjectType( vertices, texcoords, normals, triangleTextures, globalVertexNumber,
			vertices.length, false ) );
	globalVertexNumber += vertices.length;
	
	// adds the name to ObjectTypeStringNameArray
	ObjectTypeStringNameArray.push( nameAsString );
}

// Does the same as makeObjectType, except makes the object shiny.
function makeSpecularObjectType( nameAsString, vertices, texcoords, normals, triangleTexturesAsStrings )
{
	makeObjectType( nameAsString, vertices, texcoords, normals, triangleTexturesAsStrings );
	ObjectTypeArray[ ObjectTypeArray.length-1 ].specularHighlight = true;
}



// An ObjectInstance is the particular instance of an object.
// If we have 12 chairs, we would actually have 12 ObjectInstances, all referring to the one ObjectType that describes the chair.
// This allows us to generate vertices for an object once, and instance it however many times we want.
function ObjectInstance( whichType, transformation, boundingVolume, interactWithMe, justActivated, updateMe, updatableState )
{
	this.whichType = whichType; // an integer: the index into the ObjectTypeArray.
							// This might be 0 for chair, 1 for table, 2 for chandelier, etc....
	
	this.transformation = transformation; // a mat4: 4x4 matrix representing the series of rotations, translations, and scales
										  // that place this ObjectInstance exactly where we want it.
	
	this.boundingVolume = boundingVolume; // an array of six floats (i.e. [ -2, 9, -20, 5, 100, 150 ])
						// the first float is the most negative X value the instance occupies.
						// the second is the most positive X value the instance occupies
						// the third: most negative Y value
						// fourth: most positive Y value
						// fifth: most negative Z value
						// sixth: most positive Z value
						// These are used for collision detection, so they represent the ACTUAL world XYZ values,
						// accounting for the translation and rotation of wherever the instance is.
						
	this.interactWithMe = interactWithMe; // boolean: whether the object can be "activated" right now or not.
	this.justActivated = justActivated; // boolean: true if the object has JUST been activated by the player, false otherwise.
	this.updateMe = updateMe; // boolean: whether the object should update right now in the render function in Main.js
	this.updatableState = updatableState; // can be anything to help you animate/update your interactable object.
}

// This array stores every single ObjectInstance in the house.
var ObjectInstanceArray = [];

// multiplies a 4x4 matrix and a 4D vector
function helperMult( matrix44, vector4 )
{
	var toReturn = vec4( 0.0, 0.0, 0.0, 0.0 );
	
	for( var i = 0; i < 4; i++ )
	{
		toReturn[0] += matrix44[0][i] * vector4[i];
		toReturn[1] += matrix44[1][i] * vector4[i];
		toReturn[2] += matrix44[2][i] * vector4[i];
		toReturn[3] += matrix44[3][i] * vector4[i];
	}
	
	return toReturn;
}

// creates the boundingVolume for you
function createBoundingVolume( ObjInstance )
{
	// determine boundingVolume from transformation and ObjectType vertices.
	var opoint = helperMult( ObjInstance.transformation, ObjectTypeArray[ObjInstance.whichType].vertices[0] );
	var boundingVolume = [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];
	boundingVolume[0] = opoint[0];
	boundingVolume[1] = opoint[0];
	boundingVolume[2] = opoint[1];
	boundingVolume[3] = opoint[1];
	boundingVolume[4] = opoint[2];
	boundingVolume[5] = opoint[2];
	for( var i = 1; i < ObjectTypeArray[ObjInstance.whichType].vertices.length; i++ )
	{
		opoint = helperMult( ObjInstance.transformation, ObjectTypeArray[ObjInstance.whichType].vertices[i] );
		if ( opoint[0] < boundingVolume[0] )
			boundingVolume[0] = opoint[0];
		if ( opoint[0] > boundingVolume[1] )
			boundingVolume[1] = opoint[0];
		if ( opoint[1] < boundingVolume[2] )
			boundingVolume[2] = opoint[1];
		if ( opoint[1] > boundingVolume[3] )
			boundingVolume[3] = opoint[1];
		if ( opoint[2] < boundingVolume[4] )
			boundingVolume[4] = opoint[2];
		if ( opoint[2] > boundingVolume[5] )
			boundingVolume[5] = opoint[2];
	}

	ObjInstance.boundingVolume = boundingVolume;
}

// The makeObjectInstance function calculates boundingVolume and adds the instance to the ObjectInstanceArray for you.
function makeObjectInstance( whichTypeAsString, transformation )
{
	// determine the index in the ObjectTypeArray from the string input
	var i;
	for( i = 0; i < ObjectTypeStringNameArray.length; i++ )
	{
		if ( ObjectTypeStringNameArray[i] == whichTypeAsString )
			break;
	}
	var whichType = i;
	
	var boundingVolume = [ 0, 0, 0, 0, 0, 0 ];
	
	// add this instance to the ObjectInstanceArray.
	ObjectInstanceArray.push( new ObjectInstance( whichType, transformation, boundingVolume, false, false, false, 0 ) );
	
	createBoundingVolume( ObjectInstanceArray[ ObjectInstanceArray.length - 1 ] );
}

function makeInteractableObjectInstance( whichTypeAsString, transformation, interactWithMe, updateMe, updatableState )
{
	makeObjectInstance( whichTypeAsString, transformation );
	var zz = ObjectInstanceArray.length-1;
	ObjectInstanceArray[zz].interactWithMe = interactWithMe;
	ObjectInstanceArray[zz].justActivated = false;
	ObjectInstanceArray[zz].updateMe = updateMe;
	ObjectInstanceArray[zz].updatableState = updatableState;
}



// This function gets called once in Main.js.
// It sorts all walls by texture, and counts how many walls there are of each texture,
// so we don't bind the same texture over and over again.
function OptimizeWallOrdering()
{
	// Order all walls by texture:
	wallTexture = WallArray[0].whichTexture;

	for( i = 1; i < WallArray.length; i++ )
	{
		if ( WallArray[i].whichTexture == wallTexture )
			continue;
	
		// find the next wall that has this texture and swap it with current wall.
		j = i+1;
		for( ; j < WallArray.length; j++ )
		{
			if ( WallArray[j].whichTexture == wallTexture )
			{
				// swap walls
				temp = WallArray[j];
				WallArray[j] = WallArray[i];
				WallArray[i] = temp;
				break;
			}
		}
		if ( j == WallArray.length )
			wallTexture = WallArray[i].whichTexture;
	}

	// count how many walls there are of each texture.
	WallOrderOptimizer = []; // array of arrays of 3 ints: [ whichTexture, startingIndex, howManyWalls ]
	counting = 1;
	wallTexture = WallArray[0].whichTexture;
	startingIndex = 0;
	
	for( i = 1; i < WallArray.length; i++ )
	{
		if ( WallArray[i].whichTexture == wallTexture )
		{
			counting++;
			continue;
		}
		
		WallOrderOptimizer.push( [ wallTexture, startingIndex, counting ] );
		
		wallTexture = WallArray[i].whichTexture;
		counting = 1;
		startingIndex = i;
	}
	WallOrderOptimizer.push( [ wallTexture, startingIndex, counting ] );
	
	// the walls are now ready to be drawn continuously.
}
