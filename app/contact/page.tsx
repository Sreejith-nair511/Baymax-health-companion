import ContactForm from "@/components/contact-form"

export const metadata = {
  title: "Contact | Baymax - Your Personal Healthcare Companion",
  description: "Contact the Baymax team for any questions or support.",
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-baymax-lightBlue dark:bg-gray-800">
      <div className="baymax-container">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to the Baymax team and we'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-slideUp">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
