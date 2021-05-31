<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(toolpath, idx) in toolpaths" :key="idx">
      <v-expansion-panel-header>
        {{ JSON.stringify(toolpath) }}
        <template v-slot:actions>
          <v-icon color="primary">$expand</v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>


    <v-expansion-panel>
      <v-expansion-panel-header>
        Item
        <template v-slot:actions>
          <v-icon color="primary">$expand</v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header disable-icon-rotate>
        Item
        <template v-slot:actions>
          <v-icon color="teal">mdi-check</v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header disable-icon-rotate>
        Item
        <template v-slot:actions>
          <v-icon color="error">mdi-alert-circle</v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Toolpath } from "@ncstat/parser";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Toolpaths extends Vue {
  @Prop({ default: [] })
  toolpaths!: Toolpath[];
}
</script>
