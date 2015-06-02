// BrileyWestWing.js+

// The west wing of the house is defined here.

function makeCube( v, t, n, eightPoints )
{
	// eightPoints is an array of 8 vec4's ordered as:
	// 0-neartopleft, 1-neartopright, 2-nearbotright, 3-nearbotleft, 4-fartopleft, 5-fartopright, 6-farbotright, 7-farbotleft

	// front face:
	v.push( eightPoints[0] );
	v.push( eightPoints[1] );
	v.push( eightPoints[2] );
	t.push( vec2(0,0) );
	t.push( vec2(1,0) );
	t.push( vec2(1,1) );
	var nrmlt = normalize( cross( subtract(eightPoints[0], eightPoints[1]), subtract(eightPoints[2], eightPoints[1]) ), false );
	var nrml = [ nrmlt[0], nrmlt[1], nrmlt[2], 1.0 ];
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	v.push( eightPoints[0] );
	v.push( eightPoints[2] );
	v.push( eightPoints[3] );
	t.push( vec2(0,0) );
	t.push( vec2(1,1) );
	t.push( vec2(0,1) );
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	// top face:
	v.push( eightPoints[4] );
	v.push( eightPoints[5] );
	v.push( eightPoints[1] );
	t.push( vec2(0,0) );
	t.push( vec2(1,0) );
	t.push( vec2(1,1) );
	nrmlt = normalize( cross( subtract(eightPoints[4], eightPoints[5]), subtract(eightPoints[1], eightPoints[5]) ), false );
	nrml = [ nrmlt[0], nrmlt[1], nrmlt[2], 1.0 ];
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	v.push( eightPoints[4] );
	v.push( eightPoints[1] );
	v.push( eightPoints[0] );
	t.push( vec2(0,0) );
	t.push( vec2(1,1) );
	t.push( vec2(0,1) );
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	// bottom face:
	v.push( eightPoints[7] );
	v.push( eightPoints[6] );
	v.push( eightPoints[2] );
	t.push( vec2(0,0) );
	t.push( vec2(1,0) );
	t.push( vec2(1,1) );
	nrmlt = normalize( cross(  subtract(eightPoints[2], eightPoints[6]), subtract(eightPoints[7], eightPoints[6]) ), false );
	nrml = [ nrmlt[0], nrmlt[1], nrmlt[2], 1.0 ];
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	v.push( eightPoints[7] );
	v.push( eightPoints[2] );
	v.push( eightPoints[3] );
	t.push( vec2(0,0) );
	t.push( vec2(1,1) );
	t.push( vec2(0,1) );
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	// right face:
	v.push( eightPoints[1] );
	v.push( eightPoints[5] );
	v.push( eightPoints[6] );
	t.push( vec2(0,0) );
	t.push( vec2(1,0) );
	t.push( vec2(1,1) );
	nrmlt = normalize( cross( subtract(eightPoints[1], eightPoints[5]), subtract(eightPoints[6], eightPoints[5]) ), false );
	nrml = [ nrmlt[0], nrmlt[1], nrmlt[2], 1.0 ];
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	v.push( eightPoints[1] );
	v.push( eightPoints[6] );
	v.push( eightPoints[2] );
	t.push( vec2(0,0) );
	t.push( vec2(1,1) );
	t.push( vec2(0,1) );
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	// left face:
	v.push( eightPoints[4] );
	v.push( eightPoints[0] );
	v.push( eightPoints[3] );
	t.push( vec2(0,0) );
	t.push( vec2(1,0) );
	t.push( vec2(1,1) );
	nrmlt = normalize( cross( subtract(eightPoints[4], eightPoints[0]), subtract(eightPoints[3], eightPoints[0]) ), false );
	nrml = [ nrmlt[0], nrmlt[1], nrmlt[2], 1.0 ];
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	v.push( eightPoints[4] );
	v.push( eightPoints[3] );
	v.push( eightPoints[7] );
	t.push( vec2(0,0) );
	t.push( vec2(1,1) );
	t.push( vec2(0,1) );
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	// back face:
	v.push( eightPoints[5] );
	v.push( eightPoints[4] );
	v.push( eightPoints[7] );
	t.push( vec2(0,0) );
	t.push( vec2(1,0) );
	t.push( vec2(1,1) );
	nrmlt = normalize( cross( subtract(eightPoints[5], eightPoints[4]), subtract(eightPoints[7], eightPoints[4]) ), false );
	nrml = [ nrmlt[0], nrmlt[1], nrmlt[2], 1.0 ];
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	v.push( eightPoints[5] );
	v.push( eightPoints[7] );
	v.push( eightPoints[6] );
	t.push( vec2(0,0) );
	t.push( vec2(1,1) );
	t.push( vec2(0,1) );
	n.push( nrml );
	n.push( nrml );
	n.push( nrml );
	
	
}

function makeBrileysDoor()
{
	// generate vertices, texcoords, normals, and corresponding triangle texture strings:
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	// door of height 9 and width 6, with origin at lower right.
	// laid out in the xy plane.
	
	p = [];
	p.push( vec4( -6.5, 9, 0.5, 1 ) );
	p.push( vec4( -0.5, 9, 0.5, 1 ) );
	p.push( vec4( -0.5, 0, 0.5, 1 ) );
	p.push( vec4( -6.5, 0, 0.5, 1 ) );
	p.push( vec4( -6.5, 9, -0.5, 1 ) );
	p.push( vec4( -0.5, 9, -0.5, 1 ) );
	p.push( vec4( -0.5, 0, -0.5, 1 ) );
	p.push( vec4( -6.5, 0, -0.5, 1 ) );
	makeCube( v, t, n, p );
	s = [ "wooddoor", "wooddoor", "woodwall", "woodwall", "woodwall", "woodwall",
			"woodwall", "woodwall", "woodwall", "woodwall", "wooddoor", "wooddoor" ];
	
	
	// finally, place the arrays into makeObjectType along with the new type's name
	// makeObjectType is from Briley.js
	makeObjectType( "door", v, t, n, s );
	

	
}

