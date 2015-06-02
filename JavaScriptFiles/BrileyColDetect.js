// BrileyColDetect.js

//////////////////////////////////////////////////////////////////////////////
//
//  COLLISION DETECTION
//
//////////////////////////////////////////////////////////////////////////////

// The body size of the player:
// [ -x, +x, -y, +y, -z, +z ]
var playerBoundingVolume = [ -2.0, 2.0, -5.0, 1.0, -2.0, 2.0 ];

// Stores the actual world coordinates that the player's volume occupies.
var newPlayerVolume = [0, 0, 0, 0, 0, 0];

// Stores whether the player is able to jump right now.
// This prevents the player from continually jumping mid-air to infinite heights
var playerJumpable = false;

// Stores the Y velocity of the player: used in gravity evaluation
var playerYVel = 0.0;

// Stores the index of an object that we can interact with right now, -1 if no object.
var objectInRange = -1;
var objectTypeInRange = -1; // the type of the object that's in range of interaction.


// returns true if volume1 and volume2 collide, false otherwise.
// volume1 and volume2 are both arrays of six floats.
function collisionVV( volume1, volume2 )
{
	// if v1's most negative X point is greater than v2's most positive X, then no collision.
	if ( volume1[0] > volume2[1] )
		return false;
	// if v1's most positive X point is less than v2's most negative X, then no collision.
	if ( volume1[1] < volume2[0] )
		return false;
	// repeat for the Y and Z axes
	if ( volume1[2] > volume2[3] )
		return false;
	if ( volume1[3] < volume2[2] )
		return false;
	if ( volume1[4] > volume2[5] )
		return false;
	if ( volume1[5] < volume2[4] )
		return false;

	// if all of the above tests fail, then there is a collision.
	return true;
}

// returns true if volume and surface collide, false otherwise.
// volume is an array of six floats.
// surface is an array of six vec3's or vec4's.
function collisionVS( volume, surface )
{
	var allxless = true;
	var allxmore = true;
	var allyless = true;
	var allymore = true;
	var allzless = true;
	var allzmore = true;
	
	for( var i = 0; i < 5; i++ )
	{
		if ( i == 3 ) // position 3 is a repeat vertex
			continue;
		if ( surface[i][0] > volume[0] )
			allxless = false;
		if ( surface[i][0] < volume[1] )
			allxmore = false;
		if ( surface[i][1] > volume[2] )
			allyless = false;
		if ( surface[i][1] < volume[3] )
			allymore = false;
		if ( surface[i][2] > volume[4] )
			allzless = false;
		if ( surface[i][2] < volume[5] )
			allzmore = false;
	}
	
	//allxless = false;
	//allyless = false;
	//allzless = false;
	//allxmore = false;
	//allymore = false;
	//allzmore = false;
	
	if ( allxless || allxmore || allyless || allymore || allzless || allzmore )
		return false;
	
	return true;
}

// Returns true if the player collides with any wall or any object,
// given the player's position (camera values), bounding volume, and deltas
function collisionWithWallOrObject( deltaX, deltaY, deltaZ )
{
	newPlayerVolume[0] += deltaX;
	newPlayerVolume[1] += deltaX;
	newPlayerVolume[2] += deltaY;
	newPlayerVolume[3] += deltaY;
	newPlayerVolume[4] += deltaZ;
	newPlayerVolume[5] += deltaZ;
	var returnTrue = false;
	
	//if ( WallArray.length != 15 )
	//	gsdjklgdfkla;
	//if ( WallArray[0].vertices.length != 6 )
	//	gdfgsd;
	
	for( var i = 0; i < WallArray.length; i++ )
	{
		if ( collisionVS( newPlayerVolume, WallArray[i].vertices ) )
		{
			returnTrue = true;
			break;
		}
	}
	if ( !returnTrue )
	{
		for( var i = 0; i < ObjectInstanceArray.length; i++ )
		{
			if ( collisionVV( newPlayerVolume, ObjectInstanceArray[i].boundingVolume ) )
			{
				returnTrue = true;
				break;
			}
		}
	}
	
	newPlayerVolume[0] -= deltaX;
	newPlayerVolume[1] -= deltaX;
	newPlayerVolume[2] -= deltaY;
	newPlayerVolume[3] -= deltaY;
	newPlayerVolume[4] -= deltaZ;
	newPlayerVolume[5] -= deltaZ;
	
	return returnTrue;
}

