//TODO
  //meta data feature



function getData(data) {
  
  //initialise data variables//
  var dataStringyfied =  JSON.stringify(data);

  //initialise relationship variables//
  var rel = [
    /*{
      relationship: [],
      subject: [],
      object: [],
      plural: [],
      allowUnknown: [],
      canAdd: [],
      askable: [],
      allowCF: [],
      qPrompts: [] 
    }*/
  ];

  //initialise concept variables//
  var con = [
    /*concept: [],
    type : [],
    instances: [],*/
  ];


  //initialise concept instance variable//
  var concinst = [
    /*name: [],
    type : []*/
  ];

  //initialise rules variables//
  var rul = [
    /*rules: {
        type:
        subject:
        object:
        cf:
        altText:
        behaviour:
        minimum-rule-certainty:
        conditions: [{
          expression:
          rel:
          object:
          subject:
          behaviour: //optional mandatory
          weigth:
          value: //for expression
          altText:
        }*/
  ];



  //go through the full string, each iteration treats one relationship or concept or fact or rule //
  function extract(type,object,data) {

    //initialise parameters//
    var mainTags = [];
    var parameterTags = [];
    var parameters = [];
    var questionTags = [];

    switch (type) {
      case 'relationship': 
        mainTags = {start: '<rel ', end: '</rel>'};
        parameterTags = ['name=\\"','subject=\\"','object=\\"','plural=\\"','allowUnknown=\\"','canAdd=\\"','askable=\\"','allowCF=\\"'];
        questionTags = ['secondFormObject','secondFormSubject','firstForm']
        parameters = ['relationship','subject','object','plural','allowUnknown','canAdd','askable','allowCF'];
      break;
      case 'concept': 
        mainTags = {start: '<concept ', end: '</concept>'};
        parameterTags = ['name=\\"','type=\\"'];
        parameters = ['concept','type'];
      break;
      case 'concept instance': 
        mainTags = {start:'<concinst ', end: '</concinst>'};
        parameterTags = ['name=\\"','type=\\"'];
        parameters = ['name','type'];
      break;
      case 'rule + fact': 
        mainTags = {start: '<relinst ', end: '</relinst>'};
        parameterTags = ['type=\\"','subject=\\"','object=\\"','cf=\\"','altText=\\"','behaviour=\\"','minimum-rule-certainty=\\"'];
        parameters = ['type','subject','object','cf','altText','behaviour','minimum-rule-certainty'];
      break;
      case 'condition':
        mainTags = {start: '<condition ', end: '</condition>'}
        parameterTags = ['rel=\\"','expression=\\"','subject=\\"','object=\\"','behaviour=\\"','weigth=\\"','value=\\"','altText=\\"'];
        parameters = ['rel','expression','subject','object','behaviour','weigth','value','altText'];
      break;
    }

    while (data.indexOf(mainTags.start) !== -1) {
      //initialise object//
      object.push({});
      const objectIndex = object.length - 1;


      //cut whatever is before the first relationship, concept, fact or rule//
      data = data.slice(data.indexOf(mainTags.start) - 1 );

      //populate each tag once per iteration, treat all cases but questions prompts//
      parameterTags.forEach((item,index) => {
        //if statement to  check if the parameter is referenced in the rblang, some parameters are optional//
        if (data.slice(0,data.indexOf(mainTags.end)).indexOf(item) === -1 || data.slice(0,data.indexOf('/>')).indexOf(item) === -1) {
          object[objectIndex][parameters[index]] = 0
        } else {
          const min = data.indexOf(item) + (item.length);
          const max = data.slice(min).indexOf('\\"') + min;

          //put in the last item of the array the vlaues which have just been extracted//
          object[objectIndex][parameters[index]] = data.slice(min, max).replace(/,/g,';'); // replace to remove all commas, commas then breaks the CSV export//
        }
      });

      //populate qPrompt inner array, only for relationships//
      if (type === 'relationship') {
        //initialise qPrompt array//
        object[objectIndex].qPrompts = [];

        questionTags.forEach((item) => {
          //if statement to  check if the parameter is referenced in the rblang, some parameters are optional//
          if (data.slice(0,data.indexOf(mainTags.end)).indexOf(`<${item}>`) === -1 || data.slice(0,data.indexOf('/>')).indexOf(`<${item}>`) === -1) {
            const qPromptsIndex = object[objectIndex].qPrompts.length;
            object[objectIndex].qPrompts[qPromptsIndex] = 0;
          } else {
            const qPromptsIndex = object[objectIndex].qPrompts.length;
            const qmin = data.indexOf(`<${item}>`) + item.length + 2;
            const qmax = data.slice(qmin).indexOf(`</${item}>`) + qmin;
            object[objectIndex].qPrompts[qPromptsIndex] = {
              form: item,
              prompt: data.slice(qmin, qmax).replace(/,/g,';') //replace to remove all commas, commas then breaks the CSV export//
            }; 
          };
        })
      }

      //recursive bit to create the object for conditions//
      if (type === 'rule + fact') {
        var cond = [];
        var conditions = extract('condition',cond,data.slice(0,data.indexOf(mainTags.end)));
        object[objectIndex].conditions = conditions;
      }

      //cut the relationship, concept, fact, or rule which has just been treated//
      if (data.indexOf(mainTags.end) === -1) {data = data.slice(data.indexOf('/>') + 2);} else {
        if (data.indexOf('/>') === -1) { data = data.slice(data.indexOf(mainTags.end) + mainTags.end.length);} else {
        data = data.slice(Math.min(data.indexOf(mainTags.end) + 6,data.indexOf('/>') + 2));
      }};
    }
    return object
  }


  //extract all//
  var relationships = extract('relationship',rel,dataStringyfied);
  var concepts =  extract('concept',con,dataStringyfied);
  var conceptInstances = extract('concept instance',concinst,dataStringyfied);
  var rules = extract('rule + fact',rul,dataStringyfied);



  //put the concept instances inside the concept object//
  concepts.forEach((concept,index) => {concepts[index].instances = [];})
  conceptInstances.forEach((conceptInstance) => {
    const conceptIndex = concepts.findIndex((concept) => concept.concept === conceptInstance.type);
    if (conceptIndex !== undefined) {
      concepts[conceptIndex].instances.push(conceptInstance.name)
    }
  })

  //create and return the final compil object//
  const compil = {relationships: relationships, concepts: concepts, rules: rules};
  return compil
}


export default getData;