# MatNeuron.ai

MatNeuronAI is an LLM integrated with the MatNeuron.js simulator. It is designed to assist in the creation, simulation, and analysis of neuronal and biomechanical models.

### LLM Integration
- Natural language model description processing
- Automated NMODL code generation from descriptions
- Intelligent parameter suggestion system
- Context-aware documentation generation

### Machine Learning Features
- Model similarity matching
- Parameter optimization
- Behavioral pattern recognition
- Cross-domain model mapping

### Smart Model Assistant
- Interactive model refinement through dialogue
- Automated conversion between MATLAB/NEURON/Python and JavaScript formats
- Performance optimization suggestions
- Related research paper recommendations

### Learning Pipeline
1. User Intent Analysis
   - Natural language processing of model requirements
   - Context extraction from scientific descriptions
   
2. Model Matching
   - Pattern matching against existing model databases
   - Similarity scoring using embedding vectors
   
3. Implementation Synthesis
   - Automated code generation for matched models
   - Parameter space exploration
   - Integration with existing components

4. Continuous Learning
   - User feedback incorporation
   - Model performance tracking
   - Community contribution analysis


## Use Cases:

### Scenario 1:

1. The user defines a topic, e.g., in Biomedical Engineering.
2. The MatNeuronAI agent suggests relevant entries from an online or offline encyclopedia, such as Wikipedia or other resources like [the Encyclopedia of Biomaterials and Biomedical Engineering](https://www.sciencedirect.com/book/9780128158024/encyclopedia-of-biomaterials-and-biomedical-engineering).
3. The user selects which entries to use, and an annotation link is added to the main simulation.
4. The user defines, step-by-step, the details they need from each selected entry.
5. Sample code from various sources (e.g., Matlab/Octave, NEURON, Python, JavaScript) is displayed.
6. Any mathematical simulation is detected by MatNeuronAI and flagged for curation.
7. MatNeuronAI suggests entries from online or offline mathematical encyclopedias, such as Wikipedia or other resources like [The Encyklopädie der Mathematischen Wissenschaften mit Einschluss ihrer Anwendungen by F. Klein](https://en.wikipedia.org/wiki/Klein%27s_Encyclopedia_of_Mathematical_Sciences).
8. The user confirms the entries, and an annotation link is added to each math function.
9. Using MatNeuronAI, the user can add, edit, save, or delete code iteratively.
10. Using platforms like [MatBook.js](https://github.com/vahidgh/MatBookjs), the user can run the code and integrate it with other code.


## Usage:

Make sure you have your openAPI key in `.env/openai_key`.

For the current under development version test using:

```
cd src/__test__
ts-node assistant.ts
```
