import { ScreenView, ScreenViewOptions } from "scenerystack/sim";
import { SimModel } from "../model/SimModel.js";
import { ResetAllButton } from "scenerystack/scenery-phet";
import { Rectangle, Text, Circle, Color, HBox, RichText, VBox, Display, Node, DOM } from "scenerystack/scenery";
import { Panel, Range, HSlider, DerivedProperty, Vector2, RectangularToggleButton, Property, RoundToggleButton, ComboBox, VerticalAquaRadioButtonGroup, CarouselComboBox } from "scenerystack";
import EquationInput from './EquationInput.js';
import { verifyEq } from '../../common/verifyEq.js';
import { drawV_X, drawV_Y, drawX, drawY } from '../../common/makeGraphs.js';
import * as THREE from 'three';



export class SimScreenView extends ScreenView {

  angle: number;
  graphData: simData;
  model: any;
  ballX: number;
  ballY: number;
  ball: any;
  timer: number
  spacePressed: boolean;
  focusedEq!: any;
  rootNode: any;
  refXdotGraph: any;
  graphSize: number;
  refYdotGraph: any;
  refXGraph: any;
  refYGraph: any;
  domNode: any;
  ballTest: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").SphereGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;
  lastBallY: any;
  margin: { top: number; right: number; bottom: number; left: number; };
  widthGraph: number;
  heightGraph: number;
  xScale: any;
  minXvx: any;
  maxXvx: any;
  minXvxTest: any;
  maxXvxTest: any;
  minYvy: any;
  maxYvy: any;
  minYyTest: any;
  maxYyTest: any;
  yScalevx: any;
  yScalevy: any;
  yScalex: any;
  yScaley: any;
  minXx: any;
  maxXx: any;
  minXxTest: any;
  maxXxTest: any;
  minYy: any;
  maxYy: any;
  minYvyTest: any;
  maxYvyTest: any;
  xScalex: any;
  xScaley: any;
  xScalevy: any;
  xScalevx: any;
  ballTrail: any;
  scene: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Scene;
  group: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Group;
  path: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Path;
  pathRef: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Path;
  lineRef: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Line<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").BufferGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").LineBasicMaterial>;
  pathTest: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Path;
  lineTest: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Line<import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").BufferGeometry, import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").LineBasicMaterial>;
  cannon: import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").PlaneGeometry, import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;
  connector: import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").PlaneGeometry, import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;
  rectangle: import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").Mesh<import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").PlaneGeometry, import("c:/Users/Sadra/Desktop/phetsims/chipper/node_modules/@types/three/index").MeshBasicMaterial>;
  cannonDistance: number;
  graphBox: Panel;
  selectedRunProperty: Property<string>;
  runHistory: Array<{
    gravity: number;
    kl: number;
    kq: number;
    v: number;
    angle: number;
    y: number;
    v_x: number;
    v_y: number;
    xdotLatex: string;
    ydotLatex: string;
    v_xdotLatex: string;
    v_ydotLatex: string;
    xEQ: string;
    yEQ: string;
    v_xEQ: string;
    v_yEQ: string;
    dragType: "linear" | "quadratic";
  }>;
  updateComboBox: (runs: { name: string; index: number; }[] | string[]) => void;
  xdotField: any;
  ydotField: any;
  v_xdotField: any;
  v_ydotField: any;
  xdotLatex: any;
  ydotLatex: any;
  v_xdotLatex: any;
  v_ydotLatex: any;
  private isRestoringRun: boolean = false;
  runner: boolean;



  public constructor(model: SimModel, options?: ScreenViewOptions) {
    super(options);
    this.runHistory = []; // Initialize run history
    const resetAllButton = new ResetAllButton({
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
        vx = model.v_x
        vy = model.v_y;
        // ball.position.set(0.8, 0, 0)
        isSpacePressed = false
      },
      // right: this.layoutBounds.maxX - ProjectileMotionDragConstants.SCREEN_VIEW_X_MARGIN,
      // bottom: this.layoutBounds.maxY - ProjectileMotionDragConstants.SCREEN_VIEW_Y_MARGIN,

    });
    // this.addChild(resetAllButton);
    this.model = model;

    this.layoutBounds.maxX = 1470;




    this.graphSize = this.layoutBounds.maxX / 7;
    this.cannonDistance = .7




    const refXdotGraph = document.createElement('div');
    document.body.appendChild(refXdotGraph)
    const refYdotGraph = document.createElement('div');
    document.body.appendChild(refYdotGraph)
    const refXGraph = document.createElement('div');
    document.body.appendChild(refXGraph)
    const refYGraph = document.createElement('div');
    document.body.appendChild(refYGraph)

    this.rootNode = new Node();
    const displayGraphs = new Display(this.rootNode);
    displayGraphs.updateOnRequestAnimationFrame();
    displayGraphs.resizeOnWindowResize();
    document.body.appendChild(displayGraphs.domElement);

    refXdotGraph.id = 'staticSim-xdot';
    this.refXdotGraph = drawV_X(model.graphData, model.graphLen, 'staticSim-xdot', 'reference', this.graphSize, model.graphDataTest, model.graphLenTest);
    this.yScalevx = this.refXdotGraph.y
    this.xScalevx = this.refXdotGraph.x
    this.refXdotGraph.node.offsetWidth = 250
    this.refXdotGraph.node.offsetHeight = 250
    this.refXdotGraph = new DOM(this.refXdotGraph.node);
    // this.addChild(this.refXdotGraph);

    refYdotGraph.id = 'variableSim-ydot';
    this.refYdotGraph = drawV_Y(model.graphData, model.graphLen, 'variableSim-ydot', 'test', this.graphSize, model.graphDataTest, model.graphLenTest);
    this.yScalevy = this.refYdotGraph.y
    this.xScalevy = this.refYdotGraph.x
    this.refYdotGraph.node.offsetWidth = 250
    this.refYdotGraph.node.offsetHeight = 250
    this.refYdotGraph = new DOM(this.refYdotGraph.node);
    // this.addChild(this.refYdotGraph);

    refXGraph.id = 'staticSim-x';
    this.refXGraph = drawX(model.graphData, model.graphLen, 'staticSim-x', 'reference', this.graphSize, model.graphDataTest, model.graphLenTest);
    this.yScalex = this.refXGraph.y
    this.xScalex = this.refXGraph.x
    this.refXGraph.node.offsetWidth = 250
    this.refXGraph.node.offsetHeight = 250
    this.refXGraph = new DOM(this.refXGraph.node);
    // this.addChild(this.refXGraph);

    refYGraph.id = 'variableSim-y';
    this.refYGraph = drawY(model.graphData, model.graphLen, 'variableSim-y', 'test', this.graphSize, model.graphDataTest, model.graphLenTest);
    this.yScaley = this.refYGraph.y
    this.xScaley = this.refYGraph.x
    this.refYGraph.node.offsetWidth = 250
    this.refYGraph.node.offsetHeight = 250
    this.refYGraph = new DOM(this.refYGraph.node);



    // this.graphBox = new Panel(new VBox(), { opacity: 0.5 });

    // this.graphBox.leftTop = new phet.dot.Vector2(1050, 10);
    // this.addChild(this.graphBox)

    // let posrefX = this.refXGraph.leftTop;
    // this.addChild(this.refXGraph);
    // this.refXGraph.leftTop = posrefX;
    // let posrefY = this.refYGraph.leftTop;
    // this.addChild(this.refYGraph);
    // this.refYGraph.leftTop = posrefY;
    // let posrefXdot = this.refXdotGraph.leftTop;
    // this.addChild(this.refXdotGraph);
    // this.refXdotGraph.leftTop = posrefXdot;
    // let posrefYdot = this.refYdotGraph.leftTop;
    // this.addChild(this.refYdotGraph);
    // this.refYdotGraph.leftTop = posrefYdot;
    // this.graphBox.addChild(new VBox({ children: [new HBox({ children: [this.refXGraph, this.refYGraph] }), new HBox({ children: [this.refXdotGraph, this.refYdotGraph] })] }), { opacity: 0.5 })

    this.graphBox = new Panel(
      new VBox({
        children: [
          new HBox({ children: [this.refXGraph, this.refYGraph] }),
          new HBox({ children: [this.refXdotGraph, this.refYdotGraph] })
        ]
      }),
      { opacity: 0.5 }
    );
    this.graphBox.leftTop = new phet.dot.Vector2(1050, 10);
    this.addChild(this.graphBox);



    this.refXGraph.element.children[9].setAttribute('cx', this.xScalex(0));
    this.refXGraph.element.children[9].setAttribute('cy', this.yScalex(this.model.graphData.getX(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refXGraph.element.children[7].setAttribute('cx', this.xScalex(0));
      this.refXGraph.element.children[7].setAttribute('cy', this.yScalex(this.model.graphDataTest.getX(0)));
    }
    this.refYGraph.element.children[9].setAttribute('cx', this.xScaley(0));
    this.refYGraph.element.children[9].setAttribute('cy', this.yScaley(this.model.graphData.getY(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refYGraph.element.children[7].setAttribute('cx', this.xScaley(0));
      this.refYGraph.element.children[7].setAttribute('cy', this.yScaley(this.model.graphDataTest.getY(0)));
    }

    this.refXdotGraph.element.children[9].setAttribute('cx', this.xScalevx(0));
    this.refXdotGraph.element.children[9].setAttribute('cy', this.yScalevx(this.model.graphData.getV_X(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refXdotGraph.element.children[7].setAttribute('cx', this.xScalevx(0));
      this.refXdotGraph.element.children[7].setAttribute('cy', this.yScalevx(this.model.graphDataTest.getV_X(0)));
    }
    this.refYdotGraph.element.children[9].setAttribute('cx', this.xScalevy(0));
    this.refYdotGraph.element.children[9].setAttribute('cy', this.yScalevy(this.model.graphData.getV_Y(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refYdotGraph.element.children[7].setAttribute('cx', this.xScalevy(0));
      this.refYdotGraph.element.children[7].setAttribute('cy', this.yScalevy(this.model.graphDataTest.getV_Y(0)));
    }
    // const panelScene = new Node();
    // const display = new Display(panelScene)
    // document.body.appendChild(display.domElement)
    // this.addChild(panelScene)
    // this.graphData = model.graphData;
    this.ballX = 0;
    this.ballY = 0;
    this.timer = model.timer;
    this.spacePressed = false
    // this.layoutBounds.maxX = window.innerWidth;
    // this.layoutBounds.maxY = window.innerHeight;
    // window.addEventListener("resize", () => {
    //   this.layoutBounds.maxX = window.innerWidth;
    //   this.layoutBounds.maxY = window.innerHeight;

    // })
    const buttonMass = new Property<boolean>(false);
    const buttonGravity = new Property<boolean>(false);
    const buttonFrictionl = new Property<boolean>(false);
    const buttonFrictionq = new Property<boolean>(false);
    const buttonSpeed = new Property<boolean>(false);
    const buttonDegree = new Property<boolean>(false);

    const buttonV_x = new Property<boolean>(false);
    const buttonV_y = new Property<boolean>(false);
    const buttonHeight = new Property<boolean>(false);

    const simSpeedSlider = new HSlider(model.simSpeedProp, new Range(0, Number(3)));
    const panelSizer = new Rectangle(10, 10, 200, 30);
    const sliderGap = new Rectangle(0, 0, 0, 10);

    const massSlider = new HSlider(model.massProp, new Range(0, 10));
    const mass = new RichText("m");
    const gravity = new RichText("gravity (<em>g</em>)", { scale: 1 });
    const kl = new RichText("lin. drag coeff. (<em>k<sub>l</sub></em>)", { scale: 1 });
    const kq = new RichText("quad. drag coeff. (<em>k<sub>q</sub></em>)", { scale: 1 });
    const v_x = new RichText("init. vel. (<em>v<sub>0x</sub></em>)", { scale: 1 });
    const v_y = new RichText("init. vel. (<em>v<sub>0y</sub></em>)", { scale: 1 });
    const height = new RichText("init. height (<em>y<sub>0</sub></em>)", { scale: 1 })
    const speed = new RichText("init. vel. (<em>v<sub>0</sub></em>)", { scale: 1 });
    const angle = new RichText("init. ang. (<em>θ<sub>0</sub></em>)", { scale: 1 })

    const constantNames = new VBox({
      align: "left", children: [
        new Rectangle(0, 0, 70, 0),
        gravity,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        kl,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        kq,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        speed,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        angle,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        height,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        v_x,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        v_y,
      ]
    })
    const speedConstantNames = new VBox({
      align: "left", children: [
        // mass,
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // gravity,
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // k,
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // v_x,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // v_y,
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // height
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // speed,
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // angle,
      ]
    })
    const constantSliders = new VBox({
      align: "center", children: [
        // massSlider,
        new Rectangle(0, 0, 60, 0),
        new HSlider(model.gravityProp, new Range(0, 10)),
        new Rectangle(0, 0, 0, 10),
        // new HSlider(model.kProp, new Range(0, .3)),
        // new Rectangle(0, 0, 0, 10),
        new HSlider(model.klProp, new Range(0, .3)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.kqProp, new Range(0, .3)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.vProp, new Range(10, 50)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.angleProp, new Range(0, 90)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.yProp, new Range(0, 25)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.v_xProp, new Range(0, 50)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.v_yProp, new Range(0, 50)),
      ]
    })
    const speedConstantSliders = new VBox({
      align: "center", children: [
        // massSlider,
        new Rectangle(0, 0, 20, 0),
        // new HSlider(model.gravityProp, new Range(0, 10)),
        // new Rectangle(0, 0, 0, 10),
        // new HSlider(model.kProp, new Range(0, 10)),
        // new Rectangle(0, 0, 0, 10),
        new HSlider(model.v_xProp, new Range(0, 10)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.v_yProp, new Range(0, 10)),
        // new Rectangle(0, 0, 0, 10),
        // new HSlider(model.yProp, new Range(0, 2.5))
        // new Rectangle(0, 0, 0, 10),
        // new HSlider(model.vProp, new Range(0, 10)),
        // new Rectangle(0, 0, 0, 10),
        // new HSlider(model.angleProp, new Range(0, 90)),
      ]
    })
    const toggleRadius = 13;
    const buttonVBoxConstants = new VBox({
      children: [
        new Rectangle(0, 0, 20, 0),
        new RoundToggleButton(buttonGravity, false, true, { radius: toggleRadius, content: new Text('✎', { fontSize: 120, maxWidth: 15 }) }),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 6),
        new RoundToggleButton(buttonFrictionl, false, true, { radius: toggleRadius, content: new Text('✎', { fontSize: 120, maxWidth: 15 }) }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 6),
        new RoundToggleButton(buttonFrictionq, false, true, { radius: toggleRadius, content: new Text('✎', { fontSize: 120, maxWidth: 15 }) }),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 6),
        new RoundToggleButton(buttonSpeed, false, true, { radius: toggleRadius, content: new Text('✎', { fontSize: 120, maxWidth: 15 }) }),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 6),
        new RoundToggleButton(buttonDegree, false, true, { radius: toggleRadius, content: new Text('✎', { fontSize: 120, maxWidth: 15 }) }),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 6),
        new RoundToggleButton(buttonHeight, false, true, { radius: toggleRadius, content: new Text('✎', { fontSize: 120, maxWidth: 15 }) }),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 6),
        new RoundToggleButton(buttonV_x, false, true, { radius: toggleRadius, content: new Text('✎', { fontSize: 120, maxWidth: 15 }) }),


        new Rectangle(0, 0, 0, simSpeedSlider.height - speed.height + sliderGap.height),
        new RoundToggleButton(buttonV_y, false, true, { radius: toggleRadius, content: new Text('✎', { fontSize: 120, maxWidth: 15 }) }),


      ]
    })
    const speedButtonVBoxConstants = new VBox({
      children: [
        // new Rectangle(0, 0, 0, massSlider.height - speed.height),
        new RoundToggleButton(buttonV_x, false, true, { radius: toggleRadius }),

        new RichText('✎'),
        new Rectangle(0, 0, 0, simSpeedSlider.height - speed.height + sliderGap.height),
        new RoundToggleButton(buttonV_y, false, true, { radius: toggleRadius }),
        new RichText('✎'),
        // new Rectangle(0, 0, 0, simSpeedSlider.height - speed.height + sliderGap.height),
        // new RoundToggleButton(buttonHeight, false, true, { radius: toggleRadius }),
        // new RichText('✎'),
        // new Rectangle(0, 0, 0, simSpeedSlider.height - speed.height + sliderGap.height),
        // new RoundToggleButton(buttonFriction, false, true, { radius: toggleRadius }),
        // new RichText('✎'),
        // new Rectangle(0, 0, 0, simSpeedSlider.height - speed.height + sliderGap.height),
        // new RoundToggleButton(buttonSpeed, false, true, { radius: toggleRadius }),
        // new RichText('✎'),
        // new Rectangle(0, 0, 0, simSpeedSlider.height - speed.height + sliderGap.height),
        // new RoundToggleButton(buttonDegree, false, true, { radius: toggleRadius }),
        // new RichText('✎'),
        // new Rectangle(0, 0, 0, simSpeedSlider.height - speed.height),

      ]
    })
    const constantMeasure = new VBox({
      align: "left", children: [
        new Rectangle(0, 0, 50, 0),
        // new Text(new DerivedProperty([model.massProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.gravityProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.klProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.kqProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.vProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.angleProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.yProp], (value) => { return String(Number(+value).toFixed(2)) }), { fontSize: 20 }),
        // new Rectangle(0, 0, 50, 0),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.v_xProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.v_yProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
      ]
    })
    const speedConstantMeasure = new VBox({
      align: "left", children: [
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Rectangle(0, 0, 50, 0),
        new Text(new DerivedProperty([model.v_xProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Text(new DerivedProperty([model.v_yProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // new Text(new DerivedProperty([model.yProp], (value) => { return String(Number(+value).toFixed(2)) }), { fontSize: 20 }),
      ]
    })
    const measureText = new VBox({
      align: "left", children: [
        // new RichText("<span style='font-family: Roman;'>kg</span>"),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Rectangle(0, 0, 30, 0),
        new RichText("<span style='font-family: Roman;'>m/s<sup>2</sup></span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>1/s</span>"),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>1/m</span>"),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>°</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
      ]
    })
    const speedMeasureText = new VBox({
      align: "left", children: [

        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // new RichText("<em>m</em>"),

      ]
    })

    const constantPanel = new Panel(new VBox({
      align: "center", children: [new Text("Constants", { fontSize: 24 }), new Rectangle(0, 0, 350, 15), new HBox({
        align: "center", children: [
          constantNames,
          new Rectangle(0, 0, 10, 0),
          constantSliders,
          new Rectangle(0, 0, 10, 0),
          buttonVBoxConstants,
          new Rectangle(0, 0, 10, 0),
          constantMeasure,
          new Rectangle(0, 0, 10, 0),
          measureText
        ]
      })]
    }), { fill: new Color("#d3d3d3"), scale: .6 })

    this.addChild(constantPanel)

    const speedPanel = new Panel(new VBox({
      align: "center", children: [new RichText("Components"), new Rectangle(0, 0, 350, 15), new HBox({
        align: "center", children: [

          speedConstantNames,
          new Rectangle(0, 0, 10, 0),
          speedConstantSliders,
          new Rectangle(0, 0, 10, 0),
          speedButtonVBoxConstants,
          new Rectangle(0, 0, 10, 0),
          speedConstantMeasure,
          new Rectangle(0, 0, 10, 0),
          speedMeasureText
        ]
      })]
    }), { fill: new Color("#d3d3d3") })

    // this.addChild(speedPanel)


    // Equation input 

    const xdotDOM = document.createElement('span')
    const ydotDOM = document.createElement('span')
    const v_xdotDOM = document.createElement('span')
    const v_ydotDOM = document.createElement('span')
    xdotDOM.classList.add("my-mathquill-input");
    ydotDOM.classList.add("my-mathquill-input");
    v_xdotDOM.classList.add("my-mathquill-input");
    v_ydotDOM.classList.add("my-mathquill-input");

    const xdotField = new EquationInput(xdotDOM,
      {
        initialText: model.xEQ,
        model: model,
        equation: 'xEQ',
        verifyEq: verifyEq,
        dom: xdotDOM,
        focusedEq: this.focusedEq,
        xdotElement: xdotDOM,
        ydotElement: ydotDOM,
        v_ydotElement: v_ydotDOM,
        v_xdotElement: v_xdotDOM,
      }

    );

    this.xdotField = xdotField;




    const ydotField = new EquationInput(ydotDOM,
      {
        initialText: model.yEQ,
        model: model,
        equation: 'yEQ',
        verifyEq: verifyEq,
        dom: ydotDOM,
        focusedEq: this.focusedEq,
        xdotElement: xdotDOM,
        ydotElement: ydotDOM,
        v_ydotElement: v_ydotDOM,
        v_xdotElement: v_xdotDOM,
      }

    );

    this.ydotField = ydotField;

    const v_xdotField = new EquationInput(v_xdotDOM,
      {
        initialText: model.v_xEQ,
        model: model,
        equation: 'v_xEQ',
        verifyEq: verifyEq,
        dom: v_xdotDOM,
        focusedEq: this.focusedEq,
        xdotElement: xdotDOM,
        ydotElement: ydotDOM,
        v_ydotElement: v_ydotDOM,
        v_xdotElement: v_xdotDOM,
      }

    );

    this.v_xdotField = v_xdotField;

    const v_ydotField = new EquationInput(v_ydotDOM,
      {
        initialText: model.v_yEQ,
        model: model,
        equation: 'v_yEQ',
        verifyEq: verifyEq,
        dom: v_ydotDOM,
        focusedEq: this.focusedEq,
        xdotElement: xdotDOM,
        ydotElement: ydotDOM,
        v_ydotElement: v_ydotDOM,
        v_xdotElement: v_xdotDOM,
      }

    );

    this.v_ydotField = v_ydotField;
    this.focusedEq = [model.xEQ, xdotField, xdotField.writeToEquation];
    const focusedEq = [this.focusedEq]
    const xdotBox = new HBox({ preferredWidth: 30, children: [xdotField] })
    xdotBox.addInputListener({

      down: function (event) {
        xdotField.mathField.focus()
        focusedEq[0][0] = model.xEQ
        focusedEq[0][1] = xdotField

      }
    })
    const ydotBox = new HBox({ preferredWidth: 30, children: [ydotField] })
    ydotBox.addInputListener({

      down: function (event) {
        ydotField.mathField.focus()
        focusedEq[0][0] = model.yEQ
        focusedEq[0][1] = ydotField


      }
    })
    const v_xdotBox = new HBox({ preferredWidth: 30, children: [v_xdotField] })
    v_xdotBox.addInputListener({

      down: function (event) {
        v_xdotField.mathField.focus()
        focusedEq[0][0] = model.v_xEQ
        focusedEq[0][1] = v_xdotField


      }
    })
    const v_ydotBox = new HBox({ preferredWidth: 30, children: [v_ydotField] })
    v_ydotBox.addInputListener({

      down: function (event) {
        v_ydotField.mathField.focus()
        focusedEq[0][0] = model.v_yEQ
        focusedEq[0][1] = v_ydotField


      }
    })


    // Legend
    const redBall = new Circle(7, { fill: new Color("red") })
    const referenceBall = new RichText("Reference")
    this.addChild(redBall)
    this.addChild(referenceBall)
    redBall.leftTop = new phet.dot.Vector2(1100, 10)
    referenceBall.leftTop = new phet.dot.Vector2(1120, 5)

    const blueBall = new Circle(7, { fill: new Color("blue") })
    const testBall = new RichText("Test")
    this.addChild(blueBall)
    this.addChild(testBall)
    blueBall.leftTop = new phet.dot.Vector2(1250, 10)
    testBall.leftTop = new phet.dot.Vector2(1270, 5)


    const rootNode = new Node();
    const display = new Display(rootNode);
    document.body.appendChild(display.domElement);

    // set up a scene with three.js
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.set(0, 0, 0)
    // const aspect = window.innerWidth / window.innerHeight;
    const aspect = this.layoutBounds.maxX / this.layoutBounds.maxY;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / - 2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / - 2,
      1,
      1000
    );


    // Get the size (length, width, and height) of the bounding box

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setClearAlpha(0);
    renderer.setSize(this.layoutBounds.maxX, this.layoutBounds.maxY);
    document.body.appendChild(renderer.domElement);
    const loader = new THREE.TextureLoader();
    // loader.load('https://thumbs.dreamstime.com/z/pixel-art-seamless-background-sky-ground-location-clouds-grass-landscape-game-application-101035941.jpg?ct=jpeg', function (texture) {
    loader.load('/src/screen-name/view/original.png', function (texture) {
      scene.background = texture;


    });
    // loader.load('/projectile-motion-drag/js/projectile-motion-drag/view/background.png', function (texture) {
    //   scene.background = texture;
    //   console.log(texture)
    // });



    // Load image directly into the material
    var material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/src/screen-name/view/cannon.png'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    });

    var planeGeometry = new THREE.PlaneGeometry(3, 1.5); // Adjust dimensions as needed

    var cannon = new THREE.Mesh(planeGeometry, material);

    // Set the position to the left-bottom corner of the scene
    const group = new THREE.Group();
    this.group = group;
    scene.add(group);
    // group.rotation.z = model.angle * Math.PI / 180;
    // cannon.scale.set(.4, .4, 0);
    cannon.rotation.z = model.angle * Math.PI / 180;
    cannon.scale.set(.4, .4, 0);
    cannon.renderOrder = 1000

    // group.add(cannon)


    var vertices = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(1.35, 0, 0)
    ];

    // Create a BufferGeometry
    var geometry = new THREE.BufferGeometry().setFromPoints(vertices);

    // Define material for the line
    var material2 = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the line
    var line = new THREE.Line(geometry, material2);
    // line.position.z = 0
    // scene.add(line);
    scene.add(cannon);

    this.cannon = cannon

    // 


    // Ellipse
    var ellipseCurve = new THREE.EllipseCurve(
      0, 0, // center
      1, .2, // xRadius, yRadius
      0, Math.PI * 2, // startAngle, endAngle
      false, // clockwise
      0 // rotation
    );

    // Create shape
    var shape = new THREE.Shape(ellipseCurve.getPoints(50));
    var geometry = new THREE.ShapeGeometry(shape);
    var material = new THREE.MeshBasicMaterial({ color: "grey", transparent: false });
    var ellipse = new THREE.Mesh(geometry, material);
    ellipse.position.set(-4.9, -2.35, 0)






    // 
    function createAxis(start, end, color) {
      const material = new THREE.LineBasicMaterial({ color: color });
      const points = [start, end];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.Line(geometry, material);
    }

    // Create X axis (red) starting from (0, 0, 0)
    const xAxis = createAxis(new THREE.Vector3(-5.5, -3.05, 0), new THREE.Vector3(12, -3.05, 0), "black");
    scene.add(xAxis);

    // Create Y axis (green) starting from (0, 0, 0)
    const yAxis = createAxis(new THREE.Vector3(-5.5, -3.35, 0), new THREE.Vector3(-5.5, 5, 0), "black");
    scene.add(yAxis);

    // Function to create a point
    function createPointX(x: any, y: any, color: any) {
      // const geometry = new THREE.SphereGeometry(0.03, 32, 32);
      // const material = new THREE.MeshBasicMaterial({ color: color });
      // const sphere = new THREE.Mesh(geometry, material);
      // sphere.position.set(x, y, 0);
      // return sphere;
      const material = new THREE.LineBasicMaterial({ color: color });
      const points = [
        new THREE.Vector3(x, y - 0.1, 0), // Start of the line (slightly below the point)
        new THREE.Vector3(x, y + 0.1, 0)  // End of the line (slightly above the point)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      return line;
    }
    function createPointY(x: any, y: any, color: any) {
      // const geometry = new THREE.SphereGeometry(0.03, 32, 32);
      // const material = new THREE.MeshBasicMaterial({ color: color });
      // const sphere = new THREE.Mesh(geometry, material);
      // sphere.position.set(x, y, 0);
      // return sphere;
      const material = new THREE.LineBasicMaterial({ color: color });
      const points = [
        new THREE.Vector3(x - 0.1, y, 0), // Start of the line (slightly below the point)
        new THREE.Vector3(x + 0.1, y, 0)  // End of the line (slightly above the point)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      return line;
    }

    // Add a point at (1, 2)
    // const point = createPoint(1, 2, 0x0000ff);
    // scene.add(point);






    // Load the font and add text labels
    const loader1 = new THREE.FontLoader();
    // const rect = new Rectangle(20, 120, 20, 10, {fill: new Color("blue")})
    // rect.leftTop = new phet.dot.Vector2(300, 10)
    // this.addChild(rect)
    loader1.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
      // function createLabel(text, position) {
      //     const geometry = new THREE.TextGeometry(text, {
      //         font: font,
      //         size: 0.2,
      //         height: 0.02,

      //     });
      //     const material = new THREE.MeshBasicMaterial({ color: "white" });
      //     const mesh = new THREE.Mesh(geometry, material);
      //     mesh.position.copy(position);
      //     return mesh;
      // }
      function createLabel(text, position) {
        // Create text geometry
        const textGeometry = new THREE.TextGeometry(text, {
          font: font,
          // size: 0.15, // Adjust the size to fit inside the circle
          size: 0.17, // Adjust the size to fit inside the circle
          height: 0.03,
          curveSegments: 32,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: "white", depthTest: false });
        // textMaterial.map?.minFilter = THREE.LinearFilter
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.renderOrder = 1

        // Center the text
        textGeometry.computeBoundingBox();
        const textOffset = textGeometry.boundingBox.getCenter(new THREE.Vector3()).multiplyScalar(-1);
        textGeometry.translate(textOffset.x, textOffset.y, textOffset.z);

        // Create circle geometry
        const circleRadius = 0.2; // Radius of the circle
        const circleSegments = 50; // Number of segments to approximate the circle
        const circleGeometry = new THREE.CircleGeometry(circleRadius, circleSegments);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: "black" }); // Circle color
        const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);

        // Set the circle position
        circleMesh.position.copy(position);

        // Add the text as a child of the circle
        circleMesh.add(textMesh);
        textMesh.position.set(0, 0, 0.01); // Slightly in front of the circle

        // Add the circle (with text) to the scene
        scene.add(circleMesh);
      }

      for (let i = -4.5; i <= 40; i += 1) {
        scene.add(createPointX(i, -3.05, "blue")); // Points along the X axis
        // scene.add(createPoint(0, i, "blue")); // Points along the Y axis
      }
      for (let i = -2.05; i <= 4; i++) {
        // scene.add(createPoint(i, 0, "blue")); // Points along the X axis
        scene.add(createPointY(-5.5, i, "blue")); // Points along the Y axis
      }




      // Add labels for X axis
      let x = -5.5
      for (let i = 0; i <= 40; ++i) {
        scene.add(createLabel(`${i * 10}`, new THREE.Vector3(x, -3.55, 0)));
        x += 1

      }

      let y = -2
      for (let i = 1; i <= 7; ++i) {
        scene.add(createLabel(`${i * 10}`, new THREE.Vector3(-5.9, y, 0)));
        y += 1

      }

      // scene.add(createLabel('2', new THREE.Vector3(-2.55, -2.8, 0)));
      // scene.add(createLabel('3', new THREE.Vector3(-1.55, -2.8, 0)));
      // scene.add(createLabel('4', new THREE.Vector3(-0.55, -2.8, 0)));
      // scene.add(createLabel('5', new THREE.Vector3(0.45, -2.8, 0)));
      // scene.add(createLabel('6', new THREE.Vector3(1.45, -2.8, 0)));
      // scene.add(createLabel('7', new THREE.Vector3(2.45, -2.8, 0)));
      // scene.add(createLabel('8', new THREE.Vector3(3.45, -2.8, 0)));
      // scene.add(createLabel('9', new THREE.Vector3(4.45, -2.8, 0)));
      // scene.add(createLabel('10', new THREE.Vector3(5.45, -2.8, 0)));
      // scene.add(createLabel('11', new THREE.Vector3(6.45, -2.8, 0)));
      // scene.add(createLabel('12', new THREE.Vector3(7.45, -2.8, 0)));
      // scene.add(createLabel('13', new THREE.Vector3(8.45, -2.8, 0)));

      // Add labels for Y axis
      // scene.add(createLabel('1', new THREE.Vector3(-4.9, -2, 0)));
      // scene.add(createLabel('2', new THREE.Vector3(-4.9, -0.36, 0)));
      // scene.add(createLabel('3', new THREE.Vector3(-4.9, 0.64, 0)));
      // scene.add(createLabel('4', new THREE.Vector3(-4.9, 1.64, 0)));
      // scene.add(createLabel('5', new THREE.Vector3(-4.9, 2.64, 0)));
      // scene.add(createLabel('6', new THREE.Vector3(-4.9, 3.64, 0)));
    });




    // 












    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    const ballMaterialTest = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, depthTest: true });
    const ballTest = new THREE.Mesh(ballGeometry, ballMaterialTest);
    this.ballTest = ballTest;
    // ball.scale.set(.3, .3, 0)
    // ballTest.position.set(.8, 0, 0)
    // ballTest.position.set(-5.3, -.5, 0)
    line.position.set(-5.5, -2.6, 0)
    // line.rotation.z = model.angleProp.value * Math.PI / 180

    // ballTest.position.set(-5.3, -1.5, 0)
    scene.add(ballTest);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, depthTest: true });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    this.ball = ball;
    // ball.scale.set(.3, .3, 0)
    // ball.position.set(.8, 0, 0)
    // ball.position.set(-5.3, -.5, 0)
    // ball.position.set(-5.3, 10.5, 0)

    // ball.position.set(0, 0, 0);
    // cannon.position.set(-5.5, -3.3, 0)

    // cannon.position.set(-4, -3.3, 0)
    // cannon.position.set(-5.5, -3, 0)
    // cannon.position.set(-5.5, this.model.cannonPositionY, 0)
    // cannon.position.set(-5, -3.3, 0)
    // group.position.set(-4, -3.3, 0)
    // cannon.position.set(0, -3.3, 0)
    // cannon.add(ball);

    scene.add(ball);
    this.scene = scene;

    this.ball.position.x = this.model.x - 5.5;
    this.ball.position.y = this.model.y - 3.6;
    this.ballTest.position.x = this.model.x - 5.5;
    this.ballTest.position.y = this.model.y - 3.6;
    this.pathRef = new THREE.Path();
    this.pathRef.currentPoint = new THREE.Vector2(ball.position.x, ball.position.y)

    const points = this.pathRef.getPoints();

    const geometryPath = new THREE.BufferGeometry().setFromPoints(points);
    const materialPath = new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true });

    this.lineRef = new THREE.Line(geometryPath, materialPath);

    scene.add(this.lineRef);
    this.pathTest = new THREE.Path();
    this.pathTest.currentPoint = new THREE.Vector2(ballTest.position.x, ballTest.position.y)

    const geometryPathTest = new THREE.BufferGeometry().setFromPoints(points);

    this.lineTest = new THREE.Line(geometryPathTest, materialPath);

    scene.add(this.lineTest);

    const domNode = new DOM(renderer.domElement);
    this.domNode = domNode;
    // rootNode.addChild(domNode);
    this.domNode._container.style.position = ""
    this.addChild(domNode);

    camera.position.z = 5;



    display.updateOnRequestAnimationFrame(() => {
      renderer.render(scene, camera);
    });

    // Resize the display to always fill the window
    display.resizeOnWindowResize();
    // console.log(Math.asin(model.v_y / Math.sqrt(Math.pow(model.v_x, 2) + Math.pow(model.v_y, 2))))
    // console.log(Math.asin(model.v_y / Math.sqrt(Math.pow(model.v_x, 2) + Math.pow(model.v_y, 2))))


    // Manage layout
    // domNode.leftTop = new phet.dot.Vector2(constantPanel.rightCenter.x + constantPanel.width / 4, 0);
    // domNode.leftTop = new phet.dot.Vector2(constantPanel.rightTop.x + 10, 30);
    domNode.leftTop = new phet.dot.Vector2(0, 0);
    const resizeListener = () => {
      // camera.aspect = window.innerWidth / window.innerHeight;
      // camera.aspect = window.innerWidth / window.innerHeight
      // camera.aspect = 800 / 500
      // camera.aspect = this.layoutBounds.maxX / this.layoutBounds.maxY
      // camera.aspect = this.layoutBounds.maxX / this.layoutBounds.maxY

      // renderer.setSize(this.layoutBounds.maxX / 2.3, this.layoutBounds.maxY / 2);
      renderer.setSize(this.layoutBounds.maxX, this.layoutBounds.maxY);


      // renderer.setSize(Math.max(window.innerWidth / 2.5, 300), Math.max(window.innerHeight / 2.5, 200));
      // cannon.position.set(-5.5, -.7, 0)
      // cannon.position.set(-5.5, -3, 0)
      // group.position.set(-5.5, -.7, 0)
      // cannon.position.set(-3.5, -.7, 0)
      // cannon.position.set(-5.5, -3.3, 0)
      ball.scale.set(.1, .1, 0)
      ballTest.scale.set(.1, .1, 0)
      // ball.position.set(-5.2, -3, 0)
      camera.updateProjectionMatrix();
    };

    let ballX = ball.position.x;
    let ballY = ball.position.y;
    let isSpacePressed = false;
    let shoot = false;
    let vx: number = model.v_x;  // Initial horizontal velocity of the ball
    let vy: number = model.v_y;  // Initial vertical velocity of the ball
    let dragCoefficient: number = 0.1;  // Drag coefficient
    const clock: THREE.Clock = new THREE.Clock();
    let actionStop = false;

    // this.refXdotGraph.leftTop = new phet.dot.Vector2(domNode.rightTop.x + 200, 30);
    // this.refYdotGraph.leftTop = new phet.dot.Vector2(this.refXdotGraph.rightBottom.x - 30, 30);
    // this.refXGraph.leftTop = new phet.dot.Vector2(this.refXdotGraph.leftTop.x, this.refXdotGraph.leftTop.y+200);
    // this.refYGraph.leftTop = new phet.dot.Vector2(this.refYdotGraph.leftTop.x, this.refYdotGraph.leftTop.y+200);

    buttonMass.lazyLink(() => { model.massProp.value = Number(window.prompt("Enter value for mass:")); reset(); })
    buttonGravity.lazyLink(() => { model.gravityProp.value = Number(window.prompt("Enter value for gravity:")); reset(); })
    buttonFrictionl.lazyLink(() => { model.klProp.value = Number(window.prompt("Enter value for friction:")); reset(); })
    buttonFrictionq.lazyLink(() => { model.kqProp.value = Number(window.prompt("Enter value for friction:")); reset(); })
    buttonSpeed.lazyLink(() => { model.vProp.value = Number(window.prompt("Enter value for speed:")); reset(); })
    buttonDegree.lazyLink(() => { model.angleProp.value = Number(window.prompt("Enter value for theta in degrees:")); reset(); })
    buttonV_x.lazyLink(() => { model.v_xProp.value = Number(window.prompt("Enter value for v_x in meter per second:")); reset(); })
    buttonV_y.lazyLink(() => { model.v_yProp.value = Number(window.prompt("Enter value for v_y in meter per second:")); reset(); })
    buttonHeight.lazyLink(() => { model.yProp.value = Number(window.prompt("Enter value y in meter:")); reset() })




    window.addEventListener('resize', () => {
      resizeListener();
    });
    resizeListener();

    // window.addEventListener("keydown", (event) => {















    this.selectedRunProperty = new Property('History'); // This will persist even after rebuilding

    const listParent = new Node(); // Parent for the combo box
    let currentComboBox: Node | null = null; // To keep track of the current combo box

    function updateComboBox(this: SimScreenView, runs: Array<{ name: string; index: number }> | string[]) {
      if (currentComboBox) {
        listParent.removeChild(currentComboBox);
        currentComboBox.dispose();
      }

      // Support both array of objects and array of strings for runs
      const items = [
        {
          value: 'History',
          createNode: () => new Text('History'),
          accessibleName: 'History run'
        },
        ...(Array.isArray(runs) && typeof runs[0] === 'object'
          ? (runs as Array<{ name: string; index: number }>).map(run => ({
            value: `Run ${run.index + 1}`,
            createNode: () => new Text(`Run ${run.index + 1}`),
            accessibleName: `Run ${run.index + 1}`
          }))
          : (runs as string[]).map((run, idx) => ({
            value: run,
            createNode: () => new Text(run),
            accessibleName: run
          }))
        )
      ];


      currentComboBox = new CarouselComboBox<string>(
        this.selectedRunProperty,
        items,
        {
          scale: 1.3
        }

      );


      listParent.addChild(currentComboBox);

    }


    this.addChild(listParent);
    this.updateComboBox = updateComboBox.bind(this);
    this.updateComboBox([]);


    this.selectedRunProperty.link(selected => {
      if (selected.startsWith('Run ')) {
        const index = parseInt(selected.replace('Run ', '')) - 1;
        const run = this.runHistory[index];
        if (run) {
          this.model.gravityProp.value = run.gravity;
          this.model.klProp.value = run.kl;
          this.model.kqProp.value = run.kq;
          this.model.vProp.value = run.v;
          this.model.angleProp.value = run.angle;
          this.model.yProp.value = run.y;
          this.model.v_xProp.value = run.v_x;
          this.model.v_yProp.value = run.v_y;

          this.xdotLatex = run.xdotLatex;
          this.ydotLatex = run.ydotLatex;
          this.v_xdotLatex = run.v_xdotLatex;
          this.v_ydotLatex = run.v_ydotLatex;

          this.model.xEQ = run.xEQ;
          this.model.yEQ = run.yEQ;
          this.model.v_xEQ = run.v_xEQ;
          this.model.v_yEQ = run.v_yEQ;


          dragTypeProperty.value = run.dragType === "quadratic" ? DragType.QUADRATIC : DragType.LINEAR;

          this.restoreRun()
          // this.reset();  // Add this method next


        }
      }
    });

    listParent.leftTop = new Vector2(constantPanel.rightCenter.x + 20, constantPanel.leftTop.y + 10);


















    const reset = (action = "") => {




      cannon.rotation.z = model.angleProp.value * Math.PI / 180;
      model.angleProp.value = cannon.rotation.z * 180 / Math.PI;






      this.spacePressed = false;
      model.reset(action)
      this.reset(action)
      vx = model.v_x
      vy = model.v_y;

      // ball.position.set(-5.3, -3.1, 0)
      isSpacePressed = false;





    }
    reset("Start")
    // 


    // const recreatedRunIds = new Set<number>();
    // let currentRunId = i; // Tracks the active run id
    // let latestRunId = i; // Tracks the highest run number

    // numberProperty.lazyLink((newValue) => {
    //   if (isSettingProperty) return;
    //   const selectedItem = numberItems.find(item => item.value === newValue);
    //   if (!selectedItem) return;

    //   const runs = numberItems.filter(item => item.value !== 1); // Exclude "Records"
    //   const newLatest = Math.max(...runs.map(item => item.value));
    //   latestRunId = newLatest;

    //   // Check if we need to create a new run
    //   const isPreviousRun = selectedItem.value < latestRunId;
    //   const isCurrentRun = selectedItem.value === currentRunId;
    //   const isLatestRun = selectedItem.value === latestRunId;


    //   // Check if we need to create a new run when selecting a previous run
    //   // if (isPreviousRun) {
    //   //   // When selecting a previous run, create a new record based on it
    //   //   console.log(`Creating new run based on Run - ${selectedItem.value}`);

    //   //   // Create a new run with parameters from the selected previous run
    //   //   i++;

    //   //   numberItems.unshift({
    //   //     value: latestRunId + 1,
    //   //     createNode: () => new RichText(`Run - ${(latestRunId + 1).toString()}`, { maxWidth: 50 }),
    //   //     g: selectedItem.g,
    //   //     kl: selectedItem.kl,
    //   //     kq: selectedItem.kq,
    //   //     m: selectedItem.m,
    //   //     v_x: selectedItem.v_x,
    //   //     v_y: selectedItem.v_y,
    //   //     y: selectedItem.y,
    //   //     angle: selectedItem.angle,
    //   //     xEQ: selectedItem.xEQ,
    //   //     yEQ: selectedItem.yEQ,
    //   //     v_xEQ: selectedItem.v_xEQ,
    //   //     v_yEQ: selectedItem.v_yEQ,
    //   //     quadratic: selectedItem.quadratic
    //   //   });

    //   //   // Update current and latest run IDs
    //   //   currentRunId = latestRunId + 1;
    //   //   latestRunId = currentRunId;

    //   //   // Rebuild the combo box
    //   //   this.removeChild(numberComboBox);
    //   //   numberComboBox.dispose();

    //   //   numberComboBox = new ComboBox(
    //   //     numberProperty,
    //   //     numberItems,
    //   //     this,
    //   //     {
    //   //       listPosition: 'below',
    //   //       cornerRadius: 5,
    //   //       buttonColorProperty: new Property(new Color('white')),
    //   //       buttonYMargin: 5,
    //   //       buttonXMargin: 10,
    //   //       listYMargin: 5,
    //   //       maxWidth: 100
    //   //     }
    //   //   );

    //   //   this.addChild(numberComboBox);
    //   //   numberComboBox.leftTop = new Vector2(5, 130);

    //   //   isSettingProperty = true;
    //   //   numberProperty.value = numberItems[0].value;
    //   //   isSettingProperty = false;
    //   //   console.log(`Added new record as Run - ${latestRunId}`);
    //   // }




    //   model.gravityProp.value = selectedItem?.g;
    //   model.klProp.value = selectedItem?.kl;
    //   model.kqProp.value = selectedItem?.kq;
    //   model.v_xProp.value = selectedItem?.v_x;
    //   model.v_yProp.value = selectedItem?.v_y;
    //   model.angleProp.value = selectedItem?.angle;
    //   model.yProp.value = selectedItem?.y;
    //   model.xEQ = selectedItem?.xEQ ?? model.xEQ;
    //   model.yEQ = selectedItem?.yEQ ?? model.yEQ;
    //   model.v_xEQ = selectedItem?.v_xEQ ?? model.v_xEQ;
    //   model.v_yEQ = selectedItem?.v_yEQ ?? model.v_yEQ;
    //   model.quadraticDrag = selectedItem?.quadratic;

    //   // Update MathQuill fields
    //   xdotField.mathField.latex(model.xEQ);
    //   ydotField.mathField.latex(model.yEQ);
    //   v_xdotField.mathField.latex(model.v_xEQ);
    //   v_ydotField.mathField.latex(model.v_yEQ);


    //   dragTypeProperty.set(model.quadraticDrag ? DragType.QUADRATIC : DragType.LINEAR);






    //   reset()
    //   isSpacePressed = true;
    //   this.spacePressed = true;
    //   model.paused = false;



    // });


    // 


    const testEquationPanel = new Panel(new VBox({
      align: "center", children: [
        new Text("Test Equations", { fontSize: 19 }),
        new Rectangle(0, 0, 350, 15),

        // new HBox({ align: "center", children: [xdotLabel, xdotBox] }), 
        new HBox({ align: "center", children: [new RichText("<em>&#x1E8B;=</em>  "), xdotBox] }),
        new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
        new HBox({ align: "center", children: [new RichText("<em>&#x79;&#x307;=</em>  "), ydotBox] }),
        new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
        new HBox({ align: "center", children: [new RichText("<em>v&#x307;<sub>x</sub>=</em>  "), v_xdotBox] }),
        new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
        new HBox({ align: "center", children: [new RichText("<em>v&#x307;<sub>y</sub>=</em>  "), v_ydotBox] }),
      ]
    }), { fill: new Color("#d3d3d3"), scale: 0.77 })
    this.addChild(testEquationPanel)



    // constantPanel.leftTop = new phet.dot.Vector2(5, 10)
    // speedPanel.leftTop = new phet.dot.Vector2(5, constantPanel.leftBottom.y + 10)
    // const quadratic = new Property<boolean>(true);
    // const dragToggle = new ToggleSwitch(quadratic, true, false)
    // quadratic.link(e => {
    //   model.quadraticDrag = e;


    // })
    // const refEquationPanel = new Panel(new VBox({
    //   align: "center", children: [
    //     new RichText("Reference Equations"),
    //     new Rectangle(0, 0, 350, 15),
    //     new HBox({ align: "center", children: [new RichText("Quadratic Drag  "), new Rectangle(0, 0, 10, 0), dragToggle, new Rectangle(0, 0, 10, 0), new RichText("Linear Drag  ")] }),
    //     new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),

    //   ]
    // }), { fill: new Color("#d3d3d3"), maxWidth: 230 })

    enum DragType {
      QUADRATIC = 'quadratic',
      LINEAR = 'linear'
    }

    // Create a property to track the selected drag type (default to quadratic)
    const dragTypeProperty = new Property<DragType>(DragType.QUADRATIC);

    // Define the radio button items
    const radioButtonItems = [
      {
        value: DragType.QUADRATIC,
        createNode: () => new Text('Quadratic Drag', { fontSize: 17 })
      },
      {
        value: DragType.LINEAR,
        createNode: () => new Text('Linear Drag', { fontSize: 17 })
      }
    ];

    // Create the radio button group
    const dragRadioButtonGroup = new VerticalAquaRadioButtonGroup(
      dragTypeProperty,
      radioButtonItems,
      {
        spacing: 10,
        align: 'left',
        radioButtonOptions: { radius: 10 }
      }
    );

    // Link the property to update model.quadraticDrag
    dragTypeProperty.link(dragType => {
      model.quadraticDrag = (dragType === DragType.QUADRATIC);

    });

    // Then create the panel with the radio button group
    const refEquationPanel = new Panel(new VBox({
      align: "center",
      children: [
        new Text("Reference Equations", { fontSize: 19 }),
        new Rectangle(0, 0, 350, 15),
        dragRadioButtonGroup,
        new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
      ]
    }), { fill: new Color("#d3d3d3"), scale: 0.77 });


    this.addChild(refEquationPanel)
    constantPanel.leftTop = new phet.dot.Vector2(10, 0)
    refEquationPanel.leftTop = new phet.dot.Vector2(10, constantPanel.leftBottom.y + 2)
    testEquationPanel.leftTop = new phet.dot.Vector2(10, refEquationPanel.leftBottom.y + 2)
    // equationPanel.leftTop = new phet.dot.Vector2(0, 0)

    const resume = new Property<boolean>(false);
    const ResumeButton = new RectangularToggleButton(resume, false, true, { minWidth: 100, maxHeight: 25, content: new RichText('Run!'), baseColor: "#41b3d5" })
    resume.lazyLink(e => {
      // this.model.paused = !this.model.paused
      reset(action = "Run")
      isSpacePressed = true;
      this.spacePressed = true;
      model.paused = false;

      // pauseButton.visible = !pauseButton.visible
      // ResumeButton.visible = !ResumeButton.visible
    })


    const resetAndPausePanel = new Panel(new VBox({
      // align: "center", children: [resetAllButton, new Rectangle(0, 0, 90, 0), ResumeButton]
      align: "center", children: [ResumeButton, new Rectangle(0, 0, 220, 0)]
    }), { fill: new Color("#d3d3d3"), minWidth: 277 })
    this.addChild(resetAndPausePanel)
    // ResumeButton.leftTop = new phet.dot.Vector2(10, 100)
    resetAndPausePanel.leftTop = new phet.dot.Vector2(testEquationPanel.leftBottom.x, testEquationPanel.leftBottom.y + 2)
    // resetAndPausePanel.leftTop = new phet.dot.Vector2(equationPanel.width, equationPanel.leftBottom.y + 10)



    // RectBase
    const groundTunnel = new THREE.PlaneGeometry(1.5, 5.5)
    const tunnelMaterial = new THREE.MeshBasicMaterial({ color: "grey", side: THREE.DoubleSide, transparent: false });
    const tunnel = new THREE.Mesh(groundTunnel, tunnelMaterial)
    tunnel.position.set(-5.9, -5.8, 0)
    scene.add(tunnel)



    var pillar = new THREE.PlaneGeometry(1, 5.5);
    var pillarMaterial = new THREE.MeshBasicMaterial({ color: "#787FF6", side: THREE.DoubleSide });
    // var material1 = new THREE.MeshBasicMaterial({
    //   map: new THREE.TextureLoader().load('/projectile-motion-drag/js/projectile-motion-drag/view/pillarBackground.png'),
    //   transparent: true,
    //   alphaTest: 0.5,
    //   side: THREE.DoubleSide
    // });
    var rectangle = new THREE.Mesh(pillar, pillarMaterial);
    // scene.add(rectangle);

    var cannonConnector = new THREE.PlaneGeometry(.2, .55)
    var connectorStyle = new THREE.MeshBasicMaterial({ color: "black", side: THREE.DoubleSide })
    var connector = new THREE.Mesh(cannonConnector, connectorStyle)
    // scene.add(connector)

    // Set initial position
    // rectangle.position.set(-5.5, -6.5, 0); // Move the rectangle up so that the bottom is at y = 0
    rectangle.position.set(-5, this.model.cannonPositionYProp.value - 3.5, 0); // Move the rectangle up so that the bottom is at y = 0
    // connector.position.set(-5.6, -3.5, 0)
    this.rectangle = rectangle
    connector.position.set(-5.6, this.model.cannonPositionYProp.value - .48, 0)
    this.connector = connector;
    // Function to adjust the height of the rectangle
    // function adjustHeight(action: String) {
    //     // Loop through each vertex of the rectangle's geometry
    //     rectangle.geometry.vertices.forEach(function(vertex) {
    //         // Only move vertices that are above the bottom
    //         // if (vertex.y > 0) {
    //         //     vertex.y += amount; // Move vertex by the specified amount
    //         // }
    //         if (vertex.y > 0){

    //           if (action === "Up"){
    //             vertex.y += .1;
    //           }
    //           else if (action === "Down"){
    //             vertex.y -= .1;
    //           }
    //         }
    //     });
    //     // Update geometry vertices
    //     rectangle.geometry.verticesNeedUpdate = true;
    // }





    window.addEventListener("keydown", (event) => {
      // if (!isSpacePressed) {
      if (event.key === " ") {
        reset("Run")
        isSpacePressed = true;
        this.spacePressed = true;
        model.paused = false;
      }
      if (event.key === 'ArrowUp') {
        // Increase the x position of the cubeMesh

        // console.log(`This is confirmation ${this.model.x}`)
        reset()

        if (this.model.yProp.value < 25) {
          // cannon.position.y += 0.01
          // ball.position.y += 0.01


          this.model.yProp.value += 1

          // this.model.kProp.value += .01
          // this.ball.position.y += .1;
          this.model.y = this.model.yProp.value
          if (this.model.yProp.value > -0.0009 && this.model.yProp.value < 0) {
            this.model.yProp.value = 0;
            this.model.y = this.model.yProp.value;


          }

          reset()
          // this.ball.position.y = this.model.yProp.value -5.5;
          this.ball.position.y = this.model.yProp.value / 10 - 3.05;
          // adjustHeight("Up");
          rectangle.position.y += .1 / 10



          // cannon.position.y += 0.1
          // cannon.position.y = this.model.cannonPositionYProp.value
          connector.position.y += 0.1 / 10
          // cannon.position.y += 0.1
          // this.ball.position.y = this.model.y -.7;

        }

      }
      if (event.key === 'ArrowDown') {
        // reset()

        // if (model.yProp.value > .7) {
        if (model.yProp.value >= -0.5) {
          this.model.yProp.value -= 1
          this.model.y = +this.model.yProp.value
          if (this.model.yProp.value < 0 && this.model.yProp.value > -0.0001) {
            this.model.yProp.value = 0;
            this.model.y = this.model.yProp.value;


          }
          // reset()

          this.ball.position.y = this.model.yProp.value / 10 - 3.05;
          rectangle.position.y -= .1 / 10
          connector.position.y -= 0.1 / 10
          if (model.yProp.value < -0.5) {
            this.model.yProp.value = -0.5;
            this.model.y = this.model.yProp.value
            // reset()

            this.ball.position.y = this.model.yProp.value / 10 - 3.05;

          }
        }
      }
      // if (event.key === 'ArrowRight') {
      //   if (model.yProp.value < 9.96) {
      //     cannon.position.x += 0.01
      //     model.yProp.value += .04
      //   }

      // }
      // if (event.key === 'ArrowLeft') {
      //   if (model.yProp.value > 0) {
      //     cannon.position.x -= 0.01
      //     model.yProp.value -= .04
      //     if (model.yProp.value < 0) {
      //       model.yProp.value = 0
      //     }
      //   }
      // }
      // }
    })




    // 

    // 


    let mouseDown = false
    let action: any;
    for (var slider of constantSliders._children.concat(speedConstantSliders._children)) {


      if (slider !== simSpeedSlider) {
        slider.addInputListener({
          down: function (event) {

            // model.angleProp.value = Math.asin(model.v_yProp.value / Math.sqrt(Math.pow(model.v_xProp.value, 2) + Math.pow(model.v_yProp.value, 2)))
            // cannon.rotation.z = model.angle
            // cannon.rotation.z = model.angleProp.value
            cannon.rotation.z = model.angleProp.value * Math.PI / 180
            // group.rotation.z = model.angleProp.value * Math.PI / 180
            // line.rotation.z = model.angleProp.value * Math.PI / 180
            // ball.rotation.z = Math.PI / 3
            // ball.rotation.z = 1
            vx = model.v_x;  // Initial horizontal velocity of the ball
            vy = model.v_y;  // Initial vertical velocity of the ball
            mouseDown = true

            if (event.target._id === 183) {
              action = 183

            } else if (event.target._id === 198) {
              action = 198

            } else if (event.target._id === 213) {
              action = 213

            } else if (event.target._id === 228) {
              action = 228

            } else if (event.target._id === 243) {
              action = 243

            } else if (event.target._id === 258) {
              action = 258

            } else if (event.target._id === 273) {
              action = 273

            }




          },
          mouseup: function (event) {
            // Check if the click was inside your node

            reset()
            cannon.rotation.z = model.angleProp.value * Math.PI / 180
            // group.rotation.z = model.angleProp.value * Math.PI / 180
            // line.rotation.z = model.angleProp.value * Math.PI / 180
            // ball.rotation.z = Math.PI / 3
            vx = model.v_x;  // Initial horizontal velocity of the ball
            vy = model.v_y;  // Initial vertical velocity of the ball

          },

        })
      }
    }
    window.addEventListener("pointerup" || "mouseup", () => {
      if (mouseDown) {
        mouseDown = false;
        cannon.rotation.z = model.angleProp.value * Math.PI / 180
        if (action === 183) {
          reset("gravity")
        } else if (action === 198) {
          reset("k")
        } else if (action === 213) {
          reset("initialVelocity")
        } else if (action === 228) {
          reset("angle")
        } else if (action === 243) {
          reset("height")
        } else if (action === 258) {
          reset("v0x")
        } else if (action === 273) {
          reset("v0y")
        }
        // reset()
      }
    })


  }







  public restoreRun(): void {
    // Reset simulation without saving to history
    // this.pause = true
    
    this.model.gravity = this.model.gravityProp.value;
    this.model.kl = this.model.klProp.value;
    this.model.kq = this.model.kqProp.value;
    this.model.v = this.model.vProp.value;
    this.model.angle = this.model.angleProp.value;
    this.model.v_x = this.model.v_xProp.value;
    this.model.v_y = this.model.v_yProp.value;
    this.model.y = this.model.yProp.value;

    this.xdotField.updateText(this.xdotLatex);
    this.ydotField.updateText(this.ydotLatex);
    this.v_xdotField.updateText(this.v_xdotLatex);
    this.v_ydotField.updateText(this.v_ydotLatex);



    
    
    this.runner = false;
    
    // this.spacePressed = true;
    // this.model.paused = false;
    this.model.reset("Restore from history");
    this.reset();
    // this.model.paused = false;
    



  }
















  public reset(action?: string): void {



    this.xdotLatex = this.xdotField.mathField.latex();
    this.ydotLatex = this.ydotField.mathField.latex();
    this.v_xdotLatex = this.v_xdotField.mathField.latex();
    this.v_ydotLatex = this.v_ydotField.mathField.latex();



    const currentSettings = {
      gravity: this.model.gravityProp.value,
      kl: this.model.klProp.value,
      kq: this.model.kqProp.value,
      v: this.model.vProp.value,
      angle: this.model.angleProp.value,
      y: this.model.yProp.value,
      v_x: this.model.v_xProp.value,
      v_y: this.model.v_yProp.value,
      xdotLatex: this.xdotLatex,
      ydotLatex: this.ydotLatex,
      v_xdotLatex: this.v_xdotLatex,
      v_ydotLatex: this.v_ydotLatex,

      xEQ: this.model.xEQ,
      yEQ: this.model.yEQ,
      v_xEQ: this.model.v_xEQ,
      v_yEQ: this.model.v_yEQ,
      dragType: this.model.quadraticDrag ? "quadratic" : "linear"
    };

    if (action === "Run") {
      // Check if settings are different from last run
      const lastRun = this.runHistory[this.runHistory.length - 1];
      const isDifferent = !lastRun || Object.keys(currentSettings).some(key =>
        lastRun[key as keyof typeof currentSettings] !== currentSettings[key as keyof typeof currentSettings]
      );

      // Only add to history if settings are different
      if (isDifferent) {
        this.runHistory.push(currentSettings);

        // Update ComboBox with new history
        this.updateComboBox(this.runHistory.map((_: any, index: number) => ({
          name: `Run ${index + 1}`,
          index
        })));

        // Update selected run to newest


        const currentRunNumber = this.runHistory.length;
        this.selectedRunProperty.value = `Run ${currentRunNumber}`;

      }
    }








    this.model.updateGraphs = false;
    this.scene.remove(this.group);
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.graphBox.detach()

    this.refXdotGraph.detach();
    this.refXdotGraph = drawV_X(this.model.graphData, this.model.graphLen, 'staticSim-xdot', 'reference', this.graphSize, this.model.graphDataTest, this.model.graphLenTest);
    this.yScalevx = this.refXdotGraph.y
    this.xScalevx = this.refXdotGraph.x
    this.refXdotGraph.node.offsetWidth = 250
    this.refXdotGraph.node.offsetHeight = 250
    this.refXdotGraph = new DOM(this.refXdotGraph.node);
    this.refXdotGraph._container.style.transformOrigin = 'left top 0px';
    // this.addChild(this.refXdotGraph);


    this.refYdotGraph.detach();
    this.refYdotGraph = drawV_Y(this.model.graphData, this.model.graphLen, 'variableSim-ydot', 'test', this.graphSize, this.model.graphDataTest, this.model.graphLenTest);
    this.yScalevy = this.refYdotGraph.y
    this.xScalevy = this.refYdotGraph.x
    this.refYdotGraph.node.offsetWidth = 250
    this.refYdotGraph.node.offsetHeight = 250
    this.refYdotGraph = new DOM(this.refYdotGraph.node);
    this.refYdotGraph._container.style.transformOrigin = 'left top 0px';
    // this.addChild(this.refYdotGraph);

    this.refXGraph.detach();
    this.refXGraph = drawX(this.model.graphData, this.model.graphLen, 'staticSim-x', 'reference', this.graphSize, this.model.graphDataTest, this.model.graphLenTest);
    this.yScalex = this.refXGraph.y
    this.xScalex = this.refXGraph.x
    this.refXGraph.node.offsetWidth = 250
    this.refXGraph.node.offsetHeight = 250
    this.refXGraph = new DOM(this.refXGraph.node);
    this.refXGraph._container.style.transformOrigin = 'left top 0px';
    // this.addChild(this.refXGraph);
    // this.rootNode.addChild(this.refXGraph);
    // this.addChild(this.refXGraph);

    this.refYGraph.detach();
    this.refYGraph = drawY(this.model.graphData, this.model.graphLen, 'variableSim-y', 'test', this.graphSize, this.model.graphDataTest, this.model.graphLenTest);

    this.yScaley = this.refYGraph.y
    this.xScaley = this.refYGraph.x
    this.refYGraph.node.offsetWidth = 250
    this.refYGraph.node.offsetHeight = 250
    this.refYGraph = new DOM(this.refYGraph.node);
    this.refYGraph._container.style.transformOrigin = 'left top 0px';
    // console.log(this.refYGraph)
    // this.addChild(this.refYGraph);
    this.graphBox = new Panel(new Rectangle(0, 0, 400, 410), { opacity: 0.5 });
    this.graphBox.leftTop = new phet.dot.Vector2(1040, 35);
    this.addChild(this.graphBox)

    this.addChild(this.refXGraph);
    this.addChild(this.refYGraph);
    this.addChild(this.refXdotGraph);
    this.addChild(this.refYdotGraph);

    this.refXGraph.leftTop = new phet.dot.Vector2(1050, 40);
    // this.refYGraph.leftTop = new phet.dot.Vector2(this.refXGraph.rightBottom.x - 30, 40);
    this.refYGraph.leftTop = new phet.dot.Vector2(1240, 40);
    // this.refXdotGraph.leftTop = new phet.dot.Vector2(this.refXGraph.leftTop.x, this.refXGraph.leftTop.y + 200);
    this.refXdotGraph.leftTop = new phet.dot.Vector2(1050, 240);
    // this.refYdotGraph.leftTop = new phet.dot.Vector2(this.refYGraph.leftTop.x, this.refYGraph.leftTop.y + 200);
    this.refYdotGraph.leftTop = new phet.dot.Vector2(1240, 240);


    this.refXGraph.element.children[9].setAttribute('cx', this.xScalex(0));
    this.refXGraph.element.children[9].setAttribute('cy', this.yScalex(this.model.graphData.getX(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refXGraph.element.children[7].setAttribute('cx', this.xScalex(0));
      this.refXGraph.element.children[7].setAttribute('cy', this.yScalex(this.model.graphDataTest.getX(0)));
    }
    this.refYGraph.element.children[9].setAttribute('cx', this.xScaley(0));
    this.refYGraph.element.children[9].setAttribute('cy', this.yScaley(this.model.graphData.getY(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refYGraph.element.children[7].setAttribute('cx', this.xScaley(0));
      this.refYGraph.element.children[7].setAttribute('cy', this.yScaley(this.model.graphDataTest.getY(0)));
    }

    this.refXdotGraph.element.children[9].setAttribute('cx', this.xScalevx(0));
    this.refXdotGraph.element.children[9].setAttribute('cy', this.yScalevx(this.model.graphData.getV_X(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refXdotGraph.element.children[7].setAttribute('cx', this.xScalevx(0));
      this.refXdotGraph.element.children[7].setAttribute('cy', this.yScalevx(this.model.graphDataTest.getV_X(0)));
    }
    this.refYdotGraph.element.children[9].setAttribute('cx', this.xScalevy(0));
    this.refYdotGraph.element.children[9].setAttribute('cy', this.yScalevy(this.model.graphData.getV_Y(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refYdotGraph.element.children[7].setAttribute('cx', this.xScalevy(0));
      this.refYdotGraph.element.children[7].setAttribute('cy', this.yScalevy(this.model.graphDataTest.getV_Y(0)));
    }
    this.focusedEq[1].mathField.blur()
    // this.ball.position.x = this.model.x -5.5;
    this.ball.position.x = this.model.xProp.value - 5.5;

    this.ball.position.y = this.model.yProp.value / 10 - 3.05;
    // this.ballTest.position.x = this.model.x -5.5;
    this.ballTest.position.x = this.model.xProp.value - 5.5;
    // this.ballTest.position.y = this.model.y  -1.3;
    // this.ballTest.position.y = this.model.y  -3.6;
    // this.ballTest.position.y = this.model.yProp.value  -2.6;
    // this.ballTest.position.y = this.model.yProp.value  -2.35;
    this.ballTest.position.y = this.model.yProp.value / 10 - 3.05;
    this.pathRef = new THREE.Path();
    this.pathRef.currentPoint = new THREE.Vector2(this.ball.position.x, this.ball.position.y)

    const points = this.pathRef.getPoints();

    const geometryPath = new THREE.BufferGeometry().setFromPoints(points);
    const materialPath = new THREE.LineBasicMaterial({ color: 0xff0000 });

    this.scene.remove(this.lineRef);
    this.lineRef = new THREE.Line(geometryPath, materialPath);
    this.scene.add(this.lineRef);


    this.pathTest = new THREE.Path();

    this.pathTest.currentPoint = new THREE.Vector2(this.ballTest.position.x, this.ballTest.position.y)
    const pointsTest = this.pathTest.getPoints();

    const geometryPathTest = new THREE.BufferGeometry().setFromPoints(pointsTest);

    this.scene.remove(this.lineTest);
    this.lineTest = new THREE.Line(geometryPathTest, materialPath);
    this.scene.add(this.lineTest);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public step(dt: number): void {

    if (this.spacePressed && !this.model.paused && this.runner) {


      const bufferXRef = this.ball.position.x;
      const bufferYRef = this.ball.position.y;
      const bufferXTest = this.ballTest.position.x;
      const bufferYTest = this.ballTest.position.y;
      
      this.ball.position.x = this.model.graphData.getX(this.model.timer) / 10 - 5.5;
      
      this.ball.position.y = this.model.graphData.getY(this.model.timer) / 10 - 3.05;
      if (this.ball.position.y === this.lastBallY) {
        this.model.startTest = true;

      }
      this.lastBallY = this.ball.position.y
      if (this.model.graphDataTest.getX(this.model.timerTest) === 0 && this.model.graphDataTest.getY(this.model.timerTest) === 0) {
        // this.ballTest.position.x = this.model.x -5.5;
        // this.ballTest.position.x = this.model.x -4.5;
        this.ballTest.position.x = this.model.xProp.value / 10 - 5.5;
        
        this.ballTest.position.y = this.model.yProp.value / 10 - 3.05;
      } else {
        // this.ballTest.position.x = this.model.graphDataTest.getX(this.model.timerTest) - 5.5;
        this.ballTest.position.x = this.model.graphDataTest.getX(this.model.timerTest) / 10 - 5.5;
        
        this.ballTest.position.y = this.model.graphDataTest.getY(this.model.timerTest) / 10 - 3.05;
      }
      // this.ballTest.position.x = this.model.graphDataTest.getX(this.model.timerTest) - 5.5;
      // this.ballTest.position.y = this.model.graphDataTest.getY(this.model.timerTest) - 1.3;

      if (this.model.timer <= this.model.graphData.data[this.model.graphData.data.length - 1].time) {

        this.pathRef.quadraticCurveTo(bufferXRef, bufferYRef, this.ball.position.x, this.ball.position.y);

        const points = this.pathRef.getPoints();

        const geometryPath = new THREE.BufferGeometry().setFromPoints(points);
        const materialPath = new THREE.LineDashedMaterial({
          color: 0xff0000,
          linewidth: 1,
          scale: .5,
          dashSize: .1,
          gapSize: .1,
          transparent: false
        });

        this.scene.remove(this.lineRef);
        this.lineRef = new THREE.Line(geometryPath, materialPath);
        this.lineRef.computeLineDistances();
        this.scene.add(this.lineRef);
        // const newBall = this.ball.clone();
        // newBall.scale.set(0.05, 0.05, 0.05); 
        // this.group.add(newBall);
        this.refXGraph.element.children[9].setAttribute('cx', this.xScalex(this.model.timer));
        this.refXGraph.element.children[9].setAttribute('cy', this.yScalex(this.model.graphData.getX(this.model.timer)));
        this.refYGraph.element.children[9].setAttribute('cx', this.xScaley(this.model.timer));
        this.refYGraph.element.children[9].setAttribute('cy', this.yScaley(this.model.graphData.getY(this.model.timer)));
        this.refXdotGraph.element.children[9].setAttribute('cx', this.xScalevx(this.model.timer));
        this.refXdotGraph.element.children[9].setAttribute('cy', this.yScalevx(this.model.graphData.getV_X(this.model.timer)));
        this.refYdotGraph.element.children[9].setAttribute('cx', this.xScalevy(this.model.timer));
        this.refYdotGraph.element.children[9].setAttribute('cy', this.yScalevy(this.model.graphData.getV_Y(this.model.timer)));
      }
      // console.log(this.model.graphDataTest.id)
      if (this.model.graphDataTest.data.length > 10 && this.model.timerTest < this.model.graphDataTest.data[this.model.graphDataTest.data.length - 1].time) {
        this.pathTest.quadraticCurveTo(bufferXTest, bufferYTest, this.ballTest.position.x, this.ballTest.position.y);

        const points = this.pathTest.getPoints();

        const geometryPath = new THREE.BufferGeometry().setFromPoints(points);
        const materialPath = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 3, transparent: false });

        this.scene.remove(this.lineTest);
        this.lineTest = new THREE.Line(geometryPath, materialPath);
        this.scene.add(this.lineTest);
        // const newBallTest = this.ballTest.clone();
        // newBallTest.scale.set(0.05, 0.05, 0.05); 
        // this.group.add(newBallTest);
        this.refXGraph.element.children[7].setAttribute('cx', this.xScalex(this.model.timerTest));
        this.refXGraph.element.children[7].setAttribute('cy', this.yScalex(this.model.graphDataTest.getX(this.model.timerTest)));
        this.refYGraph.element.children[7].setAttribute('cx', this.xScaley(this.model.timerTest));
        this.refYGraph.element.children[7].setAttribute('cy', this.yScaley(this.model.graphDataTest.getY(this.model.timerTest)));
        this.refXdotGraph.element.children[7].setAttribute('cx', this.xScalevx(this.model.timerTest));
        this.refXdotGraph.element.children[7].setAttribute('cy', this.yScalevx(this.model.graphDataTest.getV_X(this.model.timerTest)));
        this.refYdotGraph.element.children[7].setAttribute('cx', this.xScalevy(this.model.timerTest));
        this.refYdotGraph.element.children[7].setAttribute('cy', this.yScalevy(this.model.graphDataTest.getV_Y(this.model.timerTest)));
      }


    } else {

      this.ball.position.x = this.model.xProp.value - 5.5;
      // this.ball.position.y = this.model.y  - 2.6;
      // this.ball.position.y = this.model.yProp.value  - 2.35;
      this.ball.position.y = this.model.yProp.value / 10 - 3.05;
      // this.ballTest.position.x = this.model.x  - 4.5;
      this.ballTest.position.x = this.model.xProp.value - 5.5;
      // this.ballTest.position.y = this.model.y  - 2.6;
      // this.ballTest.position.y = this.model.yProp.value  - 2.35;
      this.ballTest.position.y = this.model.yProp.value / 10 - 3.05;
      this.cannon.rotation.z = this.model.angle * Math.PI / 180;
      // this.cannon.position.y = this.model.cannonPositionY
      // this.cannon.position.y = this.model.cannonPositionYProp.value
      this.connector.position.set(-5.6, this.model.cannonPositionYProp.value - .48, 0);
      this.rectangle.position.set(-5.5, this.model.cannonPositionYProp.value - 3.5, 0);
      const thetaRadians = (this.model.angle + 180) * (Math.PI / 180);
      this.cannon.position.x = (this.ball.position.x + this.cannonDistance * Math.cos(thetaRadians));
      this.cannon.position.y = (this.ball.position.y + this.cannonDistance * Math.sin(thetaRadians));
      this.cannon.rotation.z = Math.atan2(this.ball.position.y - this.cannon.position.y, this.ball.position.x - this.cannon.position.x);
      this.runner = true



    }


  }
}
