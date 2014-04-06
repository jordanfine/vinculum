#pragma strict

public class GameData extends ScriptableObject {

	class SceneData {
		public var sceneId : int;
		public var sceneArray : Array;
		
		function SceneData(id, scene){
    		this.sceneId = id;
    		this.sceneArray = scene;
    	}
	}
	
	class DialogueData {
    	public var levelId: int;
    	public var scene: int;
		public var sceneData: SceneData[];

    	function DialogueData(levelId, scene, sceneData){
    		this.levelId = levelId;
    		this.scene = scene;
    		this.sceneData = sceneData;
    	}
	} 
		//THIS IS WHERE ALL THE DATA FOR GAME CAN GO
	class CharacterData {
    	public var name: String;
    	public var id: int;
		public var dialogueData: DialogueData[];

    	
    	function CharacterData(name, id, dialogue){
    		this.name = name;
    		this.id = id;
    		this.dialogueData = dialogue;
    	}
	} 
	var characters : CharacterData[];
	var currentLevel : int;
	var talking : boolean;
	
	function GameData(){
		//ARB. NUMBER USED...FIX 10 TO WHATEVER AMOUNT OF CHARACTERS...MAYBE CREATE SEPERATE NPC ARRAY?
		currentLevel = 0;
		characters = new CharacterData[10];
		
		//Add 
//		greetingData = new Hashtable();
//		greetingData.add(0, "Hi! I'm Edith");
//		greetingData.add(1, "How are you?");
//		
//		altgreetingData = new Hashtable();
//		altgreetingData.add(0, "Hi! I'm Edith");
//		altgreetingData.add(1, "How are you?");
//		dialogue.add(0,greetingData);
//		dialogue.add(1,altgreetingData);
		
//		edithDialogue = {
//			0: [["Hi I'm Edith"],["No"]],
//			1: "e"
//		};
//		
		var introScene_Edith = new SceneData(0,["Hi! I'm Edith!", "Goodbye"]);
		var gateScene_Edith = new SceneData(1,["Let Me in!!", "Goodbye"]);
		var edithDialogue = new DialogueData(0,1,[introScene_Edith, gateScene_Edith]);
		var edithDiaArray = [edithDialogue,edithDialogue];
		
		
		//So for conversation between an NPC and Edith,the scene IDs would have to match!! 
		var gateScene_Franz = new SceneData(0,["The mansion of the gilded council members is a landmark for Vinculum. It was built in the 1960s under the supervision of the first council. Vinculum is a symbol of eternity. The architecture style is supposed to represent the eternal life we will seek at the end of the light.","The lighthouse was the first building to be built when Vinculum was founded in 1964. It’s the only place in the world where your soul will be taken to the next life. Isn’t that just great?"]);
		var franzDialogue = new DialogueData(0,0,[gateScene_Franz]);
		
		//CREATE GAME DATA HERE: CHARACTERS
		characters[0] = new CharacterData("Edith", 1, edithDiaArray);
		characters[1] = new CharacterData("Franz Cumbersome", 2, [franzDialogue]);
		
		//characters[1] = new CharacterData("Doctor", 2, "Hi, I'm the Doctor!");
		
		//Figure out a way we can maybe dynamically add all the data without tedious stuff from above
	}
		
}