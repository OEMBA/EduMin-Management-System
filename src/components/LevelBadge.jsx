import './LevelBadge.css';

const levelClass = {
  Undergraduate: 'level-badge--undergraduate',
  Graduate:      'level-badge--graduate',
  Postgraduate:  'level-badge--postgraduate',
};

const LevelBadge = ({ level }) => {
  const cls = levelClass[level] || 'level-badge--default';
  return <span className={`level-badge ${cls}`}>{level}</span>;
};

export default LevelBadge;
