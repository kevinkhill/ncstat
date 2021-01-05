`
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
      <div class="d-flex flex-column mb-6">
        <v-container>
          <v-tabs v-model="tab" background-color="transparent" grow>
            <v-tab>
              <v-badge
                color="deep-purple accent-6"
                :content="toolpathCount"
              >
                Toolpaths
              </v-badge>
            </v-tab>
            <v-tab>Formatted</v-tab>
            <v-tab>Comments</v-tab>
            <v-tab>
              <v-badge
                color="deep-purple accent-6"
                :content="tokenCount"
              >
                Tokens
              </v-badge>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <!-- Toolpaths -->
            <v-tab-item>
              <div>
                <Toolpaths :toolpaths="program.toolpaths" />
              </div>
            </v-tab-item>

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

            <!-- Comments -->
            <v-tab-item>
              <div>
                <v-card :key="i" v-for="(c, i) in comments">
                  <v-card-title>{{ c }}</v-card-title>
                </v-card>
              </div>
            </v-tab-item>

            <!-- Tokens -->
            <v-tab-item>
              <div class="tokens">
                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Token</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr :key="i" v-for="(token, i) in tokens">
                        <td>{{ token }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
        <v-container fluid>
          <v-switch
            v-model="switch1"
            :label="`Switch 1: ${switch1.toString()}`"
          ></v-switch>
          <v-switch
            v-model="switch2"
            :label="`Switch 2: ${switch2.toString()}`"
          ></v-switch>
        </v-container>
        <!-- <v-card :key="n" v-for="n in 3" class="pa-2" outlined tile>
          Flex item {{ n }}
        </v-card> -->
      </div>
    </div>
  </Multipane>
</template>

<script lang="ts">
import { NcToken, NcParser, NcProgram } from "@ncstat/parser";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Multipane, MultipaneResizer } from "vue-multipane";

import Toolpaths from "./Toolpaths.vue";

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
    Toolpaths,
    Multipane,
    MultipaneResizer
  }
})
export default class MainPage extends Vue {
  parser = new NcParser();
  program?: NcProgram;
  tokens: NcToken[] = [];
  comments: string[] = [];

  tab = null;
  input = DEMO_INPUT;
  selectedItem!: string;
  switch1 = true;
  switch2 = false;

  get blockCount(): number {
    return this.program?.blocks.length ?? 0;
  }

  get toolpathCount(): number {
    return this.program?.toolpaths.length ?? 0;
  }

  get tokenCount(): number {
    return this.tokens.length ?? 0;
  }

  created(): void {
    this.parseInput();
  }

  @Watch("input")
  onInput(val: string, _oldVal: string): void {
    this.$emit("input", { input: val });
  }

  // onTokens(newVal) {
  //   this.$emit("block", { blocks: newVal });
  // }

  reset(): void {
    this.input = "";
    this.program = undefined;
  }

  parseInput(): void {
    try {
      this.program = this.parser.parse(this.input);
      this.tokens = this.parser.getLexer().tokens(this.input);
      this.comments = this.tokens
        .filter(t => t.type === "COMMENT")
        .map(t => t.text);
    } catch (err) {
      console.error(err);
    }

    //console.log(this.program);
  }

  update(input: string): void {
    this.input = input.toUpperCase();

    this.parseInput();
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

.blocks {
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
