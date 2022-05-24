import * as tf from '@tensorflow/tfjs'

let network: any
let _numStates: number
let _numActions: number
let _batchSize: number

export class Model {

    constructor(hiddenLayerModel: any, numStates: number, numActions: number, batchSize: number) {
        _numStates = numStates;
        _numActions = numActions;
        _batchSize = batchSize;
  
        if (hiddenLayerModel instanceof tf.LayersModel) {
          network = hiddenLayerModel;
          network.summary();
          network.compile({optimizer: 'adam', loss: 'meanSquaredError'});
       } else {
          this.defineModel(hiddenLayerModel);
        }
      }

      
      defineModel(hiddenLayerSizes: any) {
        if (!Array.isArray(hiddenLayerSizes)) {
            hiddenLayerSizes = [hiddenLayerSizes];
        }
        
// Define input, which has a size of 5 (not including batch dimension).
const input = tf.input({shape: [5]});

// First dense layer uses relu activation.
const denseLayer1 = tf.layers.dense({units: 10, activation: 'relu'});
// Second dense layer uses softmax activation.
const denseLayer2 = tf.layers.dense({units: 4, activation: 'softmax'});

// Obtain the output symbolic tensor by applying the layers on the input.
const output = denseLayer2.apply(denseLayer1.apply(input));

// Create the model based on the inputs.

    }
}
