import utilStyles from '../styles/utils.module.css';

export default function Reviewer({ reviewer }) {
  return (
    <div>
      <p className={utilStyles.reviewer}>
        Reviewed by: <span dangerouslySetInnerHTML={{ __html: reviewer }} />
      </p>
    </div>
  );
}
