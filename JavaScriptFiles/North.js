function makeNorthRoom()
{
	makeWallDoorFrame( vec3(-10,20,-40), vec3(10,20,-40), vec3(10,0,-40), vec3(-10,0,-40), "woodwall", "woodwall" );
	trans = mult( translate(3.5,0,-40), rotate(0, 0, 1, 0) );
	makeInteractableObjectInstance( "door", trans, true, false, [ translate(3.5,0,-40), rotate(0, 0, 1, 0), false, 0 ] );
	
	//  makeWall( topleft, topright, bottomright, bottomleft, whichTextureAsString );
	makeWall( vec3(-20,20,-40), vec3(-20,20,-60), vec3(-20,0,-60), vec3(-20,0,-40), "woodwall" ); //left wall
	makeWall( vec3(10,20,-60), vec3(10,20,-40), vec3(10,0,-40), vec3(10,0,-60), "woodwall" );	 //right wall
	makeWall( vec3(-20,20,-60), vec3(10,20,-60), vec3(10,0,-60), vec3(-20,0,-60), "bloodywoodwall" );  //far wall
	makeWall( vec3(-10,20,-40.5), vec3(-20,20,-40.5), vec3(-20,0,-40.5), vec3(-10,0,-40.5), "woodwall" );  //part of closer wall
	makeWall( vec3(-20,20,-40), vec3(10,20,-40), vec3(10,20,-60), vec3(-20,20,-60), "woodfloor" ); //ceiling
	makeWall( vec3(-20,0,-60), vec3(10,0,-60), vec3(10,0,-40), vec3(-20,0,-40), "woodfloor" ); //floor
	
	makeFrame(4,2,3);
	makeObjectType("nightstand", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("nightstand","drawers"));
	makeObjectInstance("nightstand", getFrameTransformation("nightstand") );
	
	makeFrame(13,2,4);
	makeObjectType("bedframe", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("nightstand","nightstand"));
	makeObjectInstance("bedframe", getFrameTransformation("bedframe") );
	
	makeFrame(12,1,3.5);
	makeObjectType("mattress", getFrameVertices(), getFrameTexCoords(), getFrameNormals(), getFrameTexStrings("mattress","mattress"));
	makeObjectInstance("mattress", getFrameTransformation("mattress") );
}
