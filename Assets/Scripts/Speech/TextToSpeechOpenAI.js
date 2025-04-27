// @input Component.AudioComponent audioComponent
// @input Asset.AudioTrackAsset audioOutputAsset
// @input string voice {"hint":"Available voices: alloy, echo, fable, onyx, nova, shimmer"}

// Remote service module for fetching data
var remoteServiceModule = require("LensStudio:RemoteServiceModule");

const apiKey = "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";

// Make generateAndPlaySpeech globally accessible
script.api.generateAndPlaySpeech = async function(inputText) {
    if (!inputText) {
        print("No text provided for speech synthesis.");
        return;
    }

    try {
        const requestPayload = {
            model: "tts-1",
            voice: script.voice,
            input: inputText,
            response_format: "pcm"
        };

        const request = new Request("https://api.openai.com/v1/audio/speech", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestPayload),
        });

        print("Sending request to OpenAI...");
        
        let response = await remoteServiceModule.fetch(request);
        print("Response status: " + response.status);

        if (response.status === 200) {
            try {
                const audioData = await response.bytes();
                print("Received audio data, length: " + audioData.length);
                
                if (!script.audioOutputAsset) {
                    throw new Error("Audio Output asset is not assigned");
                }

                const track = getAudioTrackFromData(audioData);
                script.audioComponent.audioTrack = track;
                script.audioComponent.play(1);

                print("Playing speech: " + inputText);
            } catch (processError) {
                print("Error processing audio data: " + processError);
            }
        } else {
            const errorText = await response.text();
            print("API Error: " + response.status + " - " + errorText);
        }
    } catch (error) {
        print("Error generating speech: " + error);
    }
}

function getAudioTrackFromData(audioData) {
    let outputAudioTrack = script.audioOutputAsset;
    if (!outputAudioTrack) {
        throw new Error("Failed to get Audio Output asset");
    }

    const sampleRate = 24000;
    
    const BUFFER_SIZE = audioData.length / 2;
    print("Processing buffer size: " + BUFFER_SIZE);

    var audioOutput = outputAudioTrack.control;
    if (!audioOutput) {
        throw new Error("Failed to get audio output control");
    }

    audioOutput.sampleRate = sampleRate;
    var data = new Float32Array(BUFFER_SIZE);

    // Convert PCM16 to Float32
    for (let i = 0, j = 0; i < audioData.length; i += 2, j++) {
        const sample = ((audioData[i] | (audioData[i + 1] << 8)) << 16) >> 16;
        data[j] = sample / 32768;
    }

    const shape = new vec3(BUFFER_SIZE, 1, 1);
    shape.x = audioOutput.getPreferredFrameSize();

    // Enqueue audio frames in chunks
    let i = 0;
    while (i < BUFFER_SIZE) {
        try {
            const chunkSize = Math.min(shape.x, BUFFER_SIZE - i);
            shape.x = chunkSize;
            audioOutput.enqueueAudioFrame(data.subarray(i, i + chunkSize), shape);
            i += chunkSize;
        } catch (e) {
            throw new Error("Failed to enqueue audio frame - " + e);
        }
    }

    return outputAudioTrack;
}

script.createEvent("OnStartEvent").bind(() => {
    if (!remoteServiceModule || !script.audioComponent || !apiKey) {
        print("Remote Service Module, Audio Component, or API key is missing.");
        return;
    }

    if (!script.audioOutputAsset) {
        print("Audio Output asset is not assigned. Please assign an Audio Output asset in the Inspector.");
        return;
    }

    script.api.generateAndPlaySpeech("TextToSpeechOpenAI Ready!");
});