// ...existing imports...

export default function CV() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}
    >
      <div className="text-black flex flex-col items-center justify-center px-4 md:px-8 py-16 font-sans max-w-6xl mx-auto">
        {/* ...title, download button, etc... */}

        {/* Embedded PDF in Card Style */}
        <div className="mt-12 w-full flex flex-col items-center">
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full max-w-5xl">
            <h2 className="text-xl font-semibold mb-2 text-center">View CV as PDF</h2>
            <div
              className="rounded-lg"
              style={{
                background: "#fff", // ensures white background
                width: "100%",
                height: "1100px", // adjust as needed for your PDF
              }}
            >
              <iframe
                src="/images/cv/cv.pdf"
                title="Sofija Hotomski CV"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  background: "#fff", // ensures iframe background is white
                }}
              ></iframe>
            </div>
          </div>
        </div>

        {/* ...rest of your code... */}
      </div>
    </div>
  );
}