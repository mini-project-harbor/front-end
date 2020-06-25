import { shallow } from "enzyme";
import React from "react";
import MasterTransactionUpdate from '../../transaction/MasterTransactionUpdate';


describe('MasterTransactionUpdate Component', () => {
    let wrapper;
    it('should have state set properly', () => {
        wrapper = shallow(<MasterTransactionUpdate />);
        expect(wrapper.state().harbor).toEqual({});
        expect(wrapper.state().ship).toEqual({});
        expect(wrapper.state().shipId).toEqual(null);
        expect(wrapper.state().harborId).toEqual(null);
        expect(wrapper.state().status).toEqual(null);
        expect(wrapper.state().load).toEqual(0);
        expect(wrapper.state().forAct).toEqual('');
        expect(wrapper.state().trxCode).toEqual('');
        expect(wrapper.state().trxDate).toEqual('');

    });

});