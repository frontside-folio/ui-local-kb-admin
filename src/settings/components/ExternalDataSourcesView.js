import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Card, Col, Row, KeyValue, Layout } from '@folio/stripes/components';

export default class ExternalDataSourcesView extends React.Component {
  static propTypes = {
    actionButtons: PropTypes.func,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitting: PropTypes.bool,
    })
  }

  render() {
    const { input: { value } } = this.props;

    return (
      <Card
        headerStart={<strong>External Kb</strong>}
        headerEnd={this.props.actionButtons}
      >
        <Row>
          <Col xs={3} md={3}>
            <KeyValue
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
              value={value.name}
            />
          </Col>
          <Col xs={5} md={5}>
            <KeyValue
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
              value={value.type}
            />
          </Col>
          <Col xs={4} md={4}>
            <KeyValue
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
              value={value.rectype === 1 ? <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.package" /> : ''}
            />
          </Col>
        </Row>
        <KeyValue
          label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
          value={value.uri}
        />
        <Layout className="padding-bottom-gutter">
          <Row>
            <Col xs={3} md={3}>
              <KeyValue
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
                value={<FormattedMessage id={value.active ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
            <Col xs={5} md={5}>
              <KeyValue
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
                value={<FormattedMessage id={value.supportsHarvesting ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
            <Col xs={4} md={4}>
              <KeyValue
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
                value={<FormattedMessage id={value.activationEnabled ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
          </Row>
        </Layout>
        <Row>
          <Col xs={3} md={3}>
            <KeyValue
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
              value={value.listPrefix}
            />
          </Col>
          <Col xs={5} md={5}>
            <KeyValue
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
              value={value.fullPrefix}
            />
          </Col>
          <Col xs={4} md={4}>
            <KeyValue
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
              value={value.principal}
            />
          </Col>
        </Row>
        <KeyValue
          label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
          value={value.credentials}
        />
      </Card>
    );
  }
}
