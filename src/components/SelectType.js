import React from 'react';
import '../App.css';



class SelectType extends React.Component {

    generateOptions() {
        return this.props.optionList.map((item,index) => <option value={item.value} key={index}>{item.display}</option>)
    }

    render() {
       return(
        <select name="conceptType" id="conceptType" className={this.props.className} value={this.props.initValue} onChange={(e) => this.props.onChange(e)}>
            {this.generateOptions()}
        </select>
       ) 
       }

}  


export default SelectType;