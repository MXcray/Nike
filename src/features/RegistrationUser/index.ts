import { registerReducer, RegisterSchema } from './model/slices/registerSlice.ts';
import { RegistrationForm } from '@/features/RegistrationUser/ui/RegistrationForm/RegistrationForm.tsx';

export {
    registerReducer,
    RegistrationForm,
    type RegisterSchema,
};
