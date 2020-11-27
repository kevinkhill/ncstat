<template>
  <Multipane class="custom-resizer" layout="vertical">
    <!-- Left Pane -->
    <div class="pane" :style="{ minWidth: '20%', width: '30%' }">
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
        <v-tab>Formatted</v-tab>
        <v-tab>
          <v-badge color="deep-purple accent-6" :content="tokenCount">
            Tokens
          </v-badge>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Formatted -->
        <v-tab-item>
          <div class="output">
            <template v-for="(token, idx) in tokens">
              <span
                :key="idx"
                class="token"
                :class="[`${token.prefix}_CODE`, token.type]"
              >
                <br v-if="token.type === 'NEWLINE'" />
                <template v-else>{{ token.text }}</template>
              </span>
            </template>
          </div>
        </v-tab-item>

        <!-- Tokens -->
        <v-tab-item>
          <!-- <div class="tokens"> -->
            <v-list dense>
              <v-subheader>REPORTS</v-subheader>
              <v-list-item-group
                v-model="selectedItem"
                color="primary"
              >
                <v-list-item
                  v-for="(token, i) in tokens"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="`${token}`"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          <!-- </div> -->
        </v-tab-item>
      </v-tabs-items>
    </div>
  </Multipane>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import {Watch}from 'vue-property-decorator';
import { NcLexer, NcToken } from "@ncstat/parser";
import { Multipane, MultipaneResizer } from "vue-multipane";

const DEMO_INPUT = `%
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

@Component({
  components: {
    Multipane,
    MultipaneResizer
  }
})
export default class Lexer extends Vue {
  lexer = new NcLexer();

  tab = null;
  input = DEMO_INPUT;
  selectedItem!: string;
  tokens: NcToken[] = [];

  get tokenCount() {
    return this.tokens.length;
  }

  mounted() {
    this.tokenizeInput();
  }

  @Watch('input')
  onInput(val: string, _oldVal: string) {
    this.$emit("input", { input: val });
  }

  // onTokens(newVal) {
  //   this.$emit("token", { tokens: newVal });
  // }

  reset() {
    this.input = "";
    this.tokens = [];
  }

  tokenizeInput(): void {
    const tokens = this.lexer.tokens(this.input);

    console.log(tokens);

    this.tokens = tokens;
  }

  update(input: string) {
    this.input = input.toUpperCase();

    this.tokenizeInput();
  }
}
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
