// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ClinicType = {
  "MOLE": "MOLE",
  "RASH": "RASH"
};

const PaymentStatus = {
  "PAID": "PAID",
  "REFUND": "REFUND",
  "COMPLETE": "COMPLETE",
  "FINISH": "FINISH"
};

const CheckSkinStatus = {
  "OPENED": "OPENED",
  "ANSWERED": "ANSWERED"
};

const CheckSkinType = {
  "MOLE": "MOLE",
  "RASH": "RASH"
};

const GenderEnum = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const { Clinic, CheckSkin, Doctor, Admin, Transaction, DoctorResponse } = initSchema(schema);

export {
  Clinic,
  CheckSkin,
  Doctor,
  Admin,
  Transaction,
  ClinicType,
  PaymentStatus,
  CheckSkinStatus,
  CheckSkinType,
  GenderEnum,
  DoctorResponse
};