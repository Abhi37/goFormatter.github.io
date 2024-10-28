// Initialize the JSON editor for formatted output
const container = document.getElementById('jsonOutput');
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
});
