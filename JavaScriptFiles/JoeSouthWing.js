function makeJoesCreeper()
{
    // generate vertices, texcoords, normals, and corresponding triangle texture strings:
    var v = []; // vertices
    var t = []; // texcoords
    var n = []; // normals
    var s = []; // texture strings
    

    // Make head
    p = [];
    p.push( vec4( -1, 7, 1, 1 ) );
    p.push( vec4(  1, 7, 1, 1 ) );
    p.push( vec4(  1, 5, 1, 1 ) );
    p.push( vec4( -1, 5, 1, 1 ) );
    p.push( vec4( -1, 7, -1, 1 ) );
    p.push( vec4(  1, 7, -1, 1 ) );
    p.push( vec4(  1, 5, -1, 1 ) );
    p.push( vec4( -1, 5, -1, 1 ) );
    makeCube( v, t, n, p );
    s = [ "creeperface", "creeperface", "creeperskin", "creeperskin", "creeperskin", "creeperskin",
         "creeperskin", "creeperskin", "creeperskin", "creeperskin", "creeperskin", "creeperskin" ];
    
    // make body
    p = [];
    p.push( vec4( -1, 5, 0.5, 1 ) );
    p.push( vec4(  1, 5, 0.5, 1 ) );
    p.push( vec4(  1, 0, 0.5, 1 ) );
    p.push( vec4( -1, 0, 0.5, 1 ) );
    p.push( vec4( -1, 5, -0.5, 1 ) );
    p.push( vec4(  1, 5, -0.5, 1 ) );
    p.push( vec4(  1, 0, -0.5, 1 ) );
    p.push( vec4( -1, 0, -0.5, 1 ) );
    makeCube( v, t, n, p);

    for( i = 0; i < 12; i++ )
        s.push( "creeperskin" );

    
    // finally, place the arrays into makeObjectType along with the new type's name
    // makeObjectType is from Briley.js
    makeObjectType( "creeper", v, t, n, s );

}

function getCreeperTransformation()
{
    var tx = mat4();
    tx = mult( rotate(180, 0, 1, 0), tx);
    tx = mult( translate( 0, 0, 36) , tx);
    return tx;
}