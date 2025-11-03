import staticData from "../../data/staticData.json";

const Privacy = () => {
  const privacyData = staticData.privacy;

  return (
    <section className="mx-5 px-5 py-4 my-4 bg-white shadow-sm rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {privacyData.title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Last Updated: {privacyData.lastUpdated}
      </p>

      <div className="space-y-6">
        {privacyData.sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              {section.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Privacy;
