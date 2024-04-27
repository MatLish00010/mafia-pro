import useClubs from '@/hooks/club/useClubs.ts';

export default function Club() {
  const {data} = useClubs();
  console.log('data;', data);
  return (
    <section>
      <h1>Club</h1>
    </section>
  );
}
