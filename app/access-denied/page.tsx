export default function AccessDenied() {
  return (
    <div className="max-w-5xl mx-auto p-6 text-center min-h-[550]">
      <h1 className="text-3xl font-bold mt-[100]">403 - Access Denied</h1>
      <p className="mt-4">This demo is available by invitation only.</p>
      <p className="mt-2">For access contact me by sending email to 
        <span className="text-red-500 ml-1">ggamvetas[at]gmail.com</span></p>
    </div>
  );
};
