export default function PreviewDashboard() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Trading Dashboard Preview</h2>
      </div>
      <div className="bg-dark-lighter rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=800"
          alt="Cryptocurrency trading dashboard"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
