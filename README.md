### Usage:
In DataWedge profile enable Keystroke output, set prefix and suffix in basic data formatting (default prefix: "^", suffix: "$"). 

JavaScript code:
```javascript
let parseScan = function(value) {
    alert(`Scanned value: "${value}".`);
}

let dataWedgeInput = new DataWedgeInput(parseScan, '^', '$');
dataWedgeInput.on();
// dataWedgeInput.off(); to disable.
```
Virtual keyboard shouldn't show up if alert() isn't used.

### Update:

You can now add key shortcuts:
```javascript
let dataWedgeInput = new DataWedgeInput(parseScan, '^', '$', [
    {
        key: '*',
        action: () => {
            alert('I just pressed * button!');
        }
    }
]);
```
