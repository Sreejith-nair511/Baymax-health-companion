import HealthCheckForm from "@/components/health-check-form"

export const metadata = {
  title: "AI Health Check | Baymax - Your Personal Healthcare Companion",
  description: "Complete an AI-powered health check with Baymax to get personalized health recommendations.",
}

export default function HealthCheckPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-baymax-lightBlue dark:bg-gray-800">
      <div className="baymax-container">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">AI Health Check</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete this quick health assessment to receive AI-powered personalized health recommendations from Baymax.
            You can also ask follow-up questions about your health concerns.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-slideUp">
          <HealthCheckForm />
        </div>
      </div>
    </div>
  )
}
