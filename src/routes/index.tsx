import {Link} from 'react-router-dom';

export default function Index() {
  return (
    <section className="text-center">
      <p id="zero-state">
        Hello! Here you can check{' '}
        <Link className="text-blue-500" to="rating">
          Rating{' '}
        </Link>
        and add{' '}
        <Link className="text-blue-500" to="games">
          New Games!
        </Link>
      </p>
    </section>
  );
}
