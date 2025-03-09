// src/components/QuestionsList.jsx
const QuestionsList = ({ questions }) => {
    if (questions.length === 0) {
      return (
        <p className="text-gray-500">No questions generated. Try analyzing the job description.</p>
      )
    }
  
    return (
      <div>
        <ul className="space-y-4">
          {questions.map((question, index) => {
            // Split into skill and question if in format "Skill: Question"
            const parts = question.split(': ');
            const hasSkill = parts.length > 1;
            const skill = hasSkill ? parts[0] : '';
            const questionText = hasSkill ? parts.slice(1).join(': ') : question;
  
            return (
              <li key={index} className="pb-3 border-b border-gray-100 last:border-0">
                {hasSkill && <span className="skill-tag mb-2">{skill}</span>}
                <p className="text-gray-800">{questionText}</p>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
  
  export default QuestionsList