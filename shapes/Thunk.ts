import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  any,
  unknown,
  Action<string>
>