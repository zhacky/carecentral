export class PhilhealthDto {
  position: number;
  philhealthId: number;
  patFirstName: string;
  patMiddleName: string;
  patLastName: string;
  memFirstName: string;
  memMiddleName: string;
  memLastName: string;
  patPIN: string;
  memPIN: string;
  relationToMember: string;
  patDateOfBirth: string; // ISO string
  memDateOfBirth: string;
  patAge: number;
  patSex: string;
  patHeight: number;
  patWeight: number;
  chiefComplaint: string;
  admittingDiagnosis: string;
  dischargeDiagnosis: string;
  firstCaseRateCode: string;
  secondCaseRateCode: string;
  dateAdmitted: string;
  timeAdmitted: string;
  dateDischarged: string;
  timeDischarged: string;
  patPresentHistoryOfIllness: string;
  patPertinentPastMedicalHistory: string;
  treatmentOutcome: string;
  bloodPressure: string;
  capillaryRefill: string;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  courseInTheWards: string;
  diagnosticFindings: string;
  signAndSymptoms: string[];
  generalSurvey: string[];
  heent: string[];
  lungs: string[];
  cvs: string[];
  abdomen: string[];
  gu: string[];
  extremities: string[];
  neuroExam: string[];

  constructor(
    position: number,
    philhealthId: number,
    patFirstName: string,
    patMiddleName: string,
    patLastName: string,
    memFirstName: string,
    memMiddleName: string,
    memLastName: string,
    patPIN: string,
    memPIN: string,
    relationToMember: string,
    patDateOfBirth: string,
    memDateOfBirth: string,
    patAge: number,
    patSex: string,
    patHeight: number,
    patWeight: number,
    chiefComplaint: string,
    admittingDiagnosis: string,
    dischargeDiagnosis: string,
    firstCaseRateCode: string,
    secondCaseRateCode: string,
    dateAdmitted: string,
    timeAdmitted: string,
    dateDischarged: string,
    timeDischarged: string,
    patPresentHistoryOfIllness: string,
    patPertinentPastMedicalHistory: string,
    treatmentOutcome: string,
    bloodPressure: string,
    capillaryRefill: string,
    heartRate: number,
    respiratoryRate: number,
    temperature: number,
    courseInTheWards: string,
    diagnosticFindings: string,
    signAndSymptoms: string[],
    generalSurvey: string[],
    heent: string[],
    lungs: string[],
    cvs: string[],
    abdomen: string[],
    gu: string[],
    extremities: string[],
    neuroExam: string[]
  ) {
    this.position = position;
    this.philhealthId = philhealthId;
    this.patFirstName = patFirstName;
    this.patMiddleName = patMiddleName;
    this.patLastName = patLastName;
    this.memFirstName = memFirstName;
    this.memMiddleName = memMiddleName;
    this.memLastName = memLastName;
    this.patPIN = patPIN;
    this.memPIN = memPIN;
    this.relationToMember = relationToMember;
    this.patDateOfBirth = patDateOfBirth;
    this.memDateOfBirth = memDateOfBirth;
    this.patAge = patAge;
    this.patSex = patSex;
    this.patHeight = patHeight;
    this.patWeight = patWeight;
    this.chiefComplaint = chiefComplaint;
    this.admittingDiagnosis = admittingDiagnosis;
    this.dischargeDiagnosis = dischargeDiagnosis;
    this.firstCaseRateCode = firstCaseRateCode;
    this.secondCaseRateCode = secondCaseRateCode;
    this.dateAdmitted = dateAdmitted;
    this.timeAdmitted = timeAdmitted;
    this.dateDischarged = dateDischarged;
    this.timeDischarged = timeDischarged;
    this.patPresentHistoryOfIllness = patPresentHistoryOfIllness;
    this.patPertinentPastMedicalHistory = patPertinentPastMedicalHistory;
    this.treatmentOutcome = treatmentOutcome;
    this.bloodPressure = bloodPressure;
    this.capillaryRefill = capillaryRefill;
    this.heartRate = heartRate;
    this.respiratoryRate = respiratoryRate;
    this.temperature = temperature;
    this.courseInTheWards = courseInTheWards;
    this.diagnosticFindings = diagnosticFindings;
    this.signAndSymptoms = signAndSymptoms;
    this.generalSurvey = generalSurvey;
    this.heent = heent;
    this.lungs = lungs;
    this.cvs = cvs;
    this.abdomen = abdomen;
    this.gu = gu;
    this.extremities = extremities;
    this.neuroExam = neuroExam;
  }

  static fromPhilhealth(philhealth: any, position: number): PhilhealthDto {
    return new PhilhealthDto(
      position,
      philhealth.philhealthId,
      philhealth.patFirstName,
      philhealth.patMiddleName,
      philhealth.patLastName,
      philhealth.memFirstName,
      philhealth.memMiddleName,
      philhealth.memLastName,
      philhealth.patPIN,
      philhealth.memPIN,
      philhealth.relationToMember,
      philhealth.patDateOfBirth,
      philhealth.memDateOfBirth,
      philhealth.patAge,
      philhealth.patSex,
      philhealth.patHeight,
      philhealth.patWeight,
      philhealth.chiefComplaint,
      philhealth.admittingDiagnosis,
      philhealth.dischargeDiagnosis,
      philhealth.firstCaseRateCode,
      philhealth.secondCaseRateCode,
      philhealth.dateAdmitted,
      philhealth.timeAdmitted,
      philhealth.dateDischarged,
      philhealth.timeDischarged,
      philhealth.patPresentHistoryOfIllness,
      philhealth.patPertinentPastMedicalHistory,
      philhealth.treatmentOutcome,
      philhealth.bloodPressure,
      philhealth.capillaryRefill,
      philhealth.heartRate,
      philhealth.respiratoryRate,
      philhealth.temperature,
      philhealth.courseInTheWards,
      philhealth.diagnosticFindings,
      philhealth.signAndSymptoms,
      philhealth.generalSurvey,
      philhealth.heent,
      philhealth.lungs,
      philhealth.cvs,
      philhealth.abdomen,
      philhealth.gu,
      philhealth.extremities,
      philhealth.neuroExam
    )
  }
}
