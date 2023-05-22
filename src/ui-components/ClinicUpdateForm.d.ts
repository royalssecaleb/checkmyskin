/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Clinic } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ClinicUpdateFormInputValues = {
    name?: string;
    description?: string;
    active?: boolean;
    rateInAus?: number;
    taxInAus?: number;
    type?: string;
    doctorsID?: string[];
};
export declare type ClinicUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    active?: ValidationFunction<boolean>;
    rateInAus?: ValidationFunction<number>;
    taxInAus?: ValidationFunction<number>;
    type?: ValidationFunction<string>;
    doctorsID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClinicUpdateFormOverridesProps = {
    ClinicUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    active?: PrimitiveOverrideProps<SwitchFieldProps>;
    rateInAus?: PrimitiveOverrideProps<TextFieldProps>;
    taxInAus?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    doctorsID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ClinicUpdateFormProps = React.PropsWithChildren<{
    overrides?: ClinicUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    clinic?: Clinic;
    onSubmit?: (fields: ClinicUpdateFormInputValues) => ClinicUpdateFormInputValues;
    onSuccess?: (fields: ClinicUpdateFormInputValues) => void;
    onError?: (fields: ClinicUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClinicUpdateFormInputValues) => ClinicUpdateFormInputValues;
    onValidate?: ClinicUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ClinicUpdateForm(props: ClinicUpdateFormProps): React.ReactElement;
