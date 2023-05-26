import type { DateType } from "../../types";

export type PeopleHRAPIError = {
  error: {
    code: number,
    message: string,
  }
};

export type Employee = {
  "EmployeeId": {
    "DisplayValue": string, // "PW3",
    "FieldHistory": []
  },
  "Title": {
    "DisplayValue": string,
    "FieldHistory": []
  },
  "FirstName": {
    "DisplayValue": string, // "Ilia",
    "FieldHistory": []
  },
  "LastName": {
    "DisplayValue": string, // "Makarov",
    "FieldHistory": []
  },
  "OtherName": {
    "DisplayValue": string,
    "FieldHistory": []
  },
  "KnownAs": {
    "DisplayValue": string,
    "FieldHistory": []
  },
  "EmailId": {
    "DisplayValue": string, // "xzpawnx@gmail.com",
    "FieldHistory": []
  },
  "StartDate": {
    "DisplayValue": string, // "2022-05-09",
    "FieldHistory": []
  },
  "DateOfBirth": {
    "DisplayValue": string, // "1986-12-23",
    "FieldHistory": []
  },
  "JobRole": {
    "DisplayValue": string, // "Frontend Developer",
    "FieldHistoryForJobRole": []
  },
  "Company": {
    "DisplayValue": string, // "Deskpro Labs Apps",
    "FieldHistoryForEffectiveDate": []
  },
  "CompanyEffectiveDate": {
    "DisplayValue": string, // "2023-01-01"
  },
  "Location": {
    "DisplayValue": string, // "Head Office",
    "FieldHistoryForEffectiveDate": []
  },
  "LocationEffectiveDate": {
    "DisplayValue": string
  },
  "Department": {
    "DisplayValue": string, // "RND",
    "FieldHistoryForEffectiveDate": []
  },
  "DepartmentEffectiveDate": {
    "DisplayValue": string, // "2023-01-01"
  },
  "JobRoleChangeDate": {
    "DisplayValue": string, // "2022-05-09"
  },
  "ReportsTo": {
    "DisplayValue": string, // "Cormac McCarthy",
    "FieldHistoryForEffectiveDate": []
  },
  "ReportsToEffectiveDate": {
    "DisplayValue": string, // "2022-05-09"
  },
  "ReportsToEmployeeId": {
    "DisplayValue": string, // "PW5"
  },
  "ReportsToEmailAddress": {
    "DisplayValue": string, // "cormac.mccarthy@example.org"
  },
  "NISNumber": {
    "DisplayValue": string,
    "FieldHistory": []
  },
  "Nationality": {
    "DisplayValue": string,
    "FieldHistory": []
  },
  "EmploymentType": {
    "DisplayValue": string, // "Full Time",
    "FieldHistoryForEffectiveDate": []
  },
  "EmploymentTypeEffectiveDate": {
    "DisplayValue": string // "2022-05-09"
  },
  "EmployeeStatus": {
    "DisplayValue": string, // "1"
  },
  "HolidayAllowanceDays": {
    "DisplayValue": string // "30.00"
  },
  "HolidayAllowanceMins": {
    "DisplayValue": string, // "13500"
  },
  "NoticePeriod": {
    "DisplayValue": string,
    "FieldHistory": []
  },
  "ProbationEndDate": {
    "DisplayValue": string, // "2020-08-23",
    "FieldHistory": []
  },
  "Gender": {
    "DisplayValue": string, // "Male",
    "FieldHistory": []
  },
  "AnalysisCode1LabelText": {
    "DisplayValue": string,
    "FieldHistory": []
  },
  "AnalysisCode2LabelText": {
    "DisplayValue": string,
    "FieldHistory": []
  },
  "ContactDetail": {
    "Address": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "WorkPhoneNumber": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "PersonalPhoneNumber": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "PersonalEmail": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "Mobile": {
      "DisplayValue": string,
      "FieldHistory": []
    }
  },
  "OtherContact": [],
  "RightToWork": [],
  "BackgroundDetail": [],
  "BankDetail": {
    "BankName": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "BankAddress": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "BankCode": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "AccountNumber": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "AccountName": {
      "DisplayValue": string,
      "FieldHistory": []
    }
  },
  "EmploymentDetail": {
    "PayrollCompany": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "PayrollID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "TimeAndAttendanceID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "RotaID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "CRMID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "ATSID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "PerformanceID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "BenefitsID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "System1ID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "System2ID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "System3ID": {
      "DisplayValue": string,
      "FieldHistory": []
    },
    "MethodOfRecruitment": {
      "DisplayValue": string,
      "FieldHistory": []
    }
  },
  "LeavingDate": string,
  "ReasonForLeaving": string,
  "EmployeeImage": string,
  "APIColumn1": string,
  "APIColumn2": string,
  "APIColumn3": string,
  "APIColumn4": string,
  "APIColumn5": string,
  "AdditionalreportsTo": [],
  "UniqueKey": string,
  "lstFieldHistoryJobrole": null
};

