/*		credits: xtase studios - http://xtasestudios.com/scripts		*/
#pragma strict

@script RequireComponent (Light)

public var time:float = 0.5f; //time between on and off
	
function Start () {
	StartCoroutine("Flicker");
}

function Update () {

}
	
function Flicker (){
	while(boolean){
		light.enabled = false;
		yield WaitForSeconds(time);
		light.enabled = true;
		yield WaitForSeconds(time);
	}
}