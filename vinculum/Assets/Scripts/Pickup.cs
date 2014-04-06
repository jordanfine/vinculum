/*		credits: xtase studios - http://xtasestudios.com/scripts		*/
using UnityEngine;
using System.Collections;

[RequireComponent (typeof(Collider))]

public class Pickup : MonoBehaviour {

	// Use this for initialization
	void Start () {
		//Make sure collider is trigger
		collider.isTrigger = true;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnTriggerEnter(Collider col)
	{
		//Check if its the player that collides
		if(col.GetComponent<CharacterController>() != null)//if(col.gameObject.tag == "player") //Check by tag
		{
			//Do something when picked up
			
			//Delete Object
			Destroy(gameObject);
		}
	}
}