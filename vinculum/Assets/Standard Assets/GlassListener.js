#pragma strict

private var gameData : GameObject;

//This is the physical data
private var gd : GameData;

public var glasses : AudioClip;

function Start () {

	gameData = GameObject.Find("GameData");
	GameObject.DontDestroyOnLoad(gameData);
	//This retrieves the GameData object from our GameObject
	gd = gameData.GetComponent(UserInterface).data;

}

function Update () {

}

function OnMouseDown () {

	AudioSource.PlayClipAtPoint(glasses, transform.position);

}