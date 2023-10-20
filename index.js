document.addEventListener('DOMContentLoaded', function () {
  const token = 'sk-Sa5dYBzBK'+'N6p5MBV'+'OSYCT3BlbkF'+'JcizC0P'+'YOP2VH'+'cichjurM';
  const gptel = document.getElementById('generated-text');
  const promptForm = document.getElementById('prompt-form');
  const promptInput = document.getElementById('prompt-input');
  let conversationHistory = []; // Store conversation history

  promptForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      const textin = promptInput.value;

      // Display "Loading..." while waiting for the response
      gptel.innerText = "Loading...";

      // Add the user's message to the conversation history
      conversationHistory.push({ role: "user", content: textin });

      fetch("https://api.openai.com/v1/chat/completions", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              "model": "gpt-3.5-turbo",
              "messages": conversationHistory // Include the entire conversation history
          })
      })
      .then(response => response.json())
      .then(data => {
          // Add the model's response to the conversation history
          conversationHistory.push({ role: "assistant", content: data.choices[0].message.content });

          gptel.innerText = data.choices[0].message.content;
      })
      .catch(error => {
          console.error('Error:', error);
      });

      promptInput.value = "";
  });
});
