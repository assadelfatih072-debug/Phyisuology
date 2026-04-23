/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  User, 
  Mail, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  GraduationCap,
  Info,
  AlertCircle,
  FileText
} from 'lucide-react';
import { physiologyQuestions } from './questions';
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'finished'>('intro');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<boolean>(false);
  
  // AI related state
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('gemini_api_key') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(!localStorage.getItem('gemini_api_key'));
  const [explanations, setExplanations] = useState<{ [id: number]: string }>({});
  const [loadingExplanations, setLoadingExplanations] = useState<{ [id: number]: boolean }>({});

  const saveApiKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  const getExplanation = async (questionId: number, question: string, selected: string, correct: string) => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setLoadingExplanations(prev => ({ ...prev, [questionId]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-3-flash-preview";
      const prompt = `As a physiology professor, explain briefly why "${correct}" is the correct answer for the question: "${question}". The student incorrectly chose "${selected}". Use Arabic language for the explanation. Keep it concise (2-3 sentences).`;
      
      const response = await ai.models.generateContent({
        model,
        contents: prompt
      });
      
      const text = response.text || "No explanation generated.";
      setExplanations(prev => ({ ...prev, [questionId]: text }));
    } catch (error: any) {
      console.error("AI explanation failed", error);
      alert("Failed to get AI explanation: " + error.message);
    } finally {
      setLoadingExplanations(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const totalQuestions = physiologyQuestions.length;
  const currentQuestion = physiologyQuestions[currentQuestionIndex];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName && studentEmail) {
      setStep('quiz');
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    physiologyQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const score = calculateScore();

    const detailedResults = physiologyQuestions.map(q => ({
      question: q.question,
      selectedAnswer: q.options[answers[q.id]] || 'No answer',
      correctAnswer: q.options[q.correctAnswer],
      isCorrect: answers[q.id] === q.correctAnswer
    }));
    
    try {
      const response = await fetch('/api/submit-exam', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          studentName,
          studentEmail,
          score,
          totalQuestions,
          detailedResults
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      setSubmissionStatus(data.message);
      setSubmissionError(!data.success);
      setStep('finished');
    } catch (error: any) {
      console.error('Submission failed', error);
      setSubmissionStatus(`عذراً، حدث خطأ: ${error.message || 'فشل الاتصال بالخادم'}`);
      setSubmissionError(true);
      setStep('finished');
    } finally {
      setIsSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen font-sans text-slate-800">
      {/* API Key Modal */}
      <AnimatePresence>
        {showApiKeyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6 bg-blue-50 p-3 rounded-xl border border-blue-100">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">إعدادات الذكاء الاصطناعي</h3>
                  <p className="text-xs text-blue-600">Gemini AI Configuration</p>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                لتفعيل ميزات الشرح الذكي (AI) في التطبيق، يرجى إدخال مفتاح الـ API الخاص بـ Gemini.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">API KEY</label>
                  <input
                    type="password"
                    placeholder="Enter your Gemini API Key"
                    defaultValue={apiKey}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveApiKey((e.target as HTMLInputElement).value);
                    }}
                    id="api_key_input"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                  />
                </div>
                
                <button
                  onClick={() => {
                    const input = document.getElementById('api_key_input') as HTMLInputElement;
                    saveApiKey(input.value);
                  }}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-200"
                >
                  حفظ وتفعيل الميزات
                </button>
                
                <p className="text-[10px] text-slate-400 text-center italic">
                  يتم تخزين المفتاح محلياً في متصفحك فقط.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Universal Header */}
      <header className="fixed top-0 inset-x-0 h-16 bg-white border-b border-slate-200 z-50 px-6 sm:px-12 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg text-slate-900 tracking-tight">Physiology Exam Hub</h1>
        </div>
        
        {step === 'quiz' && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">التقدم الحالي</p>
              <p className="text-sm font-bold text-blue-600">{answeredCount} / {totalQuestions}</p>
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-blue-600 transition-all duration-300"
              />
            </div>
          </div>
        )}
      </header>

      <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm"
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Physiology Exam (70 Q)</h1>
                <p className="text-slate-500">Welcome. Please register to begin the assessment.</p>
              </div>

              <form onSubmit={handleStart} className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Abdullah Ahmed"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex gap-4">
                  <Info className="w-5 h-5 text-blue-600 shrink-0" />
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <p className="font-bold text-slate-800 mb-1">Instructions:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Complete all 70 questions.</li>
                      <li>Final score sent to administrator.</li>
                    </ul>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Examination
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 bg-blue-600 h-full" />
                
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">السؤال {currentQuestionIndex + 1}</span>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <FileText className="w-4 h-4" />
                    Page {Math.floor(currentQuestionIndex / 10) + 1}
                  </div>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-10">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`w-full p-5 text-left rounded-xl border-2 transition-all flex items-center justify-between group ${
                        answers[currentQuestion.id] === idx
                          ? 'border-blue-600 bg-blue-50/30'
                          : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 font-bold text-sm ${
                          answers[currentQuestion.id] === idx
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-200 text-slate-400 bg-white'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={`font-medium text-lg ${answers[currentQuestion.id] === idx ? 'text-blue-900 font-bold' : 'text-slate-700'}`}>
                          {option}
                        </span>
                      </div>
                      {answers[currentQuestion.id] === idx && (
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 flex items-center gap-2 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                {currentQuestionIndex === totalQuestions - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || answeredCount < totalQuestions}
                    className="flex-1 max-w-sm py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-100 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    Submit Final Answers
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2"
                  >
                    Next Question
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {answeredCount < totalQuestions && currentQuestionIndex === totalQuestions - 1 && (
                <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm font-bold uppercase tracking-tighter">يجب الإجابة على جميع الأسئلة ({totalQuestions - answeredCount} متبقية)</p>
                </div>
              )}
            </motion.div>
          )}

          {step === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-10 sm:p-16 rounded-2xl border border-slate-200 text-center"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 ${submissionError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {submissionError ? <AlertCircle className="w-10 h-10" /> : <ClipboardCheck className="w-10 h-10" />}
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{submissionError ? 'تمت العملية مع تنبيه' : 'تم تسيلم الامتحان بنجاح'}</h2>
              <p className="text-slate-600 mb-10 max-w-md mx-auto">
                شكراً لك <span className="font-bold text-slate-900">{studentName}</span>. 
                لقد تم إرسال إجاباتك ومراجعتها آلياً وإرسال التقرير للأستاذ.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-10 text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">تفاصيل العملية</p>
                <div className="space-y-3 text-sm">
                  <p className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                    <span className="text-slate-500">الطالب:</span>
                    <span className="font-bold text-slate-900">{studentName}</span>
                  </p>
                  <p className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                    <span className="text-slate-500">الحالة:</span>
                    <span className={`font-bold ${submissionError ? 'text-red-600' : 'text-green-600'}`}>{submissionStatus}</span>
                  </p>
                </div>
              </div>

              {/* AI Explanation Area */}
              <div className="space-y-6 mb-12">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  مراجعة الأخطاء مع الذكاء الاصطناعي
                </h3>
                
                <div className="grid gap-4">
                  {physiologyQuestions.map((q) => {
                    const selectedIdx = answers[q.id];
                    const isCorrect = selectedIdx === q.correctAnswer;
                    
                    if (isCorrect) return null;

                    return (
                      <div key={q.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden text-left">
                        <div className="p-5 border-l-4 border-red-500">
                          <p className="font-bold text-slate-800 mb-2">{q.question}</p>
                          <div className="flex flex-wrap gap-4 text-sm mb-4">
                            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full">إجابتك: {q.options[selectedIdx] || 'لا توجد'}</span>
                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full font-bold">الصحيحة: {q.options[q.correctAnswer]}</span>
                          </div>
                          
                          {explanations[q.id] ? (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-900 text-sm italic"
                            >
                              <div className="flex gap-2">
                                <GraduationCap className="w-5 h-5 shrink-0 text-blue-600" />
                                <p>{explanations[q.id]}</p>
                              </div>
                            </motion.div>
                          ) : (
                            <button
                              onClick={() => getExplanation(q.id, q.question, q.options[selectedIdx], q.options[q.correctAnswer])}
                              disabled={loadingExplanations[q.id]}
                              className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              {loadingExplanations[q.id] ? (
                                <div className="w-3 h-3 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                              ) : (
                                <Send className="w-3 h-3" />
                              )}
                              اطلب شرح الذكاء الاصطناعي (AI)
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto px-12 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                  إعادة المحاولة
                </button>
                
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="text-slate-400 text-xs font-medium hover:text-slate-600 transition-colors"
                >
                  تعديل مفتاح AI
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="footer-bg py-8 text-center border-t border-slate-200 mt-auto">
        <p className="text-slate-400 text-sm font-medium italic">Powered by Anatomy & Physiology Assessment Hub © 2026</p>
      </footer>
    </div>
  );
}
