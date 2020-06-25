import { shallow } from "enzyme";
import React from "react";
import MasterShipUpdate from '../../ship/MasterShipUpdate';


describe('MasterShipUpdate Component', () => {
    let wrapper;
    it('should have state set properly', () => {
        wrapper = shallow(<MasterShipUpdate />);
        expect(wrapper.state().ship).toEqual({});
        expect(wrapper.state().codeShip).toEqual('');
        expect(wrapper.state().shipName).toEqual('');
        expect(wrapper.state().captain).toEqual('');
        expect(wrapper.state().forAct).toEqual('');
    });

});