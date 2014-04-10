#pragma strict

var moveSpeed:float = 20;
 
private var targetPosition:Vector2;
private var targetDistance:float;
 
function Update () {
 
	targetDistance = Vector2.Distance(targetPosition, transform.position);
	
	if(targetDistance < 1){ // prevents shaking when it reaches location
		moveSpeed = 0;
	}
	else if(targetDistance > 1){
		moveSpeed = 20;
	}
	
	if(Input.GetKey(KeyCode.Mouse0)) // sprite will move on click & hold
	{
		var playerPlane = new Plane(Vector2.up, transform.position);
		var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		var hitdist:float = 0.0;
 
		if (playerPlane.Raycast (ray, hitdist)) {
			targetPosition = ray.GetPoint(hitdist);
		}
	}
 
	if(targetDistance > 1){ // Prevents code running when it doesn't need to
		transform.position += (targetPosition - transform.position).normalized * moveSpeed * Time.deltaTime;
	}
	transform.position.y = 0;
}