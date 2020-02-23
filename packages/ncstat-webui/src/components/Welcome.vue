<template>
  <multipane class="custom-resizer" layout="vertical">
    <div class="pane" :style="{ width: '25%', maxWidth: '50%' }">
      <div>
        <h6 class="title is-6">Pane 1</h6>
        <textarea v-model="input"></textarea>
      </div>
    </div>
    <multipane-resizer></multipane-resizer>
    <div class="pane" :style="{ flexGrow: 1 }">
      <div>
        <h6 class="title is-6">Pane 2</h6>
        <div>
          {{ output }}
        </div>
      </div>
    </div>
  </multipane>
</template>

<script>
import { NcParser } from "@ncstat/parser";
import { Multipane, MultipaneResizer } from "vue-multipane";

export default {
  components: {
    Multipane,
    MultipaneResizer
  },
  data() {
    return {
      input: ""
    };
  },
  created() {
    this.parser = new NcParser();
    this.lexer = this.parser.getLexer();
  },
  computed: {
    output() {
      return this.lexer.tokenArray(this.input).join("<br />");
    }
  }
};
</script>

<style lang="scss">
.pane {
  height: 100%;
}

.title {
  color: white;
}

.custom-resizer {
  width: 100%;
  height: 100%;
}

.custom-resizer > .pane {
  text-align: left;
  padding: 15px;
  overflow: hidden;
  background-color: #1a2f44;
  border: 1px solid #666;
}

.custom-resizer > .pane ~ .pane {
}

.custom-resizer > .multipane-resizer {
  margin: 0;
  left: 0;
  position: relative;

  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -1.5px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
</style>
