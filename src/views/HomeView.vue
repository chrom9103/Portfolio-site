<script setup lang="ts">
  import { ref } from 'vue';

  const code = ref(`console.log('Hello, world!');`);
  const output = ref('');
  const error = ref('');

  const runCode = () => {
    output.value = '';
    error.value = '';

    const originalLog = console.log;
    let tempOutput = '';

    // console.log を一時的に上書きして出力をキャプチャ
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
</script>

<template>
  <div class="container">
    <h1>JavaScript PlayGround</h1>
    <div class="code-editor">
      <textarea v-model="code" placeholder="Write your JavaScript code here..."></textarea>
    </div>
    <button @click="runCode">Run Code</button>
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
.code-editor {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
textarea {
  width: 100%;
  height: 300px;
  border: none;
  padding: 15px;
  box-sizing: border-box;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  resize: vertical;
  background-color: #f5f5f5;
}
button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #3aa675;
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