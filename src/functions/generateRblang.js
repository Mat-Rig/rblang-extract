//TODO: make meta data feature + qprompts + datasource


function generateRblang(compilOut) {

    //initialise rblangOut//
    var rblangOut = `<?xml version="1.0" encoding="utf-8"?>
    <rbl:kb xmlns:rbl="http://rbl.io/schema/RBLang">
    `;


    //create the concept lines//
    rblangOut = rblangOut + compilOut.concepts.map((item) => `<concept name="${item.concept}" type="${item.type}"/>
    `).join("");


    //create the concept instances//
    rblangOut = rblangOut + compilOut.concepts.map((item) => item.instances.map((instance) => `<concinst name="${instance}" type="${item.concept}"/>
    `).join("")).join("");


    //create the relationship lines//
    var relationshipLines = compilOut.relationships.map((item) => {
        var result = `<rel name="${item.relationship}" subject="${item.subject}" object="${item.object}" `
        if (item.plural !== 0 && item.plural !== "false") {result = result + `plural="${item.plural}" `};
        if (item.allowUnknown !== 0 && item.allowUnknown !== "false") {result = result + `allowUnknown="${item.allowUnknown}" `};
        if (item.canAdd !== 0 && item.canAdd !== "true") {result = result + `canAdd="${item.canAdd}" `};
        if (item.askable !== 0 && item.askable !== "all") {result = result + `askable="${item.askable}" `};
        if (item.allowCF !== 0 && item.allowCF !== "true") {result = result + `allowCF="${item.allowCF}" `};

       /* if (item.qPrompts !== [0,0,0]) {
            result = result + `>
            `
            console.log(item.qPrompts)
            item.qPrompts.forEach((qPrompt) => {
                if (qPrompt !== 0) {result = result + `
                <${qPrompt.form}>${qPrompt.prompt}</${qPrompt.form}>
                `}
            });
            result = result + `</rel>
            `
        } else {*/    //REDO THIS PART, in compilOut qPrompt is a string like this "0,some question prompt,some other question prompt" rework the way compilOut.relationships.qPrompt is built
            result = result + `/>
            `
        
        return result   
    }).join("");
    rblangOut = rblangOut + relationshipLines;


    //create the rules + conditions lines or fact//
    var relinstLines = compilOut.rules.map((item) => {
        var result = `<relinst type="${item.type}" cf="${item.cf}" `
        if (item.subject !== 0) {result = result + `subject="${item.subject}" `};
        if (item.object !== 0) {result = result + `object="${item.object}" `};
        if (item.altText !== 0) {result = result + `alt="${item.altText}" `};
        if (item.behaviour !== 0) {result = result + `behaviour="${item.behaviour}" `};
        if (item['minimum-rule-certainty'] !== 0) {result = result + `minimum-rule-certainty="${item['minimum-rule-certainty']}" `};
        console.log(item.conditions)
        if (item.conditions !== []) {
            result = result + `>
            `
            item.conditions.forEach((condition) => {
                if (condition.rel !== 0) {
                    result = result + `<condition rel="${condition.rel}" `
                } else {
                    result = result + `<condition expression="${condition.expression}" `
                }
                if (condition.object !== 0) {result = result + `object="${condition.object}" `}
                if (condition.subject !== 0) {result = result + `subject="${condition.subject}" `}
                if (condition.behaviour !== 0) {result = result + `behaviour="${condition.behaviour}" `}
                if (condition.weigth !== 0) {result = result + `weigth="${condition.weigth}" `} //recallculate the actual weight (an operation is made here, not the one implemented by the user)//
                if (condition.value !== 0) {result = result + `value="${condition.value}" `}
                if (condition.altText !== 0) {result = result + `alt="${condition.altText}" `}
                result = result + `>
                </relinst>
                `
            })
        } else {
            result = result + `/>
            `
        }
        return result
    }).join("")
    rblangOut = rblangOut + relinstLines;

    //close the rblang tag//
    rblangOut = rblangOut + `</rbl:kb>`;

    return rblangOut

}

export default generateRblang;