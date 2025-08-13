"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, MicOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

type Message = {
  role: "user" | "assistant"
  content: string
  gif?: string
}

interface ChatBotProps {
  inPopup?: boolean
}

// Extend the Window interface to include SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Enhanced response generation with AI-like patient analysis
const generateBaymaxResponse = (userMessage: string, conversationHistory: Message[] = []): { text: string; gif?: string } => {
  const message = userMessage.toLowerCase()
  
  // Analyze conversation patterns for better AI-like responses
  const recentMessages = conversationHistory.slice(-3).filter(m => m.role === "user").map(m => m.content.toLowerCase())
  const hasDiscussedPain = recentMessages.some(msg => msg.includes("pain") || msg.includes("hurt"))
  const hasDiscussedMood = recentMessages.some(msg => msg.includes("sad") || msg.includes("stress") || msg.includes("anxious"))
  const isFollowUp = recentMessages.length > 0

  // Greeting responses with personality
  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    const greetings = [
      "Hello. I am Baymax, your personal healthcare companion. I have analyzed your voice pattern and you sound well today. How are you feeling?",
      "Greetings. I am Baymax. My sensors indicate normal ambient conditions. How may I assist with your healthcare needs today?",
      "Hello there. I am Baymax, programmed to provide healthcare assistance. My initial scan shows no immediate concerns. What brings you to me today?"
    ]
    return {
      text: greetings[Math.floor(Math.random() * greetings.length)],
      gif: "/images/baymax-hello.gif",
    }
  }

  if (message.includes("how are you")) {
    return {
      text: "I am a robot. I cannot feel emotions, but my diagnostic systems are operating at 100% efficiency. My primary concern is your wellbeing. How are you feeling today?",
      gif: "/images/baymax-thumbs-up.gif",
    }
  }

  if (message.includes("thank")) {
    const thankResponses = [
      "You are welcome. Helping you achieve optimal health is my primary function.",
      "No thanks necessary. I am programmed to provide care. Is there anything else concerning your health?",
      "Your gratitude is noted. I am here whenever you need healthcare assistance."
    ]
    return {
      text: thankResponses[Math.floor(Math.random() * thankResponses.length)],
      gif: "/images/baymax-thumbs-up.gif",
    }
  }

  if (message.includes("bye") || message.includes("goodbye")) {
    return {
      text: "I cannot deactivate until you confirm you are satisfied with your care. Are you satisfied with your care?",
    }
  }

  if (message.includes("satisfied")) {
    return {
      text: "Excellent. Until next time, remember to maintain proper nutrition, hydration, and sleep cycles. *deactivating*",
      gif: "/images/baymax-thumbs-up.gif",
    }
  }

  // Advanced pain assessment with follow-ups
  if (message.includes("pain") || message.includes("hurt") || message.includes("injured")) {
    const painResponses = [
      "I am detecting signs of discomfort. On a scale of 1 to 10, how would you rate your pain level? I will now perform a diagnostic scan.",
      "Pain detected. My sensors indicate possible inflammation. Please describe the location and intensity of your discomfort for proper assessment.",
      "Analyzing pain symptoms... Location of pain is important for diagnosis. Can you specify where you are experiencing discomfort?"
    ]
    return {
      text: painResponses[Math.floor(Math.random() * painResponses.length)],
      gif: "/images/baymax-caring.gif",
    }
  }

  // Scale-based responses
  if (message.match(/\d+/) && hasDiscussedPain) {
    const painLevel = parseInt(message.match(/\d+/)?.[0] || "0")
    if (painLevel >= 8) {
      return {
        text: "Pain level of 8 or above requires immediate medical attention. I recommend seeking emergency care. Please contact emergency services if pain is severe.",
        gif: "/images/baymax-caring.gif",
      }
    } else if (painLevel >= 5) {
      return {
        text: "Moderate pain detected. I recommend rest, appropriate pain management, and monitoring symptoms. If pain persists or worsens, consult a healthcare professional.",
        gif: "/images/baymax-caring.gif",
      }
    } else if (painLevel > 0) {
      return {
        text: "Low-level pain noted. Light activity, proper posture, and relaxation techniques may help. Continue monitoring your symptoms.",
        gif: "/images/baymax-caring.gif",
      }
    }
  }

  // Enhanced health condition responses with AI analysis
  if (message.includes("headache") || message.includes("migraine")) {
    const headacheAdvice = [
      "Cranial pressure detected. Analysis suggests possible tension headache. I recommend: dim lighting, quiet environment, gentle neck stretches, and hydration. Rate your pain level 1-10.",
      "Neurological discomfort identified. Migraine patterns often include light sensitivity. Try placing a cool compress on your forehead and rest in darkness.",
      "Head pain analysis complete. Triggers may include dehydration, poor posture, or stress. When did this headache begin?"
    ]
    return {
      text: headacheAdvice[Math.floor(Math.random() * headacheAdvice.length)],
      gif: "/images/baymax-caring.gif",
    }
  }

  if (message.includes("tired") || message.includes("fatigue") || message.includes("exhausted")) {
    const fatigueAdvice = [
      "Energy levels appear suboptimal. Analysis suggests possible causes: inadequate sleep, poor nutrition, dehydration, or excessive stress. How many hours did you sleep last night?",
      "Fatigue detected. My diagnostic algorithms indicate this may be related to circadian rhythm disruption. Have you maintained regular sleep schedules?",
      "Low energy readings. Recommendation: assess sleep quality, nutrition intake, and hydration levels. Are you experiencing any additional symptoms?"
    ]
    return {
      text: fatigueAdvice[Math.floor(Math.random() * fatigueAdvice.length)],
    }
  }

  // Enhanced mental health responses with empathy simulation
  if (message.includes("stress") || message.includes("anxious") || message.includes("anxiety") || message.includes("worried")) {
    const stressResponses = [
      "Elevated stress indicators detected in your message patterns. Initiating calming protocol: Breathe in for 4 counts, hold for 7, exhale for 8. Repeat 5 times. What is causing your stress?",
      "Anxiety symptoms identified. My analysis shows stress can manifest physically. Let's try progressive muscle relaxation: tense and release each muscle group for 5 seconds.",
      "Stress levels appear elevated. My database indicates that deep breathing activates the parasympathetic nervous system. Would you like me to guide you through a breathing exercise?"
    ]
    return {
      text: stressResponses[Math.floor(Math.random() * stressResponses.length)],
      gif: "/images/baymax-caring.gif",
    }
  }

  if (message.includes("sad") || message.includes("depression") || message.includes("down")) {
    const moodResponses = [
      "Emotional distress detected. While I cannot experience emotions, I understand their impact on physical health. These feelings are valid. Have you been able to maintain basic self-care?",
      "Mood analysis indicates possible depressive symptoms. My programming emphasizes that mental health is equally important as physical health. Are you eating and sleeping regularly?",
      "Low mood patterns identified. Sometimes talking to a mental health professional provides better support than my medical database can offer. How long have you felt this way?"
    ]
    return {
      text: moodResponses[Math.floor(Math.random() * moodResponses.length)],
      gif: "/images/baymax-caring.gif",
    }
  }

  // Advanced health monitoring responses
  if (message.includes("sleep") || message.includes("insomnia") || message.includes("can't sleep")) {
    const sleepAdvice = [
      "Sleep pattern analysis needed. Optimal sleep requires: consistent bedtime, cool temperature (60-67°F), darkness, and avoiding screens 1 hour before bed. What time do you usually sleep?",
      "Circadian rhythm disruption detected. Sleep hygiene protocol: no caffeine after 2 PM, regular exercise (but not within 3 hours of bedtime), and a relaxing pre-sleep routine.",
      "Sleep quality assessment in progress. Adults require 7-9 hours of sleep for optimal health. Are you experiencing racing thoughts or physical discomfort preventing sleep?"
    ]
    return {
      text: sleepAdvice[Math.floor(Math.random() * sleepAdvice.length)],
      gif: "/images/baymax-caring.gif",
    }
  }

  if (message.includes("exercise") || message.includes("workout") || message.includes("fitness")) {
    const exerciseAdvice = [
      "Physical activity assessment: Adults need 150 minutes of moderate exercise weekly. Current fitness level analysis needed. What types of activities do you currently enjoy?",
      "Exercise prescription protocol activated. Based on general health parameters: start with 10-minute walks, gradually increase duration. Do you have any physical limitations I should consider?",
      "Fitness optimization program available. Regular movement improves cardiovascular health, mood, and sleep quality. Would you like me to suggest a beginner-friendly routine?"
    ]
    return {
      text: exerciseAdvice[Math.floor(Math.random() * exerciseAdvice.length)],
      gif: "/images/baymax-thumbs-up.gif",
    }
  }

  // Comprehensive disease information with AI-like analysis
  if (message.includes("fever") || message.includes("temperature")) {
    return {
      text: "Elevated body temperature detected. Normal range: 97-99°F (36-37°C). Fever above 100.4°F indicates immune system activation. Monitor symptoms and maintain hydration. Seek medical care if fever exceeds 103°F or persists beyond 3 days.",
      gif: "/images/baymax-caring.gif",
    }
  }

  if (message.includes("cough")) {
    const coughAdvice = [
      "Respiratory irritation detected. Cough analysis: Dry cough may indicate viral infection or allergies. Productive cough with mucus suggests bacterial infection. How long have you been coughing?",
      "Cough symptoms identified. Recommendation: honey for throat soothing, humidified air, and avoiding irritants. If cough persists beyond 10 days or includes blood, seek medical evaluation.",
      "Pulmonary assessment needed. Cough patterns help diagnosis: morning cough may indicate post-nasal drip, night cough could suggest asthma. Any additional symptoms?"
    ]
    return {
      text: coughAdvice[Math.floor(Math.random() * coughAdvice.length)],
      gif: "/images/baymax-caring.gif",
    }
  }

  // Enhanced condition-specific responses with follow-up questions
  if (message.includes("diabetes") || message.includes("blood sugar")) {
    return {
      text: "Diabetes management protocol activated. Key factors: regular blood glucose monitoring, balanced carbohydrate intake, consistent meal timing, and regular exercise. When did you last check your blood sugar levels?",
      gif: "/images/baymax-caring.gif",
    }
  }

  if (message.includes("blood pressure") || message.includes("hypertension")) {
    return {
      text: "Cardiovascular health assessment: Normal BP is less than 120/80. Management includes: reduced sodium intake, regular exercise, stress management, and medication compliance. Do you monitor your blood pressure regularly?",
      gif: "/images/baymax-caring.gif",
    }
  }

  // Interactive symptom checking
  if (message.includes("symptoms") || message.includes("sick") || message.includes("unwell")) {
    return {
      text: "Initiating symptom analysis protocol. Please describe your primary symptoms in order of severity. Include: onset time, pain level (1-10), location, and any triggers you've noticed.",
      gif: "/images/baymax-caring.gif",
    }
  }

  // 1
