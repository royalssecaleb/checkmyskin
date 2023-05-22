/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TransactionCreateFormInputValues = {
    DoctorID?: string;
    usercodes?: string[];
    recept_no?: string;
    last_payment_date?: string;
    total_amount?: number;
};
export declare type TransactionCreateFormValidationValues = {
    DoctorID?: ValidationFunction<string>;
    usercodes?: ValidationFunction<string>;
    recept_no?: ValidationFunction<string>;
    last_payment_date?: ValidationFunction<string>;
    total_amount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransactionCreateFormOverridesProps = {
    TransactionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    DoctorID?: PrimitiveOverrideProps<TextFieldProps>;
    usercodes?: PrimitiveOverrideProps<TextFieldProps>;
    recept_no?: PrimitiveOverrideProps<TextFieldProps>;
    last_payment_date?: PrimitiveOverrideProps<TextFieldProps>;
    total_amount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TransactionCreateFormProps = React.PropsWithChildren<{
    overrides?: TransactionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TransactionCreateFormInputValues) => TransactionCreateFormInputValues;
    onSuccess?: (fields: TransactionCreateFormInputValues) => void;
    onError?: (fields: TransactionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransactionCreateFormInputValues) => TransactionCreateFormInputValues;
    onValidate?: TransactionCreateFormValidationValues;
} & React.CSSProperties>;
export default function TransactionCreateForm(props: TransactionCreateFormProps): React.ReactElement;
