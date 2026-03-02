import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function StudentExam() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExam();
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
    }
  };

  if (loading) return <p>Loading Exam...</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Exam</h1>

      {questions.map((q, index) => (
        <div key={q._id} className="bg-white p-6 rounded-xl border">
          <p className="font-semibold mb-4">
            {index + 1}. {q.questionText}
          </p>

          <div className="space-y-2">
            {q.options.map((option, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  onChange={() =>
                    handleOptionChange(q._id, option)
                  }
                />{" "}
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Submit Exam
      </button>
    </div>
  );
}