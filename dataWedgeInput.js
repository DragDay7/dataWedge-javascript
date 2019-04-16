class DataWedgeInput
{
    constructor(parseScan, prefix = '^', suffix = '$', keyEvents = [], appendTo = document.body)
    {
        this.inputPrefix = prefix;
        this.inputSuffix = suffix;
        this.parseScan = parseScan;
        this.appendTo = appendTo;
        this.enabled = false;
        this.partialValue = '';

        this.inputEvent = (e) =>
        {
            let value = e.target.value;
            let events = keyEvents.length === 0 ? keyEvents : keyEvents.filter(i => i.key.includes(value));
            e.target.value = '';

            if (value.startsWith(this.inputPrefix) && value.endsWith(this.inputSuffix))
            {
                value = value.substring(this.inputPrefix.length, value.length - this.inputSuffix.length);
                this.inputValue(value);
            }
            else if (value.startsWith(this.inputPrefix) && !value.endsWith(this.inputSuffix))
                this.partialValue = value;
            else if (!value.startsWith(this.inputPrefix) && value.endsWith(this.inputSuffix))
            {
                this.partialValue += value;
                this.partialValue = this.partialValue.substring(this.inputPrefix.length, this.partialValue.length - this.inputSuffix.length);
                this.inputValue(this.partialValue);
                this.partialValue = '';
            }
            else if (this.partialValue.length > 0)
                this.partialValue += value;
            else if (events.length !== 0 && events[0].action !== undefined)
            {
                this.hideKeyboard();
                events[0].action();
            }
            else
                this.hideKeyboard();
        };

        this.focusEvent = () => this.hideKeyboard();
        this.focusoutEvent = (e) => e.target.focus();
        this.on();
    }

    hideKeyboard()
    {
        this.input.setAttribute('readonly', 'readonly');
        setTimeout(() => this.input.removeAttribute('readonly'), 10);
    }

    inputValue(value)
    {
        if (this.parseScan !== undefined)
            this.parseScan(value);
        else
            alert(`Scanned value: "${value}". Missing parseScan function in constructor.`);
    }

    on()
    {
        this.enabled = true;

        let ele;
        while (ele = document.getElementById('dataWedgeInput')) ele.remove();

        this.input = document.createElement('input');
        this.input.setAttribute('id', 'dataWedgeInput');
        this.appendTo.append(this.input);
        this.input.addEventListener('input', this.inputEvent);
        this.input.addEventListener('focus', this.focusEvent);
        this.input.addEventListener('focusout', this.focusoutEvent);
        this.input.removeAttribute('readonly');
        setTimeout(() => this.input.focus(), 50);
    }

    off()
    {
        this.enabled = false;
        this.input.remove();
    }
}