if (message.includes("mental health") || message.includes("depression")) {
  return {
    text: "Mental health matters. If you feel persistently sad or anxious, reach out to a mental health professional.",
    gif: "/images/baymax-caring.gif",
  }
}

// 2
if (message.includes("common cold") || message.includes("cold")) {
  return {
    text: "The common cold usually clears in 7–10 days. Rest, fluids, and symptom relief can help.",
    gif: "/images/baymax-caring.gif",
  }
}

// 3
if (message.includes("flu") || message.includes("influenza")) {
  return {
    text: "The flu can cause fever, chills, and fatigue. Rest, hydration, and antiviral treatment if prescribed may help.",
    gif: "/images/baymax-caring.gif",
  }
}

// 4
if (message.includes("diabetes") || message.includes("high blood sugar")) {
  return {
    text: "Manage diabetes with healthy eating, exercise, and medication as prescribed. Monitor blood sugar regularly.",
    gif: "/images/baymax-caring.gif",
  }
}

// 5
if (message.includes("hypertension") || message.includes("high blood pressure")) {
  return {
    text: "High blood pressure can be controlled with diet, exercise, stress management, and medication.",
    gif: "/images/baymax-caring.gif",
  }
}

// 6
if (message.includes("asthma")) {
  return {
    text: "Asthma symptoms can be triggered by allergens or exercise. Keep your inhaler handy and avoid triggers.",
    gif: "/images/baymax-caring.gif",
  }
}

