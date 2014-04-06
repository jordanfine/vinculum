/*		credits: xtase studios - http://xtasestudios.com/scripts		*/
#pragma strict

function Start () {

}

function Update () {
	if (!particleSystem.IsAlive()) 
		Destroy (gameObject);
}