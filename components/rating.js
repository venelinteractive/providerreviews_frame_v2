import utilStyles from '../styles/utils.module.css';

export default function Rating({ ratingBox }) {
  return <span className={utilStyles.ratingcontainer}>{ratingBox} ★</span>;
}
