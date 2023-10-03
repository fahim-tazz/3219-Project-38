"use client";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