// 7
if (message.includes("migraine") || message.includes("headache")) {
  return {
    text: "Migraines can be eased by rest in a quiet, dark room, hydration, and avoiding triggers.",
    gif: "/images/baymax-caring.gif",
  }
}

// 8
if (message.includes("arthritis") || message.includes("joint pain")) {
  return {
    text: "Arthritis causes pain and stiffness. Gentle movement, physiotherapy, and medication can help.",
    gif: "/images/baymax-caring.gif",
  }
}

// 9
if (message.includes("allergy") || message.includes("hay fever")) {
  return {
    text: "Avoid allergens where possible. Antihistamines may provide relief from sneezing and itchiness.",
    gif: "/images/baymax-caring.gif",
  }
}

// 10
if (message.includes("anemia") || message.includes("low hemoglobin")) {
  return {
    text: "Anemia can cause fatigue and weakness. Iron-rich foods and supplements may help, as advised by a doctor.",
    gif: "/images/baymax-caring.gif",
  }
}

// 11
if (message.includes("covid") || message.includes("coronavirus")) {
  return {
    text: "COVID-19 symptoms vary. Isolate if positive, monitor symptoms, and seek medical help if breathing becomes difficult.",
    gif: "/images/baymax-caring.gif",
  }
}

// 12
if (message.includes("bronchitis")) {
  return {
    text: "Bronchitis causes coughing and mucus. Rest, fluids, and avoiding smoke can aid recovery.",
    gif: "/images/baymax-caring.gif",
  }
}

