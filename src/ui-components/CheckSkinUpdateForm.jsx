/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { CheckSkin } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CheckSkinUpdateForm(props) {
  const {
    id: idProp,
    checkSkin,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    email: "",
    age: "",
    gender: undefined,
    type: undefined,
    image: "",
    usercode: "",
    checkskinstatus: undefined,
    long: "",
    melanoma: "",
    dermatologist: "",
    diameter: "",
    factors: "",
    severe: "",
    relevant: "",
    distributed: "",
    rashLocation: "",
    rashType: "",
    symptoms: "",
    doctorAnswer: "",
    payment_id: "",
    payment_status: undefined,
    doctorID: "",
    clinicID: "",
    customer_id: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [age, setAge] = React.useState(initialValues.age);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [type, setType] = React.useState(initialValues.type);
  const [image, setImage] = React.useState(initialValues.image);
  const [usercode, setUsercode] = React.useState(initialValues.usercode);
  const [checkskinstatus, setCheckskinstatus] = React.useState(
    initialValues.checkskinstatus
  );
  const [long, setLong] = React.useState(initialValues.long);
  const [melanoma, setMelanoma] = React.useState(initialValues.melanoma);
  const [dermatologist, setDermatologist] = React.useState(
    initialValues.dermatologist
  );
  const [diameter, setDiameter] = React.useState(initialValues.diameter);
  const [factors, setFactors] = React.useState(initialValues.factors);
  const [severe, setSevere] = React.useState(initialValues.severe);
  const [relevant, setRelevant] = React.useState(initialValues.relevant);
  const [distributed, setDistributed] = React.useState(
    initialValues.distributed
  );
  const [rashLocation, setRashLocation] = React.useState(
    initialValues.rashLocation
  );
  const [rashType, setRashType] = React.useState(initialValues.rashType);
  const [symptoms, setSymptoms] = React.useState(initialValues.symptoms);
  const [doctorAnswer, setDoctorAnswer] = React.useState(
    initialValues.doctorAnswer
  );
  const [payment_id, setPayment_id] = React.useState(initialValues.payment_id);
  const [payment_status, setPayment_status] = React.useState(
    initialValues.payment_status
  );
  const [doctorID, setDoctorID] = React.useState(initialValues.doctorID);
  const [clinicID, setClinicID] = React.useState(initialValues.clinicID);
  const [customer_id, setCustomer_id] = React.useState(
    initialValues.customer_id
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = checkSkinRecord
      ? { ...initialValues, ...checkSkinRecord }
      : initialValues;
    setEmail(cleanValues.email);
    setAge(cleanValues.age);
    setGender(cleanValues.gender);
    setType(cleanValues.type);
    setImage(cleanValues.image);
    setUsercode(cleanValues.usercode);
    setCheckskinstatus(cleanValues.checkskinstatus);
    setLong(cleanValues.long);
    setMelanoma(cleanValues.melanoma);
    setDermatologist(cleanValues.dermatologist);
    setDiameter(cleanValues.diameter);
    setFactors(
      typeof cleanValues.factors === "string"
        ? cleanValues.factors
        : JSON.stringify(cleanValues.factors)
    );
    setSevere(cleanValues.severe);
    setRelevant(cleanValues.relevant);
    setDistributed(
      typeof cleanValues.distributed === "string"
        ? cleanValues.distributed
        : JSON.stringify(cleanValues.distributed)
    );
    setRashLocation(
      typeof cleanValues.rashLocation === "string"
        ? cleanValues.rashLocation
        : JSON.stringify(cleanValues.rashLocation)
    );
    setRashType(
      typeof cleanValues.rashType === "string"
        ? cleanValues.rashType
        : JSON.stringify(cleanValues.rashType)
    );
    setSymptoms(
      typeof cleanValues.symptoms === "string"
        ? cleanValues.symptoms
        : JSON.stringify(cleanValues.symptoms)
    );
    setDoctorAnswer(cleanValues.doctorAnswer);
    setPayment_id(cleanValues.payment_id);
    setPayment_status(cleanValues.payment_status);
    setDoctorID(cleanValues.doctorID);
    setClinicID(cleanValues.clinicID);
    setCustomer_id(cleanValues.customer_id);
    setErrors({});
  };
  const [checkSkinRecord, setCheckSkinRecord] = React.useState(checkSkin);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(CheckSkin, idProp)
        : checkSkin;
      setCheckSkinRecord(record);
    };
    queryData();
  }, [idProp, checkSkin]);
  React.useEffect(resetStateValues, [checkSkinRecord]);
  const validations = {
    email: [{ type: "Email" }],
    age: [],
    gender: [],
    type: [],
    image: [],
    usercode: [],
    checkskinstatus: [],
    long: [],
    melanoma: [],
    dermatologist: [],
    diameter: [],
    factors: [{ type: "JSON" }],
    severe: [],
    relevant: [],
    distributed: [{ type: "JSON" }],
    rashLocation: [{ type: "JSON" }],
    rashType: [{ type: "JSON" }],
    symptoms: [{ type: "JSON" }],
    doctorAnswer: [],
    payment_id: [],
    payment_status: [],
    doctorID: [],
    clinicID: [],
    customer_id: [],
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
          email,
          age,
          gender,
          type,
          image,
          usercode,
          checkskinstatus,
          long,
          melanoma,
          dermatologist,
          diameter,
          factors,
          severe,
          relevant,
          distributed,
          rashLocation,
          rashType,
          symptoms,
          doctorAnswer,
          payment_id,
          payment_status,
          doctorID,
          clinicID,
          customer_id,
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
          await DataStore.save(
            CheckSkin.copyOf(checkSkinRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CheckSkinUpdateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
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
      <TextField
        label="Age"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              email,
              age: value,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
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
              email,
              age,
              gender: value,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
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
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type: value,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Mole"
          value="MOLE"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Rash"
          value="RASH"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image: value,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Usercode"
        isRequired={false}
        isReadOnly={false}
        value={usercode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode: value,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.usercode ?? value;
          }
          if (errors.usercode?.hasError) {
            runValidationTasks("usercode", value);
          }
          setUsercode(value);
        }}
        onBlur={() => runValidationTasks("usercode", usercode)}
        errorMessage={errors.usercode?.errorMessage}
        hasError={errors.usercode?.hasError}
        {...getOverrideProps(overrides, "usercode")}
      ></TextField>
      <SelectField
        label="Checkskinstatus"
        placeholder="Please select an option"
        isDisabled={false}
        value={checkskinstatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus: value,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.checkskinstatus ?? value;
          }
          if (errors.checkskinstatus?.hasError) {
            runValidationTasks("checkskinstatus", value);
          }
          setCheckskinstatus(value);
        }}
        onBlur={() => runValidationTasks("checkskinstatus", checkskinstatus)}
        errorMessage={errors.checkskinstatus?.errorMessage}
        hasError={errors.checkskinstatus?.hasError}
        {...getOverrideProps(overrides, "checkskinstatus")}
      >
        <option
          children="Opened"
          value="OPENED"
          {...getOverrideProps(overrides, "checkskinstatusoption0")}
        ></option>
        <option
          children="Answered"
          value="ANSWERED"
          {...getOverrideProps(overrides, "checkskinstatusoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Long"
        isRequired={false}
        isReadOnly={false}
        value={long}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long: value,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.long ?? value;
          }
          if (errors.long?.hasError) {
            runValidationTasks("long", value);
          }
          setLong(value);
        }}
        onBlur={() => runValidationTasks("long", long)}
        errorMessage={errors.long?.errorMessage}
        hasError={errors.long?.hasError}
        {...getOverrideProps(overrides, "long")}
      ></TextField>
      <TextField
        label="Melanoma"
        isRequired={false}
        isReadOnly={false}
        value={melanoma}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma: value,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.melanoma ?? value;
          }
          if (errors.melanoma?.hasError) {
            runValidationTasks("melanoma", value);
          }
          setMelanoma(value);
        }}
        onBlur={() => runValidationTasks("melanoma", melanoma)}
        errorMessage={errors.melanoma?.errorMessage}
        hasError={errors.melanoma?.hasError}
        {...getOverrideProps(overrides, "melanoma")}
      ></TextField>
      <TextField
        label="Dermatologist"
        isRequired={false}
        isReadOnly={false}
        value={dermatologist}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist: value,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.dermatologist ?? value;
          }
          if (errors.dermatologist?.hasError) {
            runValidationTasks("dermatologist", value);
          }
          setDermatologist(value);
        }}
        onBlur={() => runValidationTasks("dermatologist", dermatologist)}
        errorMessage={errors.dermatologist?.errorMessage}
        hasError={errors.dermatologist?.hasError}
        {...getOverrideProps(overrides, "dermatologist")}
      ></TextField>
      <TextField
        label="Diameter"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={diameter}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter: value,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.diameter ?? value;
          }
          if (errors.diameter?.hasError) {
            runValidationTasks("diameter", value);
          }
          setDiameter(value);
        }}
        onBlur={() => runValidationTasks("diameter", diameter)}
        errorMessage={errors.diameter?.errorMessage}
        hasError={errors.diameter?.hasError}
        {...getOverrideProps(overrides, "diameter")}
      ></TextField>
      <TextAreaField
        label="Factors"
        isRequired={false}
        isReadOnly={false}
        value={factors}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors: value,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.factors ?? value;
          }
          if (errors.factors?.hasError) {
            runValidationTasks("factors", value);
          }
          setFactors(value);
        }}
        onBlur={() => runValidationTasks("factors", factors)}
        errorMessage={errors.factors?.errorMessage}
        hasError={errors.factors?.hasError}
        {...getOverrideProps(overrides, "factors")}
      ></TextAreaField>
      <TextField
        label="Severe"
        isRequired={false}
        isReadOnly={false}
        value={severe}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe: value,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.severe ?? value;
          }
          if (errors.severe?.hasError) {
            runValidationTasks("severe", value);
          }
          setSevere(value);
        }}
        onBlur={() => runValidationTasks("severe", severe)}
        errorMessage={errors.severe?.errorMessage}
        hasError={errors.severe?.hasError}
        {...getOverrideProps(overrides, "severe")}
      ></TextField>
      <TextField
        label="Relevant"
        isRequired={false}
        isReadOnly={false}
        value={relevant}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant: value,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.relevant ?? value;
          }
          if (errors.relevant?.hasError) {
            runValidationTasks("relevant", value);
          }
          setRelevant(value);
        }}
        onBlur={() => runValidationTasks("relevant", relevant)}
        errorMessage={errors.relevant?.errorMessage}
        hasError={errors.relevant?.hasError}
        {...getOverrideProps(overrides, "relevant")}
      ></TextField>
      <TextAreaField
        label="Distributed"
        isRequired={false}
        isReadOnly={false}
        value={distributed}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed: value,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.distributed ?? value;
          }
          if (errors.distributed?.hasError) {
            runValidationTasks("distributed", value);
          }
          setDistributed(value);
        }}
        onBlur={() => runValidationTasks("distributed", distributed)}
        errorMessage={errors.distributed?.errorMessage}
        hasError={errors.distributed?.hasError}
        {...getOverrideProps(overrides, "distributed")}
      ></TextAreaField>
      <TextAreaField
        label="Rash location"
        isRequired={false}
        isReadOnly={false}
        value={rashLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation: value,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.rashLocation ?? value;
          }
          if (errors.rashLocation?.hasError) {
            runValidationTasks("rashLocation", value);
          }
          setRashLocation(value);
        }}
        onBlur={() => runValidationTasks("rashLocation", rashLocation)}
        errorMessage={errors.rashLocation?.errorMessage}
        hasError={errors.rashLocation?.hasError}
        {...getOverrideProps(overrides, "rashLocation")}
      ></TextAreaField>
      <TextAreaField
        label="Rash type"
        isRequired={false}
        isReadOnly={false}
        value={rashType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType: value,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.rashType ?? value;
          }
          if (errors.rashType?.hasError) {
            runValidationTasks("rashType", value);
          }
          setRashType(value);
        }}
        onBlur={() => runValidationTasks("rashType", rashType)}
        errorMessage={errors.rashType?.errorMessage}
        hasError={errors.rashType?.hasError}
        {...getOverrideProps(overrides, "rashType")}
      ></TextAreaField>
      <TextAreaField
        label="Symptoms"
        isRequired={false}
        isReadOnly={false}
        value={symptoms}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms: value,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.symptoms ?? value;
          }
          if (errors.symptoms?.hasError) {
            runValidationTasks("symptoms", value);
          }
          setSymptoms(value);
        }}
        onBlur={() => runValidationTasks("symptoms", symptoms)}
        errorMessage={errors.symptoms?.errorMessage}
        hasError={errors.symptoms?.hasError}
        {...getOverrideProps(overrides, "symptoms")}
      ></TextAreaField>
      <TextField
        label="Doctor answer"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={doctorAnswer}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer: value,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.doctorAnswer ?? value;
          }
          if (errors.doctorAnswer?.hasError) {
            runValidationTasks("doctorAnswer", value);
          }
          setDoctorAnswer(value);
        }}
        onBlur={() => runValidationTasks("doctorAnswer", doctorAnswer)}
        errorMessage={errors.doctorAnswer?.errorMessage}
        hasError={errors.doctorAnswer?.hasError}
        {...getOverrideProps(overrides, "doctorAnswer")}
      ></TextField>
      <TextField
        label="Payment id"
        isRequired={false}
        isReadOnly={false}
        value={payment_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id: value,
              payment_status,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.payment_id ?? value;
          }
          if (errors.payment_id?.hasError) {
            runValidationTasks("payment_id", value);
          }
          setPayment_id(value);
        }}
        onBlur={() => runValidationTasks("payment_id", payment_id)}
        errorMessage={errors.payment_id?.errorMessage}
        hasError={errors.payment_id?.hasError}
        {...getOverrideProps(overrides, "payment_id")}
      ></TextField>
      <SelectField
        label="Payment status"
        placeholder="Please select an option"
        isDisabled={false}
        value={payment_status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status: value,
              doctorID,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.payment_status ?? value;
          }
          if (errors.payment_status?.hasError) {
            runValidationTasks("payment_status", value);
          }
          setPayment_status(value);
        }}
        onBlur={() => runValidationTasks("payment_status", payment_status)}
        errorMessage={errors.payment_status?.errorMessage}
        hasError={errors.payment_status?.hasError}
        {...getOverrideProps(overrides, "payment_status")}
      >
        <option
          children="Paid"
          value="PAID"
          {...getOverrideProps(overrides, "payment_statusoption0")}
        ></option>
        <option
          children="Refund"
          value="REFUND"
          {...getOverrideProps(overrides, "payment_statusoption1")}
        ></option>
        <option
          children="Complete"
          value="COMPLETE"
          {...getOverrideProps(overrides, "payment_statusoption2")}
        ></option>
        <option
          children="Finish"
          value="FINISH"
          {...getOverrideProps(overrides, "payment_statusoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Doctor id"
        isRequired={false}
        isReadOnly={false}
        value={doctorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID: value,
              clinicID,
              customer_id,
            };
            const result = onChange(modelFields);
            value = result?.doctorID ?? value;
          }
          if (errors.doctorID?.hasError) {
            runValidationTasks("doctorID", value);
          }
          setDoctorID(value);
        }}
        onBlur={() => runValidationTasks("doctorID", doctorID)}
        errorMessage={errors.doctorID?.errorMessage}
        hasError={errors.doctorID?.hasError}
        {...getOverrideProps(overrides, "doctorID")}
      ></TextField>
      <TextField
        label="Clinic id"
        isRequired={false}
        isReadOnly={false}
        value={clinicID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID: value,
              customer_id,
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
        label="Customer id"
        isRequired={false}
        isReadOnly={false}
        value={customer_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              age,
              gender,
              type,
              image,
              usercode,
              checkskinstatus,
              long,
              melanoma,
              dermatologist,
              diameter,
              factors,
              severe,
              relevant,
              distributed,
              rashLocation,
              rashType,
              symptoms,
              doctorAnswer,
              payment_id,
              payment_status,
              doctorID,
              clinicID,
              customer_id: value,
            };
            const result = onChange(modelFields);
            value = result?.customer_id ?? value;
          }
          if (errors.customer_id?.hasError) {
            runValidationTasks("customer_id", value);
          }
          setCustomer_id(value);
        }}
        onBlur={() => runValidationTasks("customer_id", customer_id)}
        errorMessage={errors.customer_id?.errorMessage}
        hasError={errors.customer_id?.hasError}
        {...getOverrideProps(overrides, "customer_id")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || checkSkin)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || checkSkin) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
