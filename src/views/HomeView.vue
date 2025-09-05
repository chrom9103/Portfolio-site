<template>
  <div class="container">
    <h1>JavaScript PlayGround</h1>
    <div class="actions">
      <button @click="runCode">Run Code</button>
      <button @click="downloadCode">Download Code</button>
    </div>
    <div class="main-content">
      <div class="file-explorer">
        <div class="file-header">
          <h3>Files</h3>
          <button @click="addNewFile">+</button>
        </div>
        <ul>
          <li
            v-for="file in files"
            :key="file.id"
            :class="{ active: file.id === activeFileId }"
            @click="switchFile(file.id)"
          >
            <span>{{ file.name }}</span>
          </li>
        </ul>
      </div>
      <div class="code-editor">
        <div id="editor-container"></div>
      </div>
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
import { ref, onMounted, watch } from 'vue';
import * as monaco from 'monaco-editor';
import { v4 as uuidv4 } from 'uuid';

const files = ref([
  {
    id: uuidv4(),
    name: 'main.js',
    content: `console.log('Hello world!');`,
  },
]);
const activeFileId = ref(files.value[0].id);
const code = ref(files.value[0].content);
const output = ref('');
const error = ref('');
let monacoEditor: monaco.editor.IStandaloneCodeEditor;

// ファイルの切り替えを検知してエディタを更新
watch(activeFileId, (newFileId, oldFileId) => {
  // 現在のファイルの内容を保存
  if (monacoEditor && oldFileId) {
    const oldFile = files.value.find(f => f.id === oldFileId);
    if (oldFile) {
      oldFile.content = monacoEditor.getValue();
    }
  }

  // 新しいファイルの内容をエディタにロード
  const newFile = files.value.find(f => f.id === newFileId);
  if (newFile && monacoEditor) {
    monacoEditor.setValue(newFile.content);
  }
});

onMounted(() => {
  monacoEditor = monaco.editor.create(document.getElementById('editor-container')!, {
    value: code.value,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
  });

  monacoEditor.onDidChangeModelContent(() => {
    // エディタの内容変更を`code` refに同期
    code.value = monacoEditor.getValue();
    // 現在アクティブなファイルの内容も更新
    const activeFile = files.value.find(f => f.id === activeFileId.value);
    if (activeFile) {
      activeFile.content = code.value;
    }
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
  const activeFile = files.value.find(f => f.id === activeFileId.value);
  if (!activeFile) return;

  const blob = new Blob([activeFile.content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = activeFile.name;
  a.click();
  URL.revokeObjectURL(url);
};

const addNewFile = () => {
  const newFile = {
    id: uuidv4(),
    name: `new-file-${files.value.length}.js`,
    content: `console.log('Hello world!');`,
  };
  files.value.push(newFile);
  switchFile(newFile.id);
};

const switchFile = (fileId: string) => {
  activeFileId.value = fileId;
};
</script>

<style scoped>
.container {
  max-width: 1200px;
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
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 20px;
}
.main-content {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.file-explorer {
  width: 150px;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #ccc;
}
.file-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.file-explorer h3 {
  margin: 0;
}
.file-explorer ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.file-explorer li {
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
  transition: background-color 0.2s;
}
.file-explorer li:hover {
  background-color: #e0e0e0;
}
.file-explorer li.active {
  background-color: #ddd;
  font-weight: bold;
}
.code-editor {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
#editor-container {
  width: 100%;
  height: 400px;
}
button {
  padding: 10px 15px;
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