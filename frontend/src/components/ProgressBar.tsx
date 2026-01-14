type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="progress-container" aria-label="Quiz progress">
      <div
        className="progress-fill"
        style={{ width: `${percent}%` }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      />
      <span className="progress-text">
        {current} / {total}
      </span>
    </div>
  );
}
