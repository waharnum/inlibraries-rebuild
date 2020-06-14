function getTopicFromURL() {
    let topic = window.location.hostname.split(".")[0];      
    return _.startCase(topic);
}

// Returns a random int between 0 and 'max'
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Returns a random item from an array
function getRandomItem(items) {
  return items[getRandomInt(items.length)];   
}

function conferenceDetails () {
    return {
        topic: getTopicFromURL(),          
        sessionTitles: [],
        speakers: [],
        sessionTitleTemplates: null,
        speakerTemplates: null,
        madlibs: null,
        loadTemplates() {                    
          let currentComponent = this;                     
          fetch("json/templates.json")            
            .then(response => response.json())
            .then(function(data) {
              currentComponent.sessionTitleTemplates = data.sessionTitleTemplates; 
              currentComponent.speakerTemplates = data.speakerTemplates; 
              currentComponent.madlibs = data.madlibs;                
              currentComponent.sessionTitles = currentComponent.generateGroup(3, true,  "generateSessionTitle");
              currentComponent.speakers = currentComponent.generateGroup(3, true,  "generateSpeaker");
              });                
        },
        generateSessionTitle() {                     
          return this.generateItem(this.sessionTitleTemplates);            
          
        },
        generateSpeaker() {
            return this.generateItem(this.speakerTemplates);
        },
        generateItem(templates) {
          let template = getRandomItem(templates);
          let context = {
            topic: this.topic,
            madlibs: this.madlibs
          };
          let generatedItem = nunjucks.renderString(template, context);
          return generatedItem;                 
        },
        generateGroup(number, noRepeats, generatorFunc) {
          let groupItems = [];
          for(let i =0; i<number; i++) {
            let proposedItem = this[generatorFunc]();
            if(noRepeats) {
              while(groupItems.includes(proposedItem)) {
                proposedItem = this[generatorFunc]();
              }
            }
            groupItems.push(proposedItem);
          }            
          return groupItems;
        }
    }
}