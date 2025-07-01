import { Property } from 'scenerystack';
import { simData } from '../../common/simData.js';
import { getGraphData } from '../../common/rk4testing.js';
import makeid from "../../common/randomStringGenerator.js"
import post from '../../common/postData.js';

export class SimModel {
  public gravityProp: Property<number>;
  public gravity: number;
  public massProp: Property<number>;
  public mass: number;
  public kProp: Property<number>;
  public k: number;
  public klProp: Property<number>;
  public kl: number;
  public kqProp: Property<number>;
  public kq: number;
  public xProp: Property<number>;
  public x: number;
  public yProp: Property<number>;
  public y: number;
  public v_xProp: Property<number>;
  public v_x: number;
  public v_yProp: Property<number>;
  public v_y: number;
  public xTest: number;
  public yTest: number;
  public v_xTest: number;
  public v_yTest: number;
  public simSpeed: number;
  public angleProp: Property<number>;
  public angle: number;
  public vProp: Property<number>;
  public v: number;
  public heightProp: Property<number>;
  public height: number;
  public cannonPositionYProp: Property<number>
  public cannonPositionY: number;
  public pillarHeightProp: Property<number>;
  public pillarHeight: number;
  public minAngle: number
  public minAngleProp: Property<number>
  public action: any

  private isUpdatingProperties = false;
  private resetTimeout: number | null = null;




  public xEQ: string;
  public yEQ: string;
  public v_xEQ: string;
  public v_yEQ: string;
  public xFunc;
  public yFunc;
  public v_xFunc;
  public v_yFunc;

  public validEqs: boolean;
  public timer: number;
  public graphLen: number;
  public graphLenTest: number;
  public originalLen: number;
  public graphUpdateInterval: number;
  public simSpeedProp: Property<number>;
  public updateGraphs: boolean;

