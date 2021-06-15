declare global {
  interface Window {
    Buffer: any;
    localforage: any;
  }
}

window.Buffer = Buffer;
