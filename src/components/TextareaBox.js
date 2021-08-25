import React from 'react';
import '../App.css';



class TextareaBox extends React.Component {

    render() {
       return(
        <textarea defaultValue={this.props.item} className={this.props.className} onChange={(e) => this.props.onChange(e)}></textarea>
       ) 
       }

}  


export default TextareaBox;