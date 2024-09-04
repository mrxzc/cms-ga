export interface IAssessmentList {
  assessmentId: number
  year: number
  quarter: number
}

export interface IAssessmentMaster {
  id: number
  name: string
  createdDate: string
}

export interface IAssessment {
  id: number
  label: string
  criteria: {
    id: number
    name: string
    description: string
  }
}

export interface IAssessmentData {
  quarter: number
  year: number
  dtUpload: string
  assessmentMaster: IAssessmentMaster
  assessments: IAssessment[]
}

export interface IAssessmentDataParams {
  year: number | null | undefined
  quarter: number | null | undefined
}

export interface IInsertAssessmentCriteriaPayload {
  assessmentId: number
  criteriaName: string
}

export interface IUpdateAssessmentCriteriaPayload {
  criteriaId: number
  criteriaName: string
}

export interface IDeleteAssessmentCriteriaPayload {
  criteriaId: number
}

export interface IAssessmentCriteriaResponse {
  criteriaId: number
  criteriaName: string
}
