export class simData {
    constructor(interval) {
        this.data = [];
        this.interval = interval;
        this.id = Math.random();
    }


    insert(time, v_xdot, v_ydot, v_x, v_y, x, y) {
        this.data.push(new dataPoint(time, v_xdot, v_ydot, v_x, v_y, x, y));
    }
    getX(time) {
        let dataIndex = (time / this.interval).toFixed(0);
       

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            
        }

        return this.data[dataIndex].x;
    }
    getY(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            
        }

        return this.data[dataIndex].y;
    }
    getV_X(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        

        if (dataIndex > this.data.length - 1) {
            // dataIndex = this.data.length-1;
            return 0;
        }

        return this.data[dataIndex].v_x;
    }

    getV_Y(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        if (dataIndex > this.data.length - 1) {
            // dataIndex = this.data.length-1;
            return 0;
        }
        return this.data[dataIndex].v_y;
    }
    getVX_dot(time) {
        let dataIndex = (time / this.interval).toFixed(0);
       

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
        }

        return this.data[dataIndex].v_xdot;
    }

    getVY_dot(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
        }
        return this.data[dataIndex].v_ydot;
    }
    // 

}

class dataPoint {
    constructor(time, v_xdot, v_ydot, v_x, v_y, x, y) {
        this.time = time;
        this.v_xdot = v_xdot;
        this.v_ydot = v_ydot;
        this.v_x = v_x;
        this.v_y = v_y;
        this.x = x;
        this.y = y;

    }
}
