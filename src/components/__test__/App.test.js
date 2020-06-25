import { shallow } from "enzyme";
import React from "react";
import App from "../../App";
import Login from "../login/Login";
import { BrowserRouter } from "react-router-dom";


describe('App Component', () => {
    it('should render', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find("BrowserRouter").length).toEqual(1);
    });

    it('should render', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find("Switch").length).toEqual(1);
    });

    it('default path to login', () => {
        const wrapper = shallow(
            <BrowserRouter initialEntries={['/']}>
                <Login />
            </BrowserRouter>
        );
        expect(wrapper.find(Login)).toHaveLength(1);
    });
});