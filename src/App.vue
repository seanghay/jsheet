<script setup>
import { computed, ref } from "@vue/reactivity";
import Codemirror from "codemirror-editor-vue3";
import "codemirror-editor-vue3/dist/style.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/darcula.css";
import "codemirror/addon/edit/closebrackets";
import * as Babel from "@babel/standalone";

const code = ref(`
export const headers = {
  id: 'ID Number',
  name: 'Name',
};

export const values = [
  { 
  	id: 1,
    name: "Hello Name",
  }
];
`);
const exportsOutput = ref({});

function initializer(interpreter, globalObject) {
  interpreter.setProperty(
    globalObject,
    "exports",
    interpreter.nativeToPseudo(exportsOutput.value),
  );
}

const transpiled = computed(() => {
  try {
    const es5 = Babel.transform(code.value, { presets: ["env"] }).code;
    const interpreter = new Interpreter(`${es5}; exports;`, initializer);
    interpreter.run();
    const out = interpreter.pseudoToNative(interpreter.value);
    console.log(out);
    return es5;
  } catch (e) {
    console.warn(e);
    return "";
  }
});

const cmOptions = ref({
  value: "hello",
  lineNumbers: true,
  smartIndent: true,
  indentUnit: 2,
  mode: "text/javascript",
  theme: "darcula",
  lineWrapping: true,
  autoCloseBrackets: true,
});
</script>

<template>
  <div id="jsheet">
    <div class="sidebar sidebar-left">
      <Codemirror :options="cmOptions" v-model:value="code" />
    </div>
    <div class="sidebar sidebar-right">
      <p>
        <code>
          {{ transpiled }}
        </code>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
#jsheet {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #333;
  color: white;
}

.sidebar {
  &.sidebar-left {
    overflow-y: auto;
  }

  &.sidebar-right {
  }
}

.CodeMirror * {
  font-family: "JetBrains Mono", monospace;
  font-size: 16px;
}
</style>
