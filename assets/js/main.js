document.getElementById('fileInput').addEventListener('change', handleFileSelect);

let fileContent = '';
let typedContent = '';
let intervalId;

// Get the audio element
const clickSound = document.getElementById('clickSound');

// Add event listeners to buttons to play the sound
document.getElementById('startButton').addEventListener('click', () => {
    clickSound.play();
    startTyping();
});

document.getElementById('saveButton').addEventListener('click', () => {
    clickSound.play();
    saveNewFile();
});

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
