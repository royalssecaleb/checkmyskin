/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CheckSkin } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CheckSkinUpdateFormInputValues = {
    email?: string;
    age?: number;
    gender?: string;
    type?: string;
    image?: string;
    usercode?: string;
    checkskinstatus?: string;
    long?: string;
    melanoma?: string;
    dermatologist?: string;
    diameter?: number;
    factors?: string;
    severe?: string;
    relevant?: string;
    distributed?: string;
    rashLocation?: string;
    rashType?: string;
    symptoms?: string;
    doctorAnswer?: number;
    payment_id?: string;
    payment_status?: string;
    doctorID?: string;
    clinicID?: string;
    customer_id?: string;
};
export declare type CheckSkinUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    age?: ValidationFunction<number>;
    gender?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    usercode?: ValidationFunction<string>;
    checkskinstatus?: ValidationFunction<string>;
    long?: ValidationFunction<string>;
    melanoma?: ValidationFunction<string>;
    dermatologist?: ValidationFunction<string>;
    diameter?: ValidationFunction<number>;
    factors?: ValidationFunction<string>;
    severe?: ValidationFunction<string>;
    relevant?: ValidationFunction<string>;
    distributed?: ValidationFunction<string>;
    rashLocation?: ValidationFunction<string>;
    rashType?: ValidationFunction<string>;
    symptoms?: ValidationFunction<string>;
    doctorAnswer?: ValidationFunction<number>;
    payment_id?: ValidationFunction<string>;
    payment_status?: ValidationFunction<string>;
    doctorID?: ValidationFunction<string>;
    clinicID?: ValidationFunction<string>;
    customer_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CheckSkinUpdateFormOverridesProps = {
    CheckSkinUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<SelectFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    usercode?: PrimitiveOverrideProps<TextFieldProps>;
    checkskinstatus?: PrimitiveOverrideProps<SelectFieldProps>;
    long?: PrimitiveOverrideProps<TextFieldProps>;
    melanoma?: PrimitiveOverrideProps<TextFieldProps>;
    dermatologist?: PrimitiveOverrideProps<TextFieldProps>;
    diameter?: PrimitiveOverrideProps<TextFieldProps>;
    factors?: PrimitiveOverrideProps<TextAreaFieldProps>;
    severe?: PrimitiveOverrideProps<TextFieldProps>;
    relevant?: PrimitiveOverrideProps<TextFieldProps>;
    distributed?: PrimitiveOverrideProps<TextAreaFieldProps>;
    rashLocation?: PrimitiveOverrideProps<TextAreaFieldProps>;
    rashType?: PrimitiveOverrideProps<TextAreaFieldProps>;
    symptoms?: PrimitiveOverrideProps<TextAreaFieldProps>;
    doctorAnswer?: PrimitiveOverrideProps<TextFieldProps>;
    payment_id?: PrimitiveOverrideProps<TextFieldProps>;
    payment_status?: PrimitiveOverrideProps<SelectFieldProps>;
    doctorID?: PrimitiveOverrideProps<TextFieldProps>;
    clinicID?: PrimitiveOverrideProps<TextFieldProps>;
    customer_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CheckSkinUpdateFormProps = React.PropsWithChildren<{
    overrides?: CheckSkinUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    checkSkin?: CheckSkin;
    onSubmit?: (fields: CheckSkinUpdateFormInputValues) => CheckSkinUpdateFormInputValues;
    onSuccess?: (fields: CheckSkinUpdateFormInputValues) => void;
    onError?: (fields: CheckSkinUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CheckSkinUpdateFormInputValues) => CheckSkinUpdateFormInputValues;
    onValidate?: CheckSkinUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CheckSkinUpdateForm(props: CheckSkinUpdateFormProps): React.ReactElement;
