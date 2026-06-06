// src/data/mockData.ts
import { LoanApplication } from "../types/underwriting.ts";

export const mockApplications: LoanApplication[] = [
  {
    id: "APP-2026-001",
    applicant: {
      id: "CUST-901",
      fullName: "Aluya Ehiz",
      email: "aluyaehis8@gmail.com",
      monthlyIncome: 850000,
      requestedAmount: 5000000,
      creditScore: 750,
      debtToIncomeRatio: 18,
      employmentStatus: "employed"
    },
    stage: "verification",
    status: "processing",
    riskScore: 12,
    automatedReasons: [],
    submittedAt: "2026-06-06T10:00:00Z"
  },
  {
    id: "APP-2026-002",
    applicant: {
      id: "CUST-902",
      fullName: "Amara Chinedu",
      email: "amara@gmail.com",
      monthlyIncome: 450000,
      requestedAmount: 3500000,
      creditScore: 510, 
      debtToIncomeRatio: 32,
      employmentStatus: "self_employed"
    },
    stage: "verification",
    status: "processing",
    riskScore: 88,
    automatedReasons: [],
    submittedAt: "2026-06-06T10:15:00Z"
  },
  {
    id: "APP-2026-003",
    applicant: {
      id: "CUST-903",
      fullName: "Tunde Bakare",
      email: "tunde@gmail.com",
      monthlyIncome: 1200000,
      requestedAmount: 8000000,
      creditScore: 640,
      debtToIncomeRatio: 48, 
      employmentStatus: "employed"
    },
    stage: "verification",
    status: "processing",
    riskScore: 55,
    automatedReasons: [],
    submittedAt: "2026-06-06T10:30:00Z"
  }
];