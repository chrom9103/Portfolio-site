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
          <button @click="addNewFile" class="add-file-btn">+</button>
        </div>
        <ul>
          <li
            v-for="file in files"
            :key="file.id"
            :class="{ active: file.id === activeFileId }"
            @click="switchFile(file.id)"
          >
            <span
              v-if="editingFileId !== file.id"
              @dblclick.stop="startRename(file.id)"
            >
              {{ file.name }}
            </span>
            <input
              v-else
              type="text"
              v-model="file.name"
              @blur="finishRename"
              @keyup.enter="finishRename"
              v-rename-focus
            />
            <button @click.stop="deleteFile(file.id)" class="delete-btn">×</button>
          </li>
        </ul>
      </div>
      <div class="code-editor">
        <div id="editor-container"></div>
      </div>
    </div>
    
    <div class="terminal-area">
      <h3>Terminal:</h3>
      <pre :class="{ error: error, success: !error }">{{ output || error }}</pre>
    </div>

    <div v-if="showConfirmPopup" class="confirm-overlay">
      <div class="confirm-popup">
        <p>{{ popupMessage }}</p>
        <div class="popup-actions">
          <button @click="confirmAction(true)" class="confirm-ok-btn">OK</button>
          <button @click="confirmAction(false)" class="confirm-cancel-btn">キャンセル</button>
        </div>
      </div>
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
const editingFileId = ref<string | null>(null);
let monacoEditor: monaco.editor.IStandaloneCodeEditor;

const showConfirmPopup = ref(false);
const popupMessage = ref('');
let popupResolve: ((value: boolean | PromiseLike<boolean>) => void) | null = null;

watch(activeFileId, (newFileId, oldFileId) => {
  if (monacoEditor && oldFileId) {
    const oldFile = files.value.find(f => f.id === oldFileId);
    if (oldFile) {
      oldFile.content = monacoEditor.getValue();
    }
  }
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
    code.value = monacoEditor.getValue();
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
    name: `new-file.js`,
    content: `console.log('Hello world!');`,
  };
  files.value.push(newFile);
  switchFile(newFile.id);
};

const switchFile = (fileId: string) => {
  if (editingFileId.value === fileId) return;
  activeFileId.value = fileId;
};

const startRename = (fileId: string) => {
  editingFileId.value = fileId;
};

const finishRename = () => {
  const file = files.value.find(f => f.id === editingFileId.value);
  if (file && file.name.trim() === '') {
    file.name = 'untitled.js';
  }
  editingFileId.value = null;
};

const deleteFile = async (fileId: string) => {
  if (files.value.length <= 1) {
    alert('少なくとも1つのファイルが必要です。');
    return;
  }
  const fileToDelete = files.value.find(f => f.id === fileId);
  if (!fileToDelete) return;

  popupMessage.value = `本当にファイル「${fileToDelete.name}」を削除してもよろしいですか？`;
  showConfirmPopup.value = true;
  const confirmed = await new Promise<boolean>(resolve => {
    popupResolve = resolve;
  });

  if (confirmed) {
    const fileIndex = files.value.findIndex(f => f.id === fileId);
    if (fileIndex > -1) {
      files.value.splice(fileIndex, 1);
      if (activeFileId.value === fileId) {
        activeFileId.value = files.value[0].id;
      }
    }
  }
};

const confirmAction = (result: boolean) => {
  showConfirmPopup.value = false;
  if (popupResolve) {
    popupResolve(result);
    popupResolve = null;
  }
};

const vRenameFocus = {
  mounted: (el: HTMLElement) => {
    el.focus();
  },
};
</script>

<style scoped>
/* --- ターミナル表示エリア --- */
.terminal-area {
  margin-top: 20px;
  background-color: #1e1e1e;
  color: white;
  padding: 15px;
  border-radius: 8px;
  min-height: 150px;
  box-sizing: border-box;
}

.terminal-area h3 {
  margin-top: 0;
  color: #f0f0f0;
}

.terminal-area pre {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.terminal-area pre.success {
  color: white;
}

.terminal-area pre.error {
  color: #ff5555;
}

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
  width: 250px;
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
  display: flex;
  align-items: center;
}
.file-explorer li:hover {
  background-color: #e0e0e0;
}
.file-explorer li.active {
  background-color: #ddd;
  font-weight: bold;
}
.file-explorer li span {
  flex-grow: 1;
}
.file-explorer li input {
  flex-grow: 1;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 4px;
  background-color: white;
  color: blue;
}
.delete-btn {
  background-color: transparent;
  color: #c62828;
  border: none;
  padding: 4px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  transition: color 0.2s;
}
.delete-btn:hover {
  color: #ff5252;
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
  background-color: #e7d01c;
}

/* カスタム確認ポップアップのスタイル */
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirm-popup {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.confirm-popup p {
  margin-bottom: 20px;
  font-size: 1.1em;
  color: #333;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.confirm-ok-btn, .confirm-cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s, color 0.2s;
}

.confirm-ok-btn {
  background-color: #4CAF50;
  color: white;
}

.confirm-ok-btn:hover {
  background-color: #45a049;
}

.confirm-cancel-btn {
  background-color: #f44336;
  color: white;
}

.confirm-cancel-btn:hover {
  background-color: #da190b;
}
</style>