function makeNoose()
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
    //for( i = 0; i < 3; i++ )
    //{
    //    s.push( "rope" ); s.push( "rope" ); s.push( "rope" );
    //    s.push( "rope" ); s.push( "rope" ); s.push( "rope" );
    //}
    s = [ "rope" ];
    
    
    makeObjectType( "rope", v, t, n, s );

    makeObjectInstance( "rope", mult( translate(-163, 10-8, -20), scale(1, 2, 1)) );
    makeObjectInstance( "rope", mult( translate(-163, 11-8, -20), scale(0.3, 12, 0.3)) );
    for( i = 1; i < 13; i++)
    {
        var ropetx = mult( rotate(90, 0,0,1), scale(0.3, 0.6, 0.3));
        ropetx = mult( translate(0.6,2,0), ropetx);
        ropetx = mult( rotate(i*360/12, 0, 0, 1), ropetx);
        ropetx = mult( translate(0,8.2, -20), ropetx);
        ropetx = mult( translate(-163,-8, 0), ropetx);

        makeObjectInstance( "rope", ropetx );
    }
    
        makeObjectInstance( "rope", mult( translate(-145, 10-5, -30), scale(1, 2, 1)) );
        makeObjectInstance( "rope", mult( translate(-145, 11-5, -30), scale(0.3, 12, 0.3)) );
    for( i = 1; i < 13; i++)
    {
        var ropetx = mult( rotate(90, 0, 0, 1), scale(0.3, 0.6, 0.3));
        ropetx = mult( translate(0.6,2,0), ropetx);
        ropetx = mult( rotate(i*360/12, 0, 0, 1), ropetx);
        ropetx = mult( translate(0,8.2, -30), ropetx);
        ropetx = mult( translate(-145,-5, 0), ropetx);
        
        makeObjectInstance( "rope", ropetx );
    }
    
    makeObjectInstance( "rope", mult( translate(-130, 10, -40), scale(1, 2, 1)) );
    makeObjectInstance( "rope", mult( translate(-130, 11, -40), scale(0.3, 12, 0.3)) );
    for( i = 1; i < 13; i++)
    {
        var ropetx = mult( rotate(-90, 1, 0, 0), scale(0.3, 0.6, 0.3));
        ropetx = mult( translate(0,2,0.6), ropetx);
        ropetx = mult( rotate(i*360/12, 1, 0, 0), ropetx);
        ropetx = mult( translate(0,8.2, -40), ropetx);
        ropetx = mult( translate(-130,0, 0), ropetx);
        
        makeObjectInstance( "rope", ropetx );
    }
    
    // also going to make the columns for the electric sphers here, using the cylinder drawing algorithm
    s = [ "metal"];
    
    makeObjectType("column", v,t,n,s);
    makeObjectInstance("column", mult( translate(-96, -18, 88), scale(0.8,5,0.8)));
    makeObjectInstance("column", mult( translate(-103, -18, 88), scale(0.8,5,0.8)));
    
    
}