// This function checks for collisions and, if none, moves the player.
function tryToMovePlayer( playerMoving, moveAngleRadians )
{
	var speed = 0.5;
	
	if ( playerMoving )
	{
		var dx = speed * Math.sin( moveAngleRadians );
		var dy = 0.0;
		var dz = -speed * Math.cos( moveAngleRadians );
		
		var moveSuccess = !( collisionWithWallOrObject( dx, dy, dz ) );
		if ( moveSuccess )
		{
			// no collision, move freely
			cameraX += dx;
			cameraZ += dz;
			newPlayerVolume[0] += dx;
			newPlayerVolume[1] += dx;
			newPlayerVolume[4] += dz;
			newPlayerVolume[5] += dz;
		}
		else if ( !collisionWithWallOrObject( dx, 2.0, dz ) )
		{
			// stepping up a step or slope
			cameraX += dx;
			cameraY += 2.0;
			cameraZ += dz;
			newPlayerVolume[0] += dx;
			newPlayerVolume[1] += dx;
			newPlayerVolume[2] += 2.0;
			newPlayerVolume[3] += 2.0;
			newPlayerVolume[4] += dz;
			newPlayerVolume[5] += dz;
			// in case we overshot the step:
			while( !collisionWithWallOrObject( 0, -0.1, 0 ) )
			{
				cameraY -= 0.1;
				newPlayerVolume[2] -= 0.1;
				newPlayerVolume[3] -= 0.1;
			}
		}
		else
		{
			// try to hug the side of a wall
			var moved = false;
			for( var i = 0.209; i < 1.274; i += 0.209 )
			{
				dx = speed * Math.sin( moveAngleRadians + i );
				dy = 0.0;
				dz = -speed * Math.cos( moveAngleRadians + i );
				if ( !collisionWithWallOrObject( dx, 0, dz ) )
				{
					cameraX += dx;
					cameraZ += dz;
					newPlayerVolume[0] += dx;
					newPlayerVolume[1] += dx;
					newPlayerVolume[4] += dz;
					newPlayerVolume[5] += dz;
					moved = true;
					break;
				}
			}
			if ( !moved )
			{
				for( var i = -0.209; i > -1.274; i -= 0.209 )
				{
					dx = speed * Math.sin( moveAngleRadians + i );
					dy = 0.0;
					dz = -speed * Math.cos( moveAngleRadians + i );
					if ( !collisionWithWallOrObject( dx, 0, dz ) )
					{
						cameraX += dx;
						cameraZ += dz;
						newPlayerVolume[0] += dx;
						newPlayerVolume[1] += dx;
						newPlayerVolume[4] += dz;
						newPlayerVolume[5] += dz;
						moved = true;
						break;
					}
				}
			}
		
		}
	
	}
	
	
	
	// evaluate gravity:
	if ( collisionWithWallOrObject( 0.0, playerYVel, 0.0 ) )
	{
		if ( playerYVel < 0.0 )
		{
			// move to contact
			while( !collisionWithWallOrObject( 0.0, -0.1, 0.0 ) )
			{
				cameraY -= 0.1;
				newPlayerVolume[2] -= 0.1;
				newPlayerVolume[3] -= 0.1;
			}
		}
		else if ( playerYVel > 0.0 )
		{
			// move to contact
			while( !collisionWithWallOrObject( 0.0, 0.1, 0.0 ) )
			{
				cameraY += 0.1;
				newPlayerVolume[2] += 0.1;
				newPlayerVolume[3] += 0.1;
			}
		}
		// We've already collided on the Y axis, so no more Y velocity
		playerYVel = 0.0;
	}
	else
	{
		cameraY += playerYVel;
		newPlayerVolume[2] += playerYVel;
		newPlayerVolume[3] += playerYVel;
	}
	
	if ( !collisionWithWallOrObject( 0, -0.1, 0 ) )
		playerYVel -= 0.05;
	else
		playerJumpable = true;

}

