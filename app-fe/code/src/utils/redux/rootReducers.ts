import { combineReducers } from '@reduxjs/toolkit';
import systemReducer from '@/common/systems/systemSlice';

const rootReducer = combineReducers({
  system: systemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
