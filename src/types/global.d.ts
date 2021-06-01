declare global {
  interface Window {
    Buffer: any;
    bob: any;
    vvv: any;
    keypair: any;
    KP: any;
    localforage: any;
  }
}

window.Buffer = Buffer;
