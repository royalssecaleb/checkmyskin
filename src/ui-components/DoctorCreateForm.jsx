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
  SelectField,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Doctor } from "../models";
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
export default function DoctorCreateForm(props) {
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
    firstname: "",
    lastname: "",
    email: "",
    gender: undefined,
    dob: "",
    password: "",
    phone: "",
    address: "",
    bankdetail: "",
    specialised: "",
    status: false,
    checkskinsID: [],
    clinicID: "",
    payRate: "",
  };
  const [firstname, setFirstname] = React.useState(initialValues.firstname);
  const [lastname, setLastname] = React.useState(initialValues.lastname);
  const [email, setEmail] = React.useState(initialValues.email);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [dob, setDob] = React.useState(initialValues.dob);
  const [password, setPassword] = React.useState(initialValues.password);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [address, setAddress] = React.useState(initialValues.address);
  const [bankdetail, setBankdetail] = React.useState(initialValues.bankdetail);
  const [specialised, setSpecialised] = React.useState(
    initialValues.specialised
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [checkskinsID, setCheckskinsID] = React.useState(
    initialValues.checkskinsID
  );
  const [clinicID, setClinicID] = React.useState(initialValues.clinicID);
  const [payRate, setPayRate] = React.useState(initialValues.payRate);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirstname(initialValues.firstname);
    setLastname(initialValues.lastname);
    setEmail(initialValues.email);
    setGender(initialValues.gender);
    setDob(initialValues.dob);
    setPassword(initialValues.password);
    setPhone(initialValues.phone);
    setAddress(initialValues.address);
    setBankdetail(initialValues.bankdetail);
    setSpecialised(initialValues.specialised);
    setStatus(initialValues.status);
    setCheckskinsID(initialValues.checkskinsID);
    setCurrentCheckskinsIDValue("");
    setClinicID(initialValues.clinicID);
    setPayRate(initialValues.payRate);
    setErrors({});
  };
  const [currentCheckskinsIDValue, setCurrentCheckskinsIDValue] =
    React.useState("");
  const checkskinsIDRef = React.createRef();
  const validations = {
    firstname: [{ type: "Required" }],
    lastname: [],
    email: [{ type: "Email" }],
    gender: [],
    dob: [],
    password: [],
    phone: [],
    address: [],
    bankdetail: [],
    specialised: [],
    status: [],
    checkskinsID: [],
    clinicID: [],
    payRate: [],
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
          firstname,
          lastname,
          email,
          gender,
          dob,
          password,
          phone,
          address,
          bankdetail,
          specialised,
          status,
          checkskinsID,
          clinicID,
          payRate,
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
          await DataStore.save(new Doctor(modelFields));
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
      {...getOverrideProps(overrides, "DoctorCreateForm")}
      {...rest}
    >
      <TextField
        label="Firstname"
        isRequired={true}
        isReadOnly={false}
        value={firstname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname: value,
              lastname,
              email,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.firstname ?? value;
          }
          if (errors.firstname?.hasError) {
            runValidationTasks("firstname", value);
          }
          setFirstname(value);
        }}
        onBlur={() => runValidationTasks("firstname", firstname)}
        errorMessage={errors.firstname?.errorMessage}
        hasError={errors.firstname?.hasError}
        {...getOverrideProps(overrides, "firstname")}
      ></TextField>
      <TextField
        label="Lastname"
        isRequired={false}
        isReadOnly={false}
        value={lastname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname: value,
              email,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.lastname ?? value;
          }
          if (errors.lastname?.hasError) {
            runValidationTasks("lastname", value);
          }
          setLastname(value);
        }}
        onBlur={() => runValidationTasks("lastname", lastname)}
        errorMessage={errors.lastname?.errorMessage}
        hasError={errors.lastname?.hasError}
        {...getOverrideProps(overrides, "lastname")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email: value,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <SelectField
        label="Gender"
        placeholder="Please select an option"
        isDisabled={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender: value,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      >
        <option
          children="Male"
          value="MALE"
          {...getOverrideProps(overrides, "genderoption0")}
        ></option>
        <option
          children="Female"
          value="FEMALE"
          {...getOverrideProps(overrides, "genderoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Dob"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dob}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob: value,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.dob ?? value;
          }
          if (errors.dob?.hasError) {
            runValidationTasks("dob", value);
          }
          setDob(value);
        }}
        onBlur={() => runValidationTasks("dob", dob)}
        errorMessage={errors.dob?.errorMessage}
        hasError={errors.dob?.hasError}
        {...getOverrideProps(overrides, "dob")}
      ></TextField>
      <TextField
        label="Password"
        isRequired={false}
        isReadOnly={false}
        value={password}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password: value,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.password ?? value;
          }
          if (errors.password?.hasError) {
            runValidationTasks("password", value);
          }
          setPassword(value);
        }}
        onBlur={() => runValidationTasks("password", password)}
        errorMessage={errors.password?.errorMessage}
        hasError={errors.password?.hasError}
        {...getOverrideProps(overrides, "password")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password,
              phone: value,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password,
              phone,
              address: value,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Bankdetail"
        isRequired={false}
        isReadOnly={false}
        value={bankdetail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail: value,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.bankdetail ?? value;
          }
          if (errors.bankdetail?.hasError) {
            runValidationTasks("bankdetail", value);
          }
          setBankdetail(value);
        }}
        onBlur={() => runValidationTasks("bankdetail", bankdetail)}
        errorMessage={errors.bankdetail?.errorMessage}
        hasError={errors.bankdetail?.hasError}
        {...getOverrideProps(overrides, "bankdetail")}
      ></TextField>
      <TextField
        label="Specialised"
        isRequired={false}
        isReadOnly={false}
        value={specialised}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised: value,
              status,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.specialised ?? value;
          }
          if (errors.specialised?.hasError) {
            runValidationTasks("specialised", value);
          }
          setSpecialised(value);
        }}
        onBlur={() => runValidationTasks("specialised", specialised)}
        errorMessage={errors.specialised?.errorMessage}
        hasError={errors.specialised?.hasError}
        {...getOverrideProps(overrides, "specialised")}
      ></TextField>
      <SwitchField
        label="Status"
        defaultChecked={false}
        isDisabled={false}
        isChecked={status}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status: value,
              checkskinsID,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID: values,
              clinicID,
              payRate,
            };
            const result = onChange(modelFields);
            values = result?.checkskinsID ?? values;
          }
          setCheckskinsID(values);
          setCurrentCheckskinsIDValue("");
        }}
        currentFieldValue={currentCheckskinsIDValue}
        label={"Checkskins id"}
        items={checkskinsID}
        hasError={errors.checkskinsID?.hasError}
        setFieldValue={setCurrentCheckskinsIDValue}
        inputFieldRef={checkskinsIDRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Checkskins id"
          isRequired={false}
          isReadOnly={false}
          value={currentCheckskinsIDValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.checkskinsID?.hasError) {
              runValidationTasks("checkskinsID", value);
            }
            setCurrentCheckskinsIDValue(value);
          }}
          onBlur={() =>
            runValidationTasks("checkskinsID", currentCheckskinsIDValue)
          }
          errorMessage={errors.checkskinsID?.errorMessage}
          hasError={errors.checkskinsID?.hasError}
          ref={checkskinsIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "checkskinsID")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Clinic id"
        isRequired={false}
        isReadOnly={false}
        value={clinicID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID: value,
              payRate,
            };
            const result = onChange(modelFields);
            value = result?.clinicID ?? value;
          }
          if (errors.clinicID?.hasError) {
            runValidationTasks("clinicID", value);
          }
          setClinicID(value);
        }}
        onBlur={() => runValidationTasks("clinicID", clinicID)}
        errorMessage={errors.clinicID?.errorMessage}
        hasError={errors.clinicID?.hasError}
        {...getOverrideProps(overrides, "clinicID")}
      ></TextField>
      <TextField
        label="Pay rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={payRate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              email,
              gender,
              dob,
              password,
              phone,
              address,
              bankdetail,
              specialised,
              status,
              checkskinsID,
              clinicID,
              payRate: value,
            };
            const result = onChange(modelFields);
            value = result?.payRate ?? value;
          }
          if (errors.payRate?.hasError) {
            runValidationTasks("payRate", value);
          }
          setPayRate(value);
        }}
        onBlur={() => runValidationTasks("payRate", payRate)}
        errorMessage={errors.payRate?.errorMessage}
        hasError={errors.payRate?.hasError}
        {...getOverrideProps(overrides, "payRate")}
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
