<template>
  <div class="project relative">
    <div
      class="project__sidebar absolute top-0 bg-near-white br b--moon-gray"
      :style="{ height: height + 'px' }"
    >
      <div class="project__sidebar-wrapper">
        <div class="project__sidebar-body w-100">
          <div class="dn">Project name</div>
          <span class="dn">Board name</span>
          <ul class="pa0">
            <li
              class="list pa2 w-100 tc hover-bg-light-gray pointer"
              :class="{'bg-light-gray': activeMode === 'A'}"
              @click="changeMode('A')"
            >
              A
            </li>
            <li
              class="list pa2 w-100 tc hover-bg-light-gray pointer"
              :class="{'bg-light-gray': activeMode === 'B'}"
              @click="changeMode('B')"
            >
              B
            </li>
          </ul>
        </div>
        <div class="project__sidebar-footer absolute bottom-0 tc w-100 pa1 bt b--moon-gray hover-bg-light-gray pointer ">
          &raquo;
        </div>
      </div>
    </div>
    <div class="project__content">
      <div class="pa3 pb4 project__header">
        <div class="mid-gray f6">My Board</div>
        <div class="mt2 f4">Backlog</div>
      </div>
      <div class="project__list-container">
        <div class="bb b--moon-gray pl3 pb2 gray project__filters">
          Filter here
        </div>
        <div
          class="project__plan"
          :style="{ height: planHeight + 'px'}"
        >
          <div class="project__sprint-group">
            <div class="project__backlog-header">
              <div class="pl3 pt3 b f6">My Sprint 5</div>
            </div>
            <v-draggable
              class="mh3 mv2 project__issues-wrapper project__issues-wrapper--issues"
              element="div"
              v-model="proxyActiveIssues"
              :options="dragOptions"
              :move="onMove"
              @start="onStart"
              @end="onEnd"
              @clone="onClone"
            >
              <v-issue
                v-for="(issue, index) in proxyActiveIssues"
                :issue="issue"
                :key="issue.order"
                :isLast="index === proxyActiveIssues.length - 1"
              />
            </v-draggable>
          </div>
          <div class="bt b--moon-gray mt4 project__backlog-group">
            <div class="project__backlog-header">
              <div class="pl3 pt3 b f6">Backlog</div>
            </div>
            <v-draggable
              class="mh3 mv2 project__issues-wrapper project__issues-wrapper--backlog"
              element="div"
              v-model="proxyBacklogIssues"
              :options="dragOptions"
              :move="onMove"
              @start="onStart"
              @end="onEnd"
              @clone="onClone"
            >

              <v-issue
                v-for="(issue, index) in proxyBacklogIssues"
                :key="issue.order"
                :issue="issue"
                :isLast="index === proxyBacklogIssues.length - 1"
              />
            </v-draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import draggable from 'vuedraggable';
import issue from './Issue';

export default {
  name: 'project',
  components: {
    'v-draggable': draggable,
    'v-issue': issue,
  },
  data() {
    return {
      height: window.innerHeight - 50,
      planHeight: window.innerHeight - 50 - 122,
      activeMode: 'A',
      editable: true,
      isDragging: false,
      delayedDragging: false,
      proxyActiveIssues: [],
      proxyBacklogIssues: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
    dragOptions() {
      return {
        animation: 0,
        group: 'issues',
        disabled: !this.editable,
        ghostClass: 'ghost',
      };
    },
    orderedIssues: {
      get() {
        return this.$store.state.issues.data;
      },
    },
    activeIssues: {
      get() {
        return this.$store.getters.activeIssues;
      },
    },
    backlogIssues: {
      get() {
        return this.$store.getters.backlogIssues;
      },
    },
  },
  beforeMount() {
    this.$store.dispatch('fetchListIssues');
  },
  mounted() {
    this.updateHeight();
    window.addEventListener('resize', () => {
      this.updateHeight();
    });
  },
  methods: {
    updateHeight() {
      const newWinHeight = window.innerHeight;
      const newHeight = newWinHeight - 50;
      if (newHeight !== this.height) {
        this.height = newHeight;
      }

      const newPlanHeight = newWinHeight - 50 - 122;
      if (newPlanHeight !== this.planHeight) {
        this.planHeight = newPlanHeight;
      }
    },
    changeMode(mode) {
      this.activeMode = mode;
    },
    onStart() {
      this.isDragging = true;
    },
    onEnd(evt) {
      this.isDragging = false;
      if (evt.newIndex === this.orderedIssues.length - 1) {
        evt.item.classList.add('bb');
      }
      this.$store.dispatch('moveIssue', {
        proxyActiveIssues: this.proxyActiveIssues,
        proxyBacklogIssues: this.proxyBacklogIssues,
      });

      this.$nextTick();
      setTimeout(() => {
        this.$forceUpdate();
      }, 75);
    },
    onMove(evt) {
      if (evt.draggedContext.futureIndex === this.orderedIssues.length - 1) {
        evt.dragged.classList.add('bb');
      } else {
        evt.dragged.classList.remove('bb');
      }

      if (evt.draggedContext.futureIndex === this.orderedIssues.length - 2) {
        evt.related.classList.add('bb');
      }

      return true;
    },
    onClone(evt) {
      evt.item.classList.add('bb');
    },
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.replace('/login');
      }
    },
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }

      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
    activeIssues(newList) {
      this.proxyActiveIssues = newList;
    },
    backlogIssues(newList) {
      this.proxyBacklogIssues = newList;
    },
  },
  created() {
    if (!this.$store.state.auth || !this.$store.state.auth.isAuthenticated) {
      this.$router.replace('/login');
    }
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

    .project__issue {
      &:hover {
        cursor: move;
      }
    }
  }
  .ghost {
    background: #eee;
  }
</style>
