function makeOverlay(frame_width, frame_height)
{	
	var overlay =
	[
		vec4( -frame_width, 0, 0.1, 1.0),
		vec4( -frame_width, frame_height, 0.1, 1.0),
		vec4(  frame_width, frame_height,  0.1, 1.0 ),
		vec4(  frame_width, 0, 0.1, 1.0 )
	];
	
	frame_vertices = overlay;
	makeRectangle(true);

}

function getOverlayTexStrings(imageID)
{
	frameTexStringsArray = [];
	frameTexStringsArray.push(imageID);

	return frameTexStringsArray;
}