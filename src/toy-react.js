
export class Component{
    constructor(){
        this.props={};
        this.children=[];
        this._root=null;
    }
    setAttribute(name,value){
        this.props[name]=value;
    }
    appendChild(component){
        this.children.push(component);
    }
    get root(){
        if(!this._root){
            this._root=this.render().root;
        }
        return this._root;
    }
}

class ElementWrapper{
    constructor(type){
        this.root=document.createElement(type);
        console.log(this);
    }
    setAttribute(name,value){
       this.root.setAttribute(name,value);
       
    }
    appendChild(component){
        this.root.appendChild(component.root);
    }
}

class TextWrapper{
    constructor(content){
        this.root=document.createTextNode(content);
    }
}

export const createElement=(type,attributes,...children)=>{
    let el;
    if(typeof type ==='string'){
        el=new ElementWrapper(type);
    }else{
        el=new type;
    }

    for(let name in attributes){
        el.setAttribute(name,attributes[name]);
    }
    let appendChildren=(_children)=>{
        for(let child of _children){
            if(typeof child ==='string'){
                child=new TextWrapper(child);
            }
            if(typeof child === 'object' && child instanceof Array){
                appendChildren(child); 
            }else{
                el.appendChild(child); 
            }
        }
    }
    appendChildren(children);
    
    return el;
}

export const render=(component,parentElement)=>{
   parentElement.appendChild(component.root);
}