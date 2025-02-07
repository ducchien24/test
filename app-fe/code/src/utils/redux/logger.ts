const logger =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  (store: any) => (next: any) => (action: any) => {
    // console.group(action.type);
    // console.info("dispatching", action);
    const result = next(action);
    // console.warn("next state", store.getState());
    // console.groupEnd();
    return result;
  };

export default logger;
