import React from 'react';
import ReactDOM from 'react-dom';
import App from "../../App";
import Root from "../../Root";

jest.mock("react-dom");

it('renders without crashing', () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../../index");
    expect(ReactDOM.render).toHaveBeenCalledWith(<Root><App /></Root>, div);
});