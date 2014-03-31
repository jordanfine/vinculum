#pragma strict

public class GameData extends ScriptableObject {

	//THIS IS WHERE ALL THE DATA FOR GAME CAN GO
	class CharacterData {
    	public var name: String;
    	public var id: int;
		public var dialogue: String;
    	
    	function CharacterData(name, id, dialogue){
    		this.name = name;
    		this.id = id;
    		this.dialogue = dialogue;
    	}
	} 
	
	var characters : CharacterData[];
	var currentLevel : int;
	
	function GameData(){
		//ARB. NUMBER USED...FIX 10 TO WHATEVER AMOUNT OF CHARACTERS...MAYBE CREATE SEPERATE NPC ARRAY?
		currentLevel = 0;
		characters = new CharacterData[10];
		
		//CREATE GAME DATA HERE: CHARACTERS
		characters[0] = new CharacterData("Edith", 1, "Hi, I'm Edith!");
		characters[1] = new CharacterData("Doctor", 2, "Hi, I'm the Doctor!");
		
		//Figure out a way we can maybe dynamically add all the data without tedious stuff from above
	}
		
}