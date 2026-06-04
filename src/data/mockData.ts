import { LoanApplication, UnderwritingRule } from "../types/underwriting.ts";

export const initialRules: UnderwritingRule[] = [
{
    id: 'rule-1',
    name: 'Critical Credit Floor',
    description: 'Automatically reject applicants with a credit score below 600.',
    metric: 'creditScore',
    operator: 'less_than',
    value: 600,
    actionOnTrigger: 'reject',
    isActive: true,

}
];

export const mockApplications: LoanApplication[] = [
    {
        id: 'APP-2026-001',
        applicant: {
            id: 'usr-102',
            fullName: 'Aluya Ehiz',
            email: 'aluyaehis8@gmail.com',
            monthlyIncome: 400000,
            requestedAmount: 5000000,
            creditScore: 550,
            debtToIncomeRatio: 50,
            employmentStatus: 'self_employed'
        },
        stage: 'verification',
        status: 'processing',
        riskScore: 0,
        automatedReasons: [],
        submittedAt: '2026-06-03T07:13:00Z'
    }
];