import { shallow } from "enzyme";
import React from "react";
import MasterTransaction from '../../transaction/MasterTransaction';


describe('MasterTransaction Component', () => {
    let wrapper;
    it('should have state set properly', () => {
        wrapper = shallow(<MasterTransaction />);
        expect(wrapper.state().listTrx).toEqual([]);
    });

});