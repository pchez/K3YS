var index = 0;
var spherePointsArray = [];
var sphereNormalsArray = [];
var sphereTexCoordsArray = [];
var sphereTexStringsArray = [];

var sphereTransform;
var sphereTransform2;

function triangle(a, b, c, flat) {
    
    spherePointsArray.push(a);
    sphereTexCoordsArray.push(texCoord[0]);
    
    spherePointsArray.push(b);
    sphereTexCoordsArray.push(texCoord[1]);
    
    spherePointsArray.push(c);
    sphereTexCoordsArray.push(texCoord[2]);
    
    // normals are radial vectors (original vertices)
    // for Gouraud shading or phong shading (per vertex or per fragment)
    if (flat == false){
        sphereNormalsArray.push(vec4(a[0],a[1], a[2], 0.0));
        sphereNormalsArray.push(vec4(b[0],b[1], b[2], 0.0));
        sphereNormalsArray.push(vec4(c[0],c[1], c[2], 0.0));
    }
    // normals are computed via cross product of two edges, normal to each primitive/triangle
    // for flat shading (per primitive)
    else{
        var t1 = subtract(b, a);
        var t2 = subtract(c, a);
        var normal = normalize(cross(t2, t1));
        normal = vec4(normal);
        normal[3] = 0.0;
        
        sphereNormalsArray.push(normal);
        sphereNormalsArray.push(normal);
        sphereNormalsArray.push(normal);
    }
}


function divideTriangle(a, b, c, count, flat) {
    if ( count > 0 ) {
        
        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);
        
        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);
        
        divideTriangle( a, ab, ac, count - 1 , flat);
        divideTriangle( ab, b, bc, count - 1 , flat);
        divideTriangle( bc, c, ac, count - 1 , flat);
        divideTriangle( ab, bc, ac, count - 1 , flat);
    }
    else {
        triangle( a, b, c ,flat);
    }
}


function sphere(n, flat) {
 
    // Points for initial tetrahedron
    var a = vec4(0.0, 0.0, -1.0, 1);
    var b = vec4(0.0, 0.942809, 0.333333, 1);
    var c = vec4(-0.816497, -0.471405, 0.333333, 1);
    var d = vec4(0.816497, -0.471405, 0.333333, 1);

    divideTriangle(a, b, c, n, flat);
    divideTriangle(d, c, b, n, flat);
    divideTriangle(a, d, b, n, flat);
    divideTriangle(a, c, d, n, flat);
}

function getSphereVertices() { return spherePointsArray; }
function getSphereNormals() { return sphereNormalsArray; }
function getSphereTexCoords() { return sphereTexCoordsArray; }

function getSphereTexStrings(imageID)
{
    for (var i=0; i<(spherePointsArray.length)/3; i++)
    {
        sphereTexStringsArray[i] = imageID;
    }
    return sphereTexStringsArray;
}

function getSphereTransformation()
{
    sphereTransform = mat4();
    sphereTransform = mult(translate(-103,-7,88), sphereTransform);
    return sphereTransform;
}

function getSphereTransformation2()
{
    sphereTransform2 = mat4();
    sphereTransform2 = mult(translate(-96,-7,88), sphereTransform2);
    return sphereTransform2;
}