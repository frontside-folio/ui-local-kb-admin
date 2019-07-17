import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { getSASParams } from '@folio/stripes-erm-components';
import { StripesConnectedSource } from '@folio/stripes/smart-components';

import View from '../components/LocalKbAdmin';
import { stripesConnect } from '@folio/stripes/core';

// columnMap: {
//   'Job name': 'jobName',
//   'Running status': 'runningStatus',
//   'Result': 'result',
//   'No. of errors': 'noOfErrors',
//   'Started': 'started',
//   'Ended': 'ended'
// },
const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;

class LocalKbAdminRoute extends React.Component {
  
  static manifest = Object.freeze({
    jobs: {
      type: 'okapi',
      recordsRequired: '%{resultCount}',
      records: 'results',
      perRequest: RESULT_COUNT_INCREMENT,
      limitParam: 'perPage',
      path: 'erm/jobs',
      params: getSASParams({
        searchKey: 'name',
      })
    },
    resultValues: {
      type: 'okapi',
      path: 'erm/refdataValues/persistentJob/result',
      shouldRefresh: () => false,
    },
    statusValues: {
      type: 'okapi',
      path: 'erm/refdataValues/persistentJob/status',
      shouldRefresh: () => false,
    },
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
  });

  constructor(props) {
    super(props);

    this.logger = props.stripes.logger;
    this.searchField = React.createRef();
  }

  querySetter = ({ nsValues, state }) => {
    const defaults = {
      filters: null,
      query: null,
      sort: null,
    };

    if (/reset/.test(state.changeType)) {
      // A mutator's `replace()` function doesn't update the URL of the page. As a result,
      // we always use `update()` but fully specify the values we want to null out.
      this.props.mutator.query.update({ ...defaults, ...nsValues });
    } else {
      this.props.mutator.query.update(nsValues);
    }
  }

  queryGetter = () => {
    return get(this.props.resources, 'query', {});
  }


  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger, 'jobs');

    if (this.searchField.current) {
      this.searchField.current.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const newCount = this.source.totalCount();
    const newRecords = this.source.records();

    if (newCount === 1) {
      const { history, location } = this.props;

      const prevSource = new StripesConnectedSource(prevProps, this.logger, 'jobs');
      const oldCount = prevSource.totalCount();
      const oldRecords = prevSource.records();

      // console.log(oldCount, oldRecords[0].id, newRecords[0].id, 'values');
      if (oldCount !== 1 || (oldCount === 1 && oldRecords[0].id !== newRecords[0].id)) {
        console.log(oldCount, 'oldCount');
        const record = newRecords[0];
        history.push(`/local-kb-admin/${record.id}${location.search}`);
      }
    }
  }

  render() {
    const { children, location, resources } = this.props;
    if (this.source) {
      this.source.update(this.props, 'jobs');
    }

    return (
      <View
        data={{
          jobs: get(resources, 'jobs.records', []),
          resultValues: get(resources, 'resultValues.records', []),
          statusValues: get(resources, 'statusValues.records', []),
        }}
        queryGetter={this.queryGetter}
        querySetter={this.querySetter}
        searchString={location.search}
        source={this.source}
      >
      {children}
      </View>
    )
  }
}

export default stripesConnect(LocalKbAdminRoute);
