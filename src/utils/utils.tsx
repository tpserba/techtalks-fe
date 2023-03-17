export function hasContent(thing: any): boolean {
    let is = false;    
    if(typeof thing === 'object' && thing !== null && thing !== undefined) {
        is = true;
        if(Object.keys(thing).length === 0) {
            is = false;
        }
    }
    if (typeof thing === 'number' && thing !== null && thing !== undefined) {
        is = true;
    }

    if (typeof thing === 'string' && thing) {
        is = true;
    }   
    return is;
}