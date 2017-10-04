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
            <draggable
              class="mh3 mv2 project__issues-wrapper"
              element="div"
              v-model="orderedIssues"
              :options="dragOptions"
              :move="onMove"
              @start="onStart"
              @end="onEnd"
              @sort="onSort"
              @clone="onClone"
            >
              <transition-group
                type="transition"
                :name="'flip=list'"
              >
                <div
                  class="bt bl br b--moon-gray pv2 ph3 f6 hover-bg-light-gray project__issue"
                  :class="{ 'bb': index === orderedIssues.length - 1 }"
                  v-for="(issue, index) in orderedIssues"
                  :key="issue.order"
                >
                  {{ issue.title }}
                </div>
              </transition-group>
            </draggable>
          </div>
          <div class="bt b--moon-gray mt4 project__backlog-group">
            <div class="project__backlog-header">
              <div class="pl3 pt3 b f6">Backlog</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'project',
  components: {
    draggable,
  },
  data() {
    return {
      height: window.innerHeight - 50,
      planHeight: window.innerHeight - 50 - 122,
      activeMode: 'A',
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'issues',
        disabled: !this.editable,
        ghostClass: 'ghost',
      };
    },
    orderedIssues: {
      set(newIssues) {
        this.$store.dispatch('moveIssue', newIssues);
      },
      get() {
        return this.$store.state.issues.data;
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
      console.log(evt);
      this.$nextTick();
      setTimeout(() => {
        this.$forceUpdate();
      }, 75);
    },
    onSort() {
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
      // debugger;
      evt.item.classList.add('bb');
    },
  },
  watch: {
    height() {
      console.log(this.height);
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
