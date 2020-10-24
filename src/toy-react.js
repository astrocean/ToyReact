let RENDER_TO_DOM=Symbol('render to dom');

export class Component{
    constructor(){
        this.props={};
        this.children=[];
        // this._root=null;
        this._range=null;
    }
    setAttribute(name,value){
        this.props[name]=value;
    }
    appendChild(component){
        this.children.push(component);
    }
    setState(newState){
        if(this.state===null||typeof this.state!=='object'){
            this.state=newState;
            this.reRender();
            return;
        }
        let merge=(oldState,_newState)=>{
            for(let key in _newState){
                if(oldState[key]===null||typeof oldState[key]!=='object'){
                    oldState[key]=_newState[key];
                }else{
                    merge(oldState[key],_newState[key]);
                }
            }
        }
        merge(this.state,newState);
        this.reRender();
    }
    reRender(){
        this._range.deleteContents();
        this[RENDER_TO_DOM](this._range);
    }
    [RENDER_TO_DOM](range){
        this._range=range;
        this.render()[RENDER_TO_DOM](range);
    }
    // get root(){
    //     if(!this._root){
    //         this._root=this.render().root;
    //     }
    //     return this._root;
    // }
}

class ElementWrapper{
    constructor(type){
        this.root=document.createElement(type);
        console.log(this);
    }
    setAttribute(name,value){
        if(name.match(/^on([\s\S]+)$/)){
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/,(word)=>{
                return word.toLowerCase();
            }),value);
        }else{
            this.root.setAttribute(name,value);
        }
    }
    appendChild(component){
        let range=document.createRange();
        range.setStart(this.root,this.root.childNodes.length);
        range.setEnd(this.root,this.root.childNodes.length);
        component[RENDER_TO_DOM](range);
    }
    [RENDER_TO_DOM](range){
        range.deleteContents();
        range.insertNode(this.root);
    }
}

class TextWrapper{
    constructor(content){
        this.root=document.createTextNode(content);
    }
    [RENDER_TO_DOM](range){
        range.deleteContents();
        range.insertNode(this.root);
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
    let range=document.createRange();
    range.setStart(parentElement,0);
    range.setEnd(parentElement,parentElement.childNodes.length);
    range.deleteContents();
    component[RENDER_TO_DOM](range);
}