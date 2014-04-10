#pragma strict

public var flashlightMask : Transform; //The object that needs to be moved
public var offset = Vector3(0, 0, -10);

function Update () {
    if(flashlightMask){
        flashlightMask.position = camera.ScreenPointToRay(Input.mousePosition).origin+camera.transform.TransformDirection(offset);
        }

}