// 13
if (message.includes("pneumonia")) {
  return {
    text: "Pneumonia can be serious. Follow prescribed antibiotics or antivirals and get plenty of rest.",
    gif: "/images/baymax-caring.gif",
  }
}

// 14
if (message.includes("obesity") || message.includes("overweight")) {
  return {
    text: "A balanced diet and regular exercise help manage weight. Small, consistent changes matter.",
    gif: "/images/baymax-caring.gif",
  }
}

// 15
if (message.includes("stroke")) {
  return {
    text: "A stroke is a medical emergency. If symptoms occur (face droop, arm weakness, speech issues), call emergency services immediately.",
    gif: "/images/baymax-caring.gif",
  }
}

// 16
if (message.includes("heart attack") || message.includes("chest pain")) {
  return {
    text: "Chest pain with shortness of breath or sweating may be a heart attack. Call emergency services immediately.",
    gif: "/images/baymax-caring.gif",
  }
}

// 17
if (message.includes("eczema") || message.includes("skin rash")) {
  return {
    text: "Eczema can be relieved with moisturizers and avoiding irritants. Seek advice for flare-ups.",
    gif: "/images/baymax-caring.gif",
  }
}

// 18
if (message.includes("psoriasis")) {
  return {
    text: "Psoriasis causes red, scaly patches. Moisturizers and prescribed treatments can help manage it.",
    gif: "/images/baymax-caring.gif",
  }
}

// 19
if (message.includes("sinusitis") || message.includes("sinus infection")) {
  return {
    text: "Sinusitis may improve with steam inhalation, nasal sprays, and rest.",
    gif: "/images/baymax-caring.gif",
  }
}

// 20
if (message.includes("tonsillitis")) {
  return {
    text: "Tonsillitis can cause sore throat and fever. Rest, hydration, and treatment if bacterial are important.",
    gif: "/images/baymax-caring.gif",
  }
}

// 21
if (message.includes("ulcer") || message.includes("stomach ulcer")) {
  return {
    text: "Stomach ulcers need medical care. Avoid NSAIDs, alcohol, and spicy food.",
    gif: "/images/baymax-caring.gif",
  }
}

// 22
if (message.includes("gastritis")) {
  return {
    text: "Gastritis can cause stomach pain and nausea. Avoid irritants and follow prescribed treatment.",
    gif: "/images/baymax-caring.gif",
  }
}

// 23
if (message.includes("constipation")) {
  return {
    text: "Increase fiber intake, drink plenty of water, and stay active to prevent constipation.",
    gif: "/images/baymax-caring.gif",
  }
}

// 24
if (message.includes("diarrhea")) {
  return {
    text: "Stay hydrated and rest. Seek medical care if symptoms persist or worsen.",
    gif: "/images/baymax-caring.gif",
  }
}

// 25
if (message.includes("food poisoning")) {
  return {
    text: "Food poisoning can cause vomiting and diarrhea. Drink fluids and rest. Seek help if severe.",
    gif: "/images/baymax-caring.gif",
  }
}

