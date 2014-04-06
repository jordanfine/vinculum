/*		credits: xtase studios - http://xtasestudios.com/scripts		*/
using UnityEngine;
using System.Collections;

public class RandomLook : MonoBehaviour {

	public bool randommaterial = false;
	public bool randomtexture = false;
	public bool randomcolor = false;
	
	public Material[] materials;
	public Texture[] textures;
	public Color[] colors;
	
	// Use this for initialization
	void Start () {
		if(randommaterial && materials.Length != 0)
			RandomMaterial();
		if(randomtexture && textures.Length != 0)
			RandomTexture();
		if(randomcolor && colors.Length != 0)
			RandomColor(true);
		else if(randomcolor)
			RandomColor(false);
	}
	
	void RandomMaterial(){
		renderer.material = materials[Random.Range(0, materials.Length)];
	}
	
	void RandomTexture(){
		renderer.material.mainTexture = textures[Random.Range(0, textures.Length)];
	}
	
	void RandomColor(bool preset){
		if(preset)
			renderer.material.color = colors[Random.Range(0, colors.Length)];
		else
			renderer.material.color = new Color(Random.Range(0, 1f), Random.Range(0, 1f), Random.Range(0, 1f));
	}
}
