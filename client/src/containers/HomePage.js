import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { getDatasets, uploadDataset, deleteDataset } from '../actions/datasets';

function mapStateToProps(state) {
  return {
    datasets: state.datasets.all,
    isUploading: state.datasets.isUploading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getDatasets,
      uploadDataset,
      deleteDataset,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
