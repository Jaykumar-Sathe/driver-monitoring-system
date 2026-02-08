function AlertPopup({ level }) {
  if (level !== "CRITICAL") return null;

  return (
    <div className="fixed top-6 right-6 bg-red-600 px-6 py-3 rounded-lg shadow-lg animate-pulse">
      DRIVER FATIGUE CRITICAL
    </div>
  );
}

export default AlertPopup;
