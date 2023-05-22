/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UntitledModelCreateFormInputValues = {};
export declare type UntitledModelCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UntitledModelCreateFormOverridesProps = {
    UntitledModelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type UntitledModelCreateFormProps = React.PropsWithChildren<{
    overrides?: UntitledModelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UntitledModelCreateFormInputValues) => UntitledModelCreateFormInputValues;
    onSuccess?: (fields: UntitledModelCreateFormInputValues) => void;
    onError?: (fields: UntitledModelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UntitledModelCreateFormInputValues) => UntitledModelCreateFormInputValues;
    onValidate?: UntitledModelCreateFormValidationValues;
} & React.CSSProperties>;
export default function UntitledModelCreateForm(props: UntitledModelCreateFormProps): React.ReactElement;