  public graphData: simData;
  public graphDataTest: simData;
  public paused: boolean;
  startTest: boolean;
  timerTest: number;
  public updateSlider: boolean;
  quadraticDrag: boolean;
  public name: string | undefined | null;
  public constructor(providedOptions: ProjectileMotionDragModelOptions) {
    if (new URL(window.location.href).searchParams.get("name")) {
      this.name = new URL(window.location.href).searchParams.get("name");
    } else {
      this.name = ''
    }


    //check if have cookie

    if (document.cookie) {

    } else {
      document.cookie = `name=${this.name ? this.name : "unknown"}` + ` id=${makeid(20)}`
    }
    this.quadraticDrag = true;
    this.updateSlider = false;
    this.timerTest = 0;
    this.startTest = false;
    this.gravity = 9.8;
    // this.mass = .1;
    this.mass = 1;
    // this.v = 5;
    this.v = 30;
    this.cannonPositionY = -3
    // this.x = this.xTest = 0;
    // this.y = this.yTest = 0;
    this.angle = 60;
    this.minAngle = 60;
    this.height = 0;
    // this.y = 0;
    // this.v_x = this.v_xTest = 10;
    this.v_x = this.v_xTest = Math.cos(this.angle * (Math.PI / 180)) * this.v;

    this.v_y = this.v_yTest = Math.sin(this.angle * (Math.PI / 180)) * this.v;
    // this.v_y = this.v_yTest = 10;

    var radius = .7;
    // this.x = radius * Math.cos(this.angle * (Math.PI / 180));
    // this.y = radius * Math.sin(this.angle * (Math.PI / 180)) ;
    this.x = 0
    this.y = 0


    this.k = 0.01;
    this.kq = 0.01;
    this.kl = 0.01;
    this.simSpeed = 1.5;

    this.action = "start"
    // this.y = .5
    // this.angle = Math.asin(this.v_y / Math.sqrt(Math.pow(this.v_x, 2) + Math.pow(this.v_y, 2)))


    this.gravityProp = new Property(this.gravity);
    this.vProp = new Property(this.v)
    this.massProp = new Property(this.mass);
    this.xProp = new Property(this.x);
    this.yProp = new Property(this.y);
    this.v_xProp = new Property(this.v_x);
    this.v_yProp = new Property(this.v_y);
    this.kProp = new Property(this.k);
    this.klProp = new Property(this.kl);
    this.kqProp = new Property(this.kq);
    this.simSpeedProp = new Property(this.simSpeed)
    this.angleProp = new Property(this.angle)
    this.heightProp = new Property(this.height);
    this.cannonPositionYProp = new Property(this.cannonPositionY)
    this.minAngleProp = new Property(this.minAngle)
    // this.x = radius * Math.cos(Math.PI * 2 * (Math.atan2(this.v_y, this.v_x)* (180 / Math.PI)) / 360);
    // this.v_x = Math.cos(this.angle * (Math.PI / 180)) * this.v;
    // this.v_y = Math.sin(this.angle * (Math.PI / 180)) * this.v;


    // // Define your sliders and their linked properties
    // this.vProp.link((val) => {
    //   if (!this.updateGraphs) {
    //     this.updateGraphs = true;
    //     this.v_xProp.value = val * Math.cos(this.angle * (Math.PI / 180));
    //     this.v_yProp.value = val * Math.sin(this.angle * (Math.PI / 180));
    //     this.reset()
    //     this.updateGraphs = false;
    //   }
    // });

    // this.angleProp.link((val) => {
    //   if (!this.updateGraphs) {
    //     this.updateGraphs = true;
    //     this.angle = val;
    //     this.v_xProp.value = this.vProp.value * Math.cos(val * (Math.PI / 180));
    //     this.v_yProp.value = this.vProp.value * Math.sin(val * (Math.PI / 180));
    //     this.reset()
    //     this.updateGraphs = false;
    //   }
    // });

    // this.v_xProp.link((val) => {
    //   if (!this.updateGraphs) {
    //     this.updateGraphs = true;
    //     this.vProp.value = Math.sqrt(Math.pow(val, 2) + Math.pow(this.v_yProp.value, 2));
    //     this.angleProp.value = Math.atan2(this.v_yProp.value, val) * (180 / Math.PI);
    //     this.reset()
    //     this.updateGraphs = false;
    //   }
    // });

    // this.v_yProp.link((val) => {
    //   if (!this.updateGraphs) {
    //     this.updateGraphs = true;
    //     this.vProp.value = Math.sqrt(Math.pow(val, 2) + Math.pow(this.v_xProp.value, 2));
    //     this.angleProp.value = Math.atan2(val, this.v_xProp.value) * (180 / Math.PI);
    //     this.reset()
    //     this.updateGraphs = false;
    //   }
    // });

    // Replace your current property links with:
    this.vProp.link((val) => this.updateVelocityProperties('v', val));
    this.angleProp.link((val) => this.updateVelocityProperties('angle', val));
    this.v_xProp.link((val) => this.updateVelocityProperties('v_x', val));
    this.v_yProp.link((val) => this.updateVelocityProperties('v_y', val));

    let prevY = this.yProp.value;

    // this.yProp.link((val) => {
    //   if (!this.updateGraphs) {
    //     this.updateGraphs = true;
    //     this.cannonPositionYProp.value += val - prevY;
    //     prevY = val
    //     this.reset()
    //     this.updateGraphs = false;
    //   }
    // })


    this.yProp.link((val) => {
      if (this.isUpdatingProperties) return;

      this.isUpdatingProperties = true;
      try {
        const deltaY = val - this.y;
        this.y = val;
        this.cannonPositionYProp.value += deltaY;
        this.scheduleReset();
      } finally {
        this.isUpdatingProperties = false;
      }
    });


    var radius = .7;
    // this.x = radius * Math.cos(this.angle * (Math.PI / 180));
    this.x = 0
    // this.y = radius * Math.sin(Math.PI * 2 * (Math.atan2(this.v_y, this.v_x)* (180 / Math.PI)) / 360);
    // this.y = radius * Math.sin(this.angle * (Math.PI / 180));
    this.y = 0

    // let angle = (Math.atan2(this.v_y, this.v_x)* (180 / Math.PI));
    let angle = this.angle;

    this.graphLen = 5;
    this.originalLen = 0;
    this.graphUpdateInterval = .001;
    this.graphData = new simData(this.graphUpdateInterval)
    this.graphDataTest = new simData(this.graphUpdateInterval)
    this.timer = 0;
    this.validEqs = true;
    this.paused = true;
    if (new URL(window.location.href).searchParams.get("formula") === 'true') {
      this.xEQ = 'v_x'
      this.yEQ = 'v_y'
      this.v_xEQ = '-k_q\\cdot v_x\\cdot\\sqrt{v_x^2+v_y^2}'
      this.v_yEQ = '-g-k_q\\cdot v_y\\cdot\\sqrt{v_x^2+v_y^2}'
      // this.v_xEQ = '-\\frac{k}{m}\\cdot v_x\\cdot\\sqrt{v_x^2+v_y^2}'
      // this.v_yEQ = '-g-\\frac{k}{m}\\cdot v_y\\cdot\\sqrt{v_x^2+v_y^2}'

      this.xFunc = globalThis.window.evaluatex(this.xEQ, { k_q: this.kq, k_l: this.kl, m: this.mass, g: this.gravity }, { latex: true });
      this.yFunc = globalThis.window.evaluatex(this.yEQ, { k_q: this.kq, k_l: this.kl, m: this.mass, g: this.gravity }, { latex: true });
      this.v_xFunc = globalThis.window.evaluatex(this.v_xEQ, { k_q: this.kq, k_l: this.kl, m: this.mass, g: this.gravity }, { latex: true });
      this.v_yFunc = globalThis.window.evaluatex(this.v_yEQ, { k_q: this.kq, k_l: this.kl, m: this.mass, g: this.gravity }, { latex: true });

      this.graphDataTest = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.y, angle, this.v_x, this.v_y, this.gravity, this.kl, this.kq, this.mass, { v_xdot: this.v_xFunc, v_yFunc: this.v_yEQ, xdot: this.xFunc, ydot: this.yFunc }, true, this.graphLen, this.graphDataTest, this.timer);

    } else {
      this.xEQ = ''
      this.yEQ = ''
      this.v_xEQ = ''
      this.v_yEQ = ''
      this.graphDataTest = new simData(this.graphUpdateInterval)
      this.graphDataTest.insert(0, 0, 0, 0, 0, 0, 0)


    }


