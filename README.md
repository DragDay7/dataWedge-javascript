### Usage:
In DataWedge profile enable Keystroke output, set prefix and suffix in basic data formatting (default prefix: "^", suffix: "$"). 

JavaScript code:
```javascript
let parseScan = function(value) {<br />
    alert(`Scanned value: "${value}".`);<br />
}

let dataWedgeInput = new DataWedgeInput(parseScan, '^', '$');
dataWedgeInput.on();
// dataWedgeInput.off(); to disable.
```
Virtual keyboard shouldn't show up if alert() isn't used.
