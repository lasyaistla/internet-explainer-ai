chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "explainSelection",
      title: "Explain this with AI",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "explainSelection") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: explainWithAI,
        args: [info.selectionText]
      });
    }
  });
  
  async function explainWithAI(text) {
    const apiKey = 'your key'
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Explain this internet post clearly with cultural context:\n"${text}"`
          }
        ]
      })
    });
  
    const data = await response.json();
    const explanation = data.choices[0].message.content;
  
    alert("🧠 Internet Explainer:\n\n" + explanation);
  }
  