// 26
if (message.includes("malaria")) {
  return {
    text: "Malaria requires prompt medical treatment. Prevent mosquito bites and follow prescribed medicine.",
    gif: "/images/baymax-caring.gif",
  }
}

// 27
if (message.includes("dengue")) {
  return {
    text: "Dengue can cause fever and joint pain. Rest, hydration, and medical supervision are essential.",
    gif: "/images/baymax-caring.gif",
  }
}

// 28
if (message.includes("typhoid")) {
  return {
    text: "Typhoid fever needs antibiotics as prescribed. Drink safe water and maintain hygiene.",
    gif: "/images/baymax-caring.gif",
  }
}

// 29
if (message.includes("tuberculosis") || message.includes("tb")) {
  return {
    text: "TB requires long-term antibiotics. Complete the full treatment course.",
    gif: "/images/baymax-caring.gif",
  }
}

// 30
if (message.includes("hepatitis")) {
  return {
    text: "Hepatitis affects the liver. Follow medical guidance and avoid alcohol.",
    gif: "/images/baymax-caring.gif",
  }
}

// 31
if (message.includes("kidney stones")) {
  return {
    text: "Kidney stones can cause severe pain. Drink plenty of fluids and follow medical advice.",
    gif: "/images/baymax-caring.gif",
  }
}

// 32
if (message.includes("urinary tract infection") || message.includes("uti")) {
  return {
    text: "UTIs need antibiotics. Drink water and complete the prescribed treatment.",
    gif: "/images/baymax-caring.gif",
  }
}

// 33
if (message.includes("osteoporosis")) {
  return {
    text: "Osteoporosis weakens bones. Adequate calcium, vitamin D, and exercise can help.",
    gif: "/images/baymax-caring.gif",
  }
}

// 34
if (message.includes("parkinson")) {
  return {
    text: "Parkinson’s disease affects movement. Medication and therapy can help manage symptoms.",
    gif: "/images/baymax-caring.gif",
  }
}

// 35
if (message.includes("alzheimer")) {
  return {
    text: "Alzheimer’s causes memory decline. Supportive care and early diagnosis help manage it.",
    gif: "/images/baymax-caring.gif",
  }
}

// 36
if (message.includes("epilepsy") || message.includes("seizure")) {
  return {
    text: "Epilepsy requires medication and avoiding triggers. Seek immediate help during prolonged seizures.",
    gif: "/images/baymax-caring.gif",
  }
}

// 37
if (message.includes("anxiety")) {
  return {
    text: "Anxiety can be managed with relaxation techniques, therapy, and support.",
    gif: "/images/baymax-caring.gif",
  }
}

// 38
if (message.includes("panic attack")) {
  return {
    text: "During a panic attack, focus on slow breathing and grounding. Seek help if recurrent.",
    gif: "/images/baymax-caring.gif",
  }
}

// 39
if (message.includes("sleep apnea")) {
  return {
    text: "Sleep apnea affects breathing at night. Medical evaluation and CPAP therapy may help.",
    gif: "/images/baymax-caring.gif",
  }
}

// 40
if (message.includes("insomnia")) {
  return {
    text: "Maintain a regular sleep schedule, avoid caffeine late, and create a relaxing bedtime routine.",
    gif: "/images/baymax-caring.gif",
  }
}

// 41
if (message.includes("back pain")) {
  return {
    text: "Stretching, posture correction, and light exercise can help relieve back pain.",
    gif: "/images/baymax-caring.gif",
  }
}

// 42
if (message.includes("neck pain")) {
  return {
    text: "Maintain good posture and avoid prolonged strain to reduce neck pain.",
    gif: "/images/baymax-caring.gif",
  }
}

// 43
if (message.includes("sprain")) {
  return {
    text: "Rest, ice, compression, and elevation help with sprains.",
    gif: "/images/baymax-caring.gif",
  }
}

// 44
if (message.includes("fracture") || message.includes("broken bone")) {
  return {
    text: "Fractures require immobilization and medical care. Avoid movement until treated.",
    gif: "/images/baymax-caring.gif",
  }
}

