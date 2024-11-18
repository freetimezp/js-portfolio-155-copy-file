document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('startButton').addEventListener('click', startTyping);
document.getElementById('saveButton').addEventListener('click', saveNewFile);

let fileContent = '';
let typedContent = '';
let intervalId;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            fileContent = e.target.result;
            document.getElementById('startButton').disabled = false;
        };
        reader.readAsText(file);
    }
}

function startTyping() {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = ''; // Clear previous content
    typedContent = '';
    let index = 0;

    intervalId = setInterval(() => {
        if (index < fileContent.length) {
            const char = fileContent[index];
            typedContent += char;
            outputDiv.textContent = typedContent;
            index++;
            outputDiv.scrollTop = outputDiv.scrollHeight; // Auto-scroll
        } else {
            clearInterval(intervalId);
            document.getElementById('saveButton').disabled = false;
        }
    }, 50); // Adjust speed by changing the interval (milliseconds)
}

function saveNewFile() {
    const blob = new Blob([typedContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'newFile.txt';
    link.click();
}
