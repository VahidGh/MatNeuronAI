import { MatNeuronAI } from '../core/MatNeuronAI';

const query = 'find entries for ion channel related diseases';
const ai = new MatNeuronAI();
const resp = ai.defineTopic(query);
console.log(resp)