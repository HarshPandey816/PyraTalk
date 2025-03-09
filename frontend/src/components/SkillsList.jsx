// src/components/SkillsList.jsx
const SkillsList = ({ skills }) => {
    if (skills.length === 0) {
      return (
        <p className="text-gray-500">No skills identified. Try a more detailed job description.</p>
      )
    }
  
    return (
      <div>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          {skills.length} relevant skills identified from the job description.
        </p>
      </div>
    )
  }
  
  export default SkillsList