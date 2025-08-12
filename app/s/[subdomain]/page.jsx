const SubDomain =({ params }) => {
  const { subdomain } = params;

  return (
    <div>
      <h1>Subdomain: {subdomain}</h1>
      <p>This is the page for the subdomain: {subdomain}</p>
    </div>
  );
}
export default SubDomain;