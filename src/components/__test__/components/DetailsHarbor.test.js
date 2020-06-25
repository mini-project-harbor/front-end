import { shallow } from "enzyme";
import React from "react";
import DetailsHarbor from "../../harbor/DetailsHarbor";

describe('DetailsHarbor Component', () => {
    let wrapper;
    it('should have state set properly', () => {
        wrapper = shallow(<DetailsHarbor />);
        expect(wrapper.state().dockCode).toEqual('');
        expect(wrapper.state().isFormAddDock).toEqual(false);
        expect(wrapper.state().harbor).toEqual({});
        expect(wrapper.state().dock).toEqual([]);
    });

});