function makeBrileysLongTable()
{
	// generate vertices, texcoords, normals, and corresponding triangle texture strings:
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	// top
	p = [];
	p.push( vec4( -20, 3.5, 6, 1 ) );
	p.push( vec4( -20, 3.5, -6, 1 ) );
	p.push( vec4( 20, 3.5, -6, 1 ) );
	p.push( vec4( 20, 3.5, 6, 1 ) );
	p.push( vec4( -20, 3, 6, 1 ) );
	p.push( vec4( -20, 3, -6, 1 ) );
	p.push( vec4( 20, 3, -6, 1 ) );
	p.push( vec4( 20, 3, 6, 1 ) );
	makeCube( v, t, n, p );
		
	// -x+z leg
	p = [];
	p.push( vec4( -20, 3, 6, 1 ) );
	p.push( vec4( -20, 3, 5.5, 1 ) );
	p.push( vec4( -19.5, 3, 5.5, 1 ) );
	p.push( vec4( -19.5, 3, 6, 1 ) );
	p.push( vec4( -20, 0, 6, 1 ) );
	p.push( vec4( -20, 0, 5.5, 1 ) );
	p.push( vec4( -19.5, 0, 5.5, 1 ) );
	p.push( vec4( -19.5, 0, 6, 1 ) );
	makeCube( v, t, n, p );
		
	// -x-z leg
	p = [];
	p.push( vec4( -20, 3, -5.5, 1 ) );
	p.push( vec4( -20, 3, -6, 1 ) );
	p.push( vec4( -19.5, 3, -6, 1 ) );
	p.push( vec4( -19.5, 3, -5.5, 1 ) );
	p.push( vec4( -20, 0, -5.5, 1 ) );
	p.push( vec4( -20, 0, -6, 1 ) );
	p.push( vec4( -19.5, 0, -6, 1 ) );
	p.push( vec4( -19.5, 0, -5.5, 1 ) );
	makeCube( v, t, n, p );
		
	// +x-z leg
	p = [];
	p.push( vec4( 19.5, 3, -5.5, 1 ) );
	p.push( vec4( 19.5, 3, -6, 1 ) );
	p.push( vec4( 20, 3, -6, 1 ) );
	p.push( vec4( 20, 3, -5.5, 1 ) );
	p.push( vec4( 19.5, 0, -5.5, 1 ) );
	p.push( vec4( 19.5, 0, -6, 1 ) );
	p.push( vec4( 20, 0, -6, 1 ) );
	p.push( vec4( 20, 0, -5.5, 1 ) );
	makeCube( v, t, n, p );
	
	// +x+z leg
	p = [];
	p.push( vec4( 19.5, 3, 6, 1 ) );
	p.push( vec4( 19.5, 3, 5.5, 1 ) );
	p.push( vec4( 20, 3, 5.5, 1 ) );
	p.push( vec4( 20, 3, 6, 1 ) );
	p.push( vec4( 19.5, 0, 6, 1 ) );
	p.push( vec4( 19.5, 0, 5.5, 1 ) );
	p.push( vec4( 20, 0, 5.5, 1 ) );
	p.push( vec4( 20, 0, 6, 1 ) );
	makeCube( v, t, n, p );
	
	s = [ "marble" ];
	
	// finally, place the arrays into makeObjectType along with the new type's name
	// makeObjectType is from Briley.js
	makeObjectType( "long_table", v, t, n, s );
	

	
}

function makeBrileysBattery()
{
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	angle = 0;
	x1 = 0.5 * Math.sin( radians(angle) );
	z1 = 0.5 * Math.cos( radians(angle) );
		
	for( i = 0; i < 6; i++ )
	{	
		angle += 60;
		x2 = 0.5 * Math.sin( radians(angle) );
		z2 = 0.5 * Math.cos( radians(angle) );
		// side
		v.push( vec4( x1, 2, z1, 1 ) );
		v.push( vec4( x2, 2, z2, 1 ) );
		v.push( vec4( x2, 0, z2, 1 ) );
		t.push( vec2(0,0) );
		t.push( vec2(1,0) );
		t.push( vec2(1,1) );
		n.push( vec4( x1, 0, z1, 1 ) );
		n.push( vec4( x2, 0, z2, 1 ) );
		n.push( vec4( x2, 0, z2, 1 ) );
		// side
		v.push( vec4( x1, 2, z1, 1 ) );
		v.push( vec4( x2, 0, z2, 1 ) );
		v.push( vec4( x1, 0, z1, 1 ) );
		t.push( vec2(0,0) );
		t.push( vec2(1,1) );
		t.push( vec2(0,1) );
		n.push( vec4( x1, 0, z1, 1 ) );
		n.push( vec4( x2, 0, z2, 1 ) );
		n.push( vec4( x1, 0, z1, 1 ) );
		
		// top
		v.push( vec4( x1, 2, z1, 1 ) );
		v.push( vec4( x2, 2, z2, 1 ) );
		v.push( vec4( 0, 2, 0, 1 ) );
		t.push( vec2(0,1) );
		t.push( vec2(1,1) );
		t.push( vec2(0,0) );
		n.push( vec4( 0, 1, 0, 1 ) );
		n.push( vec4( 0, 1, 0, 1 ) );
		n.push( vec4( 0, 1, 0, 1 ) );
	
		x1 = x2;
		z1 = z2;
	}
	for( i = 0; i < 3; i++ )
	{
		s.push( "battery1" ); s.push( "battery1" ); s.push( "battery2" );
		s.push( "battery2" ); s.push( "battery2" ); s.push( "battery2" );
	}
	
	
	
	makeObjectType( "battery", v, t, n, s );
}