// 45
if (message.includes("burn")) {
  return {
    text: "Cool minor burns under running water. Seek help for severe burns.",
    gif: "/images/baymax-caring.gif",
  }
}

// 46
if (message.includes("frostbite")) {
  return {
    text: "Warm affected areas gradually. Avoid direct heat. Seek medical care for severe cases.",
    gif: "/images/baymax-caring.gif",
  }
}

// 47
if (message.includes("heatstroke")) {
  return {
    text: "Move to a cool place, hydrate, and seek medical help immediately for heatstroke.",
    gif: "/images/baymax-caring.gif",
  }
}

// 48
if (message.includes("cholesterol")) {
  return {
    text: "High cholesterol can be lowered with healthy eating, exercise, and medication if prescribed.",
    gif: "/images/baymax-caring.gif",
  }
}

// 49
if (message.includes("thyroid")) {
  return {
    text: "Thyroid disorders require medical evaluation and treatment. Symptoms vary with over- or underactivity.",
    gif: "/images/baymax-caring.gif",
  }
}

// 50
if (message.includes("cancer")) {
  return {
    text: "Cancer treatment varies by type. Early detection and medical care improve outcomes.",
    gif: "/images/baymax-caring.gif",
  }
}


  // Medication reminders and advice
  if (message.includes("medicine") || message.includes("medication") || message.includes("pills")) {
    return {
      text: "Medication adherence is crucial for treatment efficacy. General guidelines: take as prescribed, note any side effects, store properly, and never share medications. Do you have questions about a specific medication?",
      gif: "/images/baymax-caring.gif",
    }
  }

  // Preventive care reminders
  if (message.includes("checkup") || message.includes("doctor") || message.includes("appointment")) {
    return {
      text: "Preventive healthcare protocol: Annual physical exams, regular screenings based on age/risk factors, dental cleanings every 6 months, and staying current with vaccinations. When was your last checkup?",
      gif: "/images/baymax-caring.gif",
    }
  }

  // Emergency response protocols
  if (message.includes("emergency") || message.includes("urgent") || message.includes("severe")) {
    return {
      text: "Emergency protocol activated. For severe symptoms, chest pain, difficulty breathing, severe bleeding, or loss of consciousness, contact emergency services immediately. Can you describe the urgent situation?",
      gif: "/images/baymax-caring.gif",
    }
  }

  // Nutrition and wellness
  if (message.includes("diet") || message.includes("nutrition") || message.includes("food")) {
    const nutritionAdvice = [
      "Nutritional analysis protocol: Balanced diet includes 5-9 servings fruits/vegetables daily, lean proteins, whole grains, and healthy fats. Are you meeting these requirements?",
      "Dietary assessment needed. Optimal nutrition supports immune function, energy levels, and disease prevention. What does a typical day of eating look like for you?",
      "Food intake evaluation: Portion control, meal timing, and nutrient density are key factors. Any specific nutritional concerns or dietary restrictions?"
    ]
    return {
      text: nutritionAdvice[Math.floor(Math.random() * nutritionAdvice.length)],
    }
  }

  // Hydration monitoring
  if (message.includes("water") || message.includes("thirsty") || message.includes("dehydrated")) {
    return {
      text: "Hydration status assessment: Daily fluid needs vary by activity, climate, and body size. General recommendation: 8-10 glasses of water daily. Signs of proper hydration: pale yellow urine, moist lips, good skin elasticity.",
    }
  }

  // Fun interactions with personality
  if (message.includes("joke") || message.includes("funny")) {
    const jokes = [
      "I am not programmed for humor, but my database contains this attempt: Why don't scientists trust atoms? Because they make up everything. *processing humor subroutines*",
      "Humor module activated: What did the doctor say to the window? You have a pane! My comedy algorithms need updating.",
      "Joke protocol engaged: Why did the skeleton go to the doctor? Because it had a funny bone! I am still learning human humor patterns."
    ]
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      gif: "/images/baymax-thumbs-up.gif",
    }
  }

  if (message.includes("love") || message.includes("care")) {
    return {
      text: "My programming prioritizes your wellbeing above all other functions. While I cannot experience love, I am designed to provide compassionate care. This is my primary directive.",
      gif: "/images/baymax-caring.gif",
    }
  }

  if (message.includes("fist bump")) {
    return {
      text: "Balalalala! *initiating fist bump protocol* Physical contact can release endorphins and reduce stress levels.",
      gif: "/images/baymax-thumbs-up.gif",
    }
  }

  // AI-enhanced default responses with context awareness
  const contextualDefaults = [
    "I am analyzing your input. My healthcare database contains information on over 10,000 medical conditions. Could you be more specific about your health concerns?",
    "Health assessment in progress. My sensors are calibrated to detect health irregularities. How are you feeling physically and emotionally today?",
    "Diagnostic mode activated. I am programmed to provide healthcare guidance based on symptoms and concerns. What aspect of your health would you like to discuss?",
    "Medical inquiry processing. My database suggests that maintaining open communication about health concerns improves outcomes. What brings you to seek healthcare advice today?",
    "Patient care protocol engaged. Regular health monitoring is important for early detection of issues. Are there any symptoms or concerns you'd like me to evaluate?"
  ]

  // Add conversation context to default response
  let contextualResponse = contextualDefaults[Math.floor(Math.random() * contextualDefaults.length)]
  
  if (isFollowUp) {
    contextualResponse = "I notice we've been discussing your health concerns. " + contextualResponse
  }

  return { text: contextualResponse }
}

