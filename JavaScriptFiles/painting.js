var frameTransform;
var framePointsArray = [];
var frameTexCoordsArray = [];
var frameTexStringsArray = [];
var frameNormalsArray = [];
var frame_vertices = [];


function makeFrame(frame_height, frame_thickness, frame_width)
{	
	var painting =
	[
		vec4( -frame_width, 0, 0.1, 1.0),
		vec4( -frame_width, frame_height, 0.1, 1.0),
		vec4(  frame_width, frame_height,  0.1, 1.0 ),
		vec4(  frame_width, 0, 0.1, 1.0 )
	];

	var painting_frame =
	[
		vec4( -frame_width, 0,  0, 1.0 ),
		vec4( -frame_width, frame_height,  0, 1.0 ),
		vec4(  frame_width, frame_height,  0, 1.0 ),
		vec4(  frame_width, 0, 0, 1.0 ),
		vec4( -frame_width, 0, -frame_thickness, 1.0 ),
		vec4( -frame_width, frame_height, -frame_thickness, 1.0 ),
		vec4(  frame_width, frame_height, -frame_thickness, 1.0 ),
		vec4(  frame_width, 0, -frame_thickness, 1.0 )

	];
	
	frame_vertices = painting;
	makeRectangle(true);

	frame_vertices = painting_frame;
	makeRectPrismFrame(false);
}

function quadFrame(a, b, c, d) 
{
	
     framePointsArray.push(frame_vertices[a]);
     frameTexCoordsArray.push(texCoord[0]);

     framePointsArray.push(frame_vertices[b]); 
     frameTexCoordsArray.push(texCoord[1]); 

     framePointsArray.push(frame_vertices[c]); 
     frameTexCoordsArray.push(texCoord[2]); 
   
     framePointsArray.push(frame_vertices[a]); 
     frameTexCoordsArray.push(texCoord[0]); 

     framePointsArray.push(frame_vertices[c]); 
     frameTexCoordsArray.push(texCoord[2]); 

     framePointsArray.push(frame_vertices[d]); 
     frameTexCoordsArray.push(texCoord[3]);   
     
     for (var i=0; i<6; i++)
     {
     	normal = cross(subtract(frame_vertices[d],frame_vertices[c]),subtract(frame_vertices[b],frame_vertices[c]));
     	frameNormalsArray.push( vec4(normal[0], normal[1], normal[2], 1.0) );
     }
}


function makeRectangle(clear_arrays)
{
	if (clear_arrays==true)
	{
		frameTexCoordsArray = [];
		framePointsArray = [];
		frameTexCoordsArray = [];
		frameNormalsArray = [];
	}
	
	quadFrame(1,0,3,2);
	
}



function makeRectPrismFrame(clear_arrays)
{
	if (clear_arrays==true)
	{
		frameTexCoordsArray = [];
		framePointsArray = [];
		frameNormalsArray = [];
		frameTexStringsArray = [];
	}
    quadFrame( 1, 0, 3, 2 );
    quadFrame( 2, 3, 7, 6 );
    quadFrame( 3, 0, 4, 7 );
    quadFrame( 6, 5, 1, 2 );
    quadFrame( 6, 7, 4, 5 );
    quadFrame( 5, 4, 0, 1 );
    
}

function getFrameVertices()
{
	return framePointsArray;
}

function getFrameTexCoords()
{
	return frameTexCoordsArray;
}

function getFrameNormals()
{
	return frameNormalsArray;
}

function getFrameTexStrings(frameID, imageID)
{
	frameTexStringsArray = [];
	for (var i=0; i<2; i++)
	{
		frameTexStringsArray.push(imageID);
	}
	for (var i=0; i<12; i++)
	{
		frameTexStringsArray.push(frameID);
	}
	return frameTexStringsArray;
}

function getFrameTransformation(paintingID)
{
	if (paintingID=="clown_painting")
	{
		frameTransform = mat4();
		frameTransform = mult(rotate(90, [0,1,0]), frameTransform);
		frameTransform = mult(translate(-168,-12,36), frameTransform);
	}
	if (paintingID=="skull_painting")
	{
		frameTransform = mat4();
		frameTransform = mult(rotate(-90, [0,1,0]), frameTransform);
		frameTransform = mult(translate(10,5,20), frameTransform);
	}
	if (paintingID=="zombie_painting")
	{
		frameTransform = mat4();
		frameTransform = mult(rotate(180, [0,1,0]), frameTransform);
		frameTransform = mult(translate(-25,5,10), frameTransform);
	}
	if (paintingID=="fireplace")
	{
		frameTransform = mat4();
		frameTransform = mult(rotate(-90, [0,1,0]), frameTransform);
		frameTransform = mult(translate(36,0,0), frameTransform);
	}
	if (paintingID=="scary_face")
	{
		frameTransform = mat4();
		frameTransform = mult(rotate(-90, [0,1,0]), frameTransform);
		frameTransform = mult(translate(36,11,0), frameTransform);
	}
	if (paintingID=="rug")
	{
		frameTransform = mat4();
		frameTransform = mult(rotate(-90, [1,0,0]), frameTransform);
		frameTransform = mult(translate(0,0,20), frameTransform);
	}
	if (paintingID=="nightstand")
	{
		frameTransform = mat4();
		//frameTransform = mult(rotate(90, [0,1,0]), frameTransform);
		frameTransform = mult(translate(-10,0,-57), frameTransform);
	}
	if (paintingID=="bedframe")
	{
		frameTransform = mat4();
		frameTransform = mult(rotate(90, [1,0,0]), frameTransform);
		//frameTransform = mult(rotate(180, [0,1,0]), frameTransform);
		frameTransform = mult(translate(-3,0,-60), frameTransform);
	}
	if (paintingID=="mattress")
	{
		frameTransform = mat4();
		frameTransform = mult(rotate(-90, [1,0,0]), frameTransform);
		frameTransform = mult(rotate(180, [0,1,0]), frameTransform);
		//frameTransform = mult(rotate(-90, [0,0,1]), frameTransform);
		frameTransform = mult(translate(-3,2.5,-60), frameTransform);
	}

	return frameTransform;
}