import utilStyles from '../styles/utils.module.css';

export default function Platform({ platformUrl, platform }) {
  return (
    <span className='text-xs text-[11px] font-medium uppercase'>
      {' '}
      <a href={platformUrl} target='_blank' rel='noreferrer'>
        {platform}
      </a>{' '}
    </span>
  );
}
