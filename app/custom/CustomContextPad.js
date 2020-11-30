import customElements from '../../resources/test2.json';

export default class CustomContextPad {
  constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    function appendServiceTask(SystemType, appID, AssSystemType) {
      return function(event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create(SystemType);

          businessObject.ApplicationID = appID;
		  businessObject.AssistanceSystemType = AssSystemType;

          const shape = elementFactory.createShape({
            type: SystemType,
            businessObject: businessObject
          });

          autoPlace.append(element, shape);
        } else {
          appendServiceTaskStart(event, element);
        }
      }
    }

    function appendServiceTaskStart(SystemType, appID, AssSystemType) {
      return function(event) {
        const businessObject = bpmnFactory.create(SystemType);

       businessObject.ApplicationID = appID;
	   businessObject.AssistanceSystemType = AssSystemType;

        const shape = elementFactory.createShape({
          type: SystemType,
          businessObject: businessObject
        });

        create.start(event, shape, element);
      }
    }

	function changeClass(name, type) {
		if(type == 'bpmn:DataObjectReference')
			return 'bpmn-icon-data-object' + " " + name;
		if(type == 'bpmn:Task')
			return 'bpmn-icon-task' + " " + name;
		return 'fehler'
	}

    return {
'append.high-task0': {
group: 'model',
className: changeClass(customElements.types[0].name, customElements.types[0].type),
title: translate(customElements.types[0].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[0].type, customElements.types[0].ApplicationID, customElements.types[0].AssistanceSystemType),
click: appendServiceTask(customElements.types[0].type, customElements.types[0].ApplicationID, customElements.types[0].AssistanceSystemType)
}
},
'append.high-task1': {
group: 'model',
className: changeClass(customElements.types[1].name, customElements.types[1].type),
title: translate(customElements.types[1].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[1].type, customElements.types[1].ApplicationID, customElements.types[1].AssistanceSystemType),
click: appendServiceTask(customElements.types[1].type, customElements.types[1].ApplicationID, customElements.types[1].AssistanceSystemType)
}
},
'append.high-task2': {
group: 'model',
className: changeClass(customElements.types[2].name, customElements.types[2].type),
title: translate(customElements.types[2].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[2].type, customElements.types[2].ApplicationID, customElements.types[2].AssistanceSystemType),
click: appendServiceTask(customElements.types[2].type, customElements.types[2].ApplicationID, customElements.types[2].AssistanceSystemType)
}
},
'append.high-task3': {
group: 'model',
className: changeClass(customElements.types[3].name, customElements.types[3].type),
title: translate(customElements.types[3].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[3].type, customElements.types[3].ApplicationID, customElements.types[3].AssistanceSystemType),
click: appendServiceTask(customElements.types[3].type, customElements.types[3].ApplicationID, customElements.types[3].AssistanceSystemType)
}
},
'append.high-task4': {
group: 'model',
className: changeClass(customElements.types[4].name, customElements.types[4].type),
title: translate(customElements.types[4].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[4].type, customElements.types[4].ApplicationID, customElements.types[4].AssistanceSystemType),
click: appendServiceTask(customElements.types[4].type, customElements.types[4].ApplicationID, customElements.types[4].AssistanceSystemType)
}
},
'append.high-task5': {
group: 'model',
className: changeClass(customElements.types[5].name, customElements.types[5].type),
title: translate(customElements.types[5].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[5].type, customElements.types[5].ApplicationID, customElements.types[5].AssistanceSystemType),
click: appendServiceTask(customElements.types[5].type, customElements.types[5].ApplicationID, customElements.types[5].AssistanceSystemType)
}
},
'append.high-task6': {
group: 'model',
className: changeClass(customElements.types[6].name, customElements.types[6].type),
title: translate(customElements.types[6].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[6].type, customElements.types[6].ApplicationID, customElements.types[6].AssistanceSystemType),
click: appendServiceTask(customElements.types[6].type, customElements.types[6].ApplicationID, customElements.types[6].AssistanceSystemType)
}
},
'append.high-task7': {
group: 'model',
className: changeClass(customElements.types[7].name, customElements.types[7].type),
title: translate(customElements.types[7].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[7].type, customElements.types[7].ApplicationID, customElements.types[7].AssistanceSystemType),
click: appendServiceTask(customElements.types[7].type, customElements.types[7].ApplicationID, customElements.types[7].AssistanceSystemType)
}
},
'append.high-task8': {
group: 'model',
className: changeClass(customElements.types[8].name, customElements.types[8].type),
title: translate(customElements.types[8].titlePad),
action: {
dragstart: appendServiceTaskStart(customElements.types[8].type, customElements.types[8].ApplicationID, customElements.types[8].AssistanceSystemType),
click: appendServiceTask(customElements.types[8].type, customElements.types[8].ApplicationID, customElements.types[8].AssistanceSystemType)
}
}

    };
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
];
