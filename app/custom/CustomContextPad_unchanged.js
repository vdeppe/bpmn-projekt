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