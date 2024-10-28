// Initialize the JSON editor for formatted output
/*const container = document.getElementById('jsonOutput');
const editor = new JSONEditor(container, {
    mode: 'view',  // View mode for tree structure
    modes: ['view', 'code'],  // Allows switching between view and code mode
    onError: function (err) {
        alert('Invalid JSON');
    }
});

// Listen for JSON input changes and format
document.getElementById('jsonInput').addEventListener('input', function (event) {
    const input = event.target.value;
    try {
        const jsonData = JSON.parse(input);  // Parse input JSON
        editor.set(jsonData);  // Set data in JSON editor
    } catch (error) {
        console.error("Invalid JSON:", error);
    }
});*/

function formatData() {
  const input = document.getElementById("inputBox").value;
  const outputBox = document.getElementById("outputBox");
  try {
    // Try JSON formatting
    const jsonData = JSON.parse(input);
    $(outputBox).jsonViewer(jsonData, { collapsed: true });
  } catch (jsonError) {
    try {
      // Try XML formatting
      const parser = new DOMParser();
      const xmlData = parser.parseFromString(input, "text/xml");
      outputBox.innerHTML = "";
      outputBox.appendChild(document.createElement("pre")).textContent = formatXML(xmlData);
    } catch (xmlError) {
      outputBox.textContent = "Invalid JSON or XML";
    }
  }
}

// Helper function for XML formatting
function formatXML(xml) {
  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xml);
  const formatted = xmlStr.replace(/(>)(<)(\/*)/g, "$1\n$2$3");
  return formatted;
}
