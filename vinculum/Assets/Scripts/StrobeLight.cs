/*		credits: xtase studios - http://xtasestudios.com/scripts		*/
using UnityEngine;
using System.Collections;

[RequireComponent (typeof(Light))]

public class StrobeLight : MonoBehaviour {

	public float time = .5f; //time between on and off
	
	// Use this for initialization
	void Start () {
		StartCoroutine("Flicker");
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	IEnumerator Flicker(){
		while(true){
			light.enabled = false;
			yield return new WaitForSeconds(time);
			light.enabled = true;
			yield return new WaitForSeconds(time);
		}
	}
}
