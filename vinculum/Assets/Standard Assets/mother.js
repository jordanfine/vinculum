#pragma strict

var boyMom: GameObject;
private var gameData : GameObject;

//This is the physical data
private var gd : GameData; 

function Start () {
	boyMom = GameObject.Find("BoyMom");
	boyMom.renderer.enabled = false;
	gameData = GameObject.Find("GameData");
	//This retrieves the GameData object from our GameObject
	gd = gameData.GetComponent(UserInterface).data;
}

function Update () {
	//Debug.Log(gd.currentLevel);
	if(gd.currentLevel==5){
		boyMom.renderer.enabled = false;
	}
	if(gd.currentLevel==6){
		boyMom.renderer.enabled = true;
	}
}