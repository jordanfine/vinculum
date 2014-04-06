/*		credits: xtase studios - http://xtasestudios.com/scripts		*/
#pragma strict

@script RequireComponent (Collider)

function Start () {
	//Make sure collider is trigger
	collider.isTrigger = true;
}

function Update () {

}
function OnTriggerEnter(col:Collider)
{
	//Check if its the player that collides
	if(col.GetComponent(CharacterController) != null)//if(col.gameObject.tag == "player") //Check by tag
	{
		//Do something when picked up
		
		//Delete Object
		Destroy(gameObject);
	}
}