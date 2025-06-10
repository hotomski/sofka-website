import Link from "next/link";
import '../style/link_style.css';
import Chatbot from "../../components/chatbot";

export default function PhDPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}
    >

      {/* Top Navigation - left-centered, pill-shaped background */}
      <nav className="w-full max-w-5xl mx-auto flex flex-wrap justify-start items-center gap-4 md:gap-8 py-3 px-4 bg-white bg-opacity-80 rounded-xl shadow-md mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/" className="hover:opacity-70 transition text-black font-semibold">Home</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black font-semibold">CV</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black font-semibold">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black font-semibold">Life</Link>
        </div>
      </nav>
      
      <div className="text-black flex flex-col items-center justify-center px-8 py-16 font-sans max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-6xl font-extrabold mt-8 tracking-tight">PhD project</h1>

        {/* Subsections */}
        <div className="mt-8 flex flex-wrap gap-8 justify-center">
          <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 flex-1 min-w-[300px] transition-transform transform">

            {/* Paragraph: GuideGen Overview */}
            <h2 className="text-xl font-semibold mb-3">GuideGen overview</h2>
            <p className="text-lg leading-relaxed">
              During my PhD, I tackled a common but often overlooked challenge in software development: keeping requirements and acceptance tests aligned as the system evolves. And yes—requirements always evolve!
            </p>
            <p className="text-lg leading-relaxed">
              When requirements change, their associated acceptance tests should change too. But in reality, misalignment happens all the time. Why? Because updates are often poorly communicated, test cases are manually maintained, and stakeholders get left in the dark. This leads to bugs being reported for features that were intended—just not clearly communicated.
            </p>
            <p className="text-lg leading-relaxed">
              To address this, I developed GuideGen, a method and a tool that:
            </p>
            <p className="text-lg leading-relaxed">
              a. Automatically guides testers on how to adapt acceptance tests when requirements change.
            </p>
            <p className="text-lg leading-relaxed">
              b. Notifies stakeholders in real time (via email) when changes happen.
            </p>
            <p className="text-lg leading-relaxed">
              c. Raises warnings when mismatches between requirements and tests are detected.
            </p>
            <p className="text-lg leading-relaxed">
              The goal? To maintain quality and clarity in fast-moving projects—and to make sure everyone stays on the same page.
            </p>

            {/* Paragraph: Method */}
            <h2 className="text-xl font-semibold mb-3 mt-8">Method</h2>
            <p className="text-lg leading-relaxed">
              The goal of the approach is to identify all relevant changes in requirements that require the associated acceptance tests to be adapted and to generate guidance in natural language on how to adapt the acceptance tests based on these changes.
            </p>
            <p className="text-lg leading-relaxed">
              An overview of the approach:
            </p>

            {/* Image Section */}
            <div className="my-6 flex justify-center">
              <img
                src="/images/PhD/GuideGenOverview.png"
                alt="GuideGen Overview"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <p className="text-lg leading-relaxed">
              As soon as a requirements engineer applies changes to a requirement and saves them, my approach:
            </p>
            <ol className="list-decimal list-inside text-lg leading-relaxed">
              <li>
                Identifies relevant change patterns: by comparing the old and the new version of the changed requirement I identify the elements that have been changed and their change types.
              </li>
              <li>
                Generates guidance: in this step, I formulate suggestions in natural language on how to manage the changes.
              </li>
              <li>
                Notifies subscribed parties: finally, the generated guidance and the changes can be communicated to the interested parties via email. In addition, in the UI of our application, all non-aligned tests are flagged so that all stakeholders are aware of mismatches between the requirements and acceptance tests.
              </li>
            </ol>

            {/* Paragraph: The GuideGen Tool */}
            <h2 className="text-xl font-semibold mb-3 mt-8">The GuideGen Tool</h2>
            <p className="text-lg leading-relaxed">
              GuideGen is a web application, written in Java using Servlet and JSP technology. It is deployed on Apache Tomcat. On the one hand, GuideGen supports requirements engineers in maintaining the requirements of a system and in communicating all changes of requirements to testers, developers and other interested parties on-time and with almost no effort. On the other hand, GuideGen supports testers, who maintain acceptance test documents, by providing them with guidance on how to modify impacted tests so that they stay aligned with the modified requirements. In addition, by flagging all non-aligned acceptance tests, any stakeholder can easily see which acceptance tests are currently mis-aligned with their corresponding requirement - be it that tests do not exist yet or that they have not been updated after changes in the requirements.
            </p>
            <p className="text-lg leading-relaxed">
              View my five minute demo video below, prepared for the ICSE 2018 demonstrations track. For the corresponding tool demo paper, see the publications list below.
            </p>

            {/* Video Section */}
            <div className="my-6 flex justify-center">
              <video
                controls
                className="max-w-full rounded-lg shadow-md"
              >
                <source src="/videos/PhD/GuideGen.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <Chatbot />
        </div>

        {/* Navigation Links */}
        <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium">
          <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
        </nav>
      </div>
    </div>
  );
}
