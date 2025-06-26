function derivsEval(drag,y,dydt,equations){
    
  try{
    
    dydt[0]= equations.xdot({x:y[0],y:y[1],v_x:y[2],v_y:y[3]});
    } catch (err){
      console.log(err);
      // document.getElementById("error-output").innerHTML="[BAD OR NO EQUATION INPUTED]";
    }
  
  try{
    dydt[1]= equations.ydot({x:y[0],y:y[1],v_x:y[2],v_y:y[3]});
  } catch(err){
    // document.getElementById("error-output").innerHTML="[BAD OR NO EQUATION INPUTED]";
  }
  try{
    
    dydt[2]= equations.v_xdot({x:y[0],y:y[1],v_x:y[2],v_y:y[3]});
    } catch (err){
      console.log(err);
      // document.getElementById("error-output").innerHTML="[BAD OR NO EQUATION INPUTED]";
    }
  
  try{
    dydt[3]= equations.v_ydot({x:y[0],y:y[1],v_x:y[2],v_y:y[3]});
  } catch(err){
    // document.getElementById("error-output").innerHTML="[BAD OR NO EQUATION INPUTED]";
  }

    return dydt;
}

function derivs(drag,y, dydt, g, kl, kq, m) {
  if (drag){
    
    dydt[0] = y[2]; 
    dydt[1] = y[3]; 
    dydt[2] = -(kq / m) * y[2] * Math.sqrt(y[2] ** 2 + y[3] ** 2); 
    dydt[3] = -g - (kq / m) * y[3] * Math.sqrt(y[2] ** 2 + y[3] ** 2); 
  } else {
    dydt[0] = y[2]; 
    dydt[1] = y[3]; 
    dydt[2] = -(kl / m) * y[2]; 
    dydt[3] = -g - (kl / m) * y[3]; 
  }
  // dydt[4] = 0; 
  // dydt[5] = 0; 

  return dydt;
}

function rk4(drag,y, N, x, h, ynew, g, kl, kq, m, equations, useEval) {
  let h6 = h / 6.0;
  let hh = h * 0.5;
  let dydx = [];
  let yt = [];
  let dyt = [];
  let dym = [];

  dydx = useEval ? derivsEval(drag,y, dydx, equations) : derivs(drag,y, dydx, g, kl, kq, m);

  for (let index = 0; index < N; index++) {
      yt[index] = y[index] + hh * dydx[index];
  }

  dyt = useEval ? derivsEval(drag,yt, dyt, equations) : derivs(drag,yt, dyt, g, kl, kq, m);
  for (let index = 0; index < N; index++) {
      yt[index] = y[index] + hh * dyt[index];
  }

  dym = useEval ? derivsEval(drag,yt, dym, equations) : derivs(drag,yt, dym, g, kl, kq, m);
  for (let index = 0; index < N; index++) {
      yt[index] = y[index] + h * dym[index];
      dym[index] += dyt[index];
  }

  dyt = useEval ? derivsEval(drag,yt, dyt, equations) : derivs(drag,yt, dyt, g, kl, kq, m);
  for (let index = 0; index < N; index++) {
      ynew[index] = y[index] + h6 * (dydx[index] + dyt[index] + 2.0 * dym[index]);
  }
  // console.log("From rk4:")
  // console.log(dydx)

  return ynew;
}



export function getGraphData(drag,dt,xinit,yinit,yoffset,angle,xdot,ydot ,g, kl, kq, m, equations, useEval, graphLen, graphVals, time){
  
  const N = 6;
  let h = dt; 
  let t = time;
  // let x = 0;
  // l
  // let y = [x,y,xdot, ydot, 0, -g];  
  console.log(xinit,' ',yinit);
  // let y = [.6,.78,xdot, ydot];  
  // let y = [xinit,yinit,xdot, ydot];  
  let y = [xinit,yinit,xdot, ydot];  
  // console.log(y)
  // let y = [0,1.4,xdot, ydot];  
  // let y = [xinit,yinit,xdot, ydot];  
  // let y = [2,2,xdot, ydot];  
  let ynew = [...y];
  // let x = 0;
  // let yval = 0;
  // console.log(yoffset)
  // console.log(yoffset/.7)
  let passedZero = false;
  // while(t<5){  
  while(t<40){  
      graphVals.insert(t,ynew[4],ynew[5],ynew[2],ynew[3],ynew[0],ynew[1]);
      console.log("This is in rk4 for values of y")
      ynew = rk4(drag,y,N,t,h,ynew,g, kl, kq, m, equations, useEval);
      y = [...ynew];
      
      // console.log(y[1])
      // x = x + h*y[0];
      // yval = yval + h*y[1];
      t = t + h;

      if (y[1] >= 0 && !passedZero){
        passedZero = true
      }

      if (passedZero && y[1] <= 0){
        return graphVals;
      }

      // if (y[1] <= 0) {
      //     return graphVals;
      // }

    
      // if (y[1] <0){
      //     return graphVals;
      // }
  }
  return graphVals;
  
}