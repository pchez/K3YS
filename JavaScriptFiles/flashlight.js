var flashlightPointsArray = [];
var flashlightTexCoordsArray = [];
var flashlightNormalsArray = [];
var flashlightTexStringsArray = [];

var circleArray = [];


function makeFlashlightHead()
{
	
	//draw head of flashlight
	circle1 = drawCircle(1.0, 12, 0.0, true);
	//console.log( flashlightPointsArray.length );
	circle2 = drawCircle(1.0, 12, 1.0, false);
	//console.log( flashlightPointsArray.length );
	drawCylinder(circle1, circle2, false);
	
	return flashlightPointsArray;
}

function makeFlashlightBody()
{
	//draw handle of flashlight
	circle3 = drawCircle(0.5, 12, 1.0, true);
	//console.log( flashlightPointsArray.length );
	circle4 = drawCircle(0.5, 12, 7.0, false);
	drawCylinder(circle3, circle4, false);
	
	return flashlightPointsArray;
}


function drawCircle(scale, subdivisions, zmov, clearArrays)
{
	if (clearArrays==true)
	{
		flashlightPointsArray = [];	
	}
	
	circleArray = [];
	
	var tempArray = [];
	var point;
	var theta_rad;
	
	for (var i=0; i<subdivisions; i++)
	{
		theta_rad = deg2rad(360*i/subdivisions);
		point = vec4(scale*Math.cos(theta_rad), scale*Math.sin(theta_rad), 0, 1.0);
		tempArray.push(point);
	}
	for (var i=0; i<tempArray.length; i++)
	{
		flashlightPointsArray.push(tempArray[i]);
		if (i==tempArray.length-1)
			flashlightPointsArray.push(tempArray[0]);
		else
			flashlightPointsArray.push(tempArray[i+1]);
		flashlightPointsArray.push(vec4(0.0,0.0,0.0,1.0));
	}
	for (var i=0; i < flashlightPointsArray.length; i++)
	{
		flashlightPointsArray[i] = add(flashlightPointsArray[i], vec4(0.0,0.0,zmov,0.0));
		circleArray.push( flashlightPointsArray[i] );
	}

	return circleArray;
}

function drawCylinder(c1, c2, clearArrays)
{
	if (clearArrays==true)
	{
		flashlightPointsArray = [];
	}
	for (var i=0; i < c1.length; i++)
	{
		if (i==c1.length-1)
		{
			flashlightPointsArray.push(c1[i]);
			flashlightPointsArray.push(c2[i]);
			flashlightPointsArray.push(c2[0]);
			flashlightPointsArray.push(c2[0]);
			flashlightPointsArray.push(c1[i]);
			flashlightPointsArray.push(c1[0]);
			break;
		}
		flashlightPointsArray.push(c1[i]);
		flashlightPointsArray.push(c2[i]);
		flashlightPointsArray.push(c2[i+1]);
		flashlightPointsArray.push(c2[i+1]);
		flashlightPointsArray.push(c1[i]);
		flashlightPointsArray.push(c1[i+1]);
		
		
	}

}

function deg2rad(theta)
{
	return theta*Math.PI/180;
}

function getFlashlightTransformation() //flashlight head
{
	return mat4();
}

function getBodyTransformation() //flashlight body
{
	var scale_ratio = 0.3;
	var scMatrix = mat4(scale_ratio,0,0,0,0,scale_ratio,0,0,0,0,scale_ratio,0,0,0,0,1);
	var flashlightTransform = mult(scMatrix, mat4());
	flashlightTransform = mult(translate(0,0,0), flashlightTransform);
	
	return flashlightBodyTransform;
}
