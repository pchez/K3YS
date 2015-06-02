var LightSources=[];




function LightSource(transformation,intensity, position, degreeLook)
{
	this.transformation=mult(rotate(degreeLook,1,0,0),mult(rotate(-90,0,1,0),mult(transformation,translate(0,0,0))));
	this.intensity=intensity;
	this.position=position;
}
function MakeLightSource(transformation, intensity,position, degreeLook)
{
	LightSources.push(new LightSource(transformation,intensity,position,degreeLook));
}

function initShadowMap()
{


var size = 1024;

// Create a color texture
colorTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, colorTexture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

// Create the depth texture
depthTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, depthTexture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, size, size, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

ShadowFrameBuffer = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, ShadowFrameBuffer);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTexture, 0);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);

//second frame buffer

var size = 1024;

// Create a color texture
colorTexture2 = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, colorTexture2);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

// Create the depth texture
depthTexture2 = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, depthTexture2);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, size, size, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

ShadowFrameBuffer2 = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, ShadowFrameBuffer2);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTexture2, 0);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture2, 0);
}

function ShadowRender( run )
{
	if(run==0.0)
		gl.bindFramebuffer(gl.FRAMEBUFFER, ShadowFrameBuffer);
	else
		gl.bindFramebuffer(gl.FRAMEBUFFER, ShadowFrameBuffer2);
		
	gl.viewport(0, 0, 1024, 1024);
	gl.colorMask(false, false, false, false);
	 gl.clear( gl.DEPTH_BUFFER_BIT);
	
		

	// apply the camera's translation and rotation
	var cameraMvMatrix = rotate(cameraVertAngle, 1, 0, 0);
	cameraMvMatrix = mult( cameraMvMatrix, rotate(cameraHorzAngle, 0, 1, 0) );
	cameraMvMatrix = mult( cameraMvMatrix, translate(-cameraX, -cameraY, -cameraZ) );
	gl.uniformMatrix4fv( cameraMvMatrixLocation, false, flatten(cameraMvMatrix) );
	
	// draw all ObjectInstances:
	for( var i = 0; i < ObjectInstanceArray.length; i++ )
	{
		if ( ObjectInstanceArray[i].whichType == 18 )
			continue;
		// apply the transformation for this instance and send it to the shader as the model-view matrix
		gl.uniformMatrix4fv( objectMvMatrixLocation, false, flatten( ObjectInstanceArray[i].transformation ) );
		
		// get the ObjectType of this instance
		var type = ObjectTypeArray[ ObjectInstanceArray[i].whichType ];
		
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
	}
	
	// draw all Walls:
	// Since walls have no transformations, the object's transformations is the identity matrix.
	gl.uniformMatrix4fv( objectMvMatrixLocation, false, flatten( mat4() ) );
	for( var i = 0; i < WallArray.length; i++ )
	{
		// bind the texture for the wall
		gl.bindTexture( gl.TEXTURE_2D, textureArray[ WallArray[i].whichTexture ] );
		// draw the two triangles that make up the wall (so six vertices)
		gl.drawArrays( gl.TRIANGLES, bufferWallPointsStart+i*6, 6 );
	}

	
	
	//resets old values
	gl.colorMask(true,true,true,true);
	
	if(run==0.0)
	{
	gl.uniform1i(gl.getUniformLocation(program, "ShadowMap"), 1);
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, depthTexture);
	}
	else
	{
	gl.uniform1i(gl.getUniformLocation(program, "ShadowMap2"), 2);
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, depthTexture2);
	}
	gl.activeTexture(gl.TEXTURE0);
	
	gl.viewport( 0, 0, canvas.width, canvas.height );
	
	
}

function CloserToFire()
{
	if(cameraY>-3.0)
		return true;
	else
		return false;
}

function JumpTime(Timer)
{	
	if ((cameraX<-40&&Timer<25) || ((youLose == 1 || youWin == 1) && Timer < 25)) //adjusts how long it stays on screen
		return true;
	else
		return false;	
}

function MakeJumpScare()
{
	GPUpoints.push( vec4( -1.0, 1.0, -1.0, 1.0 ) );
	GPUpoints.push( vec4( 1.0, 1.0, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -1.0, -1.0, -1.0, 1.0 ) );
	GPUpoints.push( vec4( 1.0, -1.0, -1.0, 1.0 ) );
	GPUtexcoords.push( vec2( 0, 0 ) );
	GPUtexcoords.push( vec2( 1, 0 ) );
	GPUtexcoords.push( vec2( 0, 1 ) );
	GPUtexcoords.push( vec2( 1, 1 ) );
	for( k = 0; k < 4; k++ )
		GPUnormals.push( vec4(0,0,0,0) );
}
