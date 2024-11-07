import { parseISO, format } from 'date-fns';
import utilStyles from '../styles/utils.module.css';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className='text-xs font-medium'>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
}