function makeBrileysKey()
{
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	// top
	p = [];
	p.push( vec4( -0.7, 2, 0.3, 1 ) );
	p.push( vec4( -0.7, 2, -0.3, 1 ) );
	p.push( vec4( 0.7, 2, -0.3, 1 ) );
	p.push( vec4( 0.7, 2, 0.3, 1 ) );
	p.push( vec4( -0.7, 1.8, 0.3, 1 ) );
	p.push( vec4( -0.7, 1.8, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.8, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.8, 0.3, 1 ) );
	makeCube( v, t, n, p );
	
	p = [];
	p.push( vec4( -0.7, 1.4, 0.3, 1 ) );
	p.push( vec4( -0.7, 1.4, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.4, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.4, 0.3, 1 ) );
	p.push( vec4( -0.7, 1.2, 0.3, 1 ) );
	p.push( vec4( -0.7, 1.2, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.2, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.2, 0.3, 1 ) );
	makeCube( v, t, n, p );
	
	p = [];
	p.push( vec4( -0.7, 1.8, 0.3, 1 ) );
	p.push( vec4( -0.7, 1.8, -0.3, 1 ) );
	p.push( vec4( -0.5, 1.8, -0.3, 1 ) );
	p.push( vec4( -0.5, 1.8, 0.3, 1 ) );
	p.push( vec4( -0.7, 1.4, 0.3, 1 ) );
	p.push( vec4( -0.7, 1.4, -0.3, 1 ) );
	p.push( vec4( -0.5, 1.4, -0.3, 1 ) );
	p.push( vec4( -0.5, 1.4, 0.3, 1 ) );
	makeCube( v, t, n, p );
	
	p = [];
	p.push( vec4( 0.5, 1.8, 0.3, 1 ) );
	p.push( vec4( 0.5, 1.8, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.8, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.8, 0.3, 1 ) );
	p.push( vec4( 0.5, 1.4, 0.3, 1 ) );
	p.push( vec4( 0.5, 1.4, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.4, -0.3, 1 ) );
	p.push( vec4( 0.7, 1.4, 0.3, 1 ) );
	makeCube( v, t, n, p );
	
	// shaft
	p = [];
	p.push( vec4( -0.1, 1.2, 0.3, 1 ) );
	p.push( vec4( -0.1, 1.2, -0.3, 1 ) );
	p.push( vec4( 0.1, 1.2, -0.3, 1 ) );
	p.push( vec4( 0.1, 1.2, 0.3, 1 ) );
	p.push( vec4( -0.1, 0, 0.3, 1 ) );
	p.push( vec4( -0.1, 0, -0.3, 1 ) );
	p.push( vec4( 0.1, 0, -0.3, 1 ) );
	p.push( vec4( 0.1, 0, 0.3, 1 ) );
	makeCube( v, t, n, p );
		
	// short prong
	p = [];
	p.push( vec4( -0.5, 0.6, 0.3, 1 ) );
	p.push( vec4( -0.5, 0.6, -0.3, 1 ) );
	p.push( vec4( -0.1, 0.6, -0.3, 1 ) );
	p.push( vec4( -0.1, 0.6, 0.3, 1 ) );
	p.push( vec4( -0.5, 0.4, 0.3, 1 ) );
	p.push( vec4( -0.5, 0.4, -0.3, 1 ) );
	p.push( vec4( -0.1, 0.4, -0.3, 1 ) );
	p.push( vec4( -0.1, 0.4, 0.3, 1 ) );
	makeCube( v, t, n, p );

	// long prong
	p = [];
	p.push( vec4( -0.7, 0.2, 0.3, 1 ) );
	p.push( vec4( -0.7, 0.2, -0.3, 1 ) );
	p.push( vec4( -0.1, 0.2, -0.3, 1 ) );
	p.push( vec4( -0.1, 0.2, 0.3, 1 ) );
	p.push( vec4( -0.7, 0, 0.3, 1 ) );
	p.push( vec4( -0.7, 0, -0.3, 1 ) );
	p.push( vec4( -0.1, 0, -0.3, 1 ) );
	p.push( vec4( -0.1, 0, 0.3, 1 ) );
	makeCube( v, t, n, p );
	
	s = [ "gold" ];
	

	makeObjectType( "key", v, t, n, s );

}

function makeBrileysGuillotineFrameAndBlade()
{
	// generate vertices, texcoords, normals, and corresponding triangle texture strings:
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	// left pole
	p = [];
	p.push( vec4( -5, 12, 1, 1 ) );
	p.push( vec4( -4, 12, 1, 1 ) );
	p.push( vec4( -4, 0, 1, 1 ) );
	p.push( vec4( -5, 0, 1, 1 ) );
	p.push( vec4( -5, 12, -1, 1 ) );
	p.push( vec4( -4, 12, -1, 1 ) );
	p.push( vec4( -4, 0, -1, 1 ) );
	p.push( vec4( -5, 0, -1, 1 ) );
	makeCube( v, t, n, p );
	
	// right pole
	p = [];
	p.push( vec4( 4, 12, 1, 1 ) );
	p.push( vec4( 5, 12, 1, 1 ) );
	p.push( vec4( 5, 0, 1, 1 ) );
	p.push( vec4( 4, 0, 1, 1 ) );
	p.push( vec4( 4, 12, -1, 1 ) );
	p.push( vec4( 5, 12, -1, 1 ) );
	p.push( vec4( 5, 0, -1, 1 ) );
	p.push( vec4( 4, 0, -1, 1 ) );
	makeCube( v, t, n, p );

	// head rest
	p = [];
	p.push( vec4( -4, 2, 1, 1 ) );
	p.push( vec4( 4, 2, 1, 1 ) );
	p.push( vec4( 4, 0, 1, 1 ) );
	p.push( vec4( -4, 0, 1, 1 ) );
	p.push( vec4( -4, 2, -1, 1 ) );
	p.push( vec4( 4, 2, -1, 1 ) );
	p.push( vec4( 4, 0, -1, 1 ) );
	p.push( vec4( -4, 0, -1, 1 ) );
	makeCube( v, t, n, p );
	
	s = [ "lightwood" ];

	makeObjectType( "guillotine frame", v, t, n, s );
	
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	v.push( vec4( -4, 8, 0, 1 ) );
	v.push( vec4( 4, 8, 0, 1 ) );
	v.push( vec4( 4, 6, 0, 1 ) );
	t.push( vec2(0,0) );
	t.push( vec2(1,0) );
	t.push( vec2(1,1) );
	for( i = 0; i < 6; i++ )
		n.push( vec4( 0, 0, 1, 1 ) );
	
	v.push( vec4( -4, 8, 0, 1 ) );
	v.push( vec4( 4, 6, 0, 1 ) );
	v.push( vec4( -4, 6, 0, 1 ) );
	t.push( vec2(0,0) );
	t.push( vec2(1,1) );
	t.push( vec2(0,1) );
	
	for( i = 0; i < 8; i++ )
	{
		v.push( vec4( -3.5+i, 4.5, 0, 1 ) );
		v.push( vec4( -4+i, 6, 0, 1 ) );
		v.push( vec4( -3+i, 6, 0, 1 ) );
		t.push( vec2(0.5,1) );
		t.push( vec2(0,0) );
		t.push( vec2(1,0) );
		for( k = 0; k < 3; k++ )
			n.push( vec4( 0, 0, 1, 1 ) );
	}
	
	s = [ "metal" ];
	
	makeObjectType( "guillotine blade", v, t, n, s );
	
}

