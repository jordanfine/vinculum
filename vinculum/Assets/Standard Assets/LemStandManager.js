#pragma strict

private var gameData : GameObject;

//This is the physical data
private var gd : GameData; 

var hum : AudioClip;

function Start () {

	gameData = GameObject.Find("GameData");
	GameObject.DontDestroyOnLoad(gameData);
	//This retrieves the GameData object from our GameObject
	gd = gameData.GetComponent(UserInterface).data;
	HandleLem();
}

function Update () {
		
		
}

function HandleLem () {

	if(gd.currentLevel==4){
	
		audio.PlayOneShot(hum);
	
	}
	
	Debug.Log(gd.currentLevel);

}