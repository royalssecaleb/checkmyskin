/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Transaction } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function TransactionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    DoctorID: "",
    usercodes: [],
    recept_no: "",
    last_payment_date: "",
    total_amount: "",
  };
  const [DoctorID, setDoctorID] = React.useState(initialValues.DoctorID);
  const [usercodes, setUsercodes] = React.useState(initialValues.usercodes);
  const [recept_no, setRecept_no] = React.useState(initialValues.recept_no);
  const [last_payment_date, setLast_payment_date] = React.useState(
    initialValues.last_payment_date
  );
  const [total_amount, setTotal_amount] = React.useState(
    initialValues.total_amount
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDoctorID(initialValues.DoctorID);
    setUsercodes(initialValues.usercodes);
    setCurrentUsercodesValue("");
    setRecept_no(initialValues.recept_no);
    setLast_payment_date(initialValues.last_payment_date);
    setTotal_amount(initialValues.total_amount);
    setErrors({});
  };
  const [currentUsercodesValue, setCurrentUsercodesValue] = React.useState("");
  const usercodesRef = React.createRef();
  const validations = {
    DoctorID: [],
    usercodes: [],
    recept_no: [],
    last_payment_date: [],
    total_amount: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          DoctorID,
          usercodes,
          recept_no,
          last_payment_date,
          total_amount,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Transaction(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TransactionCreateForm")}
      {...rest}
    >
      <TextField
        label="Doctor id"
        isRequired={false}
        isReadOnly={false}
        value={DoctorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              DoctorID: value,
              usercodes,
              recept_no,
              last_payment_date,
              total_amount,
            };
            const result = onChange(modelFields);
            value = result?.DoctorID ?? value;
          }
          if (errors.DoctorID?.hasError) {
            runValidationTasks("DoctorID", value);
          }
          setDoctorID(value);
        }}
        onBlur={() => runValidationTasks("DoctorID", DoctorID)}
        errorMessage={errors.DoctorID?.errorMessage}
        hasError={errors.DoctorID?.hasError}
        {...getOverrideProps(overrides, "DoctorID")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              DoctorID,
              usercodes: values,
              recept_no,
              last_payment_date,
              total_amount,
            };
            const result = onChange(modelFields);
            values = result?.usercodes ?? values;
          }
          setUsercodes(values);
          setCurrentUsercodesValue("");
        }}
        currentFieldValue={currentUsercodesValue}
        label={"Usercodes"}
        items={usercodes}
        hasError={errors.usercodes?.hasError}
        setFieldValue={setCurrentUsercodesValue}
        inputFieldRef={usercodesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Usercodes"
          isRequired={false}
          isReadOnly={false}
          value={currentUsercodesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.usercodes?.hasError) {
              runValidationTasks("usercodes", value);
            }
            setCurrentUsercodesValue(value);
          }}
          onBlur={() => runValidationTasks("usercodes", currentUsercodesValue)}
          errorMessage={errors.usercodes?.errorMessage}
          hasError={errors.usercodes?.hasError}
          ref={usercodesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "usercodes")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Recept no"
        isRequired={false}
        isReadOnly={false}
        value={recept_no}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              DoctorID,
              usercodes,
              recept_no: value,
              last_payment_date,
              total_amount,
            };
            const result = onChange(modelFields);
            value = result?.recept_no ?? value;
          }
          if (errors.recept_no?.hasError) {
            runValidationTasks("recept_no", value);
          }
          setRecept_no(value);
        }}
        onBlur={() => runValidationTasks("recept_no", recept_no)}
        errorMessage={errors.recept_no?.errorMessage}
        hasError={errors.recept_no?.hasError}
        {...getOverrideProps(overrides, "recept_no")}
      ></TextField>
      <TextField
        label="Last payment date"
        isRequired={false}
        isReadOnly={false}
        value={last_payment_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              DoctorID,
              usercodes,
              recept_no,
              last_payment_date: value,
              total_amount,
            };
            const result = onChange(modelFields);
            value = result?.last_payment_date ?? value;
          }
          if (errors.last_payment_date?.hasError) {
            runValidationTasks("last_payment_date", value);
          }
          setLast_payment_date(value);
        }}
        onBlur={() =>
          runValidationTasks("last_payment_date", last_payment_date)
        }
        errorMessage={errors.last_payment_date?.errorMessage}
        hasError={errors.last_payment_date?.hasError}
        {...getOverrideProps(overrides, "last_payment_date")}
      ></TextField>
      <TextField
        label="Total amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={total_amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              DoctorID,
              usercodes,
              recept_no,
              last_payment_date,
              total_amount: value,
            };
            const result = onChange(modelFields);
            value = result?.total_amount ?? value;
          }
          if (errors.total_amount?.hasError) {
            runValidationTasks("total_amount", value);
          }
          setTotal_amount(value);
        }}
        onBlur={() => runValidationTasks("total_amount", total_amount)}
        errorMessage={errors.total_amount?.errorMessage}
        hasError={errors.total_amount?.hasError}
        {...getOverrideProps(overrides, "total_amount")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