function makeBrileysPlate()
{
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	p = [];
	p.push( vec4( -1, 0.6, -1, 1 ) );
	p.push( vec4( 1, 0.6, -1, 1 ) );
	p.push( vec4( 1, 0.6, 1, 1 ) );
	p.push( vec4( -1, 0.6, 1, 1 ) );
	p.push( vec4( -0.25, 0, -0.25, 1 ) );
	p.push( vec4( 0.25, 0, -0.25, 1 ) );
	p.push( vec4( 0.25, 0, 0.25, 1 ) );
	p.push( vec4( -0.25, 0, 0.25, 1 ) );
	makeCube( v, t, n, p );

	s = [ "plate" ];
	

	makeObjectType( "plate", v, t, n, s );
	
}

function makePriscillasFan()
{
	fan_width = 2.0;
	fan_length = 8.0;
	var ceiling_fan_bottom = 
	[
		vec4( 0, 0, 0, 1.0 ),
		vec4( -fan_width, 0,  fan_length, 1.0 ),
		vec4( fan_width, 0,  fan_length, 1.0 ),
		
		vec4( 0, 0, 0, 1.0 ),
		vec4( fan_length, 0,  fan_width, 1.0 ),
		vec4( fan_length, 0,  -fan_width, 1.0 ),
		
		vec4( 0, 0, 0, 1.0 ),
		vec4( fan_width, 0,  -fan_length, 1.0 ),
		vec4( -fan_width, 0, -fan_length, 1.0 ),
		
		vec4( 0, 0, 0, 1.0 ),
		vec4( -fan_length, 0,  fan_width, 1.0 ),
		vec4( -fan_length, 0, -fan_width, 1.0 )
		
	];
	
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	for( i = 0; i < 12; i++ )
	{
		v.push( ceiling_fan_bottom[i] );
		n.push( vec4(0,-1,0,1) );
	}
	for( i = 0; i < 4; i++ )
	{
		t.push( vec2(0.5, 0) );
		t.push( vec2(1, 1) );
		t.push( vec2(0, 1) );
	}
	
	s = [ "lightwood" ];
	
	makeObjectType( "ceiling fan", v, t, n, s );
}

function makeBrileysBookshelf()
{
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	p = [];
	p.push( vec4( 3, 0, 15, 1 ) );
	p.push( vec4( 3, 0, -12, 1 ) );
	p.push( vec4( 3, -16, -12, 1 ) );
	p.push( vec4( 3, -16, 15, 1 ) );
	p.push( vec4( -3, 0, 15, 1 ) );
	p.push( vec4( -3, 0, -12, 1 ) );
	p.push( vec4( -3, -16, -12, 1 ) );
	p.push( vec4( -3, -16, 15, 1 ) );
	makeCube( v, t, n, p );

	s = [ "bookshelf", "bookshelf", "lightwood", "lightwood", "lightwood", "lightwood",
			"lightwood", "lightwood", "lightwood", "lightwood",	"bookshelf", "bookshelf" ];
	

	makeObjectType( "bookshelf", v, t, n, s );
	
}

