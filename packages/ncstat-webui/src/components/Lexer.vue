<template>
  <Multipane class="custom-resizer" layout="vertical">
    <!-- Left Pane -->
    <div class="pane" :style="{ minWidth: '20%', width: '40%' }">
      <p class="display-1">G Code</p>
      <v-textarea
        solo
        autofocus
        full-width
        spellcheck="false"
        rows="20"
        name="input"
        :value="input"
        @input="update"
      ></v-textarea>
      <v-btn color="secondary" block dark @click="reset">Reset</v-btn>
    </div>

    <MultipaneResizer></MultipaneResizer>

    <!-- Right Pane -->
    <div class="pane" :style="{ flexGrow: 1 }">
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab>Formatted Output</v-tab>
        <v-tab>
          <v-badge color="deep-purple accent-6" :content="tokenCount">
            Tokens
          </v-badge>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Formatted Output -->
        <v-tab-item>
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
        </v-tab-item>

        <!-- Tokens -->
        <v-tab-item>
          <div class="tokens">
            <ul>
              <li :key="idx" v-for="(token, idx) in tokens">
                {{ JSON.stringify(token) }}
              </li>
            </ul>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </Multipane>
</template>

<script lang="ts">
import Vue from "vue";
import debounce from "lodash-es/debounce";
import { NcLexer } from "@ncstat/lexer";
import { Multipane, MultipaneResizer } from "vue-multipane";

const lexer = new NcLexer({
  newlineTokens: true
});

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
      lexer,
      input,
      tab: null,
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

  mounted() {
    this.tokenizeInput();
  },

  methods: {
    reset() {
      this.input = "";
      this.tokens = [];
    },
    tokenizeInput(): void {
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
.pane,
textarea,
.output {
  height: 100%;
  font-family: "Fira Code", "Courier New", Courier, monospace;
}

.tokens {
  font-size: 9pt;
  font-weight: 300;
  padding: 10px;
}

.output {
  padding: 10px;
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
