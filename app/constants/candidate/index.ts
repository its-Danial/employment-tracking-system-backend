export const CANDIDATE_MEDICAL_STATUS = {
  fit: 'fit',
  unfit: 'unfit',
  pending: 'pending',
} as const

export const CANDIDATE_VISA_STATUS = {
  pending: 'pending',
  issued: 'issued',
  rejected: 'rejected',
} as const

export const CANDIDATE_ACTIVITY = {
  medicalStatus: CANDIDATE_MEDICAL_STATUS,
  eNumberIssued: 'e_number_issued',
  dropboxSubmitted: 'dropbox_submitted',
  visaStatus: CANDIDATE_VISA_STATUS,
  flightBooked: 'flight_booked',
  traveled: 'traveled',
} as const
