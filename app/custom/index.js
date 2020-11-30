import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';
import CustomOrderingProvider from './CustomOrderingProvider';

export default {
  __init__: [ 'customContextPad', 'customPalette', 'customRenderer', 'customOrderingProvider'],
  customContextPad: [ 'type', CustomContextPad ],
  customPalette: [ 'type', CustomPalette ],
  customRenderer: [ 'type', CustomRenderer ],
  customOrderingProvider: [ 'type', CustomOrderingProvider ]
};