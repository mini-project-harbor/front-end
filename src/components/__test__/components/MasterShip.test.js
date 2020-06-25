import { shallow } from "enzyme";
import React from "react";
import MasterShip from '../../ship/MasterShip';


describe('MasterShipUpdate Component', () => {
    let wrapper;
    it('should have state set properly', () => {
        wrapper = shallow(<MasterShip />);
        expect(wrapper.state().listShip).toEqual([]);
    });

});