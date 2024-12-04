class GameplayRecorder {
  constructor() {
    this.recording = false;
    this.data = [];
  }

  startRecording() {
    this.recording = true;
    this.data = [];
    console.log('Recording started...');
  }

  stopRecording() {
    this.recording = false;
    console.log('Recording stopped.');
  }

  captureData(frame) {
    if (this.recording) {
      this.data.push(frame);
    }
  }

  saveData() {
    const blob = new Blob([JSON.stringify(this.data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gameplay_record.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}