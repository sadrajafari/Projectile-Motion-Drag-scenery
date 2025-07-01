
import { Node, DOM, Emitter, KeyboardUtils } from 'scenerystack';
import post from '../../common/postData.js';


export default class EquationInput extends Node {
  constructor(parentDomElement, options) {

    options = Object.assign({

      // can limit contents of the input
      inputType: 'text', // 'text' | 'number'

      domElement: null,
      xdotElement: null,
      ydotElement: null,
      v_ydotElement: null,
      v_xdotElement: null,

      onlyLetters: false,

      // number of characters if you want to customize
      width: null,

      // the initial text for the element
      initialText: '',

      equation: null,

      verifyEq: null,
      dom: null,
      // errField: null,

      linkObj: null,

      focusedEq: null

    }, options);

    super(options);

    this.valueSubmittedEmitter = new Emitter();
    this.clearAndWrite = function (text) {
      this.mathField.latex('')
      this.mathField.latex(text)
      // options.model[options.equation]= mathField.latex().replaceAll('\\theta',' t').replaceAll('\\omega',' o');
      // options.model.validEqs = options.verifyEq(domElement, options.model);

    }
    this.writeToEquation = function (text) {
      this.mathField.write(text)
      // options.model[options.equation]= mathField.latex().replaceAll('\\theta',' t').replaceAll('\\omega',' o');
      // options.model.validEqs = options.verifyEq(domElement, options.model);

    }
    const domElement = parentDomElement;
    this.domElement = options.dom;
    let passedStart = false
    const mathField = window.MathQuill.getInterface(2).MathField(domElement, {

      handlers: {
        edit: function () {

          options.model[options.equation] = mathField.latex().replaceAll('\\theta', ' t').replaceAll('\\omega', ' o');

          options.model.validEqs = options.verifyEq(options, options.model);



          setTimeout(() => post(options.model.name, "changed " + options.equation, options.model.gravityProp.value, options.model.kqProp.value, options.model.vProp.value, options.model.angleProp.value, options.model.yProp.value, options.model.v_xProp.value, options.model.v_yProp.value, options.model.xEQ, options.model.yEQ, options.model.v_xEQ, options.model.v_yEQ), 10)

        },

      }
    });

    this.mathField = mathField;
    mathField.write(options.initialText);

    const equationInputNode = new Node();
    this.equationInputNode = domElement;

    const domElementDOM = new DOM(domElement, { allowInput: true });

    equationInputNode.addChild(domElementDOM);
    this.addChild(equationInputNode);


    domElement.addEventListener('keyup', event => {
      if (event.code === KeyboardUtils.KEY_ENTER) {

        this.valueSubmittedEmitter.emit(mathField.latex());

        mathField.blur();
      }
    });



    this.domElement = domElement;
  }

  updateText(newLatex) {
    if (this.mathField) {
      // Set the raw LaTeX for display only
      this.mathField.latex(newLatex);
      // Do NOT set this.property.value here!
    }
  }

  getElementValue() {
    return this.mathField.latex()
  }


}



