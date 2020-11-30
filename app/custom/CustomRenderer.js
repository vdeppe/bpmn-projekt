import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import customElements from '../../resources/test2.json';

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate
} from 'tiny-svg';

import {
  getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import { isNil } from 'min-dash';

import $ from 'jquery';

const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 20,
      COLOR_GREEN = '#52B415',
      COLOR_YELLOW = '#ffc800',
      COLOR_RED = '#cc0000',
	  COLOR_BLACK = '#000000',
	  COLOR_WHITE = '#99FF0000';


export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {

    // ignore labels
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
	const taskType = this.getTaskType(element);
  
    let type = element.type;
	  
	const icon = this.getName(element);
	for (let i=0; i<customElements.types.length; i++) {
		if (icon == customElements.types[i].ApplicationID && type == customElements.types[i].type) {
			const name = this.getIcon(icon);
			const pic = drawImage(parentNode, 30, 30, name);
		}
	}
	if(type == 'bpmn:Task' && taskType) {
		let rect = drawRect(parentNode, 160, 140, TASK_BORDER_RADIUS, COLOR_WHITE);
		svgAttr(rect, {
			transform: 'translate(-30, -30)'
		});
		
		for (let i=0; i<customElements.types.length; i++) {
			if (icon == customElements.types[i].ApplicationID && type == customElements.types[i].type) {
				const name = this.getIcon(icon);
				const pic = drawImage(parentNode, 30, 30, name);
			}
		}
		let text = svgCreate('text'); 
		svgAttr(text, {
			fill: 'blue',
			transform: 'translate(25, -10)'
		});
		svgClasses(text).add('djs-label'); 
		svgAppend(text, document.createTextNode(taskType)); 
		svgAppend(parentNode, text);
	}
    return shape;
  }
  
  getTaskType(element) {
    const businessObject = getBusinessObject(element);
    const { TaskType } = businessObject;
    return TaskType;
  }
	/*
  getShapePath(shape) {
    if (is(shape, 'bpmn:DataObjectReference')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    }

    return this.bpmnRenderer.getShapePath(shape);
  }
  */
  getName(element) {
    const businessObject = getBusinessObject(element);
    const { ApplicationID } = businessObject;
    return ApplicationID;
  }


  getIcon(name) {
	  for(let i=0;i<customElements.types.length;i++) {
		  if(name == customElements.types[i].ApplicationID) {
			  return customElements.types[i].logo;
		  }
	  }
	  return null;
  }
}

CustomRenderer.$inject = [ 'eventBus', 'bpmnRenderer' ];

// helpers //////////

function drawImage(parentNode, width, height, name) {
	const svgimg = svgCreate('image');
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', name);
	svgAttr(svgimg, {
		width: width,
		height: height,
	//	transform: 'translate(-5, 15)' //bestimmt die Position: erster Parameter für Horizontale, zweiter Parameter für Vertikale
	});
	svgAppend(parentNode, svgimg);
	return svgimg;
}

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color) {
  const rect = svgCreate('rect');

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: COLOR_RED,
    strokeWidth: 2,
	strokeOpacity: 0.4,
	//zIndex: -100,
    fill: "rgba(255,255,255,0)"
	//opacity: 0.2
  });

  svgAppend(parentNode, rect);
 // rect.style('stroke-opacity','0.0');
  return rect;
}