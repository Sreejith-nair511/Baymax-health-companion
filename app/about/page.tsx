import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "About | Baymax - Your Personal Healthcare Companion",
  description: "Learn more about Baymax, your personal healthcare companion.",
}

export default function AboutPage() {
  const faqs = [
    {
      question: "What is Baymax?",
      answer:
        "Baymax is a personal healthcare companion inspired by the lovable robot from Disney's Big Hero 6. My AI assistant is designed to help you monitor your health, provide healthcare advice, and support your overall wellbeing.",
    },
    {
      question: "How does Baymax work?",
      answer:
        "Baymax uses advanced AI technology to analyze your health information, provide personalized recommendations, and answer your health-related questions. The more you interact with Baymax, the better it understands your specific health needs.",
    },
    {
      question: "Is my health data secure?",
      answer:
        "Yes, we take data security very seriously. All your health information is encrypted and stored securely. We never share your personal data with third parties without your explicit consent.",
    },
    {
      question: "Can Baymax replace my doctor?",
      answer:
        "No, Baymax is designed to complement, not replace, professional medical care. While Baymax can provide general health advice and monitoring, it's important to consult with healthcare professionals for medical diagnoses and treatment.",
    },
    {
      question: "Is Baymax available 24/7?",
      answer:
        "Yes, Baymax is available around the clock to assist with your health questions and concerns. You can chat with Baymax anytime, anywhere.",
    },
  ]

  const teamMembers = [
    {
      name: " Sreejith s",
      role: "Founder & Chief NERD",
      bio: "The architect ,desginer and developer of Baymax"
    },
    {
      name: "Rohith G",
      role: "Chatur developer",
      bio: "helped me in yapping :)",
    },
    {
      name: "Jharkhandi nikhil ",
      role: "Head of  Experience",
      bio: "Deep insights ,very deep ",
    },

  ]

  return (
    <div className="pt-24 pb-12 min-h-screen dark:bg-gray-900">
      <div className="baymax-container">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-fadeIn">About Baymax</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slideUp">
            Your personal healthcare companion, inspired by Disney's lovable robot. We're here to help you stay healthy
            and happy.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideUp">
              <h2 className="baymax-heading dark:text-gray-100">Our Story</h2>
              <p className="baymax-text dark:text-gray-300 mb-4">
                Baymax was created with a simple mission: to make healthcare more accessible, personalized, and
                compassionate. Inspired by the lovable healthcare companion from Disney's Big Hero 6, we wanted to bring
                that same level of care and support to people in the real world.
              </p>
              <p className="baymax-text dark:text-gray-300">
                Our team of healthcare professionals, AI experts, and designers worked together to create an AI
                assistant that not only provides accurate health information but does so with empathy and understanding.
                Just like the Baymax in the movie, our goal is to be there for you when you need health support, advice,
                or just someone to talk to about your wellbeing.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image src="/images/baymax-caring.gif" alt="Baymax Character" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="baymax-heading text-center mb-12 dark:text-gray-100">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="baymax-card animate-slideUp dark:bg-gray-800 dark:border-gray-700"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-baymax-lightBlue dark:bg-baymax-blue/30 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-baymax-darkBlue dark:text-baymax-blue">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">{member.name}</h3>
                  <p className="text-sm text-baymax-darkBlue dark:text-baymax-blue mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="baymax-heading text-center mb-12 dark:text-gray-100">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="dark:border-gray-700">
                  <AccordionTrigger className="text-left font-medium text-gray-800 dark:text-gray-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-baymax-lightBlue dark:bg-gray-800 rounded-3xl p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40">
                <Image
                  src="/images/baymax-thumbs-up.gif"
                  alt="Baymax giving thumbs up"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="baymax-heading dark:text-gray-100">Our Mission</h2>
            <p className="baymax-text dark:text-gray-300 mb-6">
              At Baymax, our mission is to make healthcare more accessible, personalized, and compassionate through
              innovative AI technology. We believe that everyone deserves a healthcare companion who listens,
              understands, and provides reliable guidance.
            </p>
            <p className="baymax-text dark:text-gray-300">
              Just like the Baymax in Big Hero 6, we're committed to being there for you when you need health support,
              advice, or just someone to talk to about your wellbeing. We're not just building technology; we're
              creating a companion who cares.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
