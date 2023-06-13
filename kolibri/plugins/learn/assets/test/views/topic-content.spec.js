import { shallowMount, createLocalVue } from '@vue/test-utils';
import makeStore from '../makeStore';
import TopicsContentPage from '../../src/views/TopicsContentPage';
/* eslint-disable import/named */
import useDownloadRequests, {
  useDownloadRequestsMock,
} from '../../src/composables/useDownloadRequests';
/* eslint-enable import/named */

jest.mock('kolibri.urls');
jest.mock('kolibri.client');
jest.mock('../../src/composables/useDownloadRequests');

const CONTENT_ID = 'content-id';

const localVue = createLocalVue();

// see `makeWrapper` for `params`
function makeAuthWrapper(params) {
  return makeWrapper({ ...params, isUserLoggedIn: true });
}

// see `makeWrapper` for `params`
function makeAuthWrapperWithRemoteContent(params) {
  return makeAuthWrapper({
    ...params,
    propsData: {
      deviceId: 'remote-device-id', // non-null device ID means that the content is remote
      ...params?.propsData,
    },
  });
}

function makeWrapper({
  propsData = {},
  isContentAdminImported = false,
  isUserLoggedIn = false,
} = {}) {
  const store = makeStore();
  store.state.topicsTree = {
    content: {
      id: CONTENT_ID,
      admin_imported: isContentAdminImported,
    },
  };
  store.getters = {
    isUserLoggedIn,
  };

  return shallowMount(TopicsContentPage, {
    propsData: {
      loading: false,
      ...propsData,
    },
    store,
    localVue,
    stubs: {
      LearningActivityBar: {
        name: 'LearningActivityBar',
        propsData: {
          resourceTitle: 'Test Title',
          loading: false,
        },
        template: '<div></div>',
      },
      ContentPage: {
        name: 'ContentPage',
        template: '<div><slot></slot></div>',
      },
    },
  });
}

function assertBookmarkButtonIsDisplayed(wrapper) {
  expect(
    wrapper.findComponent({ name: 'LearningActivityBar' }).attributes('showbookmark')
  ).toBeTruthy();
}

function assertBookmarkButtonIsNotDisplayed(wrapper) {
  expect(
    wrapper.findComponent({ name: 'LearningActivityBar' }).attributes('showbookmark')
  ).toBeFalsy();
}

function assertDownloadButtonIsDisplayed(wrapper) {
  expect(
    wrapper.findComponent({ name: 'LearningActivityBar' }).attributes('showdownloadbutton')
  ).toBeTruthy();
}

function assertDownloadButtonIsNotDisplayed(wrapper) {
  expect(
    wrapper.findComponent({ name: 'LearningActivityBar' }).attributes('showdownloadbutton')
  ).toBeFalsy();
}

describe('TopicsContentPage', () => {
  afterEach(() => {
    // reset back to defaults
    useDownloadRequests.mockImplementation(() => useDownloadRequestsMock());
  });

  it('smoke test', () => {
    const wrapper = makeWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it('shows the Learning Activity Bar', () => {
    const wrapper = makeWrapper();
    expect(wrapper.find('[data-test="learningActivityBar"]').exists()).toBeTruthy();
  });

  it('shows the Content Page', () => {
    const wrapper = makeWrapper();
    expect(wrapper.find('[data-test="contentPage"]').exists()).toBeTruthy();
  });

  describe(`remote download and bookmark`, () => {
    describe(`when a user is not logged in`, () => {
      it(`instructs 'LearningActivityBar' to not show the bookmark button`, () => {
        const wrapper = makeWrapper();
        assertBookmarkButtonIsNotDisplayed(wrapper);
      });

      it(`instructs 'LearningActivityBar' to not show the download button`, () => {
        const wrapper = makeWrapper();
        assertDownloadButtonIsNotDisplayed(wrapper);
      });
    });

    describe(`when a user is logged in`, () => {
      describe(`when content is not remote`, () => {
        let wrapper;
        beforeEach(() => {
          wrapper = makeAuthWrapper();
        });

        it(`instructs 'LearningActivityBar' to show the bookmark button`, () => {
          assertBookmarkButtonIsDisplayed(wrapper);
        });

        it(`instructs 'LearningActivityBar' to not show the download button`, () => {
          assertDownloadButtonIsNotDisplayed(wrapper);
        });
      });

      describe(`for remote content that was imported by an admin`, () => {
        let wrapper;
        beforeEach(() => {
          wrapper = makeAuthWrapperWithRemoteContent({
            isContentAdminImported: true,
          });
        });

        it(`instructs 'LearningActivityBar' to show the bookmark button`, () => {
          assertBookmarkButtonIsDisplayed(wrapper);
        });

        it(`instructs 'LearningActivityBar' to not show the download button`, () => {
          assertDownloadButtonIsNotDisplayed(wrapper);
        });
      });

      describe(`for remote content that was downloaded by a learner (and not imported by an admin)`, () => {
        let wrapper;
        beforeEach(() => {
          useDownloadRequests.mockImplementation(() =>
            useDownloadRequestsMock({
              isDownloadedByLearner: () => true,
            })
          );
          wrapper = makeAuthWrapperWithRemoteContent();
        });

        it(`instructs 'LearningActivityBar' to show the bookmark button`, () => {
          assertBookmarkButtonIsDisplayed(wrapper);
        });

        it(`instructs 'LearningActivityBar' to not show the download button`, () => {
          assertDownloadButtonIsNotDisplayed(wrapper);
        });
      });

      describe(`for remote content that is being downloaded by a learner (and not imported by an admin)`, () => {
        let wrapper;
        beforeEach(() => {
          useDownloadRequests.mockImplementation(() =>
            useDownloadRequestsMock({
              isDownloadingByLearner: () => true,
            })
          );
          wrapper = makeAuthWrapperWithRemoteContent();
        });

        it(`instructs 'LearningActivityBar' to not show the bookmark button`, () => {
          assertBookmarkButtonIsNotDisplayed(wrapper);
        });

        it(`instructs 'LearningActivityBar' to show the download button as disabled`, () => {
          assertDownloadButtonIsDisplayed(wrapper);
          expect(
            wrapper.findComponent({ name: 'LearningActivityBar' }).attributes('isdownloading')
          ).toBeTruthy();
        });
      });

      describe(`for remote content that hasn't been downloaded by a learner or imported by an admin yet`, () => {
        let wrapper;
        beforeEach(() => {
          wrapper = makeAuthWrapperWithRemoteContent();
        });

        it(`instructs 'LearningActivityBar' to not show the bookmark button`, () => {
          assertBookmarkButtonIsNotDisplayed(wrapper);
        });

        it(`instructs 'LearningActivityBar' to show the download button`, () => {
          assertDownloadButtonIsDisplayed(wrapper);
        });

        it(`clicking the download button calls 'addDownloadRequest' with content in the payload`, () => {
          const addDownloadRequest = jest.fn();
          useDownloadRequests.mockImplementation(() =>
            useDownloadRequestsMock({
              downloadRequestMap: { downloads: {} },
              addDownloadRequest,
            })
          );
          wrapper = makeAuthWrapperWithRemoteContent();
          wrapper.findComponent({ name: 'LearningActivityBar' }).vm.$emit('download');

          expect(addDownloadRequest).toHaveBeenCalledTimes(1);
          expect(addDownloadRequest).toHaveBeenCalledWith({
            admin_imported: false,
            id: CONTENT_ID,
          });
        });
      });
    });
  });
});
