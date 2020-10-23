import {createElement,render,Component} from './toy-react';

class MyComponent extends Component{
    render(){
        return <div>
            MyComponent
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