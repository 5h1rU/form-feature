import React from 'react';
import Link from 'next/link';

export default function IndexPage({ data }): JSX.Element {
  const insurancesList = Object.keys(data.insurances);

  return (
    <ul>
      {insurancesList.map((insurance) => (
        <li key={insurance}>
          <Link href={`/forms/${insurance}`}>
            <a>{data.insurances[insurance].name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/form-fields');
  const data = await res.json();
  return { props: { data } };
}
