import setupStripesCore from '@folio/stripes-core/test/bigtest/helpers/setup-application';
import mirageOptions from '../network';

export default function setupApplication({
  scenarios,
  hasAllPerms = true,
  currentUser = {},
} = {}) {
  setupStripesCore({
    mirageOptions,
    scenarios,
    currentUser,
    stripesConfig: {
      hasAllPerms
    }
  });
}