function unstickPlayerFromDoor()
{
	i = 1;
	while( collisionWithWallOrObject( i, 0, i ) )
		i++;
	
	newPlayerVolume[0] += i;
	newPlayerVolume[1] += i;
	newPlayerVolume[4] += i;
	newPlayerVolume[5] += i;
	cameraX += i;
	cameraZ += i;
}

function tryToInteractWithAnObject()
{
	//var distance = 3;
	//var dx = distance * Math.sin( cameraHorzAngle );
	//var dy = 0.0;
	//var dz = -distance * Math.cos( cameraHorzAngle );
	var searchThickness = 2.5;
	
	newPlayerVolume[0] -= searchThickness;
	newPlayerVolume[1] += searchThickness;
	newPlayerVolume[2] -= searchThickness;
	newPlayerVolume[3] += searchThickness;
	newPlayerVolume[4] -= searchThickness;
	newPlayerVolume[5] += searchThickness;
	
	objectInRange = -1;
	for( var i = 0; i < ObjectInstanceArray.length; i++ )
	{
		if ( ObjectInstanceArray[i].interactWithMe
			&& collisionVV( newPlayerVolume, ObjectInstanceArray[i].boundingVolume ) )
		{
			p = [ (ObjectInstanceArray[i].boundingVolume[0]+ObjectInstanceArray[i].boundingVolume[1])/2.0,
					(ObjectInstanceArray[i].boundingVolume[4]+ObjectInstanceArray[i].boundingVolume[5])/2.0	];
			p[0] -= cameraX;
			p[1] -= cameraZ;
			v = [ Math.sin( radians( cameraHorzAngle) ), -Math.cos( radians( cameraHorzAngle) ) ];
			dotprod = p[0]*v[0] + p[1]*v[1];
			if ( dotprod < 0.0 )
				continue;
			
			objectInRange = i;
			objectTypeInRange = ObjectInstanceArray[i].whichType;
			break;
		}
	}
	
	
	newPlayerVolume[0] += searchThickness;
	newPlayerVolume[1] -= searchThickness;
	newPlayerVolume[2] += searchThickness;
	newPlayerVolume[3] -= searchThickness;
	newPlayerVolume[4] += searchThickness;
	newPlayerVolume[5] -= searchThickness;
}

