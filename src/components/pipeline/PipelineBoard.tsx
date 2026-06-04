export type ApplicationStage = 'verification' | 'credit_check' | 'risk_assessment' | 'decision';
export type UnderwritingStatus = 'processing' | 'auto_approved' | 'auto_rejected' | 'manual_review';

export interface Applicant {
    id: string;
    fullName: string;
    email: string;
    monthlyIncome: number;
    requestedAmount: number;
    creditScore: number;
    debtToIncomeRatio: number;
    employmentStatus: 'employed' | 'self_employed' | 'unemployed';
}

export interface LoanApplication {
    id: string;
    applicant: Applicant;
    stage: ApplicationStage;
    status: UnderwritingStatus;
    riskScore: number;
    automatedReasons: string[];
    submittedAt: string;
}

export interface UnderwritingRule {
    id: string;
    name: string;
    description: string;
    metric: 'creditScore' | 'debtToIncomeRatio' | 'requestedAmount';
    operator: 'less_than' | 'greater_than' | 'equals';
    value: number;
    actionOnTrigger: 'reject' | 'flag_for_review';
    isActive: boolean;
}