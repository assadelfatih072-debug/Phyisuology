export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamResult {
  studentName: string;
  studentEmail: string;
  score: number;
  totalQuestions: number;
  answers: { [questionId: number]: number };
  timestamp: string;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}
