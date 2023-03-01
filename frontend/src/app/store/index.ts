import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// import signUpReducer from '../cleanerPages/onboarding/Signup/signupSlice';
// import verifyOtp from '../cleanerPages/onboarding/verifyOtp/verifyOtpSlice';
// import resetPasswordReducer from '../cleanerPages/onboarding/resetPassword/resetPasswordSlice';
// import loginReducer from '../common/Login/loginSlice';
// import createPasswordReducer from '../cleanerPages/onboarding/createPassword/createPasswordSlice';
// import emailVerificationReducer from '../cleanerPages/onboarding/forgotPassword/emailVerificationSlice';
// import phoneVerificationReducer from '../cleanerPages/onboarding/forgotPassword/phoneVerificationSlice';

export const store = configureStore({
  reducer: {
    // signup: signUpReducer,
    // otpVerification: verifyOtp,
    // resetPassword: resetPasswordReducer,
    // createPassword: createPasswordReducer,
    // login: loginReducer,
    // emailVerification: emailVerificationReducer,
    // phoneVerification: phoneVerificationReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