// handlePlayerActions() looks at the keystates and keypresses and moves the player/camera accordingly
function handlePlayerActions()
{
	newPlayerVolume[0] = playerBoundingVolume[0] + cameraX;
	newPlayerVolume[1] = playerBoundingVolume[1] + cameraX;
	newPlayerVolume[2] = playerBoundingVolume[2] + cameraY;
	newPlayerVolume[3] = playerBoundingVolume[3] + cameraY;
	newPlayerVolume[4] = playerBoundingVolume[4] + cameraZ;
	newPlayerVolume[5] = playerBoundingVolume[5] + cameraZ;

	if ( doorJustRotated != -1 ) // a door has just been swung: make sure the player is not stuck inside the door.
	{
		if ( collisionVV( newPlayerVolume, ObjectInstanceArray[doorJustRotated].boundingVolume ) )
			unstickPlayerFromDoor();
		doorJustRotated = -1;
	}
	
	
	var playerMoving = false;
	var moveAngleRadians;
	
	if ( keystates[1] ) // a - move left
	{
		moveAngleRadians = radians(cameraHorzAngle) - 1.571;
		if ( keystates[0] ) // w - move forward-left diagonally
			moveAngleRadians = radians(cameraHorzAngle) - 0.7854;
		else if ( keystates[2] ) // s - move backwards-left diagonally
			moveAngleRadians = radians(cameraHorzAngle) - 2.356;
		
		playerMoving = true;
	}
	else if ( keystates[3] ) // d - move right
	{
		moveAngleRadians = radians(cameraHorzAngle) + 1.571;
		if ( keystates[0] ) // w - move forward-right diagonally
			moveAngleRadians = radians(cameraHorzAngle) + 0.7854;
		else if ( keystates[2] ) // s - move backwards-right diagonally
			moveAngleRadians = radians(cameraHorzAngle) + 2.356;
			
		playerMoving = true;
	}
	else if ( keystates[0] ) // w - move forward
	{
		moveAngleRadians = radians(cameraHorzAngle);
		playerMoving = true;
	}
	else if ( keystates[2] ) // s - move backward
	{
		moveAngleRadians = radians(cameraHorzAngle)-3.1416;
		playerMoving = true;
	}
	
	// handle jumping:
	if ( keypresses[8] && playerJumpable ) // space - jump
	{
		playerYVel = 0.8;
		playerJumpable = false;
	}

	if ( keystates[4] ) // left arrow - look left
	{
		cameraHorzAngle -= 2.5;
		if ( cameraHorzAngle > 360.0 )
			cameraHorzAngle -= 360.0;
		else if ( cameraHorzAngle < 0.0 )
			cameraHorzAngle += 360.0;
	}
	else if ( keystates[5] ) // right arrow - look right
	{
		cameraHorzAngle += 2.5;
		if ( cameraHorzAngle > 360.0 )
			cameraHorzAngle -= 360.0;
		else if ( cameraHorzAngle < 0.0 )
			cameraHorzAngle += 360.0;
	}
	if ( keystates[6] ) // up arrow - look up
	{
		if ( cameraVertAngle > -90 )
			cameraVertAngle -= 2.0;
	}
	else if ( keystates[7] ) // down arrow - look down
	{
		if ( cameraVertAngle < 90 )
			cameraVertAngle += 2.0;
	}
	
	tryToInteractWithAnObject();
	if ( objectInRange != -1 )
	{
		// assign which text we want to display:
		if ( objectTypeInRange == 0 ) // door
		{
			if ( ObjectInstanceArray[ objectInRange ].updatableState[2] )
				whichText = 1; // (E) Close Door
			else
				whichText = 0; // (E) Open Door
		}
		else if ( objectTypeInRange == 10 )
			whichText = 2; // (E) Take Battery
		else if ( objectTypeInRange == 11 )
			whichText = 3; // (E) Take Key
		
		if ( keypresses[9] ) // e - interact with the object
		{
			ObjectInstanceArray[ objectInRange ].justActivated = true;
		}
	}
	else
		whichText = -1;
		
	if ( keysCollected == 3 && cameraX > 24 && cameraZ < -17 && keypresses[9] )
	{
		youWin = 1;
		JumpTimer = 0;
	}
		
	if ( keypresses[10] ) // f - toggle flashlight on/off
	{
		if ( flashlightbattery > 0.001 )
		{
			FlashlightActuallyOn = 1.0 - FlashlightActuallyOn;
			gl.uniform1f(FlashlightOnLoc, FlashlightActuallyOn );
		}
	}
	
	if ( FlashlightActuallyOn > 0.03 )
	{
		flashlightbattery -= 0.03;
		if ( flashlightbattery <= 0.0 )
		{
			flashlightbattery = 0.0;
			FlashlightActuallyOn = 0.0;
			gl.uniform1f(FlashlightOnLoc, FlashlightActuallyOn );
		}
	}
	
	tryToMovePlayer( playerMoving, moveAngleRadians );

}


