<template>

  <CoreMenuOption
    :label="$tr('signOut')"
    :link="url"
    icon="logout"
  />

</template>


<script>

  import { UserKinds } from 'kolibri.coreVue.vuex.constants';
  import CoreMenuOption from 'kolibri.coreVue.components.CoreMenuOption';
  import urls from 'kolibri.urls';

  export default {
    name: 'LogoutSideNavEntry',
    components: {
      CoreMenuOption,
    },
    computed: {
      url() {
        return urls['kolibri:core:logout']();
      },
    },
    $trs: {
      signOut: {
        message: 'Sign out',
        context:
          "Users can exit Kolibri by selecting 'Sign out' from the user menu in the upper right corner.",
      },
    },
    role: UserKinds.LEARNER,
    priority: 100,
  };

</script>
