var chairPointsArray = [];
var chairTexCoordsArray = [];
var chairNormalsArray = [];
var chairTexStringsArray = [];
var chairTransform;
var chairTransform2;
var chairVertices;

function quadChair(a, b, c, d) 
{
	
     chairPointsArray.push(chairVertices[a]);
     chairTexCoordsArray.push(texCoord[0]);

     chairPointsArray.push(chairVertices[b]); 
     chairTexCoordsArray.push(texCoord[1]); 

     chairPointsArray.push(chairVertices[c]); 
     chairTexCoordsArray.push(texCoord[2]); 
   
     chairPointsArray.push(chairVertices[a]); 
     chairTexCoordsArray.push(texCoord[0]); 

     chairPointsArray.push(chairVertices[c]); 
     chairTexCoordsArray.push(texCoord[2]); 

     chairPointsArray.push(chairVertices[d]); 
     chairTexCoordsArray.push(texCoord[3]);   
     
     for (var i=0; i<6; i++)
     {
     	normal = cross(subtract(chairVertices[d],chairVertices[c]),subtract(chairVertices[b],chairVertices[c]));
		normal4 = vec4( normal[0], normal[1], normal[2], 1.0 );
     	chairNormalsArray.push( normal4 );
     }
}

function makeRectPrismChair(clear_arrays)
{
	if (clear_arrays==true)
	{
		chairTexCoordsArray = [];
		chairPointsArray = [];
		chairNormalsArray = [];
		chairTexStringsArray = [];
	}
    quadChair( 1, 0, 3, 2 );
    quadChair( 2, 3, 7, 6 );
    quadChair( 3, 0, 4, 7 );
    quadChair( 6, 5, 1, 2 );
    quadChair( 6, 7, 4, 5 );
    quadChair( 5, 4, 0, 1 );

}

function makeChair()
{
	var chair_thickness = 0.5; var chair_width = 1.5; var chair_height = 3; var back_thickness = chair_thickness;
	var seat = [

		vec4( -chair_width, 0,  chair_width, 1.0 ),
		vec4( -chair_width,  chair_height,  chair_width, 1.0 ),
		vec4(  chair_width,  chair_height,  chair_width, 1.0 ),
		vec4(  chair_width, 0,  chair_width, 1.0 ),
		vec4( -chair_width, 0, -chair_width, 1.0 ),
		vec4( -chair_width,  chair_height, -chair_width, 1.0 ),
		vec4(  chair_width,  chair_height, -chair_width, 1.0 ),
		vec4(  chair_width, 0, -chair_width, 1.0 )
	
	];

	var chair_back = 
	[
		vec4( chair_width, 0,  chair_width, 1.0 ),
		vec4( chair_width,  2*chair_height,  chair_width, 1.0 ),
		vec4( chair_width+back_thickness,  2*chair_height,  chair_width, 1.0 ),
		vec4( chair_width+back_thickness, 0,  chair_width, 1.0 ),
		vec4( chair_width, 0, -chair_width, 1.0 ),
		vec4( chair_width,  2*chair_height, -chair_width, 1.0 ),
		vec4( chair_width+back_thickness,  2*chair_height, -chair_width, 1.0 ),
		vec4( chair_width+back_thickness, 0, -chair_width, 1.0 )
	];


	chairVertices = seat;		//choose which chairVertices to use to draw the seat
	makeRectPrismChair(true);
	chairVertices = chair_back;	//choose which chairVertices to use to draw the chair back
	makeRectPrismChair(false);
}


function getChairVertices()
{
	return chairPointsArray;
}

function getChairTexCoords()
{
	return chairTexCoordsArray;
}

function getChairNormals()
{
	return chairNormalsArray;
}

function getChairTexStrings(imageID)
{
	//for (var i=0; i<(chairPointsArray.length)/3; i++)
	//{
	//	chairTexStringsArray[i] = imageID;
	//}
	chairTexStringsArray = [ imageID ];
	return chairTexStringsArray;
}

function getChairTransformation()
{
	chairTransform = mat4();
	chairTransform = mult(rotate(90, [0,1,0]), chairTransform);
	chairTransform = mult(translate(-70,0,-7), chairTransform);
	return chairTransform;
}

function getChair2Transformation()
{
	chairTransform2 = mat4();
	chairTransform2 = mult(rotate(-90, [0,1,0]), chairTransform2);
	chairTransform2 = mult(translate(-70,0,7), chairTransform2);
	return chairTransform2;
}