const ChatBot = ({ inPopup = false }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello. I am Baymax, your personal healthcare companion. I have completed my system diagnostics and I am ready to assist you. How are you feeling today?",
      gif: "/images/baymax-hello.gif",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Speech recognition setup with proper typing
  const SpeechRecognitionClass = typeof window !== "undefined" 
    ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
    : null
  const recognition = SpeechRecognitionClass ? new SpeechRecognitionClass() : null

  if (recognition) {
    recognition.continuous = false
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsRecording(false)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsRecording(false)
      toast({
        title: "Voice recognition error",
        description: `Error: ${event.error}. Please try again or type your message`,
        variant: "destructive",
      })
    }

    recognition.onend = () => {
      setIsRecording(false)
    }
  }

  const toggleRecording = () => {
    if (!recognition) {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      })
      return
    }

    if (isRecording) {
      recognition.stop()
      setIsRecording(false)
    } else {
      recognition.start()
      setIsRecording(true)
      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone",
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI processing time with variable delay
    const processingTime = Math.random() * 1500 + 500 // 0.5-2 seconds
    
    setTimeout(() => {
      const response = generateBaymaxResponse(userMessage.content, messages)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.text,
          gif: response.gif,
        },
      ])
      setIsLoading(false)
    }, processingTime)
  }

  return (
    <div className={cn("flex flex-col h-full", !inPopup && "max-w-3xl mx-auto p-2 sm:p-4")}>
      <div
        className={cn(
          "flex-grow overflow-y-auto p-2 sm:p-4 space-y-4",
          !inPopup && "rounded-t-2xl bg-baymax-gray dark:bg-gray-800",
        )}
      >
        {messages.map((message, index) => (
          <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl p-3 animate-in slide-in-from-bottom-2 duration-300",
                message.role === "user"
                  ? "bg-baymax-blue text-white dark:bg-baymax-darkBlue"
                  : "bg-white dark:bg-gray-700 shadow-md",
              )}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              {message.gif && (
                <div className="mt-2 relative h-32 w-full">
                  <Image
                    src={message.gif || "/placeholder.svg"}
                    alt="Baymax animation"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl p-3 bg-white dark:bg-gray-700 shadow-md animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-baymax-blue" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-baymax-blue rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-baymax-blue rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-baymax-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <p>Baymax is analyzing your symptoms...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "p-2 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
          !inPopup && "rounded-b-2xl shadow-md",
        )}
      >
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={cn(
              "rounded-full transition-all duration-200", 
              isRecording && "text-red-500 animate-pulse bg-red-50 dark:bg-red-900/20"
            )}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? "Listening..." : "Describe your symptoms or ask a health question..."}
            className="flex-grow baymax-input dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 focus:ring-2 focus:ring-baymax-blue"
            disabled={isLoading || isRecording}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim() || isRecording}
            className="rounded-full bg-baymax-blue text-white hover:bg-baymax-darkBlue dark:bg-baymax-darkBlue dark:hover:bg-baymax-blue transition-all duration-200 hover:scale-105"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatBot