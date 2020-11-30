import customElements from '../../resources/test2.json';

export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate,
    } = this;

    function createTask(Systemtype, appID, AssSystemtype) {
      return function(event) {

	  const businessObject = bpmnFactory.create(Systemtype);

       businessObject.ApplicationID = appID;
	   businessObject.AssistanceSystemType = AssSystemtype;

	  console.log(appID + ' ' + Systemtype);

        const shape = elementFactory.createShape({

		  type: Systemtype,
          businessObject: businessObject
        });

        create.start(event, shape);
      }
    }

	function changeClass(name, type) {
		if(type == 'bpmn:DataObjectReference') {
			console.log('test1' + " " + name);
			return 'bpmn-icon-data-object' + " " + name;
		}
		if(type == 'bpmn:Task') {
			console.log('test2' + " " + name);
			return 'bpmn-icon-task' + " " + name;
		}
		return 'fehler'
	}

    return {
'task0': {
group: 'artifact',
className: changeClass(customElements.types[0].name, customElements.types[0].type),
title: translate(customElements.types[0].titlePalette),
action: {
dragstart: createTask(customElements.types[0].type, customElements.types[0].ApplicationID, customElements.types[0].AssistanceSystemType),
click: createTask(customElements.types[0].type, customElements.types[0].ApplicationID, customElements.types[0].AssistanceSystemType)
}
},
'task1': {
group: 'artifact',
className: changeClass(customElements.types[1].name, customElements.types[1].type),
title: translate(customElements.types[1].titlePalette),
action: {
dragstart: createTask(customElements.types[1].type, customElements.types[1].ApplicationID, customElements.types[1].AssistanceSystemType),
click: createTask(customElements.types[1].type, customElements.types[1].ApplicationID, customElements.types[1].AssistanceSystemType)
}
},
'task2': {
group: 'artifact',
className: changeClass(customElements.types[2].name, customElements.types[2].type),
title: translate(customElements.types[2].titlePalette),
action: {
dragstart: createTask(customElements.types[2].type, customElements.types[2].ApplicationID, customElements.types[2].AssistanceSystemType),
click: createTask(customElements.types[2].type, customElements.types[2].ApplicationID, customElements.types[2].AssistanceSystemType)
}
},
'task3': {
group: 'artifact',
className: changeClass(customElements.types[3].name, customElements.types[3].type),
title: translate(customElements.types[3].titlePalette),
action: {
dragstart: createTask(customElements.types[3].type, customElements.types[3].ApplicationID, customElements.types[3].AssistanceSystemType),
click: createTask(customElements.types[3].type, customElements.types[3].ApplicationID, customElements.types[3].AssistanceSystemType)
}
},
'task4': {
group: 'artifact',
className: changeClass(customElements.types[4].name, customElements.types[4].type),
title: translate(customElements.types[4].titlePalette),
action: {
dragstart: createTask(customElements.types[4].type, customElements.types[4].ApplicationID, customElements.types[4].AssistanceSystemType),
click: createTask(customElements.types[4].type, customElements.types[4].ApplicationID, customElements.types[4].AssistanceSystemType)
}
},
'task5': {
group: 'artifact',
className: changeClass(customElements.types[5].name, customElements.types[5].type),
title: translate(customElements.types[5].titlePalette),
action: {
dragstart: createTask(customElements.types[5].type, customElements.types[5].ApplicationID, customElements.types[5].AssistanceSystemType),
click: createTask(customElements.types[5].type, customElements.types[5].ApplicationID, customElements.types[5].AssistanceSystemType)
}
},
'task6': {
group: 'artifact',
className: changeClass(customElements.types[6].name, customElements.types[6].type),
title: translate(customElements.types[6].titlePalette),
action: {
dragstart: createTask(customElements.types[6].type, customElements.types[6].ApplicationID, customElements.types[6].AssistanceSystemType),
click: createTask(customElements.types[6].type, customElements.types[6].ApplicationID, customElements.types[6].AssistanceSystemType)
}
},
'task7': {
group: 'artifact',
className: changeClass(customElements.types[7].name, customElements.types[7].type),
title: translate(customElements.types[7].titlePalette),
action: {
dragstart: createTask(customElements.types[7].type, customElements.types[7].ApplicationID, customElements.types[7].AssistanceSystemType),
click: createTask(customElements.types[7].type, customElements.types[7].ApplicationID, customElements.types[7].AssistanceSystemType)
}
},
'task8': {
group: 'artifact',
className: changeClass(customElements.types[8].name, customElements.types[8].type),
title: translate(customElements.types[8].titlePalette),
action: {
dragstart: createTask(customElements.types[8].type, customElements.types[8].ApplicationID, customElements.types[8].AssistanceSystemType),
click: createTask(customElements.types[8].type, customElements.types[8].ApplicationID, customElements.types[8].AssistanceSystemType)
}
}

	}


  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
];
