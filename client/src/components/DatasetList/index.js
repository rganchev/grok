import React from 'react';
import PropTypes from 'prop-types';
import './dataset_list.css';

const DatasetList = (props) => {
  const deleteDataset = props.actions.deleteDataset;
  const datasets = props.datasets.map(ds => (
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
              onClick={() => deleteDataset(ds.dsid)}
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
    </div>
  );
};

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
