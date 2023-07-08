class CustomEventHandler extends EventTarget {
  subscribe(eventName, cb) {
    window.addEventListener(eventName, cb);
  }

  unsubscribe(eventName, cb) {
    window.removeEventListener(eventName, cb);
  }

  emit(eventName, payload) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
  }
}

export const EventHandler = new CustomEventHandler();
