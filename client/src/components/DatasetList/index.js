import React from 'react';
import PropTypes from 'prop-types';
import './dataset_list.css';
import PromptDialog from '../PromptDialog';

class DatasetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmationDialog: false,
      dialogContent: '',
      onAccept: null,
    };
  }

  showConfirmationDialog(dataset) {
    const onAccept = () => {
      this.props.actions.deleteDataset(dataset.dsid);
      this.closeConfirmationDialog();
    };
    this.setState({
      showConfirmationDialog: true,
      dialogContent: `Are you sure you want to delete the dataset "${dataset.name}"?`,
      onAccept,
    });
  }

  closeConfirmationDialog() {
    this.setState({
      showConfirmationDialog: false,
      dialogContent: '',
      onAccept: null,
    });
  }

  render() {
    const datasets = this.props.datasets.map(ds => (
      <tr key={ds.dsid}>
        <th scope='row'>{ds.dsid}</th>
        <td>{ds.name}</td>
        <td>
          <div className='btn-toolbar'>
            <div className='btn-group'>
              <button type='button' className='btn btn-grok'>X</button>
            </div>
            <div className='btn-group'>
              <button type='button' className='btn btn-default' title='Edit'>
                <span className='glyphicon glyphicon-pencil' />
              </button>
              <button
                type='button'
                className='btn btn-default'
                title='Delete'
                onClick={() => this.showConfirmationDialog(ds)}
              >
                <span className='glyphicon glyphicon-remove' />
              </button>
            </div>
          </div>
        </td>
      </tr>
    ));
    return (
      <div className='datasets panel panel-default'>
        <div className='panel-heading'>
          <div className='panel-title'>Datasets</div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets}
          </tbody>
        </table>

        <PromptDialog
          show={this.state.showConfirmationDialog}
          close={() => this.closeConfirmationDialog()}
          content={this.state.dialogContent}
          onAccept={() => this.state.onAccept()}
        />
      </div>
    );
  }
}

DatasetList.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.shape({
    dsid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  actions: PropTypes.shape({
    deleteDataset: PropTypes.func.isRequired,
  }).isRequired,
};

export default DatasetList;
