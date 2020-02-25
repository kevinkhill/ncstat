<template>
  <multipane class="custom-resizer" layout="vertical">
    <div class="pane" :style="{ width: '50%' }">
      <p class="display-1">NC Code</p>
      <v-textarea
        solo
        autofocus
        full-width
        rows="24"
        name="input"
        label="NC INPUT"
        :value="input"
        @input="update"
      ></v-textarea>
    </div>
    <multipane-resizer></multipane-resizer>
    <div class="pane" :style="{ flexGrow: 1 }">
      <v-badge inline color="deep-purple accent-6" :content="tokenCount"
        ><p class="display-1">Tokens</p></v-badge
      >
      <div class="output">
        <template v-for="(token, idx) in tokens">
          <span
            :key="idx"
            class="token"
            :class="[`${token.value.prefix}_CODE`, token.type]"
            >{{ token.text }}</span
          >
          <br v-if="token.type === 'NEWLINE'" />
        </template>
      </div>
    </div>
  </multipane>
</template>

<script>
import Vue from "vue";
import debounce from "lodash-es/debounce";
import { NcLexer } from "@ncstat/lexer";
import { Multipane, MultipaneResizer } from "vue-multipane";

const input = `%
O1234 (TEST PROGRAM)

N43 ( #14 [.182"] DRILL )
T43 M6
G0 G90 G54 X.75 Y.19
S10495 M3
M50 (TSC COOLANT ON)
G43 H#518 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
X5.
G80
M30
%`;

export default Vue.extend({
  components: {
    Multipane,
    MultipaneResizer
  },
  data() {
    return {
      input,
      tokens: []
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
    tokenCount() {
      return this.tokens.length;
    }
  },
  created() {
    this.lexer = new NcLexer({
      newlineTokens: true
    });
  },
  mounted() {
    this.tokenizeInput();
  },
  methods: {
    tokenizeInput() {
      const tokens = this.lexer.tokenArray(this.input);

      tokens.pop();

      this.tokens = tokens;
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
  height: 100%;
  font-family: "Fira Code", "Courier New", Courier, monospace;
}

.title {
  color: white;
}

.custom-resizer {
  width: 100%;
  height: 100%;
}

$resizer-border: 1px solid #333;

.custom-resizer > .pane {
  text-align: left;
  padding: 15px;
  overflow: hidden;
  background-color: #1a1a1a;
  border-left: $resizer-border;
  border-right: $resizer-border;
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
