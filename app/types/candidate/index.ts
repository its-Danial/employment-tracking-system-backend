import {
  CANDIDATE_ACTIVITY,
  CANDIDATE_MEDICAL_STATUS,
  CANDIDATE_VISA_STATUS,
} from '#constants/candidate/index'
import { ObjectValues } from '#types/index'

export type CandidateMedicalStatus = ObjectValues<typeof CANDIDATE_MEDICAL_STATUS>

export type CandidateVisaStatus = ObjectValues<typeof CANDIDATE_VISA_STATUS>

export type CandidateActivityType =
  | ObjectValues<Omit<typeof CANDIDATE_ACTIVITY, 'medicalStatus' | 'visaStatus'>>
  | CandidateMedicalStatus
  | CandidateVisaStatus
