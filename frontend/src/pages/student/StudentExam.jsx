import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Target,
  Award,
  ArrowRight,
  BookOpen,
  Timer,
  AlertCircle
} from "lucide-react";
import api from "../../api/axios";

export default function StudentExam() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchExam();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchExam = async () => {
    try {
      const res = await api.get(`/notes/student/exam/${subjectId}`);
      setQuestions(res.data.questions);
      setLoading(false);
    } catch (error) {
      console.error("Exam load error:", error);
    }
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formattedAnswers = Object.keys(answers).map((qid) => ({
      questionId: qid,
      selectedAnswer: answers[qid],
    }));

    try {
      const res = await api.post("/notes/student/exam/submit", {
        subjectId,
        answers: formattedAnswers,
      });

      alert(
        `Score: ${res.data.score}/${res.data.totalQuestions} (${res.data.percentage}%)`
      );

      navigate("/student/dashboard");
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="flex justify-center items-center h-[400px]"
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full mx-auto mb-4 shadow-lg"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-gray-600 dark:text-gray-400 text-lg font-medium"
          >
            Loading your exam...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20
      }}
      className="space-y-8 relative"
    >

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{
          y: -6,
          scale: 1.01,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
      >

        {/* Animated Background Elements */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Floating Timer Icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
            timeLeft < 300 ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          <Timer size={16} className="text-white" />
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">

          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 120,
                damping: 15
              }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Target className="text-blue-600 dark:text-blue-400" />
              </motion.div>
              Final Exam
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400"
            >
              <motion.span
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <BookOpen size={16} />
                {totalQuestions} Questions
              </motion.span>

              <motion.span
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  transition: { duration: 0.2 }
                }}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <CheckCircle size={16} />
                {answeredCount} Answered
              </motion.span>

              <motion.span
                animate={{
                  scale: timeLeft < 300 ? [1, 1.1, 1] : 1,
                  backgroundColor: timeLeft < 300 ? ["rgba(239, 68, 68, 0.1)", "rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0.1)"] : undefined
                }}
                transition={{
                  scale: { duration: 0.5, repeat: timeLeft < 300 ? Infinity : 0 },
                  backgroundColor: { duration: 1, repeat: timeLeft < 300 ? Infinity : 0 }
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 ${
                  timeLeft < 300 ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <Timer size={16} />
                {formatTime(timeLeft)}
              </motion.span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            className="flex flex-col items-end gap-4"
          >
            <div className="text-right">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm text-gray-600 dark:text-gray-400 mb-1"
              >
                Progress
              </motion.p>
              <div className="w-32 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{
                    delay: 1.2,
                    duration: 1.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative shadow-sm"
                >
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.div>
              </div>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1.4,
                  type: "spring",
                  stiffness: 200
                }}
                className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium"
              >
                {Math.round(progress)}% Complete
              </motion.p>
            </div>
          </motion.div>

        </div>

      </motion.div>

      {/* QUESTIONS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        {questions.map((q, index) => (
          <motion.div
            key={q._id}
            initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{
              delay: 0.4 + index * 0.08,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{
              y: -4,
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }}
            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${
              answers[q._id] ? 'ring-2 ring-green-200 dark:ring-green-800 shadow-green-100 dark:shadow-green-900/20' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${
                  answers[q._id] ? 'bg-green-500' : 'bg-blue-500'
                }`}
              >
                {index + 1}
              </motion.div>

              <div className="flex-1">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.08,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed"
                >
                  {q.questionText}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6 + index * 0.08,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="space-y-3"
                >
                  {q.options.map((option, i) => (
                    <motion.label
                      key={i}
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: 0.7 + index * 0.08 + i * 0.06,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{
                        scale: 1.02,
                        x: 4,
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <motion.input
                        whileFocus={{
                          scale: 1.2,
                          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)"
                        }}
                        type="radio"
                        name={q._id}
                        value={option}
                        checked={answers[q._id] === option}
                        onChange={() => handleOptionChange(q._id, option)}
                        className="w-5 h-5 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{option}</span>
                    </motion.label>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* SUBMIT BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="flex justify-center"
      >
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          whileHover={{
            scale: 1.08,
            y: -6,
            boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          whileTap={{
            scale: 0.96,
            y: -3,
            transition: { duration: 0.15 }
          }}
          onClick={handleSubmit}
          disabled={isSubmitting || answeredCount === 0}
          className="flex items-center gap-3 px-12 py-6 rounded-3xl bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-lg hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-3xl"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Submitting...
            </>
          ) : (
            <>
              <Award size={20} />
              Submit Exam
              <ArrowRight size={20} />
            </>
          )}
        </motion.button>
      </motion.div>

      {/* WARNING */}
      {answeredCount < totalQuestions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(245, 158, 11, 0.2)",
            transition: { duration: 0.3 }
          }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 text-yellow-800 dark:text-yellow-200 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={20} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-medium"
            >
              Warning: You haven't answered all questions yet.
            </motion.p>
          </div>
        </motion.div>
      )}

    </motion.div>
  );
}