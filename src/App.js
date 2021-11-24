import './App.css';
import React from 'react';
import getData from './functions/getData';
import {CSVLink} from 'react-csv';
import AccordionRel from "./components/AccordionRel.js";
import AccordionCon from "./components/AccordionCon.js";
import generateRblang from "./functions/generateRblang.js";



class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        rblang: `<?xml version="1.0" encoding="utf-8"?>
        <rbl:kb xmlns:rbl="http://rbl.io/schema/RBLang">
          <concept name="TemperatureBath" type="number"/>
          <concept name="Person" type="string"/>
          <concept name="Tap water flow" type="string"/>
          <concept name="TapWaterTemperature" type="number"/>
          <concept name="BathLevelObjective" type="number"/>
          <concept name="BathLevel" type="number"/>
          <concept name="NewBathLevel" type="number"/>
          <concept name="VolumeAdded" type="number"/>
          <concept name="BathTemperatureObjective" type="number"/>
          <concept name="NewBathTemperature" type="string"/>
          <concept name="Tap water temperature" type="string"/>
          <concept name="Outcome" type="string"/>
          <rel name="Sets flow" subject="Person" object="Tap water flow"/>
          <rel name="Expects level of" subject="Person" object="BathLevelObjective"/>
          <rel name="have bath at level of" subject="Person" object="BathLevel"/>
          <rel name="Adds the amount" subject="Tap water flow" object="VolumeAdded"/>
          <rel name="Have a new bath level of" subject="Person" object="NewBathLevel"/>
          <rel name="have bath at temperature of" subject="Person" object="TemperatureBath"/>
          <rel name="Expects bath temperature at" subject="Person" object="BathTemperatureObjective"/>
          <rel name="have a new bath temperature of" subject="Person" object="NewBathTemperature"/>
          <rel name="Water is at temperature" subject="Tap water temperature" object="TapWaterTemperature"/>
          <rel name="Sets temperature at" subject="Person" object="Tap water temperature"/>
          <rel name="Overall combined outcome" subject="Person" object="Outcome" plural="true"/>
          <concinst name="Mat" type="Person"/>
          <concinst name="High" type="Tap water flow"/>
          <concinst name="Medium" type="Tap water flow"/>
          <concinst name="Low" type="Tap water flow"/>
          <concinst name="Stoped" type="Tap water flow"/>
          <concinst name="John" type="Person"/>
          <concinst name="High" type="Tap water temperature"/>
          <concinst name="Medium" type="Tap water temperature"/>
          <concinst name="Low" type="Tap water temperature"/>
          
          
          
          
          
          
          
          <relinst type="Sets flow" object="Stoped" cf="100">
            <condition expression="%BATHLEVEL gte %BATHLEVELOBJECTIVE"/>
            <condition rel="have bath at level of" subject="%S" object="%BATHLEVEL"/>
            <condition rel="Expects level of" subject="%S" object="%BATHLEVELOBJECTIVE"/>
          </relinst>
          <relinst type="Sets flow" object="Low" cf="100">
            <condition rel="Expects level of" subject="%S" object="%BATHLEVELOBJECTIVE"/>
            <condition rel="have bath at level of" subject="%S" object="%BATHLEVEL"/>
            <condition expression="%BATHLEVELOBJECTIVE lte (%BATHLEVEL + 5)"/>
            <condition expression="%BATHLEVELOBJECTIVE gt %BATHLEVEL"/>
          </relinst>
          <relinst type="Sets flow" object="Medium" cf="100">
            <condition rel="Expects level of" subject="%S" object="%BATHLEVELOBJECTIVE"/>
            <condition rel="have bath at level of" subject="%S" object="%BATHLEVEL"/>
            <condition expression="%BATHLEVELOBJECTIVE lte (%BATHLEVEL + 10)"/>
            <condition expression="%BATHLEVELOBJECTIVE gt (%BATHLEVEL + 5)"/>
          </relinst>
          <relinst type="Sets flow" object="High" cf="100">
            <condition rel="Expects level of" subject="%S" object="%BATHLEVELOBJECTIVE"/>
            <condition rel="have bath at level of" subject="%S" object="%BATHLEVEL"/>
            <condition expression="%BATHLEVELOBJECTIVE gt (%BATHLEVEL + 10)"/>
          </relinst>
          <relinst type="Adds the amount" subject="Stoped" object="0"/>
          <relinst type="Have a new bath level of" cf="100">
            <condition rel="have bath at level of" subject="%S" object="%BATHLEVEL"/>
            <condition rel="Sets flow" subject="%S" object="%TAP_WATER_FLOW"/>
            <condition rel="Adds the amount" subject="%TAP_WATER_FLOW" object="%VOLUMEADDED"/>
            <condition expression="%VOLUMEADDED + %BATHLEVEL" value="%O"/>
          </relinst>
          <relinst type="Sets temperature at" object="High" cf="100">
            <condition rel="have bath at temperature of" subject="%S" object="%TEMPERATUREBATH"/>
            <condition rel="Expects bath temperature at" subject="%S" object="%BATHTEMPERATUREOBJECTIVE"/>
            <condition expression="%BATHTEMPERATUREOBJECTIVE gte %TEMPERATUREBATH"/>
            <condition expression="%BATHTEMPERATUREOBJECTIVE gt 35"/>
          </relinst>
          <relinst type="Sets temperature at" object="Medium" cf="100">
            <condition rel="have bath at temperature of" subject="%S" object="%TEMPERATUREBATH"/>
            <condition rel="Expects bath temperature at" subject="%S" object="%BATHTEMPERATUREOBJECTIVE"/>
            <condition expression="((%TEMPERATUREBATH gt %BATHTEMPERATUREOBJECTIVE) and (%BATHTEMPERATUREOBJECTIVE gte 35)) or ((%TEMPERATUREBATH lte %BATHTEMPERATUREOBJECTIVE) and (%BATHTEMPERATUREOBJECTIVE lte 35))"/>
          </relinst>
          <relinst type="Sets temperature at" object="Low" cf="100">
            <condition rel="have bath at temperature of" subject="%S" object="%TEMPERATUREBATH"/>
            <condition rel="Expects bath temperature at" subject="%S" object="%BATHTEMPERATUREOBJECTIVE"/>
            <condition expression="(%BATHTEMPERATUREOBJECTIVE lt 35) and (%BATHTEMPERATUREOBJECTIVE lt %TEMPERATUREBATH)"/>
          </relinst>
          <relinst type="have a new bath temperature of" cf="100">
            <condition rel="Sets temperature at" subject="%S" object="%TAP_WATER_TEMPERATURE"/>
            <condition rel="Water is at temperature" subject="%TAP_WATER_TEMPERATURE" object="%TAPWATERTEMPERATURE"/>
            <condition rel="have bath at temperature of" subject="%S" object="%TEMPERATUREBATH"/>
            <condition expression="((%BATHLEVEL * %TEMPERATUREBATH) + (%VOLUMEADDED * %TAPWATERTEMPERATURE)) / %NEWBATHLEVEL" value="%O"/>
            <condition rel="Sets flow" subject="%S" object="%TAP_WATER_FLOW"/>
            <condition rel="Adds the amount" subject="%TAP_WATER_FLOW" object="%VOLUMEADDED"/>
            <condition rel="Have a new bath level of" subject="%S" object="%NEWBATHLEVEL"/>
            <condition rel="have bath at level of" subject="%S" object="%BATHLEVEL"/>
          </relinst>
          <relinst type="Overall combined outcome" cf="100">
            <condition expression="'Level:  ' + (%NEWBATHLEVEL)" value="%O"/>
            <condition rel="Have a new bath level of" subject="%S" object="%NEWBATHLEVEL"/>
          </relinst>
          <relinst type="Overall combined outcome" cf="100">
            <condition rel="have a new bath temperature of" subject="%S" object="%NEWBATHTEMPERATURE"/>
            <condition expression="'Temp: ' + %NEWBATHTEMPERATURE" value="%O"/>
          </relinst>
          <relinst type="Expects level of" subject="Mat" object="100"/>
        </rbl:kb>`,
        compil: "",
        panelDisplayRel: false, //start by hidding the relationship table//
        panelDisplayCon: false, //start by hidding the concept table//
        compilOut: ""
      };
    }

    //link the rblang input box with state.rblang//
    updateRblang = async (e) => {
      e.preventDefault();
      this.setState({rblang: e.target.value});
    }

    //update input box with the newly generated rblang, from the generateRblang function//
    applyChange() {
      if (this.state.compilOut !== "") {
        const newRblang = generateRblang(this.state.compilOut);
        this.setState({rblang: newRblang});
      }
    }

    //execute GetData function and put it in state.compil//
    onClick = () => {
      this.setState({compil: getData(this.state.rblang)});
    } 
  
    //toggle switch for relationship panel//
    displayPanelRel = () => {
      if (this.state.panelDisplayRel === true) {
        this.setState({
          panelDisplayRel: false,
        })
      } else {
        this.setState({
          panelDisplayRel: true,
        })
      }
    }

    //toggle switch for concept panel//
    displayPanelCon = () => {
      if (this.state.panelDisplayCon === true) {
        this.setState({
          panelDisplayCon: false,
        })
      } else {
        this.setState({
          panelDisplayCon: true,
        })
      }
    }

    //function to lift a change into App from a low level componnent//
    handleChange(newValue,itemType,index,accordionType) {
      var compilOut = this.state.compilOut
      if (compilOut === "") {compilOut = this.state.compil};
      compilOut[accordionType][index][itemType] = newValue;
      this.setState({compilOut: compilOut});
    }

    //function to lift a change into App from a low level componnent//
    handleChangeInstance(newValue,itemType,index,indexInstance,accordionType) {
      var compilOut = this.state.compilOut
      if (compilOut === "") {compilOut = this.state.compil};
      compilOut[accordionType][index][itemType][indexInstance] = newValue;
      this.setState({compilOut: compilOut});
    }



  
    render () {
      
      /*how to format csvData:
      csvData =[
      ['firstname', 'lastname', 'email'] ,
      ['John', 'Doe' , 'john.doe@xyz.com'] ,
      ['Jane', 'Doe' , 'jane.doe@xyz.com']
      ];*/

      //create default list to display in accordions//
      var listRelationships = [<li key="0">Click the extract button to get results</li>];
      var listConcepts = [<li key="0">Click the extract button to get results</li>];

      //initialise first row of CSV arrays//
      var csvData = [];  //array will start with following first row: [['Concept', 'Type', 'Instances','Subject','Relationship','Object','Plural','Allow Unknowns','Can Add','Askable','Allow CFs','Question Prompt']]//
      var csvConcepts = [['Concept', 'Type', 'Instances']];
      var csvRelationships = [['Relationship','Subject','Object','Plural','Allow Unknowns','Can Add','Askable','Allow CFs','Question Prompt']];


      

      if (this.state.compil !== "") { //checks if rblang has been extracted// //TODO: TAKE INTO ACCOUNT A CASE WERE THERE ARE CONCEPTS, BUT NOT REL AND THE OPOSITE//

        //populate CSV arrays for concepts//
        this.state.compil.concepts.map((concept) => csvConcepts.push([concept.concept,concept.type,concept.instances.join()]));
        //populate CSV arrays for relationships//
        this.state.compil.relationships.map((relationship) => csvRelationships.push(
          [
          relationship.relationship,
          relationship.subject,
          relationship.object,
          relationship.plural,
          relationship.allowUnknown,
          relationship.canAdd,
          relationship.askable,
          relationship.allowCF,
          relationship.qPrompts[0]
        ]));



        //populate CSV arrays for concepts + relationships//
          //check which of relationship or concept array is the biggest, iterates on the biggest//
        if (csvRelationships.length <= csvConcepts.length) {
          //iterates through Concepts array and concat it with 'mathcing index' of the Relationship array//
          csvData = csvConcepts.map((currElement, index) => {
            if(csvRelationships.length > index ) {return currElement.concat(csvRelationships[index])} else {return currElement}
          });
        } else {
          //iterates through Relationships array and concat it with 'mathcing index' of the Concepts array//
          csvData = csvRelationships.map((currElement, index) => {
            if(csvConcepts.length > index ) {return currElement.concat(csvConcepts[index])} else {return currElement}
          });
        }

      }
      
      console.log(this.state.compil)
    

      return (
        <div className="App">

          {/*menu bar*/}
          <div className="title-bar">RBLANG EXTRACTOR</div>

          {/*input box for rblang*/}
          <textarea className="inputrb" value={this.state.rblang} placeholder="Your RBLANG ..." onChange={(e) => this.updateRblang(e)}/>

          {/*extract button*/}
          <button onClick={() => this.onClick()}>Extract</button>

          {/*apply Rblang changes button*/}
          <button onClick={() => this.applyChange()}>Apply Rblang changes</button>

          {/*relationship table*/}
          <button className="accordion" onClick={() => this.displayPanelRel()}>Relationships</button>
          <AccordionRel
            onChange={(newValue,itemType,index,accordionType) => this.handleChange(newValue,itemType,index,accordionType)} 
            panelDisplay={this.state.panelDisplayRel}
            list={this.state.compil}
            defaultList={listRelationships}
          />

          {/*concept table*/}
          <button className="accordion" onClick={() => this.displayPanelCon()}>Concepts</button>
          <AccordionCon 
            onChange={(newValue,itemType,index,accordionType) => this.handleChange(newValue,itemType,index,accordionType)}
            onChangeInstance={(newValue,itemType,index,indexInstance,accordionType) => this.handleChangeInstance(newValue,itemType,index,indexInstance,accordionType)}
            panelDisplay={this.state.panelDisplayCon}
            list={this.state.compil}
            defaultList={listConcepts}
          />

          {/*download CSV file bar*/}
          <div className="icon-bar">
            <CSVLink className="icon-block" data={csvData} >Download Concepts and Relationships CSV</CSVLink>
            <CSVLink className="icon-block" data={csvConcepts} >Download Concepts CSV</CSVLink>
            <CSVLink className="icon-block" data={csvRelationships} >Download Relationships CSV</CSVLink>
          </div>
        </div>
      )
    }
  }

export default App;
