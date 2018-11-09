class DataWedgeInput
{
    constructor(parseScan, prefix = '^', suffix = '$')
    {
        this.inputPrefix = prefix;
        this.inputSuffix = suffix;
        this.parseScan = parseScan;
        let current = this;

        this.inputEvent = function ()
        {
            let value = this.value;
            if (value.startsWith(current.inputPrefix) && value.endsWith(current.inputSuffix))
            {
                value = value.substring(current.inputPrefix.length, value.length - current.inputSuffix.length);

                if (current.parseScan !== undefined)
                    current.parseScan(value);
                else
                    alert(`Scanned value: "${value}". Missing parseScan function in constructor. See source code.`);
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

    on()
    {
        let current = this;

        this.input = document.createElement('input');
        this.input.setAttribute('id', 'dataWedgeInput');
        document.body.append(this.input);

        this.input.addEventListener('input', this.inputEvent);
        this.input.addEventListener('focus', this.focusEvent);
        this.input.addEventListener('focusout', this.focusoutEvent);
        this.input.removeAttribute('readonly');
        setTimeout(function () { current.input.focus(); }, 10);
    }

    off()
    {
        document.body.removeChild(this.input);
    }
}