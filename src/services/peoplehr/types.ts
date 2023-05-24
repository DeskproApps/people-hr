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

export type EmployeeSalary = {
  isError: boolean,
  Status: number,
  Message: string,
  Result: Salary[],
};

export type Employees = {
  isError: boolean,
  Status: number,
  Message: string,
  Result: Employee[]
};
