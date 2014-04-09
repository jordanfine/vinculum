#pragma strict

private var gameData : GameObject;

//This is the physical data
private var gd : GameData; 

function Start () {

	gameData = GameObject.Find("GameData");
	GameObject.DontDestroyOnLoad(gameData);
	//This retrieves the GameData object from our GameObject
	gd = gameData.GetComponent(UserInterface).data;
}

function Update () {

}

function OnMouseDown () {

	gd.currentLevel++;
	
	Debug.Log(gd.currentLevel);

}