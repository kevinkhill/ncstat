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
        <template v-for="(token, idx) in tokens">
        <span
          :key="idx"
          class="token"
          :class="[`${token.value.prefix}_CODE`, token.type]"
        >{{ token.type === 'EOB' ? ';' : token.text }}</span>
        </template>
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
      rawTokens: [],
      input: "G91 G28 Z0."
    };
  },
  watch: {
    input(newVal) {
      this.$emit("input", { input: newVal });
    },
    tokens(newVal) {
      this.$emit("token", { tokens: newVal });
    }
  },
  computed: {
    tokens() {
      const tokens = [...this.rawTokens];

      tokens.pop();

      return tokens;
    }
  },
  mounted() {
    this.parser = new NcParser();
    this.lexer = this.parser.getLexer();

    this.tokenizeInput();
  },
  methods: {
    tokenizeInput() {
      this.rawTokens = this.lexer.tokenArray(this.input);      
    },
    update: debounce(function(input) {
      this.input = input.toUpperCase();
      
      this.tokenizeInput();
    }, 300)
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/_tokens";

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
