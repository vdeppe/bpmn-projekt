import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';


// import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';

import EmbeddedComments from 'bpmn-js-embedded-comments';
import customModule from './custom';
import customElements from '../resources/test2.json';

import TaskType from '../resources/TaskType.json';

import ModelExtension from '../resources/properties';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

/*
var viewer = new BpmnViewer({
  container: '#canvas',
  additionalModules: [
    EmbeddedComments
  ]
});
*/

const qualityAssuranceEl = document.getElementById('quality-assurance'),
      taskTypeEl = document.getElementById('task-type'),
      okayEl = document.getElementById('okay'),
      formEl = document.getElementById('form'),
	  dataList = document.getElementById('browsers');
	  
// hide quality assurance if user clicks outside
window.addEventListener('click', (event) => {
  const { target } = event;

  if (target === qualityAssuranceEl || qualityAssuranceEl.contains(target)) {
    return;
  }

  qualityAssuranceEl.classList.add('hidden');
});

const bpmnModeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [
    customModule,
	EmbeddedComments
  ],
  moddleExtensions: {
    app: ModelExtension
  }
});

var overlays = bpmnModeler.get('overlays');

function openDiagram(diagram) {

  bpmnModeler.importXML(diagram, function(err) {
    if (err) {

      alert('could not import BPMN 2.0 XML, see console');
      return console.log('could not import BPMN 2.0 XML', err);
    }

    console.log('success!');
	const modeling = bpmnModeler.get('modeling');
	
    bpmnModeler.get('canvas').zoom('fit-viewport');
	
	let businessObject,
      element,
      taskType;
	
	console.log(customElements.types[0].name + ' ' + customElements.types[1].name + ' ' + customElements.types[2].name);
	
	
  bpmnModeler.on('element.contextmenu', (event) => {
    event.originalEvent.preventDefault();
    event.originalEvent.stopPropagation();

    ({ element } = event);
  
    // ignore root element
    if (!element.parent) {
      return;
    }
	
	let type = element.type;
	console.log(type);
	if(type != 'bpmn:Task')
		return;
	
	qualityAssuranceEl.classList.remove('hidden');

    businessObject = getBusinessObject(element);
    let { TaskType } = businessObject;
	
	console.log(TaskType);
    taskTypeEl.value = TaskType ? TaskType : '';
    taskTypeEl.focus();
  });
  
 
  formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
	
	if(taskTypeEl.value != 'nicht definiert')
		taskType = taskTypeEl.value;
	else taskType = '';

    modeling.updateProperties(element, {
		TaskType: taskType
    });

    qualityAssuranceEl.classList.add('hidden');
  });

  // close quality assurance if user presses escape
  formEl.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      qualityAssuranceEl.classList.add('hidden');
    }
  });
	
	/*
	for(let i=0; i < TaskType.type.length; i++) 
		console.log(TaskType.type[i]);
	*/
	
//	let select = document.createElement("select");
	for(let i=0; i < TaskType.type.length; i++) {
		let option = document.createElement("option");
		option.innerHTML = TaskType.type[i];
		option.value = TaskType.type[i];
		taskTypeEl.appendChild(option);
	}
//	formEl.appendChild(select);
	
	
//	let businessObject,
//      element;
	  
//	businessObject = getBusinessObject(element);  
//	let { ApplicationID } = businessObject;
//	let { AssistanceSystemType } = businessObject;
  });
}


// file save handling

var $download = $('[data-download]');

function serialize() {

  bpmnModeler.saveXML(function(err, xml) {

    var encodedData = err ? '' : encodeURIComponent(xml);

    $download.attr({
      'href': encodedData ? 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData : '',
    });

    if (err) {
      console.log('failed to serialize BPMN 2.0 xml', err);
    }
  });
}

bpmnModeler.on('comments.updated', serialize);
bpmnModeler.on('commandStack.changed', serialize);

bpmnModeler.on('canvas.click', function() {
  bpmnModeler.get('comments').collapseAll();
});


// file open handling

var $file = $('[data-open-file]');

function readFile(file, done) {

  if (!file) {
    return done(new Error('no file chosen'));
  }

  var reader = new FileReader();

  reader.onload = function(e) {
    done(null, e.target.result);
  };

  reader.readAsText(file);
}

$file.on('change', function() {
  readFile(this.files[0], function(err, xml) {

    if (err) {
      alert('could not read file, see console');
      return console.error('could not read file', err);
    }

    openDiagram(xml);
  });

});


// we use stringify to inline a simple BPMN diagram
//import pizzaDiagram from '../resources/pizza-collaboration-annotated(2).bpmn';

import pizzaDiagram from '../resources/diagram.bpmn';

openDiagram(pizzaDiagram);


// file drag / drop ///////////////////////

function openFile(file, callback) {

  // check file api availability
  if (!window.FileReader) {
    return window.alert(
      'Looks like you use an older browser that does not support drag and drop. ' +
      'Try using a modern browser such as Chrome, Firefox or Internet Explorer > 10.');
  }

  // no file chosen
  if (!file) {
    return;
  }

  var reader = new FileReader();

  reader.onload = function(e) {

    var xml = e.target.result;

    callback(xml);
  };

  reader.readAsText(file);
}

(function onFileDrop(container, callback) {

  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;
    openFile(files[0], callback);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);

})($('body'), openDiagram);