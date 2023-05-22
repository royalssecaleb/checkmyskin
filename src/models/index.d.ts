import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum ClinicType {
  MOLE = "MOLE",
  RASH = "RASH"
}

export enum PaymentStatus {
  PAID = "PAID",
  REFUND = "REFUND",
  COMPLETE = "COMPLETE",
  FINISH = "FINISH"
}

export enum CheckSkinStatus {
  OPENED = "OPENED",
  ANSWERED = "ANSWERED"
}

export enum CheckSkinType {
  MOLE = "MOLE",
  RASH = "RASH"
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

type EagerDoctorResponse = {
  readonly value?: number | null;
  readonly answer?: string | null;
}

type LazyDoctorResponse = {
  readonly value?: number | null;
  readonly answer?: string | null;
}

export declare type DoctorResponse = LazyLoading extends LazyLoadingDisabled ? EagerDoctorResponse : LazyDoctorResponse

export declare const DoctorResponse: (new (init: ModelInit<DoctorResponse>) => DoctorResponse)

type EagerClinic = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Clinic, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly standardResponses?: (DoctorResponse | null)[] | null;
  readonly active?: boolean | null;
  readonly rateInAus?: number | null;
  readonly taxInAus?: number | null;
  readonly type: ClinicType | keyof typeof ClinicType;
  readonly doctorsID?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyClinic = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Clinic, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly standardResponses?: (DoctorResponse | null)[] | null;
  readonly active?: boolean | null;
  readonly rateInAus?: number | null;
  readonly taxInAus?: number | null;
  readonly type: ClinicType | keyof typeof ClinicType;
  readonly doctorsID?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Clinic = LazyLoading extends LazyLoadingDisabled ? EagerClinic : LazyClinic

export declare const Clinic: (new (init: ModelInit<Clinic>) => Clinic) & {
  copyOf(source: Clinic, mutator: (draft: MutableModel<Clinic>) => MutableModel<Clinic> | void): Clinic;
}

type EagerCheckSkin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CheckSkin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly age?: number | null;
  readonly gender?: GenderEnum | keyof typeof GenderEnum | null;
  readonly type?: CheckSkinType | keyof typeof CheckSkinType | null;
  readonly image?: string | null;
  readonly usercode?: string | null;
  readonly checkskinstatus?: CheckSkinStatus | keyof typeof CheckSkinStatus | null;
  readonly long?: string | null;
  readonly melanoma?: string | null;
  readonly dermatologist?: string | null;
  readonly diameter?: number | null;
  readonly factors?: string | null;
  readonly severe?: string | null;
  readonly relevant?: string | null;
  readonly distributed?: string | null;
  readonly rashLocation?: string | null;
  readonly rashType?: string | null;
  readonly symptoms?: string | null;
  readonly doctorAnswer?: number | null;
  readonly payment_id?: string | null;
  readonly payment_status?: PaymentStatus | keyof typeof PaymentStatus | null;
  readonly doctorID?: string | null;
  readonly clinicID?: string | null;
  readonly customer_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCheckSkin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CheckSkin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly age?: number | null;
  readonly gender?: GenderEnum | keyof typeof GenderEnum | null;
  readonly type?: CheckSkinType | keyof typeof CheckSkinType | null;
  readonly image?: string | null;
  readonly usercode?: string | null;
  readonly checkskinstatus?: CheckSkinStatus | keyof typeof CheckSkinStatus | null;
  readonly long?: string | null;
  readonly melanoma?: string | null;
  readonly dermatologist?: string | null;
  readonly diameter?: number | null;
  readonly factors?: string | null;
  readonly severe?: string | null;
  readonly relevant?: string | null;
  readonly distributed?: string | null;
  readonly rashLocation?: string | null;
  readonly rashType?: string | null;
  readonly symptoms?: string | null;
  readonly doctorAnswer?: number | null;
  readonly payment_id?: string | null;
  readonly payment_status?: PaymentStatus | keyof typeof PaymentStatus | null;
  readonly doctorID?: string | null;
  readonly clinicID?: string | null;
  readonly customer_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CheckSkin = LazyLoading extends LazyLoadingDisabled ? EagerCheckSkin : LazyCheckSkin

export declare const CheckSkin: (new (init: ModelInit<CheckSkin>) => CheckSkin) & {
  copyOf(source: CheckSkin, mutator: (draft: MutableModel<CheckSkin>) => MutableModel<CheckSkin> | void): CheckSkin;
}

type EagerDoctor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Doctor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstname: string;
  readonly lastname?: string | null;
  readonly email?: string | null;
  readonly gender?: GenderEnum | keyof typeof GenderEnum | null;
  readonly dob?: string | null;
  readonly password?: string | null;
  readonly phone?: string | null;
  readonly address?: string | null;
  readonly bankdetail?: string | null;
  readonly specialised?: string | null;
  readonly status?: boolean | null;
  readonly checkskinsID?: (string | null)[] | null;
  readonly clinicID?: string | null;
  readonly payRate?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDoctor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Doctor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstname: string;
  readonly lastname?: string | null;
  readonly email?: string | null;
  readonly gender?: GenderEnum | keyof typeof GenderEnum | null;
  readonly dob?: string | null;
  readonly password?: string | null;
  readonly phone?: string | null;
  readonly address?: string | null;
  readonly bankdetail?: string | null;
  readonly specialised?: string | null;
  readonly status?: boolean | null;
  readonly checkskinsID?: (string | null)[] | null;
  readonly clinicID?: string | null;
  readonly payRate?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Doctor = LazyLoading extends LazyLoadingDisabled ? EagerDoctor : LazyDoctor

export declare const Doctor: (new (init: ModelInit<Doctor>) => Doctor) & {
  copyOf(source: Doctor, mutator: (draft: MutableModel<Doctor>) => MutableModel<Doctor> | void): Doctor;
}

type EagerAdmin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Admin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly verifyCode?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAdmin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Admin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username?: string | null;
  readonly password?: string | null;
  readonly verifyCode?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Admin = LazyLoading extends LazyLoadingDisabled ? EagerAdmin : LazyAdmin

export declare const Admin: (new (init: ModelInit<Admin>) => Admin) & {
  copyOf(source: Admin, mutator: (draft: MutableModel<Admin>) => MutableModel<Admin> | void): Admin;
}

type EagerTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly DoctorID?: string | null;
  readonly usercodes?: (string | null)[] | null;
  readonly recept_no?: string | null;
  readonly last_payment_date?: string | null;
  readonly total_amount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly DoctorID?: string | null;
  readonly usercodes?: (string | null)[] | null;
  readonly recept_no?: string | null;
  readonly last_payment_date?: string | null;
  readonly total_amount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Transaction = LazyLoading extends LazyLoadingDisabled ? EagerTransaction : LazyTransaction

export declare const Transaction: (new (init: ModelInit<Transaction>) => Transaction) & {
  copyOf(source: Transaction, mutator: (draft: MutableModel<Transaction>) => MutableModel<Transaction> | void): Transaction;
}