export type Salary = {
  EffectiveFrom: string, // "2022-05-09",
  SalaryType: string, // "Monthly",
  PaymentFrequency: string, // "Monthly",
  SalaryAmount: string, // "333.0000",
  TotalSalaryAmount: string, // "333.0000",
  Currency: string, // "$",
  ChangeReason: string, // "Starting Salary",
  Comments: string,
  Deductions: [],
  Entitlements: []
};

export type Holiday = {
  AnnualLeaveTxnId: number,
  StartDate: string,
  EndDate: string,
  DurationType: number,
  DurationInDays: number,
  DurationInMinutes: number,
  DurationInDaysThisPeriod: number,
  DurationInMinutesThisPeriod: number,
  PartOfDay: string,
  StartDatePartOfTheDay: string,
  EndDatePartOfTheDay: string,
  RequesterComments: string,
  ApproverComments: string,
  Approver: string,
  Status: "Pending" | "Approved" | "Declined",
  LastActionDateTime: string,
  IsToilHoliday: boolean,
  ReferenceId: string,
};

export type Benefit = {
  BenefitId: number,
  Benefit: string, // "Gym Membership",
  DateAwarded: DateType,
  ExpiryDate: DateType,
  Value: number, // 100
  Comments: string, // "A sum of money for employee",
  RecoverOnTermination: string, // "Yes",
  Customfields: [],
  Files: [],
  Audio: [],
  Video: []
};

export type Document =         {
  EmployeeId: number,
  DocumentId: number,
  DocumentName: string, // "World_Wide_Corp_lorem.pdf",
  URL: string, // "https://testplc.peoplehr.net/Handlers/DocumentHandler.ashx?hyZRkZqRfGq9tiIjHOYGTnYtOErg3fBAmnIL4Y74nc2Ih0GMcoPj4C7oOvy53DYCqT8eR6Ad6bOPm3n61%2bUURWhDXH1zne7sQ0XtXVcLQTGUpJ6ZbXXeytP8Bf9r2yMzFZCnEvg%2bejx1aI53WpCELsLo28lesYR8Of636QKkLWUmkSydy%2bgtQfvUSXy%2faT7I5d2Cf082MYjvnK7Aldzpr%2fOaCjdcIi%2frLHFO%2bvmy2YQ%3d",
  Comments: string,
  EmployeeAccess: string, // "true",
  ManagerAccess: string, // "true",
  SignRequired: string, // "false",
  Category: string, // "Increment Letter",
  AddedOn: string, // "Thu, 25 May 2023",
  ManagerSignRequired: string, // "false"
}

export type Late = {
  EmployeeId: number,
  LateDate: DateType, // "2023-05-25",
  LateMinutes: number, // 10
  Comments: string, // "Train strike"
};

export type Qualification = {
  QualificationId: number,
  Qualification: string, // "MSc",
  Subject: string, // "Computer Science ",
  DatePassed: string, // "2023-05-01",
  ExpiryDate: string, // "2028-05-01",
  Comments: string,
  Customfields: [],
  Files: [],
  Audio: [],
  Video: []
};

export type Training = {
  TrainingId: number,
  TrainingType: string, // "Health & Safety",
  Description: string, // "Learning office safety",
  Importance: number,
  Status: number,
  PercentComplete: number,
  TrainingDate: string, // "Sun, 21 May 2023",
  TrainingEndDate: string, // "Sun, 28 May 2023",
  TrainingExpiryDate: string, // "Mon, 31 Jul 2023",
  Provider: string, // "NHS",
  Cost: number,
  Note: string, // "A note",
  CustomColumn: [],
  Audio: [],
  Video: []
};
