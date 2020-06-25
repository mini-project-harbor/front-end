import { shallow } from "enzyme";
import React from "react";
import Root from "../../Root";

describe('Root Component', () => {
    it('Should render', () => {
        const wrapper = shallow(<Root />)
        expect(wrapper.find('Provider').length).toEqual(1);
    })
});