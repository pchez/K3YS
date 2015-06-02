var tablePointsArray = [];
var tableTexCoordsArray = [];
var tableNormalsArray = [];
var tableTexStringsArray = [];
var tableTransform;
var tableVertices;


var texCoord = [
		vec2(0, 0),
    	vec2(0, 1),
    	vec2(1, 1),
    	vec2(1, 0)
];

function quadTable(a, b, c, d) 
{
	
     tablePointsArray.push(tableVertices[a]);
     tableTexCoordsArray.push(texCoord[0]);

     tablePointsArray.push(tableVertices[b]); 
     tableTexCoordsArray.push(texCoord[1]); 

     tablePointsArray.push(tableVertices[c]); 
     tableTexCoordsArray.push(texCoord[2]); 
   
     tablePointsArray.push(tableVertices[a]); 
     tableTexCoordsArray.push(texCoord[0]); 

     tablePointsArray.push(tableVertices[c]); 
     tableTexCoordsArray.push(texCoord[2]); 

     tablePointsArray.push(tableVertices[d]); 
     tableTexCoordsArray.push(texCoord[3]);   
     
     for (var i=0; i<6; i++)
     {
     	normal = cross(subtract(tableVertices[d],tableVertices[c]),subtract(tableVertices[b],tableVertices[c]));
		normal4 = vec4( normal[0], normal[1], normal[2], 1.0 );
     	tableNormalsArray.push(normal4);
     }
}


function makeRectPrismTable(clear_arrays)
{
	if (clear_arrays==true)
	{
		tableTexCoordsArray = [];
		tablePointsArray = [];
		tableNormalsArray = [];
		tableTexStringsArray = [];
	}
    quadTable( 1, 0, 3, 2 );
    quadTable( 2, 3, 7, 6 );
    quadTable( 3, 0, 4, 7 );
    quadTable( 6, 5, 1, 2 );
    quadTable( 6, 7, 4, 5 );
    quadTable( 5, 4, 0, 1 );
    
}


function makeTable()
{
	var table_width = 6; var table_thickness = 0.5; var table_height = 4; var base_width = 3;
	var base = [

	  vec4( -base_width, 0,  base_width, 1.0 ),
	  vec4( -base_width,  table_height-table_thickness,  base_width, 1.0 ),
	  vec4(  base_width,  table_height-table_thickness,  base_width, 1.0 ),
	  vec4(  base_width, 0,  base_width, 1.0 ),
	  vec4( -base_width, 0, -base_width, 1.0 ),
	  vec4( -base_width,  table_height-table_thickness, -base_width, 1.0 ),
	  vec4(  base_width,  table_height-table_thickness, -base_width, 1.0 ),
	  vec4(  base_width, 0, -base_width, 1.0 )


	];
	var tabletop = [

	  vec4( -table_width, -table_thickness+table_height,  table_width, 1.0 ),
	  vec4( -table_width,  table_height,  table_width, 1.0 ),
	  vec4(  table_width,  table_height,  table_width, 1.0 ),
	  vec4(  table_width, -table_thickness+table_height,  table_width, 1.0 ),
	  vec4( -table_width, -table_thickness+table_height, -table_width, 1.0 ),
	  vec4( -table_width,  table_height, -table_width, 1.0 ),
	  vec4(  table_width,  table_height, -table_width, 1.0 ),
	  vec4(  table_width, -table_thickness+table_height, -table_width, 1.0 )

	];

  	tableVertices = tabletop;	//choose which tableVertices to use to draw the tabletop
  	makeRectPrismTable(true);	//make tableVertices for the tabletop
  	tableVertices = base;		//choose which tableVertices to use to draw the base
 	makeRectPrismTable(false);	//make tableVertices for the base
  
  
}


function getTableVertices()
{
	return tablePointsArray;
}

function getTableTexCoords()
{
	return tableTexCoordsArray;
}

function getTableNormals()
{
	return tableNormalsArray;
}

function getTableTexStrings(imageID)
{
	//for (var i=0; i<(tablePointsArray.length)/3; i++)
	//{
	//	tableTexStringsArray[i] = imageID;
	//}
	tableTexStringsArray = [ imageID ];
	return tableTexStringsArray;
}

function getTableTransformation()
{
	tableTransform = mat4();
	tableTransform = mult(translate(-70,0,0), tableTransform);
	return tableTransform;
}