    this.graphData = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.y, angle, this.v_x, this.v_y, this.gravity, this.kl, this.kq, this.mass, {}, false, this.graphLen, this.graphData, this.timer);
    // console.log(this.graphData)
    this.graphLen = this.graphData.data.length * this.graphUpdateInterval;
    this.graphLenTest = this.graphDataTest.data.length * this.graphUpdateInterval;
    this.updateGraphs = false;
  }








  // newly added method to update velocity properties based on the source of change

  private updateVelocityProperties(source: 'v' | 'angle' | 'v_x' | 'v_y', newValue: number): void {
    if (this.isUpdatingProperties) return;

    this.isUpdatingProperties = true;

    try {
      switch (source) {
        case 'v':
          this.v_xProp.value = newValue * Math.cos(this.angle * (Math.PI / 180));
          this.v_yProp.value = newValue * Math.sin(this.angle * (Math.PI / 180));
          break;
        case 'angle':
          this.angle = newValue;
          this.v_xProp.value = this.vProp.value * Math.cos(newValue * (Math.PI / 180));
          this.v_yProp.value = this.vProp.value * Math.sin(newValue * (Math.PI / 180));
          break;
        case 'v_x':
          this.vProp.value = Math.sqrt(Math.pow(newValue, 2) + Math.pow(this.v_yProp.value, 2));
          this.angleProp.value = Math.atan2(this.v_yProp.value, newValue) * (180 / Math.PI);
          break;
        case 'v_y':
          this.vProp.value = Math.sqrt(Math.pow(newValue, 2) + Math.pow(this.v_xProp.value, 2));
          this.angleProp.value = Math.atan2(newValue, this.v_xProp.value) * (180 / Math.PI);
          break;
      }

      this.reset();
    } finally {
      this.isUpdatingProperties = false;
    }
  }


  private scheduleReset(reason = ""): void {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }

    this.resetTimeout = window.setTimeout(() => {
      this.reset(reason);
      this.resetTimeout = null;
    }, 6); // Debounce for ~1 frame at 60fps
  }



















  public reset(value_changed = ""): void {
    this.timerTest = 0;
    this.startTest = false;
    this.paused = true;
    this.gravity = this.gravityProp.value;

    this.mass = this.massProp.value;


    this.v_x = this.vProp.value * Math.cos(this.angleProp.value * (Math.PI / 180));
    this.v_y = this.vProp.value * Math.sin(this.angleProp.value * (Math.PI / 180));

    if (this.y < 0) {
      this.minAngle = Math.asin(-this.yProp.value / (Math.sqrt(Math.pow(0.35, 2) + Math.pow(this.yProp.value, 2)))) * 180 / Math.PI
      // console.log(`from reset model: ${this.minAngle}`)
    } else if (this.y >= 0) {
      this.minAngle = 0
    }
    this.angle = this.angleProp.value
    if (this.angle < this.minAngle) {
      this.angleProp.value = this.minAngle
      this.v_xProp.value = this.vProp.value * Math.cos(this.angleProp.value * (Math.PI / 180));
      this.v_yProp.value = this.vProp.value * Math.sin(this.angleProp.value * (Math.PI / 180));

    }
    // console.log('angle: ', Math.atan2(this.v_y, this.v_x) * (180 / Math.PI))
    var radius = .7;
    this.x = 0
    this.y = 0 + this.yProp.value;


    // console.log(`from model for y -> ${this.y}`)

    let angle = (Math.atan2(this.v_y, this.v_x) * (180 / Math.PI));


    this.xTest = this.xProp.value;
    this.yTest = this.yProp.value;
    // this.v_xTest = this.v_xProp.value;
    this.v_xTest = Math.cos(this.angle) * this.v;
    // this.v_yTest = this.v_yProp.value;
    this.v_yTest = Math.sin(this.angle) * this.v;
    this.k = this.kProp.value;
    this.kl = this.klProp.value;
    this.kq = this.kqProp.value;
    this.graphData = new simData(this.graphUpdateInterval)
    this.graphDataTest = new simData(this.graphUpdateInterval)
    this.graphLen = 5;
    this.timer = 0;
    this.originalLen = this.graphLen;
    this.updateGraphs = true;

    this.graphData = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.y, angle, this.v_x, this.v_y, this.gravity, this.kl, this.kq, this.mass, {}, false, this.graphLen, this.graphData, this.timer);
    // console.log(this.graphData)
    if (this.validEqs) {
      if (this.xEQ === '' || this.yEQ === '' || this.v_xEQ === '' || this.v_yEQ === '') {
        this.graphDataTest = new simData(this.graphUpdateInterval)
        this.graphDataTest.insert(0, 0, 0, 0, 0, 0, 0)
      } else {
        // console.log('VYYY:',this.v_yEQ)
        this.xFunc = globalThis.window.evaluatex(this.xEQ, { k_q: this.kq, k_l: this.kl, m: this.mass, g: this.gravity }, { latex: true });
        this.yFunc = globalThis.window.evaluatex(this.yEQ, { k_q: this.kq, k_l: this.kl, m: this.mass, g: this.gravity }, { latex: true });
        this.v_xFunc = globalThis.window.evaluatex(this.v_xEQ, { k_q: this.kq, k_l: this.kl, m: this.mass, g: this.gravity }, { latex: true });
        this.v_yFunc = globalThis.window.evaluatex(this.v_yEQ, { k_q: this.kq, k_l: this.kl, m: this.mass, g: this.gravity }, { latex: true });
        this.graphDataTest = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.y, angle, this.v_x, this.v_y, this.gravity, this.kl, this.kq, this.mass, { v_xdot: this.v_xFunc, v_ydot: this.v_yFunc, xdot: this.xFunc, ydot: this.yFunc }, true, this.graphLen, this.graphDataTest, this.timer);
      }


    } else {
      this.graphDataTest = new simData(this.graphUpdateInterval);
      this.graphDataTest.insert(0, 0, 0, 0, 0, 0, 0)
    }
    this.graphLenTest = this.graphDataTest.data.length * this.graphUpdateInterval;
    this.graphLen = this.graphData.data.length * this.graphUpdateInterval;

    if (value_changed !== "") {
      value_changed === "Start" ? this.action = "" : null
      setTimeout(() => post(this.name, value_changed, this.gravityProp.value, this.kProp.value, this.vProp.value, this.angleProp.value, this.yProp.value, this.v_xProp.value, this.v_yProp.value, this.xEQ, this.yEQ, this.v_xEQ, this.v_yEQ, this.quadraticDrag ? "Quadratic" : "Linear"), 10)
    }


  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public step(dt: number): void {

    if (!this.paused) {
      // this.timer += dt * this.simSpeedProp.value;
      this.timer += 0.016 * this.simSpeedProp.value;

      if (this.startTest) {
        // this.timerTest += dt * this.simSpeedProp.value;
        this.timerTest += 0.016 * this.simSpeedProp.value;

      }


      if (this.timer < this.graphLen) {

      } else {
        this.graphLen = this.graphLen + this.originalLen;

        // getGraphData(this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k,this.mass, {}, false, this.graphLen, this.graphData, this.timer);
        // getGraphData(this.graphUpdateInterval, this.xTest, this.yTest, this.v_xTest, this.v_yTest, this.gravity, this.k,this.mass, {v_xdot:this.v_xEQ,v_ydot:this.v_yEQ,xdot:this.xEQ,ydot:this.yEQ}, true, this.graphLen, this.graphDataTest, this.timer);
        this.updateGraphs = true;
      }



    }
  }
}
