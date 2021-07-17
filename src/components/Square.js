import React from 'react';
import {Button, Typography} from "@material-ui/core";
function Square(props){
    return (
        <Button variant="contained" color='primary' className="square" onClick={props.onClick}>
           <Typography variant='h5'> {props.value}</Typography>
        </Button>
    )
}

export default Square;