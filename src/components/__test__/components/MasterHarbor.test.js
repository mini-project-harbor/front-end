import { shallow } from "enzyme";
import React from "react";
import MasterHarbor from "../../harbor/MasterHarbor";


describe('MasterHarbor Component', () => {
    let wrapper;
    it('should have state set properly', () => {
        wrapper = shallow(<MasterHarbor />);
        expect(wrapper.state().listHarbor).toEqual([]);
    });

});