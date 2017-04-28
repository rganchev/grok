import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GrokPage from '../components/GrokPage';

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GrokPage);
