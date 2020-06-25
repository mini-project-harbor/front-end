import { shallow } from "enzyme";
import React from "react";
import MasterHarborUpdate from '../../harbor/MasterHarborUpdate';


describe('MasterHarborUpdate Component', () => {
    let wrapper;
    it('should have state set properly', () => {
        wrapper = shallow(<MasterHarborUpdate />);
        expect(wrapper.state().harbor).toEqual({});
        expect(wrapper.state().harborId).toEqual('');
        expect(wrapper.state().harborName).toEqual('');
        expect(wrapper.state().dockCode).toEqual('');
        expect(wrapper.state().forAct).toEqual('');
    });

});