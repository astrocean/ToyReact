import {createElement,render,Component} from './toy-react';

class MyComponent extends Component{
    constructor(){
        super();
        this.state={
            topic:'ToyReact',
            count:1
        };
    }
    render(){
        return <div>
            MyComponent
            {this.state.topic.toString()}
            {this.state.count.toString()}
            <button onClick={()=>{
                this.setState({
                    count:this.state.count+1
                });
            }}>change</button>
            {this.children}
            </div>;
    }
}

render(
    <div>
        <MyComponent>
            <div
                id='container'
                class='container'
            >
                <h1>ToyReact</h1>
                <div>
                    <div>主题1</div>
                    <div>主题2</div>
                </div>
                <div></div>
            </div>
        </MyComponent>
    </div>,
    document.body
);