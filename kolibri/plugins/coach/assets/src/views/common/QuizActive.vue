<template>

  <span>
    <KLabeledIcon :style="active ? {} : { color: $themeTokens.textDisabled }">
      <template #icon>
        <KIcon
          icon="dot"
          :color="active ? $themeTokens.success : $themeTokens.textDisabled"
        />
      </template>
      {{ label }}
    </KLabeledIcon>
  </span>

</template>


<script>

  import { coachStringsMixin } from './commonCoachStrings';

  export default {
    name: 'QuizActive',
    mixins: [coachStringsMixin],
    props: {
      active: {
        type: Boolean,
        required: true,
      },
    },
    // computed: {
    //   label() {
    //     return this.active ? this.$tr('activeQuizLabel') : this.$tr('inactiveQuizLabel');
    //   },
    // },
    // $trs: {
    //   activeQuizLabel: 'Active',
    //   inactiveQuizLabel: 'Inactive',
    // },
  };

</script>


<style lang="scss" scoped></style>
