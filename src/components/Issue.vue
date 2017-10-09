<template>
  <div
    class="bt bl br b--moon-gray pv2 ph3 f6 hover-bg-light-gray project__issue"
    :class="{ 'bb': isLast }"
  >
    {{ issue.title }}
  </div>
</template>

<script>
export default {
  name: 'issue',
  data() {
    return {};
  },
  props: {
    isLast: {
      required: true,
      type: Boolean,
    },
    issue: {
      required: true,
      type: Object,
    },
  },
};
</script>

