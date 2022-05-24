import * as tf from '@tensorflow/tfjs'
import { predictBoard } from './calcBoard'

let network
let _numStates
let _numActions
let _batchSize
let model

export class Model {

    constructor(hiddenLayerModel, numStates, numActions, batchSize) {
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

      
      defineModel(hiddenLayerSizes) {
        if (!Array.isArray(hiddenLayerSizes)) {
            hiddenLayerSizes = [hiddenLayerSizes];
        }
        
        // Define input, which has a size of 5 (not including batch dimension).
        const input = tf.input({shape: [36]});

        // First dense layer uses relu activation.
        const denseLayer1 = tf.layers.dense({units: 62, activation: 'relu'});
        // Second dense layer uses softmax activation.
        const denseLayer2 = tf.layers.dense({units: 1, activation: 'sigmoid'});



        // Obtain the output symbolic tensor by applying the layers on the input.
        const output = denseLayer2.apply(denseLayer1.apply(input));


        // Create the model based on the inputs.
        model = tf.model({inputs: input, outputs: [output]});

        model.summary()
        // The model can be used for training, evaluation and prediction.
        // For example, the following line runs prediction with the model on
        // some fake data.
        
    }
    
    PredictBestMove(moves, white) {

      this.bestMove = null

      for (let index = 0; index < moves[0].length; index++) {

        this.bitboard = predictBoard(moves[0][index], moves[1][index], white)
        console.log(this.bitboard)
        this.prediction = model.predict(this.bitboard)

        if(this.bestMove === null){

          this.bestMove = [moves[0][index], moves[1][index], this.prediction]
        }

        else if(this.prediction > this.bestMove[2]){

          this.bestMove = [moves[0][index], moves[1][index], this.prediction]

        }
      }
      console.log(this.bestMove[0], this.bestMove[1], this.bestMove[2].print())
      return this.bestMove
    }

    predict(state) {
      model.predict([1,state]);
    }
}
