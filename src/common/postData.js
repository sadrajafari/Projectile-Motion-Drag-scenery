export default async function post(name, action, gravity, friction, initialVelocity, theta, height, v0x, v0y, xdot, ydot, vdotx, vdoty, drag) {
    let url = "https://projectilemotion-2e78a-default-rtdb.firebaseio.com/.json";
    let date = new Date()
    let data = {
        cookie: document.cookie,
        name: name,
        time: (date.toLocaleString() + " " + String(date.getMilliseconds() - 10) + " ms"),
        action: action,
        gravity: gravity,
        friction: friction,
        initialVelocity: initialVelocity,
        theta0: theta,
        initVelocityX: v0x,
        initVelocityY: v0y,
        height: height,
        xdot: xdot,
        ydot: ydot,
        vdotx: vdotx,
        vdoty: vdoty,
        drag: drag

    };

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        // .catch(error => console.error('Error'))
        // .then(response => console.log('Success'));


}