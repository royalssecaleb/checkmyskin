/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DoctorCreateFormInputValues = {
    firstname?: string;
    lastname?: string;
    email?: string;
    gender?: string;
    dob?: string;
    password?: string;
    phone?: string;
    address?: string;
    bankdetail?: string;
    specialised?: string;
    status?: boolean;
    checkskinsID?: string[];
    clinicID?: string;
    payRate?: number;
};
export declare type DoctorCreateFormValidationValues = {
    firstname?: ValidationFunction<string>;
    lastname?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    dob?: ValidationFunction<string>;
    password?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    bankdetail?: ValidationFunction<string>;
    specialised?: ValidationFunction<string>;
    status?: ValidationFunction<boolean>;
    checkskinsID?: ValidationFunction<string>;
    clinicID?: ValidationFunction<string>;
    payRate?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DoctorCreateFormOverridesProps = {
    DoctorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstname?: PrimitiveOverrideProps<TextFieldProps>;
    lastname?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<SelectFieldProps>;
    dob?: PrimitiveOverrideProps<TextFieldProps>;
    password?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    bankdetail?: PrimitiveOverrideProps<TextFieldProps>;
    specialised?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SwitchFieldProps>;
    checkskinsID?: PrimitiveOverrideProps<TextFieldProps>;
    clinicID?: PrimitiveOverrideProps<TextFieldProps>;
    payRate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DoctorCreateFormProps = React.PropsWithChildren<{
    overrides?: DoctorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DoctorCreateFormInputValues) => DoctorCreateFormInputValues;
    onSuccess?: (fields: DoctorCreateFormInputValues) => void;
    onError?: (fields: DoctorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DoctorCreateFormInputValues) => DoctorCreateFormInputValues;
    onValidate?: DoctorCreateFormValidationValues;
} & React.CSSProperties>;
export default function DoctorCreateForm(props: DoctorCreateFormProps): React.ReactElement;
