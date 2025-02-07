import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import loginService from '@/services/loginService';
import { some } from '@/utils/constants/types';
import { useAppSelector } from '@/utils/hook/redux';
import { RootState } from '@/utils/redux/store';

export interface SystemState {
  locale: string;
  user: some | null;
  screenSize: IScreenSize;
}

export interface IScreenSize {
  width: number;
  height: number;
}

const initScreenSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const initialState: SystemState = {
  locale: 'vi',
  user: null,
  screenSize: initScreenSize,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<some>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      loginService.logout();
      state.user = null;
    },
    updateScreenSize: (state, action: PayloadAction<IScreenSize>) => {
      state.screenSize = action.payload;
    },
  },
});

export const { setLocale, logout, setUserInfo, updateScreenSize } = systemSlice.actions;

export const selectUser = (state: RootState) => state.system.user;

export const useScreenWidth = () => useAppSelector((state) => state.system?.screenSize?.width);

const systemReducer = systemSlice.reducer;
export default systemReducer;
