import React from 'react';
import ReactDOM from 'react-dom';
import MarkDisplayer from './../MarkDisplayer';
import {render} from '@testing-library/react';
// import "jest/dom/extend-expect";

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<MarkDisplayer></MarkDisplayer>, div)
})


it("renders button correctly", ()=>{
    const {getByTestId} = render(<MarkDisplayer name="AXPE"></MarkDisplayer>)
    expect(getByTestId('map-name').textContent).toBe("AXPE")
})