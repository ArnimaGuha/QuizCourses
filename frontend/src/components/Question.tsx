import type { Question as QuestionType } from "../data/questions";

type QuestionProps = {
  data: QuestionType;
  selected?: number;
  onSelect: (questionId: number, optionIndex: number) => void;
};

export default function Question({ data, selected, onSelect }: QuestionProps) {
  return (
    <fieldset className="question-block">
      <legend>{data.question}</legend>

      {data.options.map((opt, idx) => {
        let className = "";

        if (selected !== undefined) {
          if (idx === data.correctIndex) className = "correct";
          else if (idx === selected) className = "incorrect";
        }

        return (
          <label key={idx} className={className}>
            <input
              type="radio"
              name={`q-${data.id}`}
              checked={selected === idx}
              onChange={() => onSelect(data.id, idx)}
            />
            {opt}
          </label>
        );
      })}
    </fieldset>
  );
}