function makeBrileysStatue()
{
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings
	
	// base
	p = [];
	p.push( vec4( -2, 1, -2, 1 ) );
	p.push( vec4( 2, 1, -2, 1 ) );
	p.push( vec4( 2, 1, 2, 1 ) );
	p.push( vec4( -2, 1, 2, 1 ) );
	p.push( vec4( -2, 0, -2, 1 ) );
	p.push( vec4( 2, 0, -2, 1 ) );
	p.push( vec4( 2, 0, 2, 1 ) );
	p.push( vec4( -2, 0, 2, 1 ) );
	makeCube( v, t, n, p );

	// right leg
	p = [];
	p.push( vec4( -1.8, 4, -1.5, 1 ) );
	p.push( vec4( -0.2, 4, -1.5, 1 ) );
	p.push( vec4( -0.2, 4, 1.5, 1 ) );
	p.push( vec4( -1.8, 4, 1.5, 1 ) );
	p.push( vec4( -1.8, 1, -1.5, 1 ) );
	p.push( vec4( -0.2, 1, -1.5, 1 ) );
	p.push( vec4( -0.2, 1, 1.5, 1 ) );
	p.push( vec4( -1.8, 1, 1.5, 1 ) );
	makeCube( v, t, n, p );
	
	// left leg
	p = [];
	p.push( vec4( 0.2, 4, -1.5, 1 ) );
	p.push( vec4( 1.8, 4, -1.5, 1 ) );
	p.push( vec4( 1.8, 4, 1.5, 1 ) );
	p.push( vec4( 0.2, 4, 1.5, 1 ) );
	p.push( vec4( 0.2, 1, -1.5, 1 ) );
	p.push( vec4( 1.8, 1, -1.5, 1 ) );
	p.push( vec4( 1.8, 1, 1.5, 1 ) );
	p.push( vec4( 0.2, 1, 1.5, 1 ) );
	makeCube( v, t, n, p );
	
	// torso
	p = [];
	p.push( vec4( -1.8, 8, -1.5, 1 ) );
	p.push( vec4( 1.8, 8, -1.5, 1 ) );
	p.push( vec4( 1.8, 8, 1.5, 1 ) );
	p.push( vec4( -1.8, 8, 1.5, 1 ) );
	p.push( vec4( -1.8, 4, -1.5, 1 ) );
	p.push( vec4( 1.8, 4, -1.5, 1 ) );
	p.push( vec4( 1.8, 4, 1.5, 1 ) );
	p.push( vec4( -1.8, 4, 1.5, 1 ) );
	makeCube( v, t, n, p );
	
	// right arm
	p = [];
	p.push( vec4( -3, 7.5, -1.2, 1 ) );
	p.push( vec4( -1.8, 7.5, -1.2, 1 ) );
	p.push( vec4( -1.8, 7.5, 1.2, 1 ) );
	p.push( vec4( -3, 7.5, 1.2, 1 ) );
	p.push( vec4( -3, 3.5, -1.2, 1 ) );
	p.push( vec4( -1.8, 3.5, -1.2, 1 ) );
	p.push( vec4( -1.8, 3.5, 1.2, 1 ) );
	p.push( vec4( -3, 3.5, 1.2, 1 ) );
	makeCube( v, t, n, p );
	
	// left arm
	p = [];
	p.push( vec4( 1.8, 7.5, -1.2, 1 ) );
	p.push( vec4( 3, 7.5, -1.2, 1 ) );
	p.push( vec4( 3, 7.5, 1.2, 1 ) );
	p.push( vec4( 1.8, 7.5, 1.2, 1 ) );
	p.push( vec4( 1.8, 3.5, -1.2, 1 ) );
	p.push( vec4( 3, 3.5, -1.2, 1 ) );
	p.push( vec4( 3, 3.5, 1.2, 1 ) );
	p.push( vec4( 1.8, 3.5, 1.2, 1 ) );
	makeCube( v, t, n, p );
	
	// neck
	p = [];
	p.push( vec4( -0.3, 9, -1.2, 1 ) );
	p.push( vec4( .3, 9, -1.2, 1 ) );
	p.push( vec4( .3, 9, 1.2, 1 ) );
	p.push( vec4( -.3, 9, 1.2, 1 ) );
	p.push( vec4( -.3, 8, -1.2, 1 ) );
	p.push( vec4( .3, 8, -1.2, 1 ) );
	p.push( vec4( .3, 8, 1.2, 1 ) );
	p.push( vec4( -.3, 8, 1.2, 1 ) );
	makeCube( v, t, n, p );
	
	
	s = [ "metal" ];
	

	makeObjectType( "statue", v, t, n, s );
	
	
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings

	v.push( vec4( -1.5, 1.5, 2, 1 ) );
	v.push( vec4( 1.5, 1.5, 2, 1 ) );
	v.push( vec4( 1.5, -1.5, 2, 1 ) );
	t.push( vec2( 0, 0 ) );
	t.push( vec2( 1, 0 ) );
	t.push( vec2( 1, 1 ) );
	v.push( vec4( -1.5, 1.5, 2, 1 ) );
	v.push( vec4( 1.5, -1.5, 2, 1 ) );
	v.push( vec4( -1.5, -1.5, 2, 1 ) );
	t.push( vec2( 0, 0 ) );
	t.push( vec2( 1, 1 ) );
	t.push( vec2( 0, 1 ) );
	for( i = 0; i < 6; i++ )
		n.push( vec4( 0, 0, 1, 1 ) );
		
	s = [ "metalWithEye" ];
		
	makeObjectType( "statue head", v, t, n, s );
	
}

function makeBrileysGuillotineRoomLight()
{
	var v = []; // vertices
	var t = []; // texcoords
	var n = []; // normals
	var s = []; // texture strings

	p = [];
	p.push( vec4( -1, 11, -1, 1 ) );
	p.push( vec4( -1, 11, 1, 1 ) );
	p.push( vec4( -0.5, 9, 1, 1 ) );
	p.push( vec4( -0.5, 9, -1, 1 ) );
	p.push( vec4( 1, 11, -1, 1 ) );
	p.push( vec4( 1, 11, 1, 1 ) );
	p.push( vec4( 1, 10.5, 1, 1 ) );
	p.push( vec4( 1, 10.5, -1, 1 ) );
	makeCube( v, t, n, p );
		
	s = [ "yellow", "yellow", "metal", "metal", "metal", "metal", 
			"metal", "metal", "metal", "metal", "metal", "metal", ];
		
	makeObjectType( "guillotine wall light", v, t, n, s );


}

