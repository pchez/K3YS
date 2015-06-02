

function makeOrthoPoints()
{
	// make points for drawing orthographic text on the screen:
	for( i = 0; i < 6; i++ )
	{
		GPUpoints.push( vec4( -0.5, -0.6, -1.0, 1.0 ) );
		GPUpoints.push( vec4( 0.5, -0.6, -1.0, 1.0 ) );
		GPUpoints.push( vec4( -0.5, -0.8, -1.0, 1.0 ) );
		GPUpoints.push( vec4( 0.5, -0.8, -1.0, 1.0 ) );
		GPUtexcoords.push( vec2( 0.0, 0.125*i ) );
		GPUtexcoords.push( vec2( 1.0, 0.125*i ) );
		GPUtexcoords.push( vec2( 0, 0.125*(i+1) ) );
		GPUtexcoords.push( vec2( 1.0, 0.125*(i+1) ) );
		
		for( k = 0; k < 4; k++ )
			GPUnormals.push( vec4(0,0,0,0) );
	}
	// make points for eye:
	GPUpoints.push( vec4( -0.9, 0.94, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.7, 0.94, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.9, 0.8, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.7, 0.8, -1.0, 1.0 ) );
	GPUtexcoords.push( vec2( 0, 0 ) );
	GPUtexcoords.push( vec2( 1, 0 ) );
	GPUtexcoords.push( vec2( 0, 1 ) );
	GPUtexcoords.push( vec2( 1, 1 ) );
	for( k = 0; k < 4; k++ )
		GPUnormals.push( vec4(0,0,0,0) );
	// make points for battery indicator:
	GPUpoints.push( vec4( -0.76, 0.8, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.7, 0.8, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.76, 0.66, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.7, 0.66, -1.0, 1.0 ) );
	GPUtexcoords.push( vec2( 0, 0 ) );
	GPUtexcoords.push( vec2( 1, 0 ) );
	GPUtexcoords.push( vec2( 0, 1 ) );
	GPUtexcoords.push( vec2( 1, 1 ) );
	for( k = 0; k < 4; k++ )
		GPUnormals.push( vec4(0,0,0,0) );
		
	// make points for outlines:
	for( i = 0; i < 3; i++ )
	{
		GPUpoints.push( vec4( -0.7, 0.94-i*0.135, -1.0, 1.0 ) );
		GPUpoints.push( vec4( -0.19, 0.94-i*0.135, -1.0, 1.0 ) );
		GPUpoints.push( vec4( -0.19, 0.93-i*0.135, -1.0, 1.0 ) );
		GPUtexcoords.push( vec2( 0, 0 ) );
		GPUtexcoords.push( vec2( 1, 0 ) );
		GPUtexcoords.push( vec2( 1, 1 ) );
		GPUpoints.push( vec4( -0.7, 0.94-i*0.135, -1.0, 1.0 ) );
		GPUpoints.push( vec4( -0.19, 0.93-i*0.135, -1.0, 1.0 ) );
		GPUpoints.push( vec4( -0.7, 0.93-i*0.135, -1.0, 1.0 ) );
		GPUtexcoords.push( vec2( 0, 0 ) );
		GPUtexcoords.push( vec2( 1, 1 ) );
		GPUtexcoords.push( vec2( 0, 1 ) );
		for( k = 0; k < 6; k++ )
			GPUnormals.push( vec4(0,0,0,0) );
	}
	
	GPUpoints.push( vec4( -0.2, 0.93, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.19, 0.93, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.19, 0.67, -1.0, 1.0 ) );
	GPUtexcoords.push( vec2( 0, 0 ) );
	GPUtexcoords.push( vec2( 1, 0 ) );
	GPUtexcoords.push( vec2( 1, 1 ) );
	GPUpoints.push( vec4( -0.2, 0.93, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.19, 0.67, -1.0, 1.0 ) );
	GPUpoints.push( vec4( -0.2, 0.67, -1.0, 1.0 ) );
	GPUtexcoords.push( vec2( 0, 0 ) );
	GPUtexcoords.push( vec2( 1, 1 ) );
	GPUtexcoords.push( vec2( 0, 1 ) );
	for( k = 0; k < 6; k++ )
		GPUnormals.push( vec4(0,0,0,0) );
		
	// make points for filling bar:
	GPUpoints.push( vec4( 0, 0.125, -1.0, 1.0 ) );
	GPUpoints.push( vec4( 1, 0.125, -1.0, 1.0 ) );
	GPUpoints.push( vec4( 0, 0, -1.0, 1.0 ) );
	GPUpoints.push( vec4( 1, 0, -1.0, 1.0 ) );
	GPUtexcoords.push( vec2( 0, 0 ) );
	GPUtexcoords.push( vec2( 1, 0 ) );
	GPUtexcoords.push( vec2( 0, 1 ) );
	GPUtexcoords.push( vec2( 1, 1 ) );
	for( k = 0; k < 4; k++ )
		GPUnormals.push( vec4(0,0,0,0) );
	


}