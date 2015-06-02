

function makeTriangles(v, t, n, p) {
    
    v.push(p[0]);
    t.push(texCoord[0]);
    
    v.push(p[1]);
    t.push(texCoord[1]);
    
    v.push(p[2]);
    t.push(texCoord[2]);
    
    // normals are computed via cross product of two edges, normal to each primitive/triangle
    // for flat shading (per primitive)

    var t1 = subtract(p[2], p[1]);
    var t2 = subtract(p[0], p[1]);
    var normal = normalize(cross(t2, t1));
    normal = vec4(normal);
    normal[3] = 0.0;
    
    n.push(normal);
    n.push(normal);
    n.push(normal);
    
    v.push(p[3]);
    t.push(texCoord[0]);
    v.push(p[1]);
    t.push(texCoord[1]);
    v.push(p[2]);
    t.push(texCoord[2]);
    n.push(normal);
    n.push(normal);
    n.push(normal);
    
    v.push(p[3]);
    t.push(texCoord[0]);
    v.push(p[4]);
    t.push(texCoord[1]);
    v.push(p[5]);
    t.push(texCoord[2]);
    n.push(normal);
    n.push(normal);
    n.push(normal);
    
    v.push(p[6]);
    t.push(texCoord[0]);
    v.push(p[4]);
    t.push(texCoord[1]);
    v.push(p[5]);
    t.push(texCoord[2]);
    n.push(normal);
    n.push(normal);
    n.push(normal);
    
    v.push(p[6]);
    t.push(texCoord[0]);
    v.push(p[7]);
    t.push(texCoord[1]);
    v.push(p[8]);
    t.push(texCoord[2]);
    n.push(normal);
    n.push(normal);
    n.push(normal);
    
    v.push(p[9]);
    t.push(texCoord[0]);
    v.push(p[7]);
    t.push(texCoord[1]);
    v.push(p[8]);
    t.push(texCoord[2]);
    n.push(normal);
    n.push(normal);
    n.push(normal);
}

function makeLightning(){

    // generate vertices, texcoords, normals, and corresponding triangle texture strings:
    var v = []; // vertices
    var t = []; // texcoords
    var n = []; // normals
    var s = []; // texture strings
    
    var p = [vec4(-3.5, 0, 0, 1), vec4(-2, 1, 0, 1), vec4(-2.2, .5, 0, 1),
             vec4(-1,-.1,0, 1), vec4(0,-.4, 0, 1), vec4(.1,-1, 0, 1),
             vec4(1, 0, 0, 1), vec4(2, .6, 0, 1), vec4(2.1, .8, 0, 1),
             vec4(3.5, 0, 0, 1)
             ];
    
    

    makeTriangles( v, t, n, p );
    
    s.push("lightning1");
   /* s.push("lightning1");
    s.push("lightning1");
    s.push("lightning1");
    s.push("lightning1");
    s.push("lightning1");*/

    
    makeObjectType( "lightning", v, t, n, s );
    var tx = mult(translate(-99.5, -7, 88),rotate(180, 0, 1, 0));
    makeInteractableObjectInstance("lightning", tx, false, true, [0, scale(1,1,1)]);
    

}
