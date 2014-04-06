/*		credits: xtase studios - http://xtasestudios.com/scripts		*/
#pragma strict

public var randommaterial:boolean = false;
public var randomtexture:boolean = false;
public var randomcolor:boolean = false;

public var materials:Material[];
public var textures:Texture[];
public var colors:Color[];
	
function Start () {
	if(randommaterial && materials.Length != 0)
		RandomMaterial();
	if(randomtexture && textures.Length != 0)
		RandomTexture();
	if(randomcolor && colors.Length != 0)
		RandomColor(true);
	else if(randomcolor)
		RandomColor(false);
}
	
function RandomMaterial(){
	renderer.material = materials[Random.Range(0, materials.Length)];
}

function RandomTexture(){
	renderer.material.mainTexture = textures[Random.Range(0, textures.Length)];
}

function RandomColor(preset:boolean){
	if(preset)
		renderer.material.color = colors[Random.Range(0, colors.Length)];
	else
		renderer.material.color = new Color(Random.Range(0, 1f), Random.Range(0, 1f), Random.Range(0, 1f));
}
