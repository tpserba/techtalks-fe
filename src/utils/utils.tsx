export function hasContent(thing: any): boolean{
    if(thing !==  null&& thing !== undefined){
        if(typeof thing === "string"){
            if(thing === "") {
               thing =  false
            }else {
                thing = true;
            }
        }
        return true;
    }
    return false;

}