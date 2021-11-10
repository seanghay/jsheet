<script setup>
import { computed, ref } from "@vue/reactivity";
import Codemirror from "codemirror-editor-vue3";
import "codemirror-editor-vue3/dist/style.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/darcula.css";
import "codemirror/addon/edit/closebrackets";
import * as Babel from "@babel/standalone";
import { onMounted, watch } from "@vue/runtime-core";
import { utils, writeFile, readFile, read } from "xlsx";
import canvasDatagrid from "canvas-datagrid";
import stripIndent from 'strip-indent'

const gridContainer = ref();
const grid = ref(null);
const rowData = ref([]);
const fileRef = ref(null);

onMounted(() => {
  const dataGrid = canvasDatagrid({
    editable: false,
  });
  const parent = gridContainer.value;
  const width = parent.clientWidth;
  const height = parent.clientHeight;

  dataGrid.data = [];
  dataGrid.style.height = height + "px";
  dataGrid.style.width = width + "px";

  parent.appendChild(dataGrid);
  grid.value = dataGrid;

  compute();
});

const filenameRef = ref("file.xlsx");

const code = ref(`
// your excel headers
export const headers = {
  id: "User ID"
};

// your data
export const values = [
  {
    id: Math.floor(Math.random() * 69)
  }
];

export const filename = \`file-\$\{Date.now()\}.xlsx\`;
`);

function initializer(interpreter, globalObject) {
  interpreter.setProperty(
    globalObject,
    "exports",
    interpreter.nativeToPseudo(exportsOutput.value)
  );
}

function compute() {
  setTimeout(() => {
    try {
      const es5 = Babel.transform(code.value, { presets: ["env"] }).code;
      const interpreter = new Interpreter(`${es5}; exports;`, initializer);
      interpreter.run();
      const out = interpreter.pseudoToNative(interpreter.value);
      console.log(out);
      const { headers, values, filename = "file.xlsx" } = out;
      const rows = values.map((value) => {
        const obj = {};
        Object.keys(headers).forEach((headerKey) => {
          const newValue = value[headerKey];
          const newKey = headers[headerKey];
          obj[newKey] = newValue;
        });
        return obj;
      });

      filenameRef.value = filename;
      rowData.value = rows;
      grid.value.data = rows;
    } catch (e) {
      console.warn(e);
      return "";
    }
  });
}

watch(code, compute);

const exportsOutput = ref({
  values: [],
  headers: [],
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

function exportAsExcelFile() {
  const sheet = utils.json_to_sheet(rowData.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, sheet, "Sheet1");
  const filename = encodeURIComponent(filenameRef.value);
  writeFile(wb, filename);
}

function onFileChange(e) {

  const file = e.target.files[0];
  const reader = new FileReader();
 
 reader.onload = () => {

    const buffer = reader.result;
    const wb = read(buffer, { type: "buffer" });
    const sheetName = wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];
    const rows = utils.sheet_to_json(ws);
    const headers = new Set();
    
    rows.forEach(row => {
      const values = Object.keys(row);
      values.forEach(it => headers.add(it));
    });
    const headersObject = Object.fromEntries(Array.from(headers).map(key => [key, key]));
    const content = stripIndent(`
export const headers = ${JSON.stringify(headersObject, null, 2)}

export const values = ${JSON.stringify(rows, null, 2)}
    `);

    code.value = content;
    compute();
    
  };
 
  reader.readAsArrayBuffer(file);
}
</script>

<template>
  <div id="jsheet">
    <div class="sidebar sidebar-left">
      <Codemirror :options="cmOptions" v-model:value="code" />
    </div>
    <div ref="gridContainer" class="sidebar sidebar-right"></div>
  </div>
  <div id="menu-controls">
    <a href="https://github.com/seanghay/jsheet">View on GitHub</a>
    <div class="spacer"></div>
    <input
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @change="onFileChange"
      type="file"
      name="file"
      id="file"
      hidden
      ref="fileRef"
    />
    <button @click="fileRef.click()">Import XLSX</button>
    <button @click="exportAsExcelFile()">Export as Excel</button>
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

#menu-controls {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  text-align: right;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em 2em;
  background: rgb(36, 36, 36, 0.9);
  border-top: 1px solid rgba(36, 36, 36, 0.3);
  align-items: center;
}

#menu-controls button {
  border: none;
  padding: 0.4em 0.8em;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  border-radius: 0.3em;
  transition: 0.2s ease;
  margin-left: 8px;
  font-size: 0.95em;
}

.spacer {
  flex-grow: 1;
}

#menu-controls button:hover {
  background: rgba(255, 255, 255, 0.2);
}

#menu-controls button:active {
  background: rgba(255, 255, 255, 0.15);
}

a {
  color: rgb(165, 165, 165);
  text-decoration: none;
  font-display: inherit;
  font-size: 1em;
}
</style>
