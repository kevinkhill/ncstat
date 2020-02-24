<template>
  <multipane class="custom-resizer" layout="vertical">
    <div class="pane" :style="{ width: '50%' }">
      <p class="display-1">G CODE</p>

      <v-textarea
        solo
        autofocus
        full-width
        class="fill-height"
        name="input"
        label="NC INPUT"
        :value="input"
        @input="update"
      ></v-textarea>
    </div>
    <multipane-resizer></multipane-resizer>
    <div class="pane" :style="{ flexGrow: 1 }">
      <p class="display-1">Tokens</p>
      <div class="output">
        <span
          v-for="(token, idx) in tokens"
          :key="idx"
          class="token"
          :class="[`${token.value.prefix}_CODE`, token.type]"
        >
          {{ token.text }}
        </span>
      </div>
    </div>
  </multipane>
</template>

<script>
import Vue from "vue";
import debounce from "lodash-es/debounce";
import { NcParser } from "@ncstat/parser";
import { Multipane, MultipaneResizer } from "vue-multipane";

export default Vue.extend({
  components: {
    Multipane,
    MultipaneResizer
  },
  data() {
    return {
      input: "G0 G90 G53 X-15. Y0."
    };
  },
  computed: {
    tokens() {
      const tokens = this.lexer.tokenArray(this.input);

      tokens.pop();

      return tokens;
    }
  },
  created() {
    this.parser = new NcParser();
    this.lexer = this.parser.getLexer();
  },
  methods: {
    update: debounce(function(e) {
      this.input = e.target.value;
    }, 300)
  }
});
</script>

<style lang="scss">
.token {
  font-size: 16pt;
}

textarea,
.pane,
.output {
  font-family: "Fira Code", "Courier New", Courier, monospace;
}

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
  // background-color: #1a2f44;
  border-left: 1px solid #666;
  border-right: 1px solid #666;
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
