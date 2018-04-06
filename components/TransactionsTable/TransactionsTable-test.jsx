import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import TransactionsTable from './TransactionsTable';
import GenericTable from '../../components/GenericTable/GenericTable';

describe('Components', () => {
  describe('TransactionsTable', () => {
    // Mocks:
    const mockDispatch = sinon.stub(); // eslint-disable-line no-undef
    const mockTransaction1 = {
      postDate: '2014-01-17T00:00:00-0800',
      description: 'Bowler\'s Mart',
      category: 'Service Charges/Fees',
      amount: 101.11,
      frequency: null,
      isRecurring: true,
      id: 1
    };
    const mockTransaction2 = {
      id: 2
    };
    const mockTransactions = [mockTransaction1, mockTransaction2];

    const props = {
      dispatch: mockDispatch,
      transactions: mockTransactions,
      fields: [],
      containerWidth: 100,
      containerHeight: 100
    };

    it('should render a TransactionsTable component', () => {
      const wrapper = shallow(
        <TransactionsTable {...props} />
      );
      expect(wrapper.find('.lc-transactions-table')).to.have.length(1);
    });

    it('should have props for dispatch + transactions', () => {
      const wrapper = shallow(
        <TransactionsTable {...props} />
      );
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.props().dispatch).to.be.defined;
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.props().transactions).to.be.defined;
    });

    it('should have a <GenericTable />', () => {
      const wrapper = mount(
        <TransactionsTable {...props} />
      );
      expect(wrapper.find(GenericTable)).to.have.length(1);
    });

    it('should know how to handle a toggle', () => {
      const wrapper = mount(
        <TransactionsTable {...props} />
      );
      const FIELD_MAPPING = 'isRecurring';
      wrapper.instance()._toggleFieldValue(mockTransaction1.id, 'isRecurring');
      // Values are null because _updateSTateWithField() gets called at the end
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.state().editingRecordId).to.equal(mockTransaction1.id);
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.state().editingRecordValue).to.equal(!mockTransaction1[FIELD_MAPPING]);
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.state().editingRecordMapping).to.equal(FIELD_MAPPING);
    });

    it('should know how to persist a record', (done) => {
      const wrapper = mount(
        <TransactionsTable {...props} />
      );
      wrapper.instance()._persistRecord(1);
      expect(wrapper.props().dispatch.calledOnce).to.be.true; // eslint-disable-line
      done();
      // TODO -- LISTEN FOR AJAX REQUEST
    });

    it('should know how to edit the record\'s value', () => {
      const wrapper = mount(
        <TransactionsTable {...props} />
      );
      wrapper.instance()._editRecordValue('kelly kulick');
      expect(wrapper.state().editingRecordValue).to.equal('kelly kulick');
    });

    it('should know how to enter edit record mode', () => {
      const wrapper = mount(
        <TransactionsTable {...props} />
      );
      const instance = wrapper.instance();
      // Record should be called on promise return...
      const stub = sinon.spy(instance, '_persistRecord'); // eslint-disable-line
      instance._enterEditRecordMode(1, 'hello', 'home skillet');
      expect(wrapper.state().editingRecordId).to.equal(1);
      expect(wrapper.state().editingRecordMapping).to.equal('hello');
      expect(wrapper.state().editingRecordValue).to.equal('home skillet');
      expect(instance._persistRecord.calledOnce).to.be.false; // eslint-disable-line
      instance._persistRecord.restore();
    });

    it('should know how to clear the current editing record', () => {
      const wrapper = mount(
        <TransactionsTable {...props} />
      );
      wrapper.setState({
        editingRecordId: 1,
        editingRecordValue: 'Hui Fen New',
        editingRecordMapping: 'bowler'
      });
      wrapper.instance()._clearCurrentEditingRecord();
      expect(wrapper.state().editingRecordId).to.be.null; // eslint-disable-line
      expect(wrapper.state().editingRecordValue).to.be.null; // eslint-disable-line
      expect(wrapper.state().editingRecordMapping).to.be.null; // eslint-disable-line
      expect(wrapper.state().prevEditingRecordId).to.equal(1); // eslint-disable-line
    });

    it('should know how to sort transactions by header', () => {
      const wrapper = mount(
        <TransactionsTable {...props} />
      );
      expect(wrapper.state().transactions[0].id).to.equal(1); // eslint-disable-line
      wrapper.instance()._sortByHeader('id', 'desc');
      expect(wrapper.state().transactions[0].id).to.equal(2); // eslint-disable-line
    });
  });
});