// the first four arguments are vec3's, the last two are strings
function makeWallDoorFrame( topleft, topright, botright, botleft, frontTextureAsString, backTextureAsString )
{
	var faceNormal = normalize( cross( subtract(topleft, topright), subtract(botright, topright) ), false );
	faceNormal[0] /= 2.0;
	faceNormal[1] /= 2.0;
	faceNormal[2] /= 2.0;
	var leftToDoor = subtract(botright, botleft);
	var leftToDoorN = leftToDoor.slice(0);
	leftToDoorN = normalize(leftToDoorN, false);
	
	for( var i = 0; i < 3; i++ )
		leftToDoor[i] = (leftToDoor[i]/2.0) - 3.0*leftToDoorN[i];
	
	var dist = length( leftToDoor );
	dist = dist/(2*dist + 6);
	
	// front side:
	makeWall( topleft, topright, add(botright,vec3(0,9,0)), add(botleft,vec3(0,9,0)), frontTextureAsString );
	for( var i = 0; i < 6; i++ )
		for( var k = 0; k < 3; k++ )
			WallArray[WallArray.length-1].vertices[i][k] += faceNormal[k];
	WallArray[WallArray.length-1].texcoords[2] = vec2( 0, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[4] = vec2( 1, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[5] = vec2( 0, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	makeWall( add(botleft,vec3(0,9,0)), add(botleft, add(leftToDoor, vec3(0,9,0))),
				add(botleft,leftToDoor), botleft, frontTextureAsString );
	for( var i = 0; i < 6; i++ )
		for( var k = 0; k < 3; k++ )
			WallArray[WallArray.length-1].vertices[i][k] += faceNormal[k];
	WallArray[WallArray.length-1].texcoords[0] = vec2( 0, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[1] = vec2( dist, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[3] = vec2( dist, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[4] = vec2( dist, 1 );
	makeWall( add(vec3(0,9,0),subtract(botright,leftToDoor)), add(vec3(0,9,0),botright),
					botright, subtract(botright,leftToDoor), frontTextureAsString );
	for( var i = 0; i < 6; i++ )
		for( var k = 0; k < 3; k++ )
			WallArray[WallArray.length-1].vertices[i][k] += faceNormal[k];
	WallArray[WallArray.length-1].texcoords[0] = vec2( 1.0-dist, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[1] = vec2( 1, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[2] = vec2( 1.0-dist, 1 );
	WallArray[WallArray.length-1].texcoords[3] = vec2( 1, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[5] = vec2( 1.0-dist, 1 );
	
	// back side:
	makeWall( topright, topleft, add(botleft,vec3(0,9,0)), add(botright,vec3(0,9,0)), backTextureAsString );
	for( var i = 0; i < 6; i++ )
		for( var k = 0; k < 3; k++ )
			WallArray[WallArray.length-1].vertices[i][k] -= faceNormal[k];
	WallArray[WallArray.length-1].texcoords[2] = vec2( 0, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[4] = vec2( 1, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[5] = vec2( 0, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	makeWall( add(botleft, add(leftToDoor, vec3(0,9,0))), add(botleft,vec3(0,9,0)),
				botleft, add(botleft,leftToDoor), backTextureAsString );
	for( var i = 0; i < 6; i++ )
		for( var k = 0; k < 3; k++ )
			WallArray[WallArray.length-1].vertices[i][k] -= faceNormal[k];
	WallArray[WallArray.length-1].texcoords[0] = vec2( 1.0-dist, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[1] = vec2( 1, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[2] = vec2( 1.0-dist, 1 );
	WallArray[WallArray.length-1].texcoords[3] = vec2( 1, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[5] = vec2( 1.0-dist, 1 );
	makeWall( add(vec3(0,9,0),botright), add(vec3(0,9,0),subtract(botright,leftToDoor)),
					subtract(botright,leftToDoor), botright, backTextureAsString );
	for( var i = 0; i < 6; i++ )
		for( var k = 0; k < 3; k++ )
			WallArray[WallArray.length-1].vertices[i][k] -= faceNormal[k];
	WallArray[WallArray.length-1].texcoords[0] = vec2( 0, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[1] = vec2( dist, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[3] = vec2( dist, (topleft[1]-botleft[1]-9)/(topleft[1]-botleft[1]) );
	WallArray[WallArray.length-1].texcoords[4] = vec2( dist, 1 );
	
	// inside frame:
	makeWall( add(subtract(add(botleft,leftToDoor), faceNormal), vec3(0,9,0)),
			add(add(add(botleft,leftToDoor), faceNormal), vec3(0,9,0)),
			add(add(subtract(botright,leftToDoor), faceNormal), vec3(0,9,0)),
				add(subtract(subtract(botright,leftToDoor), faceNormal), vec3(0,9,0)),
						frontTextureAsString );
	makeWall( add(add(add(botleft,leftToDoor), faceNormal), vec3(0,9,0)),
			add(subtract(add(botleft,leftToDoor), faceNormal), vec3(0,9,0)),
				subtract(add(botleft,leftToDoor), faceNormal), add(add(botleft,leftToDoor), faceNormal), frontTextureAsString );
	makeWall( add(subtract(subtract(botright,leftToDoor), faceNormal), vec3(0,9,0)),
			add(add(subtract(botright,leftToDoor), faceNormal), vec3(0,9,0)),
				add(subtract(botright,leftToDoor), faceNormal), subtract(subtract(botright,leftToDoor), faceNormal),
				frontTextureAsString );
}

function makeBrileyWalls()
{
	trans = mult( translate(-40,0,-3.5), rotate(90, 0, 1, 0) );
	// Make the interactable door: interactWithMe is true, so the door can be activated immediately.
	// updateMe is false, since we don't want the door moving right away: it should only move when activated.
	// interactableState is an array of two mat4's (the transformation components),
	// a boolean: false if closed, true if open, and an int representing how many frames the door has turned already.
	makeInteractableObjectInstance( "door", trans, true, false, [ translate(-40,0,-3.5), rotate(90, 0, 1, 0), false, 0 ] );
	
	// make floor:
	makeWall( vec3(-80,0,10), vec3(-80,0,-10), vec3(-40,0,-10), vec3(-40,0,10), "bloodystonefloor" );
	
	
	// put battery on table
	makeInteractableObjectInstance( "battery", translate(-65,4,0),
								true, false, 0 );
								
	
	
	// make door frame to hallways:
	makeWallDoorFrame( vec3( -40, 20, 10 ), vec3( -40, 20, -10 ), vec3( -40, 0, -10 ), vec3( -40, 0, 10 ), "woodwall", "stones" );

	// make door frame to stairs to scroll hallway:
	makeWallDoorFrame( vec3( -40, 20, 10 ), vec3( -80, 20, 10 ), vec3( -80, 0, 10 ), vec3( -40, 0, 10 ), "stones", "colorstones" );
	
	// make door frame to dining room:
	makeWallDoorFrame( vec3( -40, 20, -10 ), vec3( -80, 20, -10 ), vec3( -80, 0, -10 ), vec3( -40, 0, -10 ), "woodwall", "stones" );
	
	// make west wall for stone room:
	makeWall( vec3(-80,20,10), vec3(-80,20,-10), vec3(-80,0,-10), vec3(-80,0,10), "stones" );
	
	// make stone room ceiling:
	makeWall( vec3(-80,20,-10), vec3(-80,20,10), vec3(-40,20,10), vec3(-40,20,-10), "stones" );
	
	// make door to dining room:
	trans = mult( translate(-56.5,0,-10), rotate(0, 0, 1, 0) );
	makeInteractableObjectInstance( "door", trans, true, false, [ translate(-56.5,0,-10), rotate(0, 0, 1, 0), false, 0 ] );
	
	// dining room floor:
	makeWall( vec3(-110,0,-10), vec3(-110,0,-40), vec3(-50,0,-40), vec3(-50,0,-10), "woodfloor" );
	// dining room roof:
	makeWall( vec3(-50,20,-10), vec3(-50,20,-40), vec3(-110,20,-40), vec3(-110,20,-10), "woodfloor" );
	// dining room east wall:
	makeWall( vec3(-50,20,-40), vec3(-50,20,-10), vec3(-50,0,-10), vec3(-50,0,-40), "woodwall" );
	// dining room north wall part:
	makeWall( vec3(-110,20,-40), vec3(-50,20,-40), vec3(-50,0,-40), vec3(-110,0,-40), "woodwall" );
	// dining room south wall part:
	makeWall( vec3(-80,20,-10.5), vec3(-110,20,-10.5), vec3(-110,0,-10.5), vec3(-80,0,-10.5), "woodwall" );
	// dining room west door frame:
	makeWallDoorFrame( vec3( -110, 20, -10 ), vec3( -110, 20, -40 ), vec3( -110, 0, -40 ), vec3( -110, 0, -10 ), "woodwall", "woodwall" );
	// dining room long table:
	makeObjectInstance( "long_table", translate(-80, 0, -25) );
	for( i = 0; i < 5; i++ )
		makeObjectInstance( "chair", mult( mult( translate(-66-i*7, 0, -20), rotate(-90,0,1,0) ), scale(1, 0.8, 1) ) );
	for( i = 0; i < 5; i++ )
		makeObjectInstance( "chair", mult( mult( translate(-66-i*7, 0, -30), rotate(90,0,1,0) ), scale(1, 0.8, 1) ) );
	// dining room plates: updatableState is [ highestY(float), lowestY(float), moveState(0, 1, or 2), counter, movespeed ]
	for( i = 0; i < 5; i++ )
	{
		highestY = 13;
		lowestY = 5;
		movespeed = 0.1;
		if ( Math.random() < 0.333 )
			highestY = 11;
		else if ( Math.random() < 0.5 )
			highestY = 9;
		if ( Math.random() < 0.333 )
			lowestY = 4.5;
		else if ( Math.random() < 0.5 )
			lowestY = 7;
		if ( Math.random() < 0.333 )
			movespeed = 0.2;
		else if ( Math.random() < 0.5 )
			movespeed = 0.3;
		
		makeInteractableObjectInstance( "plate", translate(-66-i*7, 3.5, -21), false, true, [ highestY, lowestY, 0, 0, movespeed ] );
	}
	for( i = 0; i < 5; i++ )
	{
		highestY = 13;
		lowestY = 5;
		movespeed = 0.1;
		if ( Math.random() < 0.333 )
			highestY = 11;
		else if ( Math.random() < 0.5 )
			highestY = 9;
		if ( Math.random() < 0.333 )
			lowestY = 4.5;
		else if ( Math.random() < 0.5 )
			lowestY = 7;
		if ( Math.random() < 0.333 )
			movespeed = 0.2;
		else if ( Math.random() < 0.5 )
			movespeed = 0.3;
		
		makeInteractableObjectInstance( "plate", translate(-66-i*7, 3.5, -29), false, true, [ highestY, lowestY, 0, 0, movespeed ] );
	}
	// make stairs down to scroll hallway:
	for( i = 0; i < 15; i += 2 )
	{
		// vertical step:
		makeWall( vec3(-63,-i,10+i), vec3(-57,-i,10+i), vec3(-57,-i-2,10+i), vec3(-63,-i-2,10+i), "stones" );
		// horizontal step:
		makeWall( vec3(-63,-i-2,10+i), vec3(-57,-i-2,10+i), vec3(-57,-i-2,10+i+2), vec3(-63,-i-2,10+i+2), "stones" );
	}
	// stairwell sides:
	makeWall( vec3(-63,9,26), vec3(-63,9,10.5), vec3(-63,-16,10.5), vec3(-63,-16,26), "stones" );
	makeWall( vec3(-57,9,10.5), vec3(-57,9,26), vec3(-57,-16,26), vec3(-57,-16,10.5), "stones" );
	// stairwell ceiling:
	makeWall( vec3(-63,9,26), vec3(-57,9,26), vec3(-57,9,10.5), vec3(-63,9,10.5), "stones" );
	// stairwell south high wall:
	makeWall( vec3(-57,9,26), vec3(-63,9,26), vec3(-63,0,26), vec3(-57,0,26), "stones" );
	
	// scroll hallway floor:
	makeWall( vec3(-150,-16,90), vec3(-150,-16,26), vec3(-57,-16,26), vec3(-57,-16,90), "colorstones" );
	// scroll hallway ceiling:
	makeWall( vec3(-150,0,26), vec3(-150,0,90), vec3(-57,0,90), vec3(-57,0,26), "colorstones" );
	// scroll hallway east wall:
	makeWall( vec3(-57,0,26), vec3(-57,0,46), vec3(-57,-16,46), vec3(-57,-16,26), "colorstones" );
	// scroll hallway north wall 1:
	makeWall( vec3(-106,0,26), vec3(-63,0,26), vec3(-63,-16,26), vec3(-106,-16,26), "colorstones" );
	// scroll hallway north wall 2 (with cutout):
	makeWallDoorFrame( vec3(-150,0,25.5), vec3(-106,0,25.5), vec3(-106,-16,25.5), vec3(-150,-16,25.5), "colorstones", "colorstones" );
	WallArray.length -= 6;
	// scroll hallway south wall 1:
	makeWall( vec3(-57,0,46), vec3(-90,0,46), vec3(-90,-16,46), vec3(-57,-16,46), "colorstones" );
	// scroll hallway south wall 2:
	makeWall( vec3(-110,0,46), vec3(-150,0,46), vec3(-150,-16,46), vec3(-110,-16,46), "colorstones" );
	// scroll T-hallway east wall:
	makeWall( vec3(-90,0,46), vec3(-90,0,90), vec3(-90,-16,90), vec3(-90,-16,46), "colorstones" );
	// scroll T-hallway west wall:
	makeWall( vec3(-110,0,90), vec3(-110,0,46), vec3(-110,-16,46), vec3(-110,-16,90), "colorstones" );
	// scroll T-hallway south end wall:
	makeWall( vec3(-90,0,90), vec3(-110,0,90), vec3(-110,-16,90), vec3(-90,-16,90), "colorstones" );
	
	// put statue in hallway
	makeInteractableObjectInstance( "statue", mult( translate( -80, -16, 36 ), rotate( 90,0,1,0) ), false, true, 0 );
	makeInteractableObjectInstance( "statue head", translate( -80, -16+10, 36 ), false, true, translate(-80,-16+10,36) );
	
	// put key at end of T-hallway
	makeInteractableObjectInstance( "key", translate(-100,-16,88),
								true, false, 0 );
	
	// doorway to guillotine room:
	makeWallDoorFrame( vec3( -150, 0, 46 ), vec3( -150, 0, 26 ), vec3( -150, -16, 26 ), vec3( -150, -16, 46 ), "colorstones", "colorstones" );
	// door to guillotine room:
	trans = mult( translate(-150,-16,36+3+0.5), rotate(-90, 0, 1, 0) );
	makeInteractableObjectInstance( "door", trans, true, false, [ translate(-150,-16,36+3+0.5), rotate(-90, 0, 1, 0), false, 0 ] );
	
	
	// guillotine room floor:
	makeWall( vec3(-170,-16,46), vec3(-170,-16,26), vec3(-150,-16,26), vec3(-150,-16,46), "colorstones" );
	// g room ceiling:
	makeWall( vec3(-150,0,46), vec3(-150,0,26), vec3(-170,0,26), vec3(-170,0,46), "colorstones" );
	// g room west wall
	makeWall( vec3(-170,0,46), vec3(-170,0,26), vec3(-170,-16,26), vec3(-170,-16,46), "colorstones" );
	// g room north wall
	makeWall( vec3(-170,0,26), vec3(-150,0,26), vec3(-150,-16,26), vec3(-170,-16,26), "colorstones" );
	// g room south wall
	makeWall( vec3(-150,0,46), vec3(-170,0,46), vec3(-170,-16,46), vec3(-150,-16,46), "colorstones" );
	
	makeObjectInstance( "guillotine frame", mult( translate(-165, -16, 36), rotate(90,0,1,0) ) );
	makeObjectInstance( "guillotine blade", mult( translate(-165, -16, 36), rotate(90,0,1,0) ) );
	makeObjectInstance( "guillotine wall light", translate(-151.5, -16, 36) );
	
	// hallway to library - west wall:
	makeWall( vec3(-131,-7,26), vec3(-131,-7,-10), vec3(-131,-16,-10), vec3(-131,-16,26), "stones" );
	// hallway to library - east wall:
	makeWall( vec3(-125,-7,-10), vec3(-125,-7,26), vec3(-125,-16,26), vec3(-125,-16,-10), "stones" );
	// hallway to library - floor:
	makeWall( vec3(-131,-16,-10), vec3(-125,-16,-10), vec3(-125,-16,26), vec3(-131,-16,26), "stones" );
	// hallway to library - ceiling:
	makeWall( vec3(-131,-7,26), vec3(-125,-7,26), vec3(-125,-7,-10), vec3(-131,-7,-10), "stones" );
	
	// library floor:
	makeWall( vec3(-175,-16,-10), vec3(-175,-16,-60), vec3(-110.5,-16,-60), vec3(-110.5,-16,-10), "woodfloor" );
	// library ceiling:
	makeWall( vec3(-110.5,20,-10), vec3(-110.5,20,-60), vec3(-183,20,-60), vec3(-183,20,-10), "woodfloor" );
	// library platform:
	makeWall( vec3(-118,0,-10), vec3(-118,0,-60), vec3(-110,0,-60), vec3(-110,0,-10), "woodfloor" );
	// library stairs:
	for( i = 0; i < 15; i += 2 )
	{
		// vertical step:
		if ( i != 0 )
			makeWall( vec3(-118-i,-i,-60), vec3(-118-i,-i,-54), vec3(-118-i,-i-2,-54), vec3(-118-i,-i-2,-60), "woodwall" );
		// horizontal step:
		if ( i != 14 )
			makeWall( vec3(-118-i,-i-2,-60), vec3(-118-i,-i-2,-54), vec3(-118-i-2,-i-2,-54), vec3(-118-i-2,-i-2,-60), "woodwall" );
	}
	
	// library west bottom wall
	makeWall( vec3(-175,0,-10), vec3(-175,0,-60), vec3(-175,-16,-60), vec3(-175,-16,-10), "woodwall" );
	// library west top wall
	makeWall( vec3(-183,20,-10), vec3(-183,20,-60), vec3(-183,0,-60), vec3(-183,0,-10), "woodwall" );
	// library west platform
	makeWall( vec3(-183,0,-10), vec3(-183,0,-60), vec3(-175,0,-60), vec3(-175,0,-10), "woodfloor" );
	// library north wall
	makeWall( vec3(-183,20,-60), vec3(-110.5,20,-60), vec3(-110.5,-16,-60), vec3(-183,-16,-60), "woodwall" );
	// library east wall bottom
	makeWall( vec3(-118,0,-60), vec3(-118,0,-10), vec3(-118,-16,-10), vec3(-118,-16,-60), "woodwall" );
	// library east wall top left
	makeWall( vec3(-110.5,20,-70), vec3(-110.5,20,-40), vec3(-110.5,0,-40), vec3(-110.5,0,-70), "woodwall" );
	// library south wall left
	makeWall( vec3(-110.5,20,-10), vec3(-125,20,-10), vec3(-125,-16,-10), vec3(-110.5,-16,-10), "woodwall" );
	// library south wall right
	makeWall( vec3(-131,20,-10), vec3(-183,20,-10), vec3(-183,-16,-10), vec3(-131,-16,-10), "woodwall" );
	// library south wall upper mid
	makeWall( vec3(-125,20,-10), vec3(-131,20,-10), vec3(-131,-7,-10), vec3(-125,-7,-10), "woodwall" );
	
	// bookshelves:
	makeObjectInstance( "bookshelf", translate(-136, 0, -35 ) );
	makeObjectInstance( "bookshelf", translate(-157, 0, -35 ) );
	// put key on west platform
	makeInteractableObjectInstance( "key", mult( translate(-179,0,-58), rotate(45,0,1,0) ),
								true, false, 0 );
	// put battery between the bookshelves
	makeInteractableObjectInstance( "battery", translate(-146.5,-16,-33),
								true, false, 0 );
								
}


function makeWestWing()
{
	makeBrileyWalls();

	
}




