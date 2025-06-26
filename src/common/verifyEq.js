// import { simData } from "./simData"

export function verifyEq(options, model) {
  let xbool = testX(options.xdotElement, model, options.equation);
  let vxbool = testVX(options.v_xdotElement, model, options.equation);
  let ybool = testY(options.ydotElement, model, options.equation);
  let vybool = testVY(options.v_ydotElement, model, options.equation);
  return xbool && vxbool && ybool && vybool
}

function testX(element, model, type) {

  if (model.xEQ === '') {
    if (Object.hasOwn(element, 'domElement')) {
      element.domElement.classList.remove('error');

    } else {
      element.classList.remove('error');


    }
    return true;
  }
  let vx = model.v_x;
  let vy = model.v_y;
  let kq = model.kq;
  let kl = model.kl;
  let k = model.k;
  let m = model.mass;
  let g = model.gravity;
  let result;
  let result2;
  try {
    const eq = globalThis.window.evaluatex(model.xEQ, { g: g, k_q: kq, k_l: kl, v_x: vx, v_y: vy }, { latex: true });
    result = eq({});


  } catch (err) {

    if (type !== 'xEQ') {
      return
    }
    // element.innerHTML="[BAD OR NO EQUATION INPUTED]";
    // element.text = "[BAD OR NO EQUATION INPUTED]";
    if (Object.hasOwn(element, 'domElement')) { // change to just be velocity elemnt

      element.domElement.classList.add('error');
    } else {
      element.classList.add('error');
    }


    return false;
  }
  if (Object.hasOwn(element, 'domElement')) {
    element.domElement.classList.remove('error');

  } else {
    element.classList.remove('error');


  }
  return true;// change to just be velocity elemnt
}
function testVX(element, model, type) {

  if (model.v_xEQ === '') {
    if (Object.hasOwn(element, 'domElement')) {
      element.domElement.classList.remove('error');

    } else {
      element.classList.remove('error');


    }
    return true;
  }
  let vx = model.x;
  let vy = model.y;
  let kq = model.kq;
  let kl = model.kl;
  let m = model.mass;
  let g = model.gravity;
  let result;
  let result2;
  try {
    const eq = globalThis.window.evaluatex(model.v_xEQ, { g: g, k_q: kq, k_l: kl, v_x: vx, v_y: vy}, { latex: true });
    result = eq({});


  } catch (err) {

    if (type !== 'v_xEQ') {
      return
    }
    // element.innerHTML="[BAD OR NO EQUATION INPUTED]";
    // element.text = "[BAD OR NO EQUATION INPUTED]";
    if (Object.hasOwn(element, 'domElement')) { // change to just be velocity elemnt

      element.domElement.classList.add('error');
    } else {
      element.classList.add('error');
    }


    return false;
  }
  if (Object.hasOwn(element, 'domElement')) {
    element.domElement.classList.remove('error');

  } else {
    element.classList.remove('error');


  }
  return true;// change to just be velocity elemnt
}

function testY(element, model, type) {

  if (model.yEQ === '') {
    if (Object.hasOwn(element, 'domElement')) {
      element.domElement.classList.remove('error');

    } else {
      element.classList.remove('error');


    }
    return true;
  }
  let vx = model.x;
  let vy = model.y;
  let kq = model.kq;
  let kl = model.kl;
  let m = model.mass;
  let g = model.gravity;
  let result;
  let result2;
  try {
    const eq = globalThis.window.evaluatex(model.yEQ, { g: g, k_q: kq, k_l: kl, v_x: vx, v_y: vy }, { latex: true });
    result = eq({});


  } catch (err) {

    if (type !== 'yEQ') {
      return
    }
    // element.innerHTML="[BAD OR NO EQUATION INPUTED]";
    // element.text = "[BAD OR NO EQUATION INPUTED]";
    if (Object.hasOwn(element, 'domElement')) { // change to just be velocity elemnt

      element.domElement.classList.add('error');
    } else {
      element.classList.add('error');
    }
    // model.graphDataTest = new simData(.05)

    return false;
  }
  if (Object.hasOwn(element, 'domElement')) {
    element.domElement.classList.remove('error');

  } else {
    element.classList.remove('error');


  }
  return true;// change to just be velocity elemnt
}
function testVY(element, model, type) {

  if (model.v_yEQ === '') {
    if (Object.hasOwn(element, 'domElement')) {
      element.domElement.classList.remove('error');

    } else {
      element.classList.remove('error');


    }
    return true;
  }
  let vx = model.x;
  let vy = model.y;
  let kq = model.kq;
  let kl = model.kl;
  let m = model.mass;
  let g = model.gravity;
  let result;
  let result2;
  try {
    const eq = globalThis.window.evaluatex(model.v_yEQ, { g: g, k_q: kq, k_l: kl, v_x: vx, v_y: vy }, { latex: true });
    result = eq({});


  } catch (err) {

    if (type !== 'v_yEQ') {
      return
    }
    // element.innerHTML="[BAD OR NO EQUATION INPUTED]";
    // element.text = "[BAD OR NO EQUATION INPUTED]";
    if (Object.hasOwn(element, 'domElement')) { // change to just be velocity elemnt

      element.domElement.classList.add('error');
    } else {
      element.classList.add('error');
    }
    // model.graphDataTest = new simData(.05)

    return false;
  }
  if (Object.hasOwn(element, 'domElement')) {
    element.domElement.classList.remove('error');

  } else {
    element.classList.remove('error');


  }
  return true;// change to just be velocity elemnt
}