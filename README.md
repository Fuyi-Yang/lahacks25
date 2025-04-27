# ARmigo

## Augmented Reality Emotional Support – Anytime, Anywhere

**ARmigo** delivers emotional support and anxiety relief through immersive augmented reality. Whether you need to chat with a virtual therapist or play with a delightful Corgi companion, ARmigo is there for you-right from the comfort of your home, using Snapchat Spectacles.

---

## Inspiration

Have you ever felt alone, stressed, or wished you could easily talk to a close friend, a professional therapist, or even just a comforting, playful puppy? We feel you, and that's what inspired ARmigo.

We believe augmented reality (AR) can foster genuine emotional connections through immersive sensory experiences. Our mission: to create a platform that offers real-time, accessible emotional support, right before your eyes.

---

## What It Does

ARmigo is an AR experience for Snapchat Spectacles that alleviates anxiety through two main channels:

- **One-on-One Chats**: Engage in a lifelike conversation with a virtual professional psychiatrist or a supportive friend, powered by advanced AI.
- **Corgi Companion**: Interact with an adorable animated Corgi that can handshake, play dead, and bring joy and comfort whenever you need it most.

---

## How We Built It

**Development Environment**
- Built and animated entirely in Lens Studio for seamless AR integration with Snapchat Spectacles.

**AI Interaction**
- Captures user audio and video input.
- Uses Lens Studio's speech recognition to convert audio to text.
- Sends messages to AI agents for deep, thoughtful responses.
- Integrates professional advice from medical databases and vision information using Gemini.
- Returns synthesized audio responses to the user for a natural, conversational experience.

**Agent Framework**
- Utilizes a Fetch.AI agentic workflow adapted from LangGraph, cycling between AI agent, user agent, and toolkit.
- Integrates ASI-1 mini as the language model and Tavily as the database search engine.

**Server Infrastructure**
- Lightweight Flask API in Python bridges Lens Studio (JavaScript) with our backend agent framework.
- Ngrok exposes the Flask server to a public endpoint, ensuring compatibility with Lens Studio's external URL fetch capabilities.

**3D Modeling**
- Animated therapist and Corgi models sourced from Mixamo and Sketchfab.
- Customization and optimization in Blender for Lens Studio compatibility.

**Interaction Design**
- Lens Studio’s interactable buttons and hand gesture interpreters enable intuitive user actions-choose your companion, initiate a handshake, and more.

