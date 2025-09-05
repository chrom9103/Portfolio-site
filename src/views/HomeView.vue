<template>
  <div class="container">
    <h1>JavaScript PlayGround</h1>
    <div class="actions">
      <button @click="runCode">Run Code</button>
      <button @click="downloadCode">Download Code</button>
    </div>
    <div class="code-editor">
      <div id="editor-container"></div>
    </div>
    <div v-if="output" class="output-area success">
      <h3>Output:</h3>
      <pre>{{ output }}</pre>
    </div>
    <div v-if="error" class="output-area error">
      <h3>Error:</h3>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import * as monaco from 'monaco-editor';

  const code = ref(`console.log('Hello, world!');`);
  const output = ref('');
  const error = ref('');
  let monacoEditor: monaco.editor.IStandaloneCodeEditor;

  onMounted(() => {
    monacoEditor = monaco.editor.create(document.getElementById('editor-container')!, {
      value: code.value,
      language: 'javascript',
      theme: 'vs-right',
      automaticLayout: true,
    });

    monacoEditor.onDidChangeModelContent(() => {
      code.value = monacoEditor.getValue();
    });
  });

  const runCode = () => {
    output.value = '';
    error.value = '';

    const originalLog = console.log;
    let tempOutput = '';

    console.log = (...args) => {
      tempOutput += args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ') + '\n';
    };

    try {
      const result = eval(code.value);
      if (result !== undefined) {
        tempOutput += `=> ${typeof result === 'object' ? JSON.stringify(result) : String(result)}`;
      }
      output.value = tempOutput;
    } catch (e: any) {
      error.value = e.toString();
    } finally {
      console.log = originalLog;
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code.value], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playground-code.js';
    a.click();
    URL.revokeObjectURL(url);
  };
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}
h1 {
  text-align: center;
  color: #2c3e50;
}
.actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}
.code-editor {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
#editor-container {
  width: 100%;
  height: 300px;
}
button {
  flex-grow: 1;
  padding: 10px;
  background-color: #f7df1e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #f7df1e;
}
.output-area {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.output-area h3 {
  margin-top: 0;
}
.success {
  background-color: #e8f5e9;
  border: 1px solid #c8e6c9;
  color: #2e7d32;
}
.error {
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  color: #c62828;
}
pre {
  margin: 0;
}
</style>