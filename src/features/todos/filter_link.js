import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../../features/todos/actions';
import Link from '../link';

const mapStateToProps = (
  state,
  ownProps
) => {
  return {
    active: ownProps.filter === state.getIn(['todos', 'filter'])
  };
};

const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch(
        setFilter(ownProps.filter)
      );
    }
  };
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink
