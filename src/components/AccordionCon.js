import React from "react";
import TextareaBox from "./TextareaBox.js";
import SelectType from "./SelectType.js";

class AccordionCon extends React.Component {

    //lift up the new value, changed by the user, for Concpet name and type//
    handleChange(e, itemType,index) {
        e.preventDefault();
        const newValue = e.target.value;
        this.props.onChange(newValue,itemType,index,"concepts")
    }

    //lift up the new value, changed by the user, for Concept instances//
    handleChangeInstance(e, itemType,index, indexInstance) {
        e.preventDefault();
        const newValue = e.target.value;
        this.props.onChangeInstance(newValue,itemType,index,indexInstance,"concepts")
    }
    
    //function that create the accordion content: Concept Name + Concept Type + Array of concept instances//
    generateAccordionContent() {
        if (this.props.list !== "") {
            return this.props.list.concepts.map((currElement, index) => {

                //generate the list of concept instances//
                var instanceList = currElement.instances.map((instance, indexInstance) => {
                    return (
                        <TextareaBox 
                            item={instance}
                            className="textareaBoxConInstance"
                            onChange={(e) => this.handleChangeInstance(e,"instances",index, indexInstance)}
                            key={indexInstance}
                        /> 
                    )
                });

                return(
                    <div style={{display: "flex"}} key={index}>

                        {/*concept name*/}
                        <TextareaBox
                            item={currElement.concept}
                            className="textareaBoxCon"
                            onChange={(e) => this.handleChange(e,"name",index)}
                        />

                        {/*concept type*/}
                        <SelectType
                            initValue={currElement.type}
                            className="selectBoxCon"
                            onChange={(e) => this.handleChange(e,"type",index)}
                            optionList={[{display: "String", value: "string"},{display: "Number", value: "number"},{display: "Date", value: "date"},{display: "True / False", value: "truth"}]}
                        />

                        {/*list of concept instances*/}
                        <div className="divBoxCon">
                            {instanceList}
                        </div>
                    </div>
                )
            })
        } else {
            return this.props.defaultList;
        }
    }
  

    render() {

        //generate result to display in accordion//
        var result = this.generateAccordionContent();

        //return what's in result if panelDisplay (switch) is true//
        if (this.props.panelDisplay === true) {
            return (
                <div className="accordion__section">
                    <div className="accordion__content">
                        {result}
                    </div>
                </div>
            );} else {return null}
    }        
}

export default AccordionCon;