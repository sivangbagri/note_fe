import type React from "react"
import { Link } from "react-router-dom"
import { Mic, Search, FileText } from "lucide-react"

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">HOLON Meeting Assistant</h1>
        <p className="text-lg text-slate-600">Record, transcribe, summarize, and search your meetings with ease</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Mic className="w-10 h-10 text-blue-600" />}
          title="Record & Transcribe"
          description="Upload audio or record directly to get accurate transcriptions in multiple languages"
          linkTo="/record"
          linkText="Start Recording"
        />

        <FeatureCard
          icon={<FileText className="w-10 h-10 text-blue-600" />}
          title="Smart Summaries"
          description="Get AI-powered summaries with key points and action items extracted automatically"
          linkTo="/record"
          linkText="Try It Now"
        />

        <FeatureCard
          icon={<Search className="w-10 h-10 text-blue-600" />}
          title="Powerful Search"
          description="Search through all your meeting transcripts to find exactly what you need"
          linkTo="/search"
          linkText="Search Transcripts"
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">How It Works</h2>
        <ol className="space-y-4">
          <li className="flex items-start">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold mr-3">
              1
            </span>
            <div>
              <p className="text-slate-700">Upload your meeting audio or record directly in the browser</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold mr-3">
              2
            </span>
            <div>
              <p className="text-slate-700">Our AI transcribes the audio and generates a comprehensive summary</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold mr-3">
              3
            </span>
            <div>
              <p className="text-slate-700">Review the transcript, search for keywords, and export to PDF</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  linkTo: string
  linkText: string
}

const FeatureCard = ({ icon, title, description, linkTo, linkText }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4 flex-grow">{description}</p>
      <Link to={linkTo} className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
        {linkText} →
      </Link>
    </div>
  )
}

export default Home
