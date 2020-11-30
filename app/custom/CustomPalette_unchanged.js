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
	   businessObject.AssistanceSystemType = AssSystemtype

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
