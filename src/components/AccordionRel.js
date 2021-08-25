import React from "react";
import TextareaBox from "./TextareaBox.js";
import SelectType from "./SelectType.js"

class AccordionRel extends React.Component {

  //lift up the new value, changed by the user, for Concpet name and type//
  handleChange(e, itemType,index) {
    e.preventDefault();
    const newValue = e.target.value;
    this.props.onChange(newValue,itemType,index,"relationships")
  }

  //function that create the accordion content: Concept Name + Concept Type + Array of concept instances//
  generateAccordionContent() {
      if (this.props.list !== "") {
          return this.props.list.relationships.map((currElement, index) => {

              return(
                <div key={index}>
                  <div style={{display: "flex"}} key={(index * 3) + 1}>
                      {/*relationship subject*/}
                      <TextareaBox
                          item={currElement.subject}
                          className="textareaBoxCon"
                          onChange={(e) => this.handleChange(e,"subjects",index)}
                      />

                      {/*relationship name*/}
                      <TextareaBox
                          item={currElement.relationship}
                          className="textareaBoxCon"
                          onChange={(e) => this.handleChange(e,"relationships",index)}
                      />

                      {/*relationship object*/}
                      <TextareaBox
                          item={currElement.object}
                          className="textareaBoxCon"
                          onChange={(e) => this.handleChange(e,"objects",index)}
                      />
                  </div>

                  <div style={{display: "flex"}} key={(index * 3) + 2}>    
                      {/*relationship canAdd*/}
                      <SelectType
                            initValue={currElement.canAdd}
                            className="selectBoxCon"
                            onChange={(e) => this.handleChange(e,"canAdds",index)}
                            optionList={[{display: "All", value: "all"},{display: "None", value: "none"},{display: "Subject", value: "subject"},{display: "Object", value: "object"}]}
                      />

                      {/*relationship allowCF*/}
                      <SelectType
                            initValue={currElement.allowCF}
                            className="selectBoxCon"
                            onChange={(e) => this.handleChange(e,"allowCFs",index)}
                            optionList={[{display: "On", value: "true"},{display: "Off", value: "false"}]}
                      />

                      {/*relationship plural*/}
                      <SelectType
                            initValue={currElement.plural}
                            className="selectBoxCon"
                            onChange={(e) => this.handleChange(e,"plurals",index)}
                            optionList={[{display: "Plural", value: "true"},{display: "Singular", value: "false"}]}
                      />

                      {/*relationship allowUnknown*/}
                      <SelectType
                            initValue={currElement.allowUnknown}
                            className="selectBoxCon"
                            onChange={(e) => this.handleChange(e,"allowUnknowns",index)}
                            optionList={[{display: "Can skip", value: "true"},{display: "Can NOT skip", value: "false"}]}
                      />
                  </div>

                  <div style={{display: "flex"}} key={(index * 3) + 3}>    
                      {/*relationship askable*/}
                      <SelectType
                            initValue={currElement.askable}
                            className="selectBoxCon"
                            onChange={(e) => this.handleChange(e,"askables",index)}
                            optionList={[{display: "Second Form Object", value: "secondFormObject"},{display: "Second Form Subject", value: "secondFormSubject"},{display: "None", value: "none"},{display: "All", value: "all"}]}
                      />

                      {/*relationship prompt*/}
                      <TextareaBox
                          item={currElement.qPrompts}
                          className="textareaBoxCon"
                          onChange={(e) => this.handleChange(e,"qPrompts",index)}
                      />
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
        );
      } else {return null}
  }  

}

export default AccordionRel;