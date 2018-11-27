class DataWedgeInput
{
    constructor(parseScan, prefix = '^', suffix = '$', keyEvents = [], appendTo = document.body)
    {
        this.inputPrefix = prefix;
        this.inputSuffix = suffix;
        this.parseScan = parseScan;
        this.appendTo = appendTo;
        this.enabled = false;
        let current = this;

        this.inputEvent = function ()
        {
            let value = this.value;
            let events = keyEvents.filter(i => i.key === value);
            console.log(events);
            if (value.startsWith(current.inputPrefix) && value.endsWith(current.inputSuffix))
            {
                value = value.substring(current.inputPrefix.length, value.length - current.inputSuffix.length);

                if (current.parseScan !== undefined)
                    current.parseScan(value);
                else
                    alert(`Scanned value: "${value}". Missing parseScan function in constructor. See source code.`);
            }
            else if (events.length !== 0 && events[0].action !== undefined)
            {
                events[0].action();
            }
            this.value = '';
        };

        this.focusEvent = function ()
        {
            current.input.setAttribute('readonly', 'readonly');
            setTimeout(function () { current.input.removeAttribute('readonly'); }, 10);
        };

        this.focusoutEvent = function () { this.focus(); };
    }

    inputValue(value)
    {
        if (this.parseScan !== undefined)
            this.parseScan(value);
        else
            alert(`Scanned value: "${value}". Missing parseScan function in constructor. See source code.`);
    }

    on()
    {
        this.enabled = true;
        let current = this;

        let ele;
        while (ele = document.getElementById('dataWedgeInput')) ele.remove();

        this.input = document.createElement('input');
        this.input.setAttribute('id', 'dataWedgeInput');
        this.appendTo.append(this.input);

        this.input.addEventListener('input', this.inputEvent);
        this.input.addEventListener('focus', this.focusEvent);
        this.input.addEventListener('focusout', this.focusoutEvent);
        this.input.removeAttribute('readonly');
        setTimeout(function () { current.input.focus(); }, 50);
    }

    off()
    {
        this.enabled = false;
        this.input.remove();
    }
}
