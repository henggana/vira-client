<template>
  <div class="project relative">
    <div
      class="project__sidebar absolute top-0 bg-near-white br b--moon-gray"
      :style="{ height: height + 'px' }"
    >
      <div class="project__sidebar-wrapper h-100">
        <div class="project__sidebar-body w-100">
          <div class="dn">Project name</div>
          <span class="dn">Board name</span>
          <ul class="pa0">
            <li class="list pa2 w-100 tc bt bb b--moon-gray hover-bg-light-gray pointer">AS</li>
            <li class="list pa2 w-100 tc bb b--moon-gray hover-bg-light-gray pointer">BL</li>
          </ul>
        </div>
        <div class="project__sidebar-footer absolute bottom-0 tc w-100 pa1 bt b--moon-gray hover-bg-light-gray pointer ">
          &raquo;
        </div>
      </div>
    </div>
    <div class="project__content">
      <div class="pa3">Backlog</div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'project',
  data() {
    return {
      height: window.innerHeight - 50,
    };
  },
  mounted() {
    this.updateHeight();
    console.log('height', this.height);
    window.addEventListener('resize', () => {
      console.log('resize');
      this.updateHeight();
    });
  },
  methods: {
    updateHeight() {
      this.height = window.innerHeight - 50;
    },
  },
  watch: {
    height() {
      console.log(this.height);
    },
  },
};
</script>

<style lang="scss">
  .project {
    .project__sidebar {
      .project__sidebar-wrapper {
        width: 56px;
      }
    }

    .project__content {
      padding-left: 56px;
    }
  }
</style>
