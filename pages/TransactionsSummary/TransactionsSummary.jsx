import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// Local Deps
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
import { progressBarIconBoxes } from '../../config/transactionsSummary';
// Actions
import { getPerExAnalysis } from '../../actions/global/analysis';
import { getEnabledAccounts } from '../../actions/global/accounts';
// Components
import IconBox from '../../components/IconBox/IconBox';
import ProgressBarGroup from '../../components/ProgressBarGroup/ProgressBarGroup';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';

class TransactionsSummary extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  static _generateIconBoxes(boxesArray) {
    return boxesArray.map((box, idx) => (
      <div className="columns medium-4" key={`lc-icon-box-${idx}`}>
        <IconBox {...box} />
      </div>
    ));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getEnabledAccounts());
    dispatch(getPerExAnalysis());
  }

  render() {
    const {
      summary: { perExSummary }
    } = this.props.data;

    return (
      <div className="lc-transactions-summary">
        <FinancialSnapshot />
        <div className="lc-transactions-summary__content">
          <div className="lc-row medium-11">
            <h1 className="lc-transactions-summary__header">
              {cms['transactionsSummary.header']}
            </h1>
            <div className="lc-transactions-summary__subtext">
              <div className="lc-transactions-summary__subtext-first">
                {cms['transactionsSummary.subtext.first']}
              </div>
              {cms['transactionsSummary.subtext.second']}
            </div>
            <div className="lc-transactions-summary__progress-bar-groups">
              { !perExSummary ?
                <LoadingHexagon /> :
                <ProgressBarGroup {...{
                  total: perExSummary.totalAnticipatedMonthlyAmount,
                  labelAmount: perExSummary.totalAnticipatedMonthlyAmount,
                  meterAmount: perExSummary.totalActualAmountThisMonth,
                  label: cms['transactionsSummary.progressBar.title'],
                }}
                amountTextChange={cms['progressBarGroup.actualText']} />
              }
            </div>
            <div className="lc-transactions-summary__icon-boxes">
              { TransactionsSummary._generateIconBoxes(progressBarIconBoxes) }
            </div>
            <Link to={Routes.dashboard}>
              <button className="lc-transactions-summary__navigation-button" >
                {cms['transactionsSummary.button']}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.transactionsSummary };
}

export default connect(mapStateToProps)(TransactionsSummary);
