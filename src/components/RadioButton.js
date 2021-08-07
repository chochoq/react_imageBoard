import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
        color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

export default function RadioButtons() {
    const [layout_type, setLayout_type] = React.useState('a');

    const handleChange = (event) => {
    setLayout_type(event.target.value);
    };

    return (
        <div>
            <Radio
            checked={layout_type === 'a'}
            onChange={handleChange}
            value="a"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
            checked={layout_type === 'b'}
            onChange={handleChange}
            value="b"
            name="radio-button-demo"
            color="primary"
            inputProps={{ 'aria-label': 'B' }}
            />
            <GreenRadio
            checked={layout_type === 'c'}
            onChange={handleChange}
            value="c"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'C' }}
            />
        </div>